import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { theme } from '../constants/theme';




interface SectionTitleProps {
  title: string;
  subtitle?: string;
  icon?: keyof typeof Ionicons.glyphMap;
}




export function SectionTitle({ title, subtitle, icon }: SectionTitleProps) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {icon ? (
          <Ionicons name={icon} size={22} color={theme.colors.primary} />
        ) : null}

        <Text style={styles.title}>{title}</Text>
      </View>

      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  title: {
    color: theme.colors.text,
    fontSize: theme.fontSize.xl,
    fontWeight: '800',
  },
  subtitle: {
    color: theme.colors.textMuted,
    marginTop: theme.spacing.xs,
    lineHeight: 20,
  },
});