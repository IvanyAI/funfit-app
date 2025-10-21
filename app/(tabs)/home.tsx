import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

// Komponen kecil untuk setiap item di Tab Bar
type TabItemProps = {
  iconName: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  label: string;
  isFocused?: boolean;
};

const TabItem: React.FC<TabItemProps> = ({ iconName, label, isFocused = false }) => (
  <TouchableOpacity style={styles.tabItem}>
    <MaterialCommunityIcons
      name={iconName}
      size={24}
      color={isFocused ? '#B3FF00' : 'grey'}
    />
    <Text style={[styles.tabLabel, { color: isFocused ? '#B3FF00' : 'grey' }]}>
      {label}
    </Text>
  </TouchableOpacity>
);

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  // Calculate top padding: prefer safe-area inset on iOS, and StatusBar height on Android
  const topPadding = Platform.OS === 'android' ? (StatusBar.currentHeight ?? 0) : insets.top;

  return (
    <SafeAreaView style={[styles.container, { paddingTop: topPadding }]}> 
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }} // Memberi ruang agar tidak tertutup tab bar
      >
        {/* --- Header --- */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.profilePic} />
            <View>
              <Text style={styles.welcomeText}>Welcome My GymBro's</Text>
              <Text style={styles.userName}>Adi Ivani Yusuf</Text>
            </View>
          </View>
          <TouchableOpacity>
            <Feather name="bell" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* --- Main Card --- */}
        <View style={[styles.card, styles.mainCard]} />

        {/* --- Health Progress Section --- */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Health Progress</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.healthCardsContainer}>
          <View style={[styles.card, styles.healthCard]} />
          <View style={[styles.card, styles.healthCard]} />
        </View>

        {/* --- Workout Progress Section --- */}
        <Text style={styles.sectionTitle}>Workout Progress</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.pillsContainer}>
          {['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'].map((day) => (
            <TouchableOpacity key={day} style={styles.pill}>
              <Text style={styles.pillText}>{day}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View style={[styles.card, styles.workoutCard]} />
      </ScrollView>

      {/* --- Custom Tab Bar --- */}
      <View style={styles.tabBarContainer}>
        <View style={styles.tabBar}>
          <TabItem iconName="home-variant" label="Home" isFocused={true} />
          <TabItem iconName="chart-line" label="Status" isFocused={false} />
          {/* Placeholder untuk tombol tengah */}
          <View style={{ width: 50 }} />
          <TabItem iconName="clipboard-text-outline" label="Program" isFocused={false} />
          <TabItem iconName="account-circle-outline" label="Akun" isFocused={false} />
        </View>
        <TouchableOpacity style={styles.centerButton}>
          {/* Ikon bisa ditambahkan di sini jika perlu */}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101010', // Warna background utama
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#333',
    marginRight: 15,
  },
  welcomeText: {
    color: '#888',
    fontSize: 14,
  },
  userName: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#1E1E1E',
    borderRadius: 20,
  },
  mainCard: {
    height: 180,
    marginHorizontal: 20,
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginBottom: 15,
  },
  seeAllText: {
    color: '#B3FF00', // Warna hijau neon
    fontSize: 14,
  },
  healthCardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginBottom: 30,
  },
  healthCard: {
    width: '48%',
    height: 150,
  },
  pillsContainer: {
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  pill: {
    backgroundColor: '#2C2C2E',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginRight: 10,
  },
  pillText: {
    color: 'white',
  },
  workoutCard: {
    height: 200,
    marginHorizontal: 20,
  },
  // Tab Bar Styles
  tabBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    width: '100%',
    height: 70,
    paddingBottom: 10, // Ruang untuk label di bawah ikon
    borderTopWidth: 1,
    borderTopColor: '#2C2C2E',
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 10,
    marginTop: 4,
  },
  centerButton: {
    position: 'absolute',
    top: -25, // Setengah dari tinggi tombol untuk menonjol ke atas
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#1E1E1E',
    borderWidth: 5,
    borderColor: '#101010', // Warna yang sama dengan background utama
    justifyContent: 'center',
    alignItems: 'center',
  },
});