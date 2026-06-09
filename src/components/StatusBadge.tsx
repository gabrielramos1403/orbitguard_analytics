import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../constants/theme';
import { RiskLevel } from '../types/mission';




interface StatusBadgeProps {
  label: string;
  level: RiskLevel;
  message?: string;
}



function getStatusColor(level: RiskLevel) {
  if (level === 'critico') {
    return theme.colors.danger;
  }

  if (level === 'medio') {
    return theme.colors.warning;
  }

  return theme.colors.success;
}

export function StatusBadge({ label, level, message }: StatusBadgeProps) {
  const color = getStatusColor(level);

  return (
    <View style={[styles.container, { borderColor: color }]}>
      <View style={styles.row}>
        <View style={[styles.dot, { backgroundColor: color }]} />
        <Text style={[styles.label, { color }]}>{label}</Text>
      </View>

      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
}







const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.md,
    borderWidth: 1,
    marginBottom: theme.spacing.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  label: {
    fontSize: theme.fontSize.lg,
    fontWeight: '800',
  },
  message: {
    color: theme.colors.textMuted,
    marginTop: theme.spacing.sm,
    lineHeight: 20,
  },
});