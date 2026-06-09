import { useEffect, useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SectionTitle } from '../../components/SectionTitle';
import { theme } from '../../constants/theme';
import { useMission } from '../../context/MissionContext';
import { MissionThresholds } from '../../types/mission';




type Errors = Partial<Record<keyof MissionThresholds, string>>;

function parseNumber(value: string): number {
  return Number(value.replace(',', '.'));
}

function validateField(
  value: string,
  label: string,
  min: number,
  max: number
): string | null {
  if (!value.trim()) {
    return `${label} é obrigatório.`;
  }

  const numberValue = parseNumber(value);

  if (Number.isNaN(numberValue)) {
    return `${label} precisa ser um número válido.`;
  }

  if (numberValue < min || numberValue > max) {
    return `${label} deve estar entre ${min} e ${max}.`;
  }

  return null;
}

interface FieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  suffix: string;
}

function ConfigField({
  label,
  value,
  onChangeText,
  error,
  suffix,
}: FieldProps) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          keyboardType="numeric"
          placeholder="Digite um valor"
          placeholderTextColor={theme.colors.textMuted}
        />
        <Text style={styles.suffix}>{suffix}</Text>
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}






export default function ConfiguracoesScreen() {
  const { thresholds, saveThresholds } = useMission();

  const [maxTemperature, setMaxTemperature] = useState('');
  const [minBattery, setMinBattery] = useState('');
  const [minSignal, setMinSignal] = useState('');
  const [maxLatency, setMaxLatency] = useState('');

  const [errors, setErrors] = useState<Errors>({});

  useEffect(() => {
    setMaxTemperature(String(thresholds.maxTemperature));
    setMinBattery(String(thresholds.minBattery));
    setMinSignal(String(thresholds.minSignal));
    setMaxLatency(String(thresholds.maxLatency));
  }, [thresholds]);

  async function handleSave() {
    const newErrors: Errors = {
      maxTemperature:
        validateField(maxTemperature, 'Temperatura máxima', 10, 120) ?? undefined,
      minBattery:
        validateField(minBattery, 'Bateria mínima', 5, 80) ?? undefined,
      minSignal:
        validateField(minSignal, 'Sinal mínimo', 10, 95) ?? undefined,
      maxLatency:
        validateField(maxLatency, 'Latência máxima', 100, 2000) ?? undefined,
    };

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some(Boolean);

    if (hasError) {
      return;
    }

    await saveThresholds({
      maxTemperature: parseNumber(maxTemperature),
      minBattery: parseNumber(minBattery),
      minSignal: parseNumber(minSignal),
      maxLatency: parseNumber(maxLatency),
    });

    Alert.alert(
      'Configurações salvas',
      'Os novos limiares críticos foram salvos no dispositivo.'
    );
  }





  return (
    <KeyboardAvoidingView
      style={styles.keyboard}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
        <SectionTitle
          title="Configurações"
          subtitle="Defina os limiares usados pelo sistema de alertas e pela análise de risco."
          icon="settings-outline"
        />

        <View style={styles.formCard}>
          <ConfigField
            label="Temperatura máxima"
            value={maxTemperature}
            onChangeText={setMaxTemperature}
            error={errors.maxTemperature}
            suffix="°C"
          />

          <ConfigField
            label="Bateria mínima"
            value={minBattery}
            onChangeText={setMinBattery}
            error={errors.minBattery}
            suffix="%"
          />

          <ConfigField
            label="Sinal mínimo"
            value={minSignal}
            onChangeText={setMinSignal}
            error={errors.minSignal}
            suffix="%"
          />

          <ConfigField
            label="Latência máxima"
            value={maxLatency}
            onChangeText={setMaxLatency}
            error={errors.maxLatency}
            suffix="ms"
          />

          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>Salvar configurações</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.helpCard}>
          <Text style={styles.helpTitle}>Faixas aceitas</Text>
          <Text style={styles.helpText}>Temperatura: 10 a 120 °C</Text>
          <Text style={styles.helpText}>Bateria: 5% a 80%</Text>
          <Text style={styles.helpText}>Sinal: 10% a 95%</Text>
          <Text style={styles.helpText}>Latência: 100 ms a 2000 ms</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}





const styles = StyleSheet.create({
  keyboard: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  screen: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: theme.spacing.md,
    paddingBottom: 100,
  },
  formCard: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: theme.spacing.md,
  },
  field: {
    marginBottom: theme.spacing.md,
  },
  label: {
    color: theme.colors.text,
    fontWeight: '700',
    marginBottom: theme.spacing.sm,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.input,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  input: {
    color: theme.colors.text,
    flex: 1,
    padding: theme.spacing.md,
    fontSize: theme.fontSize.md,
  },
  suffix: {
    color: theme.colors.textMuted,
    paddingRight: theme.spacing.md,
    fontWeight: '700',
  },
  error: {
    color: theme.colors.danger,
    marginTop: theme.spacing.xs,
    fontSize: theme.fontSize.sm,
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    alignItems: 'center',
    marginTop: theme.spacing.sm,
  },
  buttonText: {
    color: theme.colors.text,
    fontWeight: '800',
    fontSize: theme.fontSize.md,
  },
  helpCard: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  helpTitle: {
    color: theme.colors.text,
    fontWeight: '800',
    marginBottom: theme.spacing.sm,
  },
  helpText: {
    color: theme.colors.textMuted,
    marginBottom: 4,
  },
});