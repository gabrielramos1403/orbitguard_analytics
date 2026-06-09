import {
    MissionAlert,
    MissionData,
    MissionThresholds,
    RiskAnalysis,
} from '../types/mission';



export function analyzeMissionRisk(
  data: MissionData,
  thresholds: MissionThresholds,
  alerts: MissionAlert[] = []
): RiskAnalysis {
  let warningPoints = 0;
  let criticalPoints = 0;






  const hasCriticalAlert = alerts.some((alert) => alert.level === 'critico');

  if (data.sensors.temperature > thresholds.maxTemperature) {
    criticalPoints += 1;
  } else if (data.sensors.temperature > thresholds.maxTemperature * 0.9) {
    warningPoints += 1;
  }

  if (data.energy.battery < thresholds.minBattery) {
    criticalPoints += 1;
  } else if (data.energy.battery < thresholds.minBattery + 10) {
    warningPoints += 1;
  }

  if (data.communication.signalQuality < thresholds.minSignal - 15) {
    criticalPoints += 1;
  } else if (data.communication.signalQuality < thresholds.minSignal) {
    warningPoints += 1;
  }

  if (data.communication.latency > thresholds.maxLatency) {
    criticalPoints += 1;
  } else if (data.communication.latency > thresholds.maxLatency * 0.85) {
    warningPoints += 1;
  }

  if (data.orbitalStability < 55) {
    warningPoints += 1;
  }

  if (hasCriticalAlert || criticalPoints >= 1 || warningPoints >= 3) {
    return {
      status: 'Risco crítico',
      riskLevel: 'critico',
      message:
        'A missão apresenta indicadores críticos. Recomenda-se revisar energia, comunicação e sensores imediatamente.',
    };
  }

  if (warningPoints > 0) {
    return {
      status: 'Atenção necessária',
      riskLevel: 'medio',
      message:
        'Alguns indicadores estão próximos dos limites. Acompanhe a missão com atenção.',
    };
  }




  return {
    status: 'Operação normal',
    riskLevel: 'normal',
    message:
      'Todos os principais sistemas estão dentro dos parâmetros esperados.',
  };
}