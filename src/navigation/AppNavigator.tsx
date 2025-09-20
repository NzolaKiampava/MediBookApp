import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../context/AuthContext';
import { Text } from 'react-native';

// Screens
import LoginScreen from '../screens/Auth/LoginScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';
import HomeScreen from '../screens/Home/HomeScreen';
import SearchScreen from '../screens/Search/SearchScreen';
import BookingScreen from '../screens/Booking/BookingScreen';
import AppointmentsScreen from '../screens/Appointments/AppointmentsScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Componente simples para ícones usando emojis
const SimpleIcon = ({ name, focused }: { name: string; focused: boolean }) => (
  <Text style={{ 
    fontSize: 20, 
    color: focused ? '#2196F3' : '#757575',
    fontWeight: focused ? 'bold' : 'normal'
  }}>
    {name === 'home' ? '🏠' : 
     name === 'search' ? '🔍' : 
     name === 'calendar' ? '📅' : 
     name === 'list' ? '📋' : 
     name === 'person' ? '👤' : '◯'}
  </Text>
);

const AuthNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
  </Stack.Navigator>
);

const MainNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ focused }) => {
        let iconName = '';
        
        if (route.name === 'Home') {
          iconName = 'home';
        } else if (route.name === 'Search') {
          iconName = 'search';
        } else if (route.name === 'Booking') {
          iconName = 'calendar';
        } else if (route.name === 'Appointments') {
          iconName = 'list';
        } else if (route.name === 'Profile') {
          iconName = 'person';
        }

        return <SimpleIcon name={iconName} focused={focused} />;
      },
      tabBarActiveTintColor: '#2196F3',
      tabBarInactiveTintColor: '#757575',
    })}
  >
    <Tab.Screen 
      name="Home" 
      component={HomeScreen}
      options={{ tabBarLabel: 'Início' }}
    />
    <Tab.Screen 
      name="Search" 
      component={SearchScreen}
      options={{ tabBarLabel: 'Buscar' }}
    />
    <Tab.Screen 
      name="Booking" 
      component={BookingScreen}
      options={{ tabBarLabel: 'Agendar' }}
    />
    <Tab.Screen 
      name="Appointments" 
      component={AppointmentsScreen}
      options={{ tabBarLabel: 'Consultas' }}
    />
    <Tab.Screen 
      name="Profile" 
      component={ProfileScreen}
      options={{ tabBarLabel: 'Perfil' }}
    />
  </Tab.Navigator>
);

const AppNavigator = () => {
  const { user } = useAuth();

  return user ? <MainNavigator /> : <AuthNavigator />;
};

export { AppNavigator };
export default AppNavigator;