import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { useAuth } from "@/hooks/useAuth";
import {
    Alert,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import InputField from '@/app/components/ui/InputField';
import PasswordField from '@/app/components/ui/PasswordField';
import PrimaryButton from '@/app/components/ui/PrimaryButton';
import ModalDialog from '@/app/components/ui/ModalDialog';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});
  const router = useRouter();
  const { register } = useAuth();
const [isModalVisible, setIsModalVisible] = useState(false);
const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async  () => {
    // Clear previous errors
    setErrors({});

    // Client-side validation
    const newErrors: { [key: string]: string } = {};
    if (!name.trim()) newErrors.name = 'Nama lengkap harus diisi.';
    if (!email.trim()) newErrors.email = 'Email harus diisi.';
    else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) newErrors.email = 'Format email tidak valid.';
    }
    if (!password) newErrors.password = 'Kata sandi harus diisi.';
    else if (password.length < 8) newErrors.password = 'Kata sandi minimal 8 karakter.';
    if (!confirmPassword) newErrors.confirmPassword = 'Konfirmasi kata sandi harus diisi.';
    else if (password !== confirmPassword) newErrors.confirmPassword = 'Kata sandi tidak cocok.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    const { ok, data, error } = await register({ name, email, password });
    setIsLoading(false);

    if (ok) {
      setIsModalVisible(true);
    } else {
      const message = (data && (data as any).message) || error || 'Terjadi kesalahan.';
      Alert.alert('Gagal', String(message));
    }
  
};
  const handleCloseModal = () => {
    setIsModalVisible(false);
    router.push('/login');
  }

  return (
    <LinearGradient
      colors={['#3d6007', '#000000']}
      locations={[0, 0.3]}
      style={styles.container}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <MaterialIcons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Text style={styles.brand}>FUNFIT</Text>
          <Text style={styles.title}>First Time?</Text>
          <Text style={styles.subtitle}>
            Latihan lebih mudah, terukur, dan konsisten semuanya dimulai dari sini.
          </Text>

          <InputField
            value={name}
            onChangeText={(t) => { setName(t); setErrors(prev => ({ ...prev, name: null })); }}
            placeholder="Nama Lengkap"
            iconName="person"
            error={errors.name}
          />

          <InputField
            value={email}
            onChangeText={(t) => { setEmail(t); setErrors(prev => ({ ...prev, email: null })); }}
            placeholder="Alamat Email"
            iconName="email"
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email}
          />

          <PasswordField
            value={password}
            onChangeText={(t) => { setPassword(t); setErrors(prev => ({ ...prev, password: null })); }}
            placeholder="Kata Sandi"
            error={errors.password}
          />

          <PasswordField
            value={confirmPassword}
            onChangeText={(t) => { setConfirmPassword(t); setErrors(prev => ({ ...prev, confirmPassword: null })); }}
            placeholder="Ulangi Kata Sandi"
            error={errors.confirmPassword}
          />

          <PrimaryButton title="Sign Up" onPress={handleRegister} loading={isLoading} />


          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>Atau</Text>
            <View style={styles.dividerLine} />
          </View>


          <View style={styles.footer}>
            <Text style={styles.footerText}>Sudah punya akun? </Text>
            <TouchableOpacity onPress={() => router.push('/login')}>
              <Text style={styles.linkText}>Masuk disini</Text>
            </TouchableOpacity>
          </View>
        </View>
        <ModalDialog
          visible={isModalVisible}
          title="Registrasi Berhasil"
          message="Selamat! Akun Anda telah berhasil dibuat. Silakan masuk untuk melanjutkan."
          buttonText="OK"
          onRequestClose={handleCloseModal}
          onConfirm={handleCloseModal}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    position: 'absolute',
    top: 50,
    left: 0,
    zIndex: 1,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  brand: {
    color: '#ADFF2F',
    fontSize: 40,
    fontWeight: 'light',
    textAlign: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#aaa',
    textAlign: 'center',
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#536b00ff',
    paddingHorizontal: 16,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    color: '#fff',
    fontSize: 16,
  },
  eyeIcon: {
    marginLeft: 10,
  },
  button: {
    backgroundColor: '#ADFF2F',
    height: 50,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#333',
  },
  dividerText: {
    color: '#888',
    marginHorizontal: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    color: '#aaa',
    fontSize: 14,
  },
  linkText: {
    color: '#ADFF2F',
    fontWeight: 'bold',
    fontSize: 14,
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#1E1E1E',
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  modalMessage: {
    fontSize: 16,
    color: '#aaa',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  modalButton: {
    backgroundColor: '#ADFF2F',
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%', // Tombol memenuhi lebar modal
  },
});