import { Poppins_400Regular, useFonts } from "@expo-google-fonts/poppins";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { StyleSheet, Text } from "react-native";

export default function LandingPage() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
  });
const router = useRouter();
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/Onboarding");
    }, 2000);
    return () => clearTimeout(timer); 
  }, []);
  if (!fontsLoaded) {
    return null; 
  }
  
  return (
    <LinearGradient
  colors={[
    'rgba(172, 255, 47, 0.76)', 
    '#000000',                 
    '#000000',                
    'rgba(172, 255, 47, 0.76)'  
  ]}
  locations={[0, 0.2, 0.8, 1]}
  style={styles.container}
>
      <Text style={styles.title}>FUNFIT</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontFamily: "Poppins_400Regular",
    fontSize: 32,
    color: "#ADFF2F", 
    letterSpacing: 2,
  },
});
