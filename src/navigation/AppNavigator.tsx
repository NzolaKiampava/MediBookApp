import React from 'react';
import {createDrawerNavigator, DrawerHeaderProps} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MaterialIcons} from '@expo/vector-icons';
import {View, TouchableOpacity} from 'react-native';

import {useAuth} from '../context/AuthContext';
import {colors} from '../theme/colors';
import SidebarContent from '../components/navigation/SidebarContent';
import HealthcareHeader from '../components/navigation/HealthcareHeader';

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
const Drawer = createDrawerNavigator();

type IconName = keyof typeof MaterialIcons.glyphMap;

interface ScreenHeaderConfig {
  title: string;
  subtitle?: string;
  icon: IconName;
  actionLabel?: string;
  onActionPress?: () => void;
  showBackButton?: boolean;
  navigation?: any;
}

const buildScreenOptions = ({
  title,
  subtitle,
  icon,
  actionLabel,
  onActionPress,
  showBackButton,
  navigation,
}: ScreenHeaderConfig) => ({
  header: (props: DrawerHeaderProps) => (
    <HealthcareHeader
      {...props}
      title={title}
      subtitle={subtitle}
      actionLabel={actionLabel}
      onActionPress={onActionPress}
      showBackButton={showBackButton}
      onBackPress={showBackButton && navigation ? () => navigation.goBack() : undefined}
    />
  ),
  drawerIcon: ({color, size}: {color: string; size: number}) => (
    <MaterialIcons name={icon} size={size} color={color} />
  ),
});

const AuthNavigator = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
  </Stack.Navigator>
);

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: colors.muted,
      tabBarStyle: {
        backgroundColor: colors.surface,
        borderTopWidth: 1,
        borderTopColor: '#E2E8F0',
        height: 65,
        paddingBottom: 8,
        paddingTop: 8,
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: -2},
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      tabBarLabelStyle: {
        fontSize: 12,
        fontWeight: '600',
      },
      tabBarIconStyle: {
        marginTop: 4,
      },
    }}>
    <Tab.Screen
      name="HomeTab"
      component={HomeScreen}
      options={{
        tabBarLabel: 'Início',
        tabBarIcon: ({color, size}) => <MaterialIcons name="home" size={size} color={color} />,
      }}
    />
    <Tab.Screen
      name="SearchTab"
      component={SearchScreen}
      options={{
        tabBarLabel: 'Buscar',
        tabBarIcon: ({color, size}) => <MaterialIcons name="search" size={size} color={color} />,
      }}
    />
    <Tab.Screen
      name="BookingTab"
      component={BookingScreen}
      options={{
        tabBarLabel: 'Agendar',
        tabBarIcon: ({color, size}) => <MaterialIcons name="add-circle" size={size + 4} color={color} />,
      }}
    />
    <Tab.Screen
      name="AppointmentsTab"
      component={AppointmentsScreen}
      options={{
        tabBarLabel: 'Consultas',
        tabBarIcon: ({color, size}) => <MaterialIcons name="calendar-today" size={size} color={color} />,
      }}
    />
    <Tab.Screen
      name="ProfileTab"
      component={ProfileScreen}
      options={{
        tabBarLabel: 'Perfil',
        tabBarIcon: ({color, size}) => <MaterialIcons name="person" size={size} color={color} />,
      }}
    />
  </Tab.Navigator>
);

const MainNavigator = () => (
  <Drawer.Navigator
    initialRouteName="Main"
    screenOptions={{
      drawerType: 'slide',
      headerShown: true,
      sceneContainerStyle: {backgroundColor: colors.background},
      drawerActiveTintColor: colors.primary,
      drawerInactiveTintColor: colors.muted,
      drawerLabelStyle: {
        fontSize: 15,
        fontWeight: '600',
      },
      drawerItemStyle: {
        borderRadius: 12,
        marginVertical: 6,
      },
      drawerStyle: {
        width: 300,
        backgroundColor: colors.surface,
      },
    }}
    drawerContent={props => <SidebarContent {...props} />}>
    <Drawer.Screen
      name="Main"
      component={TabNavigator}
      options={({navigation}) =>
        buildScreenOptions({
          title: 'MediBook',
          subtitle: 'Sua saúde em boas mãos',
          icon: 'space-dashboard',
          navigation,
        })
      }
    />
  </Drawer.Navigator>
);

const AppNavigator = () => {
  const {user} = useAuth();

  return user ? <MainNavigator /> : <AuthNavigator />;
};

export {AppNavigator};
export default AppNavigator;