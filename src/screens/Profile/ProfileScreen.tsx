import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import {useAuth} from '../../context/AuthContext';

const {width} = Dimensions.get('window');

const ProfileScreen = () => {
  const {user, signOut} = useAuth();

  const profileStats = [
    {
      id: 'consultas',
      title: 'Consultas',
      value: '12',
      subtitle: 'Este ano',
      icon: 'medical-services',
      color: '#3B82F6',
    },
    {
      id: 'exames',
      title: 'Exames',
      value: '8',
      subtitle: 'Este ano',
      icon: 'assignment',
      color: '#10B981',
    },
    {
      id: 'economia',
      title: 'Economia',
      value: 'R$ 450',
      subtitle: 'Com o app',
      icon: 'savings',
      color: '#F59E0B',
    },
  ];

  const profileOptions = [
    {
      id: 'personal',
      title: 'Dados Pessoais',
      subtitle: 'Editar informações do perfil',
      icon: 'person',
      color: '#3B82F6',
      onPress: () => Alert.alert('Em desenvolvimento', 'Esta funcionalidade será implementada em breve'),
    },
    {
      id: 'medical',
      title: 'Histórico Médico',
      subtitle: 'Consultas e exames anteriores',
      icon: 'local-hospital',
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

  const supportOptions = [
    {
      id: 'help',
      title: 'Central de Ajuda',
      icon: 'help',
      onPress: () => Alert.alert('Em desenvolvimento', 'Esta funcionalidade será implementada em breve'),
    },
    {
      id: 'contact',
      title: 'Fale Conosco',
      icon: 'contact-support',
      onPress: () => Alert.alert('Em desenvolvimento', 'Esta funcionalidade será implementada em breve'),
    },
    {
      id: 'about',
      title: 'Sobre o App',
      icon: 'info',
      onPress: () => Alert.alert('MediBook', 'Versão 1.0.0\n\nAplicativo de reservas hospitalares desenvolvido para facilitar o agendamento de consultas médicas, exames e procedimentos.\n\n© 2025 MediBook. Todos os direitos reservados.'),
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
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.profileInfo}>
          <View style={styles.avatarContainer}>
            <MaterialIcons name="account-circle" size={80} color="#FFFFFF" />
            <TouchableOpacity style={styles.editAvatarButton}>
              <MaterialIcons name="camera-alt" size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>{user?.nome}</Text>
          <Text style={styles.userEmail}>{user?.email}</Text>
          <TouchableOpacity style={styles.editProfileButton}>
            <MaterialIcons name="edit" size={16} color="#3B82F6" />
            <Text style={styles.editProfileText}>Editar Perfil</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        {profileStats.map(stat => (
          <View key={stat.id} style={styles.statCard}>
            <View style={[styles.statIcon, {backgroundColor: `${stat.color}20`}]}>
              <MaterialIcons name={stat.icon} size={24} color={stat.color} />
            </View>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statTitle}>{stat.title}</Text>
            <Text style={styles.statSubtitle}>{stat.subtitle}</Text>
          </View>
        ))}
      </View>

      {/* Profile Options */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Minha Conta</Text>
        {profileOptions.map(option => (
          <TouchableOpacity
            key={option.id}
            style={styles.optionItem}
            onPress={option.onPress}
            activeOpacity={0.8}>
            <View style={styles.optionLeft}>
              <View style={[styles.optionIcon, {backgroundColor: `${option.color}20`}]}>
                <MaterialIcons name={option.icon} size={20} color={option.color} />
              </View>
              <View style={styles.optionContent}>
                <Text style={styles.optionTitle}>{option.title}</Text>
                <Text style={styles.optionSubtitle}>{option.subtitle}</Text>
              </View>
            </View>
            <MaterialIcons name="chevron-right" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        ))}
      </View>

      {/* Support */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Suporte</Text>
        {supportOptions.map(option => (
          <TouchableOpacity
            key={option.id}
            style={styles.optionItem}
            onPress={option.onPress}
            activeOpacity={0.8}>
            <View style={styles.optionLeft}>
              <View style={styles.supportIcon}>
                <MaterialIcons name={option.icon} size={20} color="#6B7280" />
              </View>
              <Text style={styles.optionTitle}>{option.title}</Text>
            </View>
            <MaterialIcons name="chevron-right" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        ))}
      </View>

      {/* Logout */}
      <View style={styles.section}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <MaterialIcons name="logout" size={20} color="#EF4444" />
          <Text style={styles.logoutText}>Sair da Conta</Text>
        </TouchableOpacity>
      </View>

      {/* App Info */}
      <View style={styles.appInfo}>
        <Text style={styles.appVersion}>MediBook v1.0.0</Text>
        <Text style={styles.appCopyright}>© 2025 MediBook. Todos os direitos reservados.</Text>
      </View>

      <View style={styles.bottomSpacing} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    backgroundColor: '#3B82F6',
    paddingTop: 50,
    paddingHorizontal: 24,
    paddingBottom: 32,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  profileInfo: {
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 16,
  },
  editProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  editProfileText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '500',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginTop: -16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 2,
  },
  statTitle: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
    marginBottom: 2,
  },
  statSubtitle: {
    fontSize: 10,
    color: '#9CA3AF',
  },
  section: {
    paddingHorizontal: 24,
    marginTop: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  optionItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  optionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  supportIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    color: '#1F2937',
    fontWeight: '500',
    marginBottom: 2,
  },
  optionSubtitle: {
    fontSize: 12,
    color: '#6B7280',
  },
  logoutButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FEE2E2',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  logoutText: {
    fontSize: 16,
    color: '#EF4444',
    fontWeight: '600',
    marginLeft: 8,
  },
  appInfo: {
    alignItems: 'center',
    paddingHorizontal: 24,
    marginTop: 32,
  },
  appVersion: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  appCopyright: {
    fontSize: 10,
    color: '#D1D5DB',
    textAlign: 'center',
  },
  bottomSpacing: {
    height: 32,
  },
});

export default ProfileScreen;