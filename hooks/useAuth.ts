import { authService } from "@/services/authService";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define your types for better code
interface RegisterData {
  name?: string;
  email: string;
  password?: string;
}

interface LoginCredentials {
  email: string;
  password?: string;
}

export function useAuth() {
  // Handler register
  const register = async (userData: RegisterData) => {
    try {
      const { ok, data } = await authService.register(userData);
      console.log("Register Response from Server:", { ok, data }); 

      // If register returns an access_token, save it (auto-login after register)
      if (ok && data && (data as any).access_token) {
        await AsyncStorage.setItem('token', (data as any).access_token);
      }

      if (ok && !data) {
        return { ok: false, data: { message: "Server returned a successful response but no user data. Please check backend logic." } };
      }
      return { ok, data };
    } catch (error) {
      console.error("Register Error:", error);
      return { ok: false, error };
    }
  };

  // Handler login
  const login = async (credentials: LoginCredentials) => {
    try {
      const { ok, data } = await authService.login(credentials);
      if (ok && data && (data as any).access_token) {
        await AsyncStorage.setItem('token', (data as any).access_token);
      }

      console.log("Login Response from Server:", { ok, data }); 
      return { ok, data };
    } catch (error) {
      console.error("Login Error:", error);
      return { ok: false, error };
    }
  };

  const logout = async () => {
    try {
      const response = await authService.logout();
      console.log("Logout Response from Server:", { response });
      await AsyncStorage.removeItem('token');
       return { ok: response?.ok ?? response?.data?.success ?? false };
    } catch (error) {
      console.error("Logout Error:", error);
      return { ok: false, error };
    }
  };


  return { register, login, logout };
}