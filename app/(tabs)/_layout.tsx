import React from 'react';
import { Slot, useRouter, useSegments } from 'expo-router';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
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
  // Determine the current visible segment by taking the last non-group/non-internal segment.
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
    // router.push expects a specific path literal type; using TabPath keeps typesafe
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
    height: 70,
    paddingBottom: 10,
    borderTopWidth: 1,
    borderTopColor: '#2C2C2E',
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
