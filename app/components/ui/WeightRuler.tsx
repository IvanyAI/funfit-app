import React, { useRef, useMemo, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView, 
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const ITEM_WIDTH = 12; 
const TOTAL_WIDTH = SCREEN_WIDTH * 0.8; 

interface WeightRulerProps {
  min: number;
  max: number;
  unit: string;
  onValueChange: (value: number) => void;
  initialValue: number;
}

const RulerItem: React.FC<{ value: number }> = ({ value }) => {
  const isMajorTick = value % 5 === 0;
  return (
    <View style={styles.itemContainer}>
      <View
        style={[styles.tick, isMajorTick ? styles.majorTick : styles.minorTick]}
      />
      <Text style={[styles.itemText, isMajorTick && styles.majorText]}>
        {isMajorTick ? value : ''}
      </Text>
    </View>
  );
};

const WeightRuler: React.FC<WeightRulerProps> = ({
  min,
  max,
  onValueChange,
  initialValue,
}) => {
  const data = useMemo(() => {
    const range = max - min + 1;
    return Array.from({ length: range }, (_, i) => min + i);
  }, [min, max]);

  const horizontalPadding = (TOTAL_WIDTH - ITEM_WIDTH) / 2;
  const rulerRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (rulerRef.current) {
      const initialOffset = (initialValue - min) * ITEM_WIDTH;
      rulerRef.current.scrollTo({ x: initialOffset, animated: false });
    }
  }, [initialValue, min]);

  const handleScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const xOffset = e.nativeEvent.contentOffset.x;
    const index = Math.round(xOffset / ITEM_WIDTH);
    const value = data[index];
    if (value) {
      onValueChange(value);
    }
  };

  return (
    <View style={[styles.container, { width: TOTAL_WIDTH }]}>
      <View style={styles.pointerTriangle} />

      <ScrollView
        ref={rulerRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_WIDTH}
        decelerationRate="fast"
        nestedScrollEnabled={true}
        onMomentumScrollEnd={handleScrollEnd}
        contentContainerStyle={{
          paddingHorizontal: horizontalPadding,
        }}>
        {data.map((item) => (
          <RulerItem value={item} key={`weight-${item}`} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    height: 80,
    marginTop: 10,
  },
  itemContainer: {
    width: ITEM_WIDTH,
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '100%',
  },
  itemText: {
    color: '#888',
    fontSize: 10,
    marginTop: 4,
  },
  majorText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  tick: {
    backgroundColor: '#888',
    width: 1,
  },
  minorTick: {
    height: 15,
  },
  majorTick: {
    height: 30,
    backgroundColor: 'white',
  },
  pointerTriangle: {
    position: 'absolute',
    top: 0,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: 12,
    borderBottomWidth: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderTopColor: '#BFFF00',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    zIndex: 1,
  },
});

export default WeightRuler;