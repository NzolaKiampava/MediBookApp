import React from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {MaterialIcons} from '@expo/vector-icons';
import {useAuth} from '../../context/AuthContext';
import {colors, gradients} from '../../theme/colors';

type StatItem = {
  id: string;
  title: string;
  value: string;
  subtitle: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  gradient: string[];
};

type MenuItem = {
  id: string;
  title: string;
  subtitle?: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  color: string;
  onPress: () => void;
};

const ProfileScreen = () => {
  const {user, signOut} = useAuth();

  const profileStats: StatItem[] = [
    {
      id: 'consultas',
      title: 'Consultas',
      value: '12',
      subtitle: 'Este ano',
      icon: 'medical-services',
      gradient: gradients.primary,
    },
    {
      id: 'exames',
      title: 'Exames',
      value: '8',
      subtitle: 'Este ano',
      icon: 'biotech',
      gradient: ['#10B981', '#059669'],
    },
    {
      id: 'economia',
      title: 'Economia',
      value: 'R$ 450',
      subtitle: 'Economizados',
      icon: 'savings',
      gradient: ['#F59E0B', '#D97706'],
    },
  ];

  const profileOptions: MenuItem[] = [
    {
      id: 'personal',
      title: 'Dados Pessoais',
      subtitle: 'Editar informações do perfil',
      icon: 'person',
      color: colors.primary,
      onPress: () => Alert.alert('Em desenvolvimento', 'Esta funcionalidade será implementada em breve'),
    },
    {
      id: 'medical',
      title: 'Histórico Médico',
      subtitle: 'Consultas e exames anteriores',
      icon: 'history',
      color: '#10B981',
      onPress: () => Alert.alert('Em desenvolvimento', 'Esta funcionalidade será implementada em breve'),
    },
    {
      id: 'insurance',
      title: 'Plano de Saúde',
      subtitle: 'Gerenciar convênios médicos',
      icon: 'card-membership',
      color: '#8B5CF6',
      onPress: () => Alert.alert('Em desenvolvimento', 'Esta funcionalidade será implementada em breve'),
    },
    {
      id: 'documents',
      title: 'Documentos',
      subtitle: 'Receitas, laudos e atestados',
      icon: 'description',
      color: '#F59E0B',
      onPress: () => Alert.alert('Em desenvolvimento', 'Esta funcionalidade será implementada em breve'),
    },
    {
      id: 'notifications',
      title: 'Notificações',
      subtitle: 'Configurar alertas e lembretes',
      icon: 'notifications',
      color: '#EF4444',
      onPress: () => Alert.alert('Em desenvolvimento', 'Esta funcionalidade será implementada em breve'),
    },
    {
      id: 'privacy',
      title: 'Privacidade e Segurança',
      subtitle: 'Controle de dados e privacidade',
      icon: 'security',
      color: '#6B7280',
      onPress: () => Alert.alert('Em desenvolvimento', 'Esta funcionalidade será implementada em breve'),
    },
  ];

  const supportOptions: MenuItem[] = [
    {
      id: 'help',
      title: 'Central de Ajuda',
      icon: 'help-outline',
      color: colors.subsection,
      onPress: () => Alert.alert('Em desenvolvimento', 'Esta funcionalidade será implementada em breve'),
    },
    {
      id: 'contact',
      title: 'Fale Conosco',
      icon: 'contact-support',
      color: colors.subsection,
      onPress: () => Alert.alert('Em desenvolvimento', 'Esta funcionalidade será implementada em breve'),
    },
    {
      id: 'about',
      title: 'Sobre o App',
      icon: 'info-outline',
      color: colors.subsection,
      onPress: () =>
        Alert.alert(
          'MediBook',
          'Versão 1.0.0\n\nAplicativo de reservas hospitalares desenvolvido para facilitar o agendamento de consultas médicas, exames e procedimentos.\n\n© 2025 MediBook. Todos os direitos reservados.'
        ),
    },
  ];

  const handleLogout = () => {
    Alert.alert(
      'Sair da Conta',
      'Tem certeza que deseja sair? Você precisará fazer login novamente para acessar o app.',
      [
        {text: 'Cancelar', style: 'cancel'},
        {text: 'Sair', onPress: signOut, style: 'destructive'},
      ]
    );
  };

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <LinearGradient colors={gradients.primary} style={styles.heroHeader}>
          <View style={styles.profileInfo}>
            <View style={styles.avatarWrapper}>
              <View style={styles.avatarCircle}>
                <MaterialIcons name="person" size={48} color={colors.primary} />
              </View>
              <TouchableOpacity style={styles.cameraButton} activeOpacity={0.85}>
                <MaterialIcons name="camera-alt" size={14} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
            <Text style={styles.userName}>{user?.nome || 'Usuário'}</Text>
            <Text style={styles.userEmail}>{user?.email || 'email@example.com'}</Text>
          </View>
        </LinearGradient>

        <View style={styles.statsRow}>
          {profileStats.map(stat => (
            <LinearGradient key={stat.id} colors={stat.gradient} style={styles.statCard}>
              <View style={styles.statIconWrapper}>
                <MaterialIcons name={stat.icon} size={22} color="#FFFFFF" />
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statTitle}>{stat.title}</Text>
              <Text style={styles.statSubtitle}>{stat.subtitle}</Text>
            </LinearGradient>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Minha Conta</Text>
          <View style={styles.menuGroup}>
            {profileOptions.map(option => (
              <TouchableOpacity
                key={option.id}
                style={styles.menuItem}
                onPress={option.onPress}
                activeOpacity={0.85}>
                <View style={styles.menuLeft}>
                  <View style={[styles.menuIcon, {backgroundColor: `${option.color}15`}]}>
                    <MaterialIcons name={option.icon} size={20} color={option.color} />
                  </View>
                  <View style={styles.menuTextGroup}>
                    <Text style={styles.menuTitle}>{option.title}</Text>
                    {option.subtitle && <Text style={styles.menuSubtitle}>{option.subtitle}</Text>}
                  </View>
                </View>
                <MaterialIcons name="chevron-right" size={20} color={colors.muted} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Suporte e Ajuda</Text>
          <View style={styles.menuGroup}>
            {supportOptions.map(option => (
              <TouchableOpacity
                key={option.id}
                style={styles.menuItem}
                onPress={option.onPress}
                activeOpacity={0.85}>
                <View style={styles.menuLeft}>
                  <View style={styles.menuIcon}>
                    <MaterialIcons name={option.icon} size={20} color={option.color} />
                  </View>
                  <Text style={styles.menuTitle}>{option.title}</Text>
                </View>
                <MaterialIcons name="chevron-right" size={20} color={colors.muted} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} activeOpacity={0.85}>
            <MaterialIcons name="logout" size={20} color="#EF4444" />
            <Text style={styles.logoutText}>Sair da Conta</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.appInfoSection}>
          <Text style={styles.appVersion}>MediBook v1.0.0</Text>
          <Text style={styles.appCopyright}>© 2025 MediBook. Todos os direitos reservados.</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingBottom: 90,
  },
  heroHeader: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 48,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    alignItems: 'center',
  },
  profileInfo: {
    alignItems: 'center',
    gap: 12,
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: 8,
  },
  avatarCircle: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  cameraButton: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primaryDark,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  userName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  userEmail: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.85)',
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: -32,
    gap: 12,
  },
  statCard: {
    flex: 1,
    borderRadius: 18,
    padding: 16,
    alignItems: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.12,
    shadowRadius: 14,
    elevation: 5,
  },
  statIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  statTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.95)',
  },
  statSubtitle: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.75)',
  },
  section: {
    paddingHorizontal: 20,
    paddingTop: 28,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  menuGroup: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    flex: 1,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuTextGroup: {
    flex: 1,
    gap: 4,
  },
  menuTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
  },
  menuSubtitle: {
    fontSize: 12,
    color: colors.muted,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: colors.surface,
    borderRadius: 18,
    paddingVertical: 16,
    shadowColor: '#EF4444',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 3,
  },
  logoutText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#EF4444',
  },
  appInfoSection: {
    paddingHorizontal: 20,
    paddingTop: 32,
    alignItems: 'center',
    gap: 8,
  },
  appVersion: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.subsection,
  },
  appCopyright: {
    fontSize: 11,
    color: colors.muted,
    textAlign: 'center',
  },
});

export default ProfileScreen;
