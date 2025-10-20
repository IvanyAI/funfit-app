import { Feather, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { useAuth } from "@/hooks/useAuth";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PrimaryButton from '@/app/components/ui/PrimaryButton';
import ModalDialog from '@/app/components/ui/ModalDialog';
import SocialButton from '@/app/components/ui/SocialButton';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const router = useRouter();
  const {login} = useAuth();
const [isModalVisible, setIsModalVisible] = useState(false);
const [modalTitle, setModalTitle] = useState('');
const [modalMessage, setModalMessage] = useState('');
const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if(!email || !password) {
      alert('Please fill in all fields.');
      return;
    }
    setIsLoading(true);
    const { ok, data, error } = await login({ email, password });
    setIsLoading(false);
    if (ok) {
      router.push('/home');
    } else {
      setModalTitle('Login Gagal');
      setModalMessage('Alamat email atau password tidak ditemukan');
      setIsModalVisible(true);
    }
  };
  const handleCloseModal = () => {
    setIsModalVisible(false);
  }


  return (
    <LinearGradient
      colors={['#3d6007', '#000000']} 
      locations={[0, 0.3]} 
      style={styles.container}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.replace('/onboarding')} style={styles.backButton}>
            <MaterialIcons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Text style={styles.brand}>FUNFIT</Text>
          <Text style={styles.title}>Welcome Back!</Text>
          <Text style={styles.subtitle}>
            Senang melihatmu kembali. Waktunya jaga keseimbangan lagi.
          </Text>

          {/* --- Input Email dengan Ikon --- */}
          <View style={styles.inputContainer}>
            <MaterialIcons name="email" size={20} color="#888" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Alamat Email"
              placeholderTextColor="#888"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* --- Input Password dengan Ikon --- */}
          <View style={styles.inputContainer}>
            <MaterialIcons name="lock" size={20} color="#888" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Kata Sandi"
              placeholderTextColor="#888"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!isPasswordVisible}
            />
            <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
              <Feather
                name={isPasswordVisible ? 'eye-off' : 'eye'}
                size={20}
                color="#888"
                style={styles.eyeIcon}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Lupa Password?</Text>
          </TouchableOpacity>

          <PrimaryButton title="Sign In" onPress={handleLogin} loading={isLoading} />

          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>Atau</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* --- Tombol Google --- */}
          <SocialButton provider="google" onPress={() => { /* TODO: implement Google Sign-in */ }} style={styles.googleButton} />

          {/* --- Footer Daftar --- */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Tidak punya akun? </Text>
            <TouchableOpacity onPress={() => router.push('/register')}>
              <Text style={styles.linkText}>Daftar disini</Text>
            </TouchableOpacity>
          </View>
          
        </View>
        <ModalDialog
          visible={isModalVisible}
          title={modalTitle}
          message={modalMessage}
          buttonText="OK"
          onRequestClose={handleCloseModal}
          onConfirm={handleCloseModal}
          showCancel={false}
          variant="error"
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
    paddingTop: 20,
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
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
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
    color: '#ffffffff',
    fontSize: 16,
  },
  eyeIcon: {
    marginLeft: 10,
  },
  forgotPassword: {
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#ffffff93',
    fontSize: 14,
  },
  button: {
    backgroundColor: '#ADFF2F',
    height: 50,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
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
  googleButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#1E1E1E',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  googleIcon: {
    width: 64,
    height: 64,
  },
  footer: {
    marginTop: 30,
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