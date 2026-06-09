import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { ChartCard } from '../../components/ChartCard';
import { MissionCard } from '../../components/MissionCard';
import { SectionTitle } from '../../components/SectionTitle';
import { theme } from '../../constants/theme';
import { useMission } from '../../context/MissionContext';
import { formatPercent } from '../../utils/formatters';





interface MetricBarProps {
  label: string;
  value: number;
}


function MetricBar({ label, value }: MetricBarProps) {
  const safeValue = Math.min(Math.max(value, 0), 100);

  return (
    <View style={styles.metric}>
      <View style={styles.metricHeader}>
        <Text style={styles.metricLabel}>{label}</Text>
        <Text style={styles.metricValue}>{formatPercent(safeValue)}</Text>
      </View>

      <View style={styles.barBackground}>
        <View style={[styles.barFill, { width: `${safeValue}%` }]} />
      </View>
    </View>
  );
}





export default function EnergiaScreen() {
  const { missionData, history, thresholds } = useMission();

  const chartHistory = history.slice(0, 6).reverse();
  const labels = chartHistory.map((_, index) => `${index + 1}`);
  const batteryData = chartHistory.map((item) =>
    Number(item.energy.battery.toFixed(0))
  );

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <SectionTitle
        title="Energia"
        subtitle="Acompanhamento da bateria, geração solar e consumo dos sistemas."
        icon="battery-charging-outline"
      />

      <MissionCard
        title="Bateria principal"
        value={formatPercent(missionData.energy.battery)}
        subtitle={`Limite mínimo configurado: ${thresholds.minBattery}%`}
        icon="battery-half-outline"
        color={theme.colors.success}
      />

      <View style={styles.panel}>
        <MetricBar
          label="Geração dos painéis solares"
          value={missionData.energy.solarGeneration}
        />

        <MetricBar
          label="Consumo dos sistemas"
          value={missionData.energy.consumption}
        />

        <MetricBar
          label="Bateria disponível"
          value={missionData.energy.battery}
        />
      </View>

      <ChartCard
        title="Histórico da bateria"
        data={batteryData}
        labels={labels}
        suffix="%"
      />

      <View style={styles.explanation}>
        <Text style={styles.explanationTitle}>Regra de alerta</Text>
        <Text style={styles.explanationText}>
          Se a bateria ficar abaixo do limite definido nas configurações, o app gera
          um alerta crítico automaticamente.
        </Text>
      </View>
    </ScrollView>
  );
}








const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: theme.spacing.md,
    paddingBottom: 100,
  },
  panel: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: theme.spacing.md,
  },
  metric: {
    marginBottom: theme.spacing.md,
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.sm,
  },
  metricLabel: {
    color: theme.colors.textMuted,
  },
  metricValue: {
    color: theme.colors.text,
    fontWeight: '800',
  },
  barBackground: {
    height: 12,
    backgroundColor: theme.colors.input,
    borderRadius: 10,
    overflow: 'hidden',
  },
  barFill: {
    height: 12,
    backgroundColor: theme.colors.cyan,
    borderRadius: 10,
  },
  explanation: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  explanationTitle: {
    color: theme.colors.text,
    fontWeight: '800',
    fontSize: theme.fontSize.lg,
    marginBottom: theme.spacing.sm,
  },
  explanationText: {
    color: theme.colors.textMuted,
    lineHeight: 21,
  },
});