import { Ionicons } from '@expo/vector-icons';

import { StyleSheet, Text, View } from 'react-native';

import { theme } from '../constants/theme';




import { MissionAlert } from '../types/mission';
import { formatTime } from '../utils/formatters';




interface AlertCardProps {
  alert: MissionAlert;
}






function getAlertColor(level: MissionAlert['level']) {
  if (level === 'critico') {
    return theme.colors.danger;
  }

  if (level === 'medio') {
    return theme.colors.warning;
  }

  return theme.colors.cyan;
}


function getLevelLabel(level: MissionAlert['level']) {
  if (level === 'critico') {
    return 'Crítico';
  }

  if (level === 'medio') {
    return 'Médio';
  }

  return 'Baixo';
}





export function AlertCard({ alert }: AlertCardProps) {
  const color = getAlertColor(alert.level);

  return (
    <View style={[styles.card, { borderLeftColor: color }]}>
      <View style={styles.header}>
        <View style={styles.titleArea}>
          <Ionicons name="warning-outline" size={20} color={color} />
          <Text style={styles.title}>{alert.title}</Text>
        </View>

        <Text style={[styles.level, { color }]}>
          {getLevelLabel(alert.level)}
        </Text>
      </View>

      <Text style={styles.description}>{alert.description}</Text>

      <Text style={styles.time}>Horário: {formatTime(alert.time)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderLeftWidth: 5,
    marginBottom: theme.spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: theme.spacing.sm,
  },
  titleArea: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    flex: 1,
  },
  title: {
    color: theme.colors.text,
    fontWeight: '700',
    fontSize: theme.fontSize.md,
  },
  level: {
    fontSize: theme.fontSize.sm,
    fontWeight: '700',
  },
  description: {
    color: theme.colors.textMuted,
    marginTop: theme.spacing.sm,
    lineHeight: 20,
  },
  time: {
    color: theme.colors.textMuted,
    fontSize: theme.fontSize.sm,
    marginTop: theme.spacing.sm,
  },
});