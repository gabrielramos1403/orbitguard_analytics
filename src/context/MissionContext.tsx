import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useMemo,
    useReducer,
    useRef,
} from 'react';







import {
    MissionAlert,
    MissionContextData,
    MissionData,
    MissionReading,
    MissionThresholds,
} from '../types/mission';

import {
    DEFAULT_THRESHOLDS,
    generateNextMissionData,
    initialMissionData,
    makeMissionReading,
} from '../data/mockMissionData';

import { analyzeMissionRisk } from '../utils/riskAnalysis';




import {
    getStoredAlerts,
    getStoredThresholds,
    storeAlerts,
    storeThresholds,
} from '../utils/storage';

interface MissionState {
  missionData: MissionData;
  history: MissionReading[];
  alerts: MissionAlert[];
  thresholds: MissionThresholds;
  loading: boolean;
}







type MissionAction =
  | {
      type: 'LOAD_STORAGE';
      payload: {
        thresholds: MissionThresholds;
        alerts: MissionAlert[];
      };
    }
  | {
      type: 'UPDATE_MISSION';
      payload: {
        missionData: MissionData;
        history: MissionReading[];
        alerts: MissionAlert[];
      };
    }
  | {
      type: 'SAVE_THRESHOLDS';
      payload: MissionThresholds;
    }
  | {
      type: 'CLEAR_ALERTS';
    };

const initialState: MissionState = {
  missionData: initialMissionData,
  history: [makeMissionReading(initialMissionData)],
  alerts: [],
  thresholds: DEFAULT_THRESHOLDS,
  loading: true,
};






function missionReducer(
  state: MissionState,
  action: MissionAction
): MissionState {
  switch (action.type) {
    case 'LOAD_STORAGE':
      return {
        ...state,
        thresholds: action.payload.thresholds,
        alerts: action.payload.alerts,
        loading: false,
      };

    case 'UPDATE_MISSION':
      return {
        ...state,
        missionData: action.payload.missionData,
        history: action.payload.history,
        alerts: action.payload.alerts,
      };

    case 'SAVE_THRESHOLDS':
      return {
        ...state,
        thresholds: action.payload,
      };

    case 'CLEAR_ALERTS':
      return {
        ...state,
        alerts: [],
      };

    default:
      return state;
  }
}






const MissionContext = createContext<MissionContextData | undefined>(undefined);

function shouldRegisterAlert(
  newAlert: MissionAlert,
  existingAlerts: MissionAlert[]
): boolean {
  const lastEqualAlert = existingAlerts.find(
    (alert) => alert.title === newAlert.title
  );

  if (!lastEqualAlert) {
    return true;
  }

  const diff =
    new Date(newAlert.time).getTime() - new Date(lastEqualAlert.time).getTime();

  return diff > 45000;
}

