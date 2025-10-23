import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  FlatList,
} from 'react-native';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';

// Impor Komponen Kustom
import HeightRuler from '../components/ui/HeightRuler';
import WeightRuler from '../components/ui/WeightRuler';

const CalculatorScreen: React.FC = () => {
  const [age, setAge] = useState<string>('');
  const [height, setHeight] = useState<number>(170); 
  const [weight, setWeight] = useState<number>(75); 
  const [isRulerScrolling, setIsRulerScrolling] = useState(false);

  // --- STATE UNTUK DROPDOWN JENIS KELAMIN ---
  const [sexOpen, setSexOpen] = useState(false);
  const [sexValue, setSexValue] = useState<string | null>(null);
  const [sexItems, setSexItems] = useState([
    {
      label: 'Laki-laki',
      value: 'male',
      icon: () => <Ionicons name="male" size={18} color="#555" />,
    },
    {
      label: 'Perempuan',
      value: 'female',
      icon: () => <Ionicons name="female" size={18} color="#555" />,
    },
  ]);

  const handleCalculate = (): void => {
    console.log('Calculating...', { age, height, weight, sex: sexValue });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}>
        <FlatList
          style={styles.container}
          contentContainerStyle={styles.scrollContent}
          scrollEnabled={!isRulerScrolling} // <-- PERBAIKAN SCROLL
          data={[]} 
          keyExtractor={() => 'bmi-calculator'}
          renderItem={null}
          ListHeaderComponent={
            <>
              <Link href=".." asChild>
                <TouchableOpacity style={styles.backButton}>
                  <Ionicons name="arrow-back-outline" size={28} color="white" />
                </TouchableOpacity>
              </Link>

              {/* --- BAGIAN USIA & JENIS KELAMIN (GRID) --- */}
              <View style={[styles.section, styles.gridRow, { zIndex: 1000 }]}>
                
                {/* Kolom 1: Usia */}
                <View style={styles.gridCol}>
                  <Text style={styles.title}>Whats your age?</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Age"
                    placeholderTextColor="#666"
                    keyboardType="numeric"
                    value={age}
                    onChangeText={setAge}
                    maxLength={2}
                  />
                </View>

                {/* Kolom 2: Jenis Kelamin */}
                <View style={styles.gridCol}>
                  <Text style={styles.title}>Sex</Text>
                  <DropDownPicker
                    open={sexOpen}
                    value={sexValue}
                    items={sexItems}
                    setOpen={setSexOpen}
                    setValue={setSexValue}
                    setItems={setSexItems}
                    placeholder="Pilih"
                    style={styles.dropdown}
                    placeholderStyle={styles.dropdownPlaceholder}
                    dropDownContainerStyle={styles.dropdownContainer}
                    textStyle={styles.dropdownText}
                    ArrowDownIconComponent={() => <Ionicons name="chevron-down" size={20} color="#666" />}
                    ArrowUpIconComponent={() => <Ionicons name="chevron-up" size={20} color="#666" />}
                  />
                </View>
              </View>
              {/* --- AKHIR BAGIAN GRID --- */}

              {/* Input Tinggi (Menggunakan Ruler Vertikal Kustom) */}
              <View style={[styles.section, { zIndex: 500 }]}>
                <Text style={styles.title}>Whats your height?</Text>
                <View style={styles.heightRulerSection}>
                  <View style={styles.rulerDisplay}>
                    <Text style={styles.rulerValueText}>{height}</Text>
                    <Text style={styles.unitText}>cm</Text>
                  </View>
                  <HeightRuler
                    min={140}
                    max={220}
                    unit="cm"
                    initialValue={height}
                    onValueChange={setHeight}
                    onDragStart={() => setIsRulerScrolling(true)} // <-- PERBAIKAN SCROLL
                    onDragEnd={() => setIsRulerScrolling(false)}   // <-- PERBAIKAN SCROLL
                  />
                </View>
              </View>

              {/* Input Berat (Menggunakan Ruler Horizontal) */}
              <View style={[styles.section, { zIndex: 400 }]}>
                <Text style={styles.title}>Whats your weight?</Text>
                <View style={[styles.rulerDisplay, {justifyContent: 'center'}]}>
                  <Text style={styles.rulerValueText}>{weight}</Text>
                  <Text style={styles.unitText}>kg</Text>
                </View>
                <View style={{alignItems: 'center'}}>
                  <WeightRuler
                    min={40}
                    max={150}
                    unit="kg"
                    initialValue={weight}
                    onValueChange={setWeight}
                  />
                </View>
              </View>
            </>
          }
          ListFooterComponent={
            <View style={styles.footer}>
              <TouchableOpacity style={styles.button} onPress={handleCalculate}>
                <Text style={styles.buttonText}>Hitung!</Text>
              </TouchableOpacity>
            </View>
          }
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#101010',
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  section: {
    marginBottom: 30,
  },
  title: {
    color: 'white',
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 15,
  },
  input: {
    backgroundColor: 'transparent',
    borderColor: '#555',
    borderWidth: 1.5,
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    color: 'white',
    fontSize: 16,
    minHeight: 50, // Samakan tinggi dengan dropdown
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  gridCol: {
    width: '48%', 
  },
  dropdown: {
    backgroundColor: 'transparent',
    borderColor: '#555',
    borderWidth: 1.5,
    borderRadius: 12,
    paddingHorizontal: 15,
    minHeight: 50, // Samakan tinggi dengan input
  },
  dropdownPlaceholder: {
    color: '#666',
    fontSize: 16,
  },
  dropdownContainer: {
    backgroundColor: '#1E1E1E',
    borderColor: '#555',
    borderWidth: 1.5,
  },
  dropdownText: {
    color: 'white',
    fontSize: 16,
  },
  heightRulerSection: {
    alignItems: 'center', 
    marginTop: 10,
    width: '100%',
  },
  rulerDisplay: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 10,
  },
  rulerValueText: {
    color: 'white',
    fontSize: 42,
    fontWeight: 'bold',
  },
  unitText: {
    color: '#BFFF00',
    fontSize: 16,
    fontWeight: 'normal',
    marginLeft: 5,
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 10,
    marginTop: 20,
  },
  button: {
    backgroundColor: '#BFFF00',
    padding: 16,
    borderRadius: 99,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#101010',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CalculatorScreen;