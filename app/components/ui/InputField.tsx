import React from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

type Props = {
  value: string;
  onChangeText: (t: string) => void;
  placeholder?: string;
  keyboardType?: any;
  autoCapitalize?: any;
  iconName?: string;
  error?: string | null;
  secureTextEntry?: boolean;
  rightNode?: React.ReactNode;
};

export default function InputField({ value, onChangeText, placeholder, keyboardType, autoCapitalize, iconName, error, secureTextEntry, rightNode }: Props) {
  return (
    <View style={styles.container}>
      {iconName ? (
        <MaterialIcons name={iconName as any} size={20} color="#888" style={styles.icon} />
      ) : null}
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#888"
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        secureTextEntry={secureTextEntry}
      />
      {rightNode}
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#536b00ff',
    paddingHorizontal: 16,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    color: '#fff',
    fontSize: 16,
  },
  error: {
    position: 'absolute',
    bottom: -18,
    left: 16,
    color: '#ff6b6b',
    fontSize: 12,
  },
});