function createAlertsFromData(
  data: MissionData,
  thresholds: MissionThresholds,
  existingAlerts: MissionAlert[]
): MissionAlert[] {
  const now = new Date().toISOString();
  const newAlerts: MissionAlert[] = [];

  function addAlert(
    title: string,
    description: string,
    level: MissionAlert['level']
  ) {
    newAlerts.push({
      id: `${Date.now()}-${title}`,
      title,
      description,
      level,
      time: now,
    });
  }





  if (data.sensors.temperature > thresholds.maxTemperature) {
    addAlert(
      'Temperatura crítica',
      `A temperatura chegou a ${data.sensors.temperature.toFixed(
        1
      )}°C, acima do limite configurado.`,
      'critico'
    );
  } else if (data.sensors.temperature > thresholds.maxTemperature * 0.9) {
    addAlert(
      'Temperatura em atenção',
      'A temperatura está se aproximando do limite máximo da missão.',
      'medio'
    );
  }

  if (data.energy.battery < thresholds.minBattery) {
    addAlert(
      'Bateria abaixo do limite',
      `A bateria está em ${data.energy.battery.toFixed(
        0
      )}%, abaixo do mínimo configurado.`,
      'critico'
    );
  }

  if (data.communication.signalQuality < thresholds.minSignal - 15) {
    addAlert(
      'Perda severa de sinal',
      'A qualidade do sinal está muito baixa para uma comunicação segura.',
      'critico'
    );
  } else if (data.communication.signalQuality < thresholds.minSignal) {
    addAlert(
      'Sinal abaixo do ideal',
      'A qualidade do sinal está abaixo do limiar configurado.',
      'medio'
    );
  }

  if (data.communication.latency > thresholds.maxLatency) {
    addAlert(
      'Latência elevada',
      `A latência atingiu ${data.communication.latency.toFixed(
        0
      )} ms, acima do limite.`,
      'medio'
    );
  }

  if (data.orbitalStability < 55) {
    addAlert(
      'Estabilidade orbital reduzida',
      'O índice de estabilidade orbital caiu e precisa ser acompanhado.',
      'baixo'
    );
  }

  return newAlerts.filter((alert) =>
    shouldRegisterAlert(alert, existingAlerts)
  );
}






interface MissionProviderProps {
  children: ReactNode;
}

export function MissionProvider({ children }: MissionProviderProps) {
  const [state, dispatch] = useReducer(missionReducer, initialState);
  const stateRef = useRef(state);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  async function loadInitialData() {
    const [storedThresholds, storedAlerts] = await Promise.all([
      getStoredThresholds(),
      getStoredAlerts(),
    ]);

    dispatch({
      type: 'LOAD_STORAGE',
      payload: {
        thresholds: storedThresholds ?? DEFAULT_THRESHOLDS,
        alerts: storedAlerts,
      },
    });
  }

  useEffect(() => {
    loadInitialData();
  }, []);

  async function updateMissionData() {
    const currentState = stateRef.current;

    const nextMissionData = generateNextMissionData(
      currentState.missionData
    );

    const generatedAlerts = createAlertsFromData(
      nextMissionData,
      currentState.thresholds,
      currentState.alerts
    );

    const nextAlerts = [
      ...generatedAlerts,
      ...currentState.alerts,
    ].slice(0, 30);

    const nextHistory = [
      makeMissionReading(nextMissionData),
      ...currentState.history,
    ].slice(0, 12);

    dispatch({
      type: 'UPDATE_MISSION',
      payload: {
        missionData: nextMissionData,
        history: nextHistory,
        alerts: nextAlerts,
      },
    });

    if (generatedAlerts.length > 0) {
      await storeAlerts(nextAlerts);
    }
  }

  useEffect(() => {
    if (state.loading) {
      return;
    }

    const interval = setInterval(() => {
      updateMissionData();
    }, 4000);

    return () => clearInterval(interval);
  }, [state.loading]);

  async function saveThresholds(
    thresholds: MissionThresholds
  ): Promise<void> {
    dispatch({
      type: 'SAVE_THRESHOLDS',
      payload: thresholds,
    });

    await storeThresholds(thresholds);
  }

  async function clearAlerts(): Promise<void> {
    dispatch({
      type: 'CLEAR_ALERTS',
    });

    await storeAlerts([]);
  }

  const riskAnalysis = useMemo(
    () =>
      analyzeMissionRisk(
        state.missionData,
        state.thresholds,
        state.alerts
      ),
    [state.missionData, state.thresholds, state.alerts]
  );

  const value: MissionContextData = {
    ...state,
    riskAnalysis,
    updateMissionData,
    saveThresholds,
    clearAlerts,
  };

  return (
    <MissionContext.Provider value={value}>
      {children}
    </MissionContext.Provider>
  );
}

export function useMission(): MissionContextData {
  const context = useContext(MissionContext);

  if (!context) {
    throw new Error('useMission deve ser usado dentro de MissionProvider');
  }

  return context;
}