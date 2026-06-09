export function formatPercent(value: number): string {
  return `${Math.round(value)}%`;
}

export function formatNumber(value: number, decimals = 1): string {
  return value.toFixed(decimals);
}

export function formatTemperature(value: number): string {
  return `${value.toFixed(1)}°C`;
}

export function formatTime(isoDate: string): string {
  const date = new Date(isoDate);

  return date.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}