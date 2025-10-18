import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewToken
} from 'react-native';

const { width } = Dimensions.get('window');

interface Slide {
  id: string;
  image: ImageSourcePropType;
  title: string;
  description: string;
}

const slides: Slide[] = [
  {
    id: '1',
    image: require('../assets/images/onboarding/onboarding-1.png'),
    title: 'Your Fitness Journey Start Here',
    description:
      'Bangun kebiasaan sehat, satu langkah setiap hari. Pantau progresmu, atur target, dan rasakan perubahan nyata dalam tubuh dan pikiranmu. Karena setiap langkah kecil membawa hasil besar.',
  },
  {
    id: '2',
    image: require('../assets/images/onboarding/onboarding-2.png'),
    title: 'Move Freely Live Fully',
    description:
      'Nikmati keseimbangan antara tubuh dan pikiran. Aplikasi ini membantu kamu bergerak dengan bijak, berolahraga tanpa tekanan, dan menjaga gaya hidup sehat yang berkelanjutan.',
  },
  {
    id: '3',
    image: require('../assets/images/onboarding/onboarding-3.png'),
    title: 'Perjalanan Kamu Dimulai di Sini',
    description:
      'Temani perjalanan sehatmu mulai dari rumah. Hitung kalori, cek BMI, dan dapatkan rekomendasi latihan sesuai kebutuhanmu.',
  },
];

const OnboardingItem: React.FC<{ item: Slide }> = ({ item }) => (
  <View style={styles.slide}>
    <Image
      source={item.image}
      style={styles.image}
      resizeMode="contain"
    />
    <Text style={styles.title}>{item.title}</Text>
    <Text style={styles.description}>{item.description}</Text>
  </View>
);

const Paginator: React.FC<{ data: Slide[]; scrollX: Animated.Value }> = ({
  data,
  scrollX,
}) => (
  <View style={styles.paginatorContainer}>
    {data.map((_, i) => {
      const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

      const dotWidth = scrollX.interpolate({
        inputRange,
        outputRange: [8, 24, 8],
        extrapolate: 'clamp',
      });

      const opacity = scrollX.interpolate({
        inputRange,
        outputRange: [0.4, 1, 0.4],
        extrapolate: 'clamp',
      });

      return (
        <Animated.View
          key={i.toString()}
          style={[styles.dot, { width: dotWidth, opacity }]}
        />
      );
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

  const getItemLayout = (_: any, index: number) => ({
    length: width,
    offset: width * index,
    index,
  });

  return (
   <LinearGradient
  colors={[
    'rgba(61, 96, 7, 1))',  
    '#000000'                      
  ]}
  locations={[0,0.15]}
  style={styles.container}>
      <FlatList
        style={{ flex: 1 }}
        data={slides}
        renderItem={({ item }) => <OnboardingItem item={item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        keyExtractor={(item) => item.id}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={32}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        getItemLayout={getItemLayout}
        ref={slidesRef}
      />
      <View style={styles.bottomContainer}>
        <Paginator data={slides} scrollX={scrollX} />
        <TouchableOpacity style={styles.button} onPress={scrollTo}>
          <Text style={styles.buttonText}>
            {currentIndex === slides.length - 1 ? 'Get Started' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide: {
    width,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  image: {
    width: 320,
    height: 320,
    marginBottom: 5,
    marginTop: 30,
  },
  title: {
    fontSize: 32,
    color: '#fff',
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 15,
  },
  description: {
    fontSize: 15,
    color: '#BDBDBD',
    textAlign: 'center',
    paddingHorizontal: 5,
    lineHeight: 20,
  },
  paginatorContainer: {
    flexDirection: 'row',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    height: 10,
    borderRadius: 15,
    backgroundColor: '#B3FF00',
    marginHorizontal: 6,
  },
  button: {
    backgroundColor: '#B3FF00',
    paddingVertical: 15,
    width: '80%',
    borderRadius: 20,
    marginBottom: 45,
    alignItems: 'center',
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomContainer: {
    width: '100%',
    alignItems: 'center',
  },
});
