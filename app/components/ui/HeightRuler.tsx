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

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const ITEM_HEIGHT = 15; 
const TOTAL_HEIGHT = SCREEN_HEIGHT * 0.25; 

interface HeightRulerProps {
  min: number;
  max: number;
  unit: string;
  onValueChange: (value: number) => void;
  initialValue: number;
  onDragStart?: () => void;
  onDragEnd?: () => void;
}

const RulerItem: React.FC<{ value: number }> = ({ value }) => {
  const isMajorTick = value % 5 === 0;
  return (
    <View style={styles.itemContainer}>
      <Text style={[styles.itemText, isMajorTick && styles.majorText]}>
        {isMajorTick ? value : ''}
      </Text>
      <View
        style={[styles.tick, isMajorTick ? styles.majorTick : styles.minorTick]}
      />
    </View>
  );
};

const HeightRuler: React.FC<HeightRulerProps> = ({
  min,
  max,
  onValueChange,
  initialValue,
  onDragStart, 
  onDragEnd,   
}) => {
  const data = useMemo(() => {
    const range = max - min + 1;
    return Array.from({ length: range }, (_, i) => min + i);
  }, [min, max]);

  const verticalPadding = (TOTAL_HEIGHT - ITEM_HEIGHT) / 2;
  const rulerRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (rulerRef.current) {
      const initialOffset = (initialValue - min) * ITEM_HEIGHT;
      rulerRef.current.scrollTo({ y: initialOffset, animated: false });
    }
  }, [initialValue, min]);

  const handleScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const yOffset = e.nativeEvent.contentOffset.y;
    const index = Math.round(yOffset / ITEM_HEIGHT);
    const value = data[index];
    if (value) {
      onValueChange(value);
    }
  };

  return (
    <View style={[styles.container, { height: TOTAL_HEIGHT }]}>
      <View style={styles.pointerContainer}>
        <View style={styles.pointerTriangle} />
      </View>

      <ScrollView
        ref={rulerRef}
        showsVerticalScrollIndicator={false}
        snapToInterval={ITEM_HEIGHT}
        decelerationRate="fast"
        nestedScrollEnabled={true}
        contentContainerStyle={{
          paddingVertical: verticalPadding,
        }}
        onScrollBeginDrag={onDragStart} 
        onMomentumScrollEnd={(e) => {
          handleScrollEnd(e); 
          if (onDragEnd) onDragEnd(); 
        }}
        onScrollEndDrag={onDragEnd}
        >
        {data.map((item) => (
          <RulerItem value={item} key={`height-${item}`} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  itemContainer: {
    height: ITEM_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: 120,
  },
  itemText: {
    color: '#888',
    fontSize: 12,
    width: 30,
    textAlign: 'right',
  },
  majorText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  tick: {
    backgroundColor: '#888',
    height: 1,
    marginLeft: 10,
  },
  minorTick: {
    width: 25,
  },
  majorTick: {
    width: 40,
    backgroundColor: 'white',
  },
  pointerContainer: {
    position: 'absolute',
    left: 80,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pointerTriangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 12,
    borderRightWidth: 0,
    borderTopWidth: 8,
    borderBottomWidth: 8,
    borderLeftColor: '#BFFF00',
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
  },
});

export default HeightRuler;