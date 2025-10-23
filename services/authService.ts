import { apiFetch } from "@/utils/api";
import AsyncStorage from '@react-native-async-storage/async-storage';

interface RegisterData {
  name?: string;
  email: string;
  password?: string;
}

interface LoginCredentials {
  email: string;
  password?: string;
}

export const authService = {
  register: (data: RegisterData) => apiFetch("/register", {
    method: "POST",
    body: JSON.stringify(data),
  }),

  // 3. Terapkan juga di sini
  login: (data: LoginCredentials) => apiFetch("/login", {
    method: "POST",
    body: JSON.stringify(data),
  }),
  logout: async () => {
  const token = await AsyncStorage.getItem('token');
  return apiFetch("/logout", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });
}
};