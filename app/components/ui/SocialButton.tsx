import React from 'react';
import { TouchableOpacity, Image, Text, StyleSheet, ActivityIndicator, View } from 'react-native';

type Props = {
  provider: 'google' | 'apple' | string;
  onPress?: () => void;
  loading?: boolean;
  style?: any;
};

export default function SocialButton({ provider, onPress, loading, style }: Props) {
  const icons: Record<string, any> = {
    google: require('../../../assets/images/logo_google_g_icon.png'),
  };

  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress} disabled={!!loading} activeOpacity={0.8}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Image source={icons[provider]} style={styles.iconOnly} />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    borderRadius: 12,
    backgroundColor: '#1E1E1E',
    borderWidth: 1,
    borderColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  row: { flexDirection: 'row', alignItems: 'center' },
  icon: { width: 24, height: 24, marginRight: 12 },
  iconOnly: { width: 36, height: 36 },
  text: { color: '#fff' },
});
