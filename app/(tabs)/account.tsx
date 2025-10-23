import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  GestureResponderEvent, // Tipe untuk event 'onPress'
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PrimaryButton from '../components/ui/PrimaryButton';
import { useAuth } from "@/hooks/useAuth";
import { useState } from 'react';
// Impor library ikon
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';

/**
 * Mendefinisikan tipe data untuk props SettingsItem
 */
interface SettingsItemProps {
  iconName: React.ComponentProps<typeof Feather>['name']; // Menggunakan tipe nama ikon yang spesifik dari Feather
  text: string;
  onPress?: (event: GestureResponderEvent) => void; // Fungsi opsional
}

/**
 * Komponen Reusable untuk setiap baris pengaturan
 * Ditulis sebagai React.FC (Functional Component) dengan props yang sudah dit-type
 */
const SettingsItem: React.FC<SettingsItemProps> = ({
  iconName,
  text,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={styles.settingsItem}
      onPress={onPress || (() => {})}>
      <Feather name={iconName} style={styles.settingsItemIcon} />
      <Text style={styles.settingsItemText}>{text}</Text>
      <Feather
        name="chevron-right"
        style={styles.settingsItemArrow}
      />
    </TouchableOpacity>
  );
};

const AccountScreen: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {logout} = useAuth();
  const router = useRouter();
  const handleLogout = async () => {
    setIsLoading(true);
    const {ok} = await logout();
    setIsLoading(false);
    if (ok) {
      router.replace('/login');
    } else {
      console.log('Logout failed');
    }
    console.log('Logout pressed');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.headerContainer}>

          <View style={styles.profilePic} />

          <View style={styles.headerTextContainer}>
            <Text style={styles.welcomeText}>Welcome My GymBro's</Text>
            <Text style={styles.userNameText}>Adi Ivani Yusuf</Text>
          </View>
          
          {/* Ikon Notifikasi */}
          <Feather name="bell" size={28} color="white" />
        </View>

        {/* --- Bagian Account Setting --- */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Account Setting</Text>
          <View style={styles.settingsCard}>
            <SettingsItem
              iconName="user"
              text="Account Information"
            />
            <View style={styles.divider} />
            <SettingsItem iconName="key" text="Change Password" />
            <View style={styles.divider} />
            <SettingsItem
              iconName="unlock"
              text="Privacy Setting"
            />
          </View>
        </View>

        {/* --- Bagian Appearance Setting --- */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Apperance Setting</Text>
          <View style={styles.settingsCard}>
            <SettingsItem iconName="globe" text="Change Language" />
            <View style={styles.divider} />
            <SettingsItem iconName="sun" text="Mode Negro" />
            <View style={styles.divider} />
            <SettingsItem iconName="help-circle" text="FAQ" />
            <View style={styles.divider} />
            <SettingsItem
              iconName="info"
              text="About FunFit"
            />
          </View>
        </View>


          <PrimaryButton title="Logout" onPress={handleLogout} loading={isLoading} />


      </ScrollView>
    </SafeAreaView>
  );
};

export default AccountScreen;

// Styles tetap sama (tidak perlu diubah untuk TSX)
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#101010',
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 120, 
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  profilePic: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#333',
  },
  headerTextContainer: {
    flex: 1,
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
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: '#AAA',
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 10,
    textTransform: 'capitalize',
  },
  settingsCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: 15,
    paddingHorizontal: 15,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
  },
  settingsItemIcon: {
    color: 'white',
    fontSize: 24,
    marginRight: 15,
  },
  settingsItemText: {
    color: 'white',
    fontSize: 16,
    flex: 1,
  },
  settingsItemArrow: {
    color: '#555',
    fontSize: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#333',
  },
  title: {
    color: 'white',
    fontSize: 20,
  },
});