import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Home, Users, FileText, Phone, Image } from 'lucide-react-native';

import HomeScreen from './src/screens/HomeScreen';
import TeamScreen from './src/screens/TeamScreen';
import PostsScreen from './src/screens/PostsScreen';
import GalleryScreen from './src/screens/GalleryScreen';
import ContactScreen from './src/screens/ContactScreen';

const Tab = createBottomTabNavigator();

const tabBarStyle = {
  backgroundColor: '#0a0f1e',
  borderTopColor: 'rgba(255,255,255,0.1)',
  borderTopWidth: 1,
  paddingBottom: 4,
  height: 60,
};

const headerStyle = {
  backgroundColor: '#080d1e',
  shadowColor: 'transparent',
  elevation: 0,
  borderBottomColor: 'rgba(255,255,255,0.1)',
  borderBottomWidth: 1,
};

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="light" />
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarStyle,
            tabBarActiveTintColor: '#f97316',
            tabBarInactiveTintColor: 'rgba(255,255,255,0.4)',
            tabBarLabelStyle: { fontSize: 11, fontWeight: '500' },
            headerStyle,
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: '700', color: '#fff' },
            tabBarIcon: ({ color, size }) => {
              const icons: Record<string, any> = {
                Accueil: Home,
                Équipe: Users,
                Actualités: FileText,
                Contact: Phone,
                Galerie: Image,
              };
              const Icon = icons[route.name];
              return Icon ? <Icon color={color} size={size} /> : null;
            },
          })}
        >
          <Tab.Screen name="Accueil" component={HomeScreen} options={{ title: 'Borgel & Associés' }} />
          <Tab.Screen name="Équipe" component={TeamScreen} options={{ title: 'Notre Équipe' }} />
          <Tab.Screen name="Actualités" component={PostsScreen} options={{ title: 'Actualités' }} />
          <Tab.Screen name="Contact" component={ContactScreen} options={{ title: 'Contact' }} />
          <Tab.Screen name="Galerie" component={GalleryScreen} options={{ title: 'Galerie' }} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
