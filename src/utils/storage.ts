import AsyncStorage from '@react-native-async-storage/async-storage';
import { MissionAlert, MissionThresholds } from '../types/mission';

const THRESHOLDS_KEY = '@orbitguard:thresholds';
const ALERTS_KEY = '@orbitguard:alerts';

export async function storeThresholds(
  thresholds: MissionThresholds
): Promise<void> {
  await AsyncStorage.setItem(THRESHOLDS_KEY, JSON.stringify(thresholds));
}

export async function getStoredThresholds(): Promise<MissionThresholds | null> {
  const data = await AsyncStorage.getItem(THRESHOLDS_KEY);

  if (!data) {
    return null;
  }

  return JSON.parse(data);
}

export async function storeAlerts(alerts: MissionAlert[]): Promise<void> {
  await AsyncStorage.setItem(ALERTS_KEY, JSON.stringify(alerts));
}

export async function getStoredAlerts(): Promise<MissionAlert[]> {
  const data = await AsyncStorage.getItem(ALERTS_KEY);

  if (!data) {
    return [];
  }

  return JSON.parse(data);
}