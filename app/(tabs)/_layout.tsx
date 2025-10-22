import React from 'react';
import { Slot, useRouter, useSegments } from 'expo-router';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const TabItem: React.FC<{
  iconName: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  label: string;
  to: string;
  focused: boolean;
  onPress: () => void;
}> = ({ iconName, label, to, focused, onPress }) => (
  <TouchableOpacity
    style={styles.tabItem}
    onPress={onPress}
    accessibilityRole="button"
    accessibilityLabel={label}
  >
    <MaterialCommunityIcons name={iconName} size={24} color={focused ? '#B3FF00' : 'grey'} />
    <Text style={[styles.tabLabel, { color: focused ? '#B3FF00' : 'grey' }]}>{label}</Text>
  </TouchableOpacity>
);

export default function TabsLayout() {
  const router = useRouter();
  const segments = useSegments();
  const current = (() => {
  if (!segments || segments.length < 1) return '';
    for (let i = segments.length - 1; i >= 0; i--) {
      const s = segments[i];
      if (!s.startsWith('(') && !s.startsWith('_')) return s;
    }
    return segments[segments.length - 1] || '';
  })();

  type TabPath = '/home' | '/status' | '/program' | '/account';
  const push = (path: TabPath) => {
    router.push(path);
  };

  return (
    <>
      <Slot />
      <View style={styles.tabBarContainer} pointerEvents="box-none">

          <View style={styles.tabBar}>
            <TabItem
              iconName="home-variant"
              label="Home"
              to="/home"
              focused={current === 'home' || current === ''}
              onPress={() => push('/home')}
            />
            <TabItem
              iconName="chart-line"
              label="Status"
              to="/status"
              focused={current === 'status'}
              onPress={() => push('/status')}
            />
            <View style={{ width: 50 }} />
            <TabItem
              iconName="clipboard-text-outline"
              label="Program"
              to="/program"
              focused={current === 'program'}
              onPress={() => push('/program')}
            />
            <TabItem
              iconName="account-circle-outline"
              label="Akun"
              to="/account"
              focused={current === 'account'}
              onPress={() => push('/account')}
            />

          <TouchableOpacity
            style={styles.centerButton}
            onPress={() => {
              console.log('Center button pressed');
            }}
            accessibilityRole="button"
            accessibilityLabel="Center action"
          >
            <View style={styles.centerInner} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    width: '100%',
    height: 100,
    paddingBottom: Platform.OS === 'android' ? 10 : 12,
    borderTopWidth: 0,
    borderTopColor: '#2C2C2E',
    borderTopLeftRadius: 20,   
    borderTopRightRadius: 20,  
  },
  centerButton: {
    position: 'absolute',
    top: -30,
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#B3FF00',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
    borderWidth: 6,
    borderColor: '#101010',
  },
  centerInner: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#101010',
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 10,
    marginTop: 4,
  },
});
