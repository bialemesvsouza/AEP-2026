import { Tabs } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppProvider } from '../context/AppContext';

export default function Layout() {
  const insets = useSafeAreaInsets();

  return (
    <AppProvider>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: true,
          tabBarActiveTintColor: '#52B788',
          tabBarInactiveTintColor: '#6B9E82',
          tabBarStyle: {
            backgroundColor: '#FFFFFF',
            borderTopColor: '#D8F3DC',
            borderTopWidth: 1,
            height: 75 + insets.bottom,
            paddingTop: 5,
            paddingBottom: insets.bottom > 0 ? insets.bottom : 8,
          },
          tabBarLabelStyle: { fontSize: 12, marginTop: 2, paddingBottom: 2 },
        }}
      >
        <Tabs.Screen name="index" options={{ href: null }} />
        <Tabs.Screen name="mapa" options={{ href: null }} />
        <Tabs.Screen name="alertas" options={{ href: null }} />
        
        <Tabs.Screen name="historico" options={{ href: null }} />
        <Tabs.Screen name="conquistas" options={{ href: null }} />

        <Tabs.Screen name="home" options={{ title: 'Início', tabBarIcon: ({ color }) => <Feather name="home" size={24} color={color} /> }} />
        <Tabs.Screen name="doar" options={{ title: 'Doar', tabBarIcon: ({ color }) => <Feather name="heart" size={24} color={color} /> }} />
        <Tabs.Screen name="recompensas" options={{ title: 'Loja', tabBarIcon: ({ color }) => <Feather name="shopping-bag" size={24} color={color} /> }} />
        <Tabs.Screen name="perfil" options={{ title: 'Perfil', tabBarIcon: ({ color }) => <Feather name="user" size={24} color={color} /> }} />
      </Tabs>
    </AppProvider>
  );
}