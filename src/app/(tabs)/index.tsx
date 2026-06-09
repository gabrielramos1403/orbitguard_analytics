import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { MissionCard } from '../../components/MissionCard';
import { SectionTitle } from '../../components/SectionTitle';
import { StatusBadge } from '../../components/StatusBadge';
import { theme } from '../../constants/theme';
import { useMission } from '../../context/MissionContext';
import {
    formatPercent,
    formatTemperature,
    formatTime,
} from '../../utils/formatters';





export default function HomeScreen() {
  const { missionData, alerts, riskAnalysis } = useMission();

  const criticalAlerts = alerts.filter(
    (alert) => alert.level === 'critico'
  ).length;



  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <Text style={styles.kicker}>MISSÃO ORBITAL AURORA-7</Text>
        <Text style={styles.title}>OrbitGuard Analytics</Text>
        <Text style={styles.subtitle}>
          Plataforma mobile para monitoramento preditivo de uma missão espacial simulada.
        </Text>
      </View>




      <SectionTitle
        title="Dashboard Principal"
        subtitle="Resumo dos principais sistemas da missão em tempo real simulado."
        icon="planet-outline"
      />



      <StatusBadge
        label={riskAnalysis.status}
        level={riskAnalysis.riskLevel}
        message={riskAnalysis.message}
      />

      <View style={styles.grid}>
        <MissionCard
          title="Temperatura"
          value={formatTemperature(missionData.sensors.temperature)}
          subtitle="Sensor térmico"
          icon="thermometer-outline"
          color={theme.colors.warning}
          style={styles.cardHalf}
        />




        <MissionCard
          title="Energia"
          value={formatPercent(missionData.energy.battery)}
          subtitle="Bateria principal"
          icon="battery-half-outline"
          color={theme.colors.success}
          style={styles.cardHalf}
        />

        <MissionCard
          title="Sinal"
          value={formatPercent(missionData.communication.signalQuality)}
          subtitle="Telemetria"
          icon="radio-outline"
          color={theme.colors.cyan}
          style={styles.cardHalf}
        />

        <MissionCard
          title="Estabilidade"
          value={formatPercent(missionData.orbitalStability)}
          subtitle="Órbita operacional"
          icon="analytics-outline"
          color={theme.colors.secondary}
          style={styles.cardHalf}
        />
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>Status da missão</Text>
        <Text style={styles.infoText}>
          Alertas críticos ativos: {criticalAlerts}
        </Text>
        <Text style={styles.infoText}>
          Última atualização: {formatTime(missionData.updatedAt)}
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
  hero: {
    backgroundColor: theme.colors.backgroundSoft,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  kicker: {
    color: theme.colors.cyan,
    fontSize: theme.fontSize.sm,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: theme.spacing.sm,
  },
  title: {
    color: theme.colors.text,
    fontSize: theme.fontSize.title,
    fontWeight: '900',
  },
  subtitle: {
    color: theme.colors.textMuted,
    marginTop: theme.spacing.sm,
    lineHeight: 21,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardHalf: {
    width: '48%',
  },
  infoCard: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  infoTitle: {
    color: theme.colors.text,
    fontSize: theme.fontSize.lg,
    fontWeight: '800',
    marginBottom: theme.spacing.sm,
  },
  infoText: {
    color: theme.colors.textMuted,
    marginBottom: 4,
  },
});