import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  GestureResponderEvent,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

// Mendefinisikan tipe props untuk card
interface CalculatorCardProps {
  title?: string; // Dibuat opsional untuk card kosong
  iconName?: string; // Dibuat opsional
  onPress?: (event: GestureResponderEvent) => void;
}

const CalculatorCard: React.FC<CalculatorCardProps> = ({
  title,
  iconName,
  onPress,
}) => {
  // Jika tidak ada judul atau ikon, anggap sebagai card kosong
  const isEmpty = !title && !iconName;

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      disabled={isEmpty} // Nonaktifkan press jika card kosong
    >
      {/* Hanya tampilkan ikon dan teks jika ada */}
      {!isEmpty && (
        <>
          <Feather
            name={iconName || 'help-outline'} // Fallback icon
            style={styles.cardIcon}
          />
          <Text style={styles.cardText}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '48%', // 2 kolom, menyisakan 4% untuk spasi
    height: 160,
    backgroundColor: '#D9D9D9', // Warna abu-abu terang dari desain
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16, // Jarak antar baris
    padding: 10,
  },
  cardIcon: {
    fontSize: 60, // Ukuran ikon besar
    color: '#101010', // Ikon warna hitam
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#101010', // Teks warna hitam
    textAlign: 'center',
  },
});

export default CalculatorCard;