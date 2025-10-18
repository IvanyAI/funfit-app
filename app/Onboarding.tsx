import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ViewToken,
} from 'react-native';

// Lebar layar untuk ukuran slide
const { width } = Dimensions.get('window');

// Tipe slide
interface Slide {
  id: string;
  title: string;
  description: string;
}

const slides: Slide[] = [
  {
    id: '1',
    
    title: 'Your Fitnes Journey Start Here',
    description: 'Bangun kebiasaan sehat, satu langkah setiap hari. Pantau progresmu, atur target, dan rasakan perubahan nyata dalam tubuh dan pikiranmu. Karena setiap langkah kecil membawa hasil besar.z',
  },
  {
    id: '2',
    title: 'Move Freely Live Fully',
    description: 'Nikmati keseimbangan antara tubuh dan pikiran. Aplikasi ini membantu kamu bergerak dengan bijak, berolahraga tanpa tekanan, dan menjaga gaya hidup sehat yang berkelanjutan.',
  },
  {
    id: '3',
    title: 'Perjalanan Dimulai di Sini',
    description: 'Temani perjalanan sehatmu mulai dari rumah. Hitung kalori, cek BMI, dan dapatkan rekomendasi latihan sesuai kebutuhanmu. Mudah digunakan, cocok untuk siapa pun yang ingin hidup lebih bugar.',
  },
];

// Komponen untuk satu slide
const OnboardingItem: React.FC<{ item: Slide }> = ({ item }) => (
  <View style={styles.slide}>
    <Text style={styles.title}>{item.title}</Text>
    <Text style={styles.description}>{item.description}</Text>
  </View>
);

// Komponen paginator (dots)
const Paginator: React.FC<{ data: Slide[]; scrollX: Animated.Value }> = ({ data, scrollX }) => (
  <View style={styles.paginatorContainer}>
    {data.map((_, i) => {
      const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

      const dotWidth = scrollX.interpolate({
        inputRange,
        outputRange: [10, 20, 10],
        extrapolate: 'clamp',
      });

      const opacity = scrollX.interpolate({
        inputRange,
        outputRange: [0.3, 1, 0.3],
        extrapolate: 'clamp',
      });

      return <Animated.View key={i.toString()} style={[styles.dot, { width: dotWidth, opacity }]} />;
    })}
  </View>
);


export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef<FlatList<Slide>>(null);
  const router = useRouter();


  const viewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index !== null) {
        setCurrentIndex(viewableItems[0].index);
      }
    }
  ).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const scrollTo = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < slides.length) {
      slidesRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setCurrentIndex(nextIndex);
    } else {
      router.replace('/login'); 
    }
  };

  // Optimasi scrollToIndex
  const getItemLayout = (_: any, index: number) => ({
    length: width,
    offset: width * index,
    index,
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={slides}
        renderItem={({ item }) => <OnboardingItem item={item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        keyExtractor={(item) => item.id}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
          useNativeDriver: false,
        })}
        scrollEventThrottle={32}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        getItemLayout={getItemLayout}
        ref={slidesRef}
      />

      <Paginator data={slides} scrollX={scrollX} />

      <TouchableOpacity style={styles.button} onPress={scrollTo}>
        <Text style={styles.buttonText}>
          {currentIndex === slides.length - 1 ? 'Get Started' : 'Next'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  slide: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    paddingHorizontal: 64,
  },
  paginatorContainer: {
    flexDirection: 'row',
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: '#B1F512',
    marginHorizontal: 8,
  },
  button: {
    backgroundColor: '#B3FF00',
    paddingVertical: 15,
    width: '80%',
    borderRadius: 30,
    marginBottom: 50,
    alignItems: 'center',
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
