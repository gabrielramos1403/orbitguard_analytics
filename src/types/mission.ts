export type AlertLevel = 'baixo' | 'medio' | 'critico';

export type RiskLevel = 'normal' | 'medio' | 'critico';

export type MissionStatus =
  | 'Operação normal'
  | 'Atenção necessária'
  | 'Risco crítico';

export interface SensorData {
  temperature: number;
  pressure: number;
  radiation: number;
}







export interface EnergyData {
  battery: number;
  solarGeneration: number;
  consumption: number;
}





export interface CommunicationData {
  signalQuality: number;
  latency: number;
  packetLoss: number;
}



export interface MissionData {
  sensors: SensorData;
  energy: EnergyData;
  communication: CommunicationData;
  orbitalStability: number;
  updatedAt: string;
}

export interface MissionReading extends MissionData {
  id: string;
}




export interface MissionAlert {
  id: string;
  title: string;
  description: string;
  level: AlertLevel;
  time: string;
}





export interface MissionThresholds {
  maxTemperature: number;
  minBattery: number;
  minSignal: number;
  maxLatency: number;
}

export interface RiskAnalysis {
  status: MissionStatus;
  riskLevel: RiskLevel;
  message: string;
}








export interface MissionContextData {
  missionData: MissionData;
  history: MissionReading[];
  alerts: MissionAlert[];
  thresholds: MissionThresholds;
  riskAnalysis: RiskAnalysis;
  loading: boolean;
  updateMissionData: () => void;
  saveThresholds: (thresholds: MissionThresholds) => Promise<void>;
  clearAlerts: () => Promise<void>;
}