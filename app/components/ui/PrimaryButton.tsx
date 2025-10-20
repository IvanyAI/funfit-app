import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native';

type Props = {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  style?: any;
  textColor?: string;
};

export default function PrimaryButton({ title, onPress, loading, disabled, style, textColor }: Props) {
  return (
    <TouchableOpacity
      style={[styles.button, style, (disabled || loading) ? styles.disabled : null]}
      onPress={() => { if (!disabled && !loading) onPress(); }}
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityState={{ disabled: !!disabled || !!loading }}
    >
      {loading ? <ActivityIndicator color="#000" /> : <Text style={[styles.text, textColor ? { color: textColor } : null]}>{title}</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#ADFF2F',
    height: 50,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 16,
  },
  text: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  disabled: {
    opacity: 0.6,
  },
});
