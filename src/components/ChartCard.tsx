import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { theme } from '../constants/theme';








interface ChartCardProps {
  title: string;
  data: number[];
  labels?: string[];
  suffix?: string;
}



export function ChartCard({
  title,
  data,
  labels,
  suffix = '',
}: ChartCardProps) {
  const { width } = useWindowDimensions();

  const safeData = data.length > 0 ? data : [0];
  const chartWidth = Math.max(width - 64, 280);




  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>

      <LineChart
        data={{
          labels: labels ?? safeData.map((_, index) => `${index + 1}`),
          datasets: [
            {
              data: safeData,
            },
          ],
        }}
        width={chartWidth}
        height={190}
        yAxisSuffix={suffix}
        chartConfig={{
          backgroundGradientFrom: theme.colors.card,
          backgroundGradientTo: theme.colors.card,
          decimalPlaces: 0,
          color: () => theme.colors.cyan,
          labelColor: () => theme.colors.textMuted,
          propsForDots: {
            r: '4',
            strokeWidth: '2',
            stroke: theme.colors.primary,
          },
        }}
        bezier
        style={styles.chart}
      />
    </View>
  );
}







const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.lg,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: theme.spacing.md,
    overflow: 'hidden',
  },
  title: {
    color: theme.colors.text,
    fontWeight: '700',
    fontSize: theme.fontSize.lg,
    marginLeft: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
  chart: {
    borderRadius: theme.radius.md,
  },
});