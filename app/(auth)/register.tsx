import { Feather, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { useAuth } from "@/hooks/useAuth";
import {
    Alert,
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const router = useRouter();
  const { register } = useAuth();
const [isModalVisible, setIsModalVisible] = useState(false);

  const handleRegister = async  () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Semua kolom harus diisi.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Kata sandi tidak cocok.');
      return;
    }

    const { ok, data } = await register({ name, email, password });

    if (ok) {
      setIsModalVisible(true);
    } else {
      Alert.alert("Gagal", data?.message || "Terjadi kesalahan.");
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

          <View style={styles.inputContainer}>
            <MaterialIcons name="person" size={20} color="#888" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Nama Lengkap"
              placeholderTextColor="#888"
              value={name}
              onChangeText={setName}
            />
          </View>


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


          <View style={styles.inputContainer}>
            <MaterialIcons name="lock" size={20} color="#888" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Ulangi Kata Sandi"
              placeholderTextColor="#888"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!isConfirmPasswordVisible}
            />
            <TouchableOpacity onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}>
              <Feather
                name={isConfirmPasswordVisible ? 'eye-off' : 'eye'}
                size={20}
                color="#888"
                style={styles.eyeIcon}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>


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
        <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Registrasi Berhasil</Text>
            <Text style={styles.modalMessage}>
              Selamat! Akun Anda telah berhasil dibuat. Silakan masuk untuk melanjutkan.
            </Text>
            <TouchableOpacity style={styles.modalButton} onPress={handleCloseModal}>
              <Text style={styles.buttonText}>OK</Text>
            </TouchableOpacity>
          </View>
          </View>
      </Modal>
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