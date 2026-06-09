import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { ChartCard } from '../../components/ChartCard';
import { MissionCard } from '../../components/MissionCard';
import { SectionTitle } from '../../components/SectionTitle';
import { theme } from '../../constants/theme';
import { useMission } from '../../context/MissionContext';
import {
    formatNumber,
    formatPercent,
} from '../../utils/formatters';




export default function ComunicacaoScreen() {
  const { missionData, history, thresholds } = useMission();

  const chartHistory = history.slice(0, 6).reverse();
  const labels = chartHistory.map((_, index) => `${index + 1}`);
  const signalData = chartHistory.map((item) =>
    Number(item.communication.signalQuality.toFixed(0))
  );

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <SectionTitle
        title="Comunicação"
        subtitle="Análise do link de telemetria, sinal, latência e perda de pacotes."
        icon="radio-outline"
      />



      <View style={styles.grid}>
        <MissionCard
          title="Qualidade do sinal"
          value={formatPercent(missionData.communication.signalQuality)}
          subtitle={`Mínimo: ${thresholds.minSignal}%`}
          icon="wifi-outline"
          color={theme.colors.cyan}
          style={styles.cardHalf}
        />




        <MissionCard
          title="Latência"
          value={`${formatNumber(missionData.communication.latency, 0)} ms`}
          subtitle={`Máximo: ${thresholds.maxLatency} ms`}
          icon="timer-outline"
          color={theme.colors.warning}
          style={styles.cardHalf}
        />

        <MissionCard
          title="Pacotes perdidos"
          value={`${formatNumber(missionData.communication.packetLoss, 1)}%`}
          subtitle="Estimativa do link"
          icon="swap-horizontal-outline"
          color={theme.colors.secondary}
        />
      </View>

      <ChartCard
        title="Histórico da qualidade do sinal"
        data={signalData}
        labels={labels}
        suffix="%"
      />

      <View style={styles.explanation}>
        <Text style={styles.explanationTitle}>Regra de comunicação</Text>
        <Text style={styles.explanationText}>
          O sistema gera alertas quando o sinal fica abaixo do mínimo configurado
          ou quando a latência ultrapassa o limite máximo definido.
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardHalf: {
    width: '48%',
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