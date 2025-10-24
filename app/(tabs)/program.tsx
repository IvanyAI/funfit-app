import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// Impor library ikon
import { Feather, Ionicons } from '@expo/vector-icons';
// Impor komponen card yang baru dibuat
import CalculatorCard from '../components/ui/CalculatorCard';
import { useRouter } from 'expo-router';
import { useHome } from '@/hooks/useHome';

const ProgramScreen: React.FC = () => {
  const router = useRouter();
  const { data } = useHome();

  // Handler untuk navigasi (bisa diganti dengan React Navigation)
  const handleCardPress = (path: string): void => {
    router.push(path as any);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}>
        
        {/* --- Header --- */}
        <View style={styles.headerContainer}>
          {/* Placeholder Foto Profil */}
          <View style={styles.profilePic} />
          
          {/* Teks Welcome */}
          <View style={styles.headerTextContainer}>
            <Text style={styles.welcomeText}>Welcome My GymBro's</Text>
            <Text style={styles.userNameText}>{data?.user.name ?? '...'}</Text>
          </View>
          
          {/* Ikon Notifikasi */}
          <Feather name="bell" size={28} color="white" />
        </View>

        {/* --- Grid Kalkulator --- */}
        <View style={styles.gridContainer}>
          <CalculatorCard
            iconName="trending-up" // Menggunakan ikon Feather yang ada
            title="Ideal Weight"
            onPress={() => handleCardPress('/ideal-weight')}
          />
          <CalculatorCard
            iconName="activity" // Menggunakan ikon Feather yang ada
            title="BMI"
            onPress={() => handleCardPress('/bmi/input')}
          />
          <CalculatorCard
            iconName="percent" // Menggunakan ikon Feather yang ada
            title="Body Fat"
            onPress={() => handleCardPress('/body-fat')}
          />
          <CalculatorCard
            iconName="zap" // Menggunakan ikon Feather yang ada
            title="Calories For"
            onPress={() => handleCardPress('/calories')}
          />

          {/* Card Kosong */}
          <CalculatorCard />
          <CalculatorCard />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProgramScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#101010', // Background hitam
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  
  // --- Style Header ---
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30, // Jarak dari header ke grid
  },
  profilePic: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#333', // Warna placeholder untuk lingkaran profil
  },
  headerTextContainer: {
    flex: 1, // Agar mengambil ruang sisa
    marginLeft: 15,
  },
  welcomeText: {
    color: '#AAA',
    fontSize: 14,
  },
  userNameText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },

  // --- Style Grid ---
  gridContainer: {
    flexDirection: 'row', // Susun card secara horizontal
    flexWrap: 'wrap', // Biarkan card pindah ke baris baru
    justifyContent: 'space-between', // Beri spasi antar card
  },
});