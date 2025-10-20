import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import InputField from './InputField';
import { Feather } from '@expo/vector-icons';

type Props = {
  value: string;
  onChangeText: (t: string) => void;
  placeholder?: string;
  error?: string | null;
};

export default function PasswordField({ value, onChangeText, placeholder, error }: Props) {
  const [visible, setVisible] = useState(false);

  const rightNode = (
    <TouchableOpacity onPress={() => setVisible(v => !v)}>
      <Feather name={visible ? 'eye-off' : 'eye'} size={20} color="#888" style={{ marginLeft: 10 }} />
    </TouchableOpacity>
  );

  return (
    <InputField
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      secureTextEntry={!visible}
      iconName="lock"
      error={error}
      rightNode={rightNode}
    />
  );
}
