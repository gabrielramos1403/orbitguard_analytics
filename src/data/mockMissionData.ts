import {
    MissionData,
    MissionReading,
    MissionThresholds,
} from '../types/mission';





export const DEFAULT_THRESHOLDS: MissionThresholds = {
  maxTemperature: 80,
  minBattery: 25,
  minSignal: 60,
  maxLatency: 650,
};




export const initialMissionData: MissionData = {
  sensors: {
    temperature: 42,
    pressure: 1.02,
    radiation: 1.8,
  },
  energy: {
    battery: 82,
    solarGeneration: 68,
    consumption: 41,
  },
  communication: {
    signalQuality: 89,
    latency: 260,
    packetLoss: 1.2,
  },
  orbitalStability: 94,
  updatedAt: new Date().toISOString(),
};

function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}




export function generateNextMissionData(previous: MissionData): MissionData {
  const solarGeneration = clamp(
    previous.energy.solarGeneration + randomBetween(-8, 8),
    5,
    100
  );

  const consumption = clamp(
    previous.energy.consumption + randomBetween(-6, 6),
    20,
    100
  );

  const batteryVariation =
    solarGeneration / 90 - consumption / 75 + randomBetween(-1.8, 1.2);

  const signalQuality = clamp(
    previous.communication.signalQuality + randomBetween(-9, 7),
    10,
    100
  );




  return {
    sensors: {
      temperature: clamp(
        previous.sensors.temperature + randomBetween(-4, 5.5),
        -20,
        105
      ),
      pressure: clamp(
        previous.sensors.pressure + randomBetween(-0.03, 0.03),
        0.7,
        1.3
      ),
      radiation: clamp(
        previous.sensors.radiation + randomBetween(-0.4, 0.6),
        0.1,
        8
      ),
    },
    energy: {
      battery: clamp(previous.energy.battery + batteryVariation, 5, 100),
      solarGeneration,
      consumption,
    },
    communication: {
      signalQuality,
      latency: clamp(
        previous.communication.latency + randomBetween(-70, 85),
        120,
        1200
      ),
      packetLoss: clamp((100 - signalQuality) / 9 + randomBetween(0, 2), 0, 25),
    },
    orbitalStability: clamp(
      previous.orbitalStability + randomBetween(-3, 2.5),
      40,
      100
    ),
    updatedAt: new Date().toISOString(),
  };
}






export function makeMissionReading(data: MissionData): MissionReading {
  return {
    id: `${Date.now()}-${Math.random()}`,
    ...data,
  };
}