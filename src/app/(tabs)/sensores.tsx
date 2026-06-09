import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { ChartCard } from '../../components/ChartCard';
import { MissionCard } from '../../components/MissionCard';
import { SectionTitle } from '../../components/SectionTitle';
import { theme } from '../../constants/theme';
import { useMission } from '../../context/MissionContext';
import {
    formatNumber,
    formatTemperature,
} from '../../utils/formatters';





export default function SensoresScreen() {
  const { missionData, history } = useMission();

  const chartHistory = history.slice(0, 6).reverse();
  const labels = chartHistory.map((_, index) => `${index + 1}`);

  const temperatureData = chartHistory.map((item) =>
    Number(item.sensors.temperature.toFixed(1))
  );

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <SectionTitle
        title="Sensores"
        subtitle="Monitoramento de temperatura, pressão e radiação da missão."
        icon="speedometer-outline"
      />




      <View style={styles.grid}>
        <MissionCard
          title="Temperatura"
          value={formatTemperature(missionData.sensors.temperature)}
          subtitle="Controle térmico"
          icon="thermometer-outline"
          color={theme.colors.warning}
          style={styles.cardHalf}
        />


        <MissionCard
          title="Pressão"
          value={`${formatNumber(missionData.sensors.pressure, 2)} atm`}
          subtitle="Módulo interno"
          icon="cloud-outline"
          color={theme.colors.cyan}
          style={styles.cardHalf}
        />

        <MissionCard
          title="Radiação"
          value={`${formatNumber(missionData.sensors.radiation, 1)} rad`}
          subtitle="Exposição externa"
          icon="nuclear-outline"
          color={theme.colors.secondary}
        />
      </View>

      <ChartCard
        title="Histórico de temperatura"
        data={temperatureData}
        labels={labels}
        suffix="°"
      />

      <View style={styles.explanation}>
        <Text style={styles.explanationTitle}>Interpretação</Text>
        <Text style={styles.explanationText}>
          A temperatura é acompanhada continuamente. Quando ela se aproxima ou ultrapassa
          o limite configurado, o sistema gera alertas para apoiar a tomada de decisão.
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