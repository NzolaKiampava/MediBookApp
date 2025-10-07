import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {MaterialIcons} from '@expo/vector-icons';

import {useAuth} from '../../context/AuthContext';
import {colors, gradients} from '../../theme/colors';

const SidebarContent: React.FC<DrawerContentComponentProps> = props => {
  const {user, signOut} = useAuth();

  const firstName = user?.nome?.split(' ')[0] ?? 'Paciente';

  return (
    <View style={styles.container}>
      <LinearGradient colors={gradients.primary} style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{firstName.charAt(0).toUpperCase()}</Text>
        </View>
        <Text style={styles.welcome}>Olá,</Text>
        <Text style={styles.name}>{firstName}</Text>
        <Text style={styles.subtitle}>Estamos cuidando da sua jornada de saúde</Text>
      </LinearGradient>

      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.scrollContent}>
        <DrawerItemList {...props} />

        <View style={styles.helpCard}>
          <MaterialIcons name="support-agent" size={24} color={colors.primary} />
          <View style={styles.helpTextContainer}>
            <Text style={styles.helpTitle}>Suporte 24/7</Text>
            <Text style={styles.helpSubtitle}>Fale com nossa equipe especializada</Text>
          </View>
        </View>
      </DrawerContentScrollView>

      <TouchableOpacity
        style={styles.signOutButton}
        onPress={signOut}
        activeOpacity={0.85}>
        <MaterialIcons name="logout" size={20} color={colors.primaryDark} />
        <Text style={styles.signOutText}>Sair da conta</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 32,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  welcome: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4,
  },
  scrollContent: {
    paddingTop: 16,
  },
  helpCard: {
    marginHorizontal: 16,
    marginTop: 24,
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#F1F5F9',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  helpTextContainer: {
    flex: 1,
  },
  helpTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.primaryDark,
  },
  helpSubtitle: {
    fontSize: 12,
    color: colors.muted,
    marginTop: 4,
  },
  signOutButton: {
    margin: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 14,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#EEF2FF',
  },
  signOutText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.primaryDark,
  },
});

export default SidebarContent;
