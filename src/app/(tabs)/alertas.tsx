import {
    Alert as NativeAlert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { AlertCard } from '../../components/AlertCard';
import { SectionTitle } from '../../components/SectionTitle';
import { theme } from '../../constants/theme';
import { useMission } from '../../context/MissionContext';



export default function AlertasScreen() {
  const { alerts, clearAlerts } = useMission();

  function handleClearAlerts() {
    NativeAlert.alert(
      'Limpar histórico?',
      'Essa ação removerá todos os alertas salvos no dispositivo.',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Limpar',
          style: 'destructive',
          onPress: clearAlerts,
        },
      ]
    );
  }





  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <SectionTitle
        title="Alertas"
        subtitle="Histórico de alertas gerados automaticamente pelos limiares críticos."
        icon="warning-outline"
      />

      <View style={styles.headerCard}>
        <Text style={styles.headerNumber}>{alerts.length}</Text>
        <Text style={styles.headerText}>alertas registrados</Text>
      </View>

      {alerts.length > 0 ? (
        <TouchableOpacity style={styles.clearButton} onPress={handleClearAlerts}>
          <Text style={styles.clearButtonText}>Limpar histórico</Text>
        </TouchableOpacity>
      ) : null}

      {alerts.length === 0 ? (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyTitle}>Nenhum alerta no momento</Text>
          <Text style={styles.emptyText}>
            Continue monitorando a missão. Novos alertas aparecerão aqui quando algum
            indicador ultrapassar os limites configurados.
          </Text>
        </View>
      ) : (
        alerts.map((alert) => <AlertCard key={alert.id} alert={alert} />)
      )}
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
  headerCard: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: theme.spacing.md,
    alignItems: 'center',
  },
  headerNumber: {
    color: theme.colors.cyan,
    fontSize: 36,
    fontWeight: '900',
  },
  headerText: {
    color: theme.colors.textMuted,
  },
  clearButton: {
    backgroundColor: theme.colors.danger,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  clearButtonText: {
    color: theme.colors.text,
    fontWeight: '800',
  },
  emptyCard: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  emptyTitle: {
    color: theme.colors.text,
    fontSize: theme.fontSize.lg,
    fontWeight: '800',
    marginBottom: theme.spacing.sm,
  },
  emptyText: {
    color: theme.colors.textMuted,
    lineHeight: 21,
  },
});