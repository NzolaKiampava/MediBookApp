import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import {useAuth} from '../../context/AuthContext';

const ProfileScreen = () => {
  const {user, signOut} = useAuth();

  const profileOptions = [
    {
      id: 'personal',
      title: 'Dados Pessoais',
      icon: 'person' as const,
      onPress: () => Alert.alert('Em desenvolvimento', 'Esta funcionalidade será implementada em breve'),
    },
    {
      id: 'medical',
      title: 'Histórico Médico',
      icon: 'local-hospital' as const,
      onPress: () => Alert.alert('Em desenvolvimento', 'Esta funcionalidade será implementada em breve'),
    },
    {
      id: 'insurance',
      title: 'Plano de Saúde',
      icon: 'card-membership' as const,
      onPress: () => Alert.alert('Em desenvolvimento', 'Esta funcionalidade será implementada em breve'),
    },
    {
      id: 'notifications',
      title: 'Notificações',
      icon: 'notifications' as const,
      onPress: () => Alert.alert('Em desenvolvimento', 'Esta funcionalidade será implementada em breve'),
    },
    {
      id: 'privacy',
      title: 'Privacidade',
      icon: 'security' as const,
      onPress: () => Alert.alert('Em desenvolvimento', 'Esta funcionalidade será implementada em breve'),
    },
    {
      id: 'help',
      title: 'Ajuda e Suporte',
      icon: 'help' as const,
      onPress: () => Alert.alert('Em desenvolvimento', 'Esta funcionalidade será implementada em breve'),
    },
    {
      id: 'about',
      title: 'Sobre o App',
      icon: 'info' as const,
      onPress: () => Alert.alert('MediBook', 'Versão 1.0.0\n\nAplicativo de reservas hospitalares desenvolvido para facilitar o agendamento de consultas médicas, exames e procedimentos.'),
    },
  ];

  const handleLogout = () => {
    Alert.alert(
      'Sair',
      'Tem certeza que deseja sair da sua conta?',
      [
        {text: 'Cancelar', style: 'cancel'},
        {text: 'Sair', onPress: signOut, style: 'destructive'},
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header do perfil */}
      <View style={styles.profileHeader}>
        <View style={styles.avatarContainer}>
          <MaterialIcons name="account-circle" size={80} color="#4A90E2" />
        </View>
        <Text style={styles.userName}>{user?.nome}</Text>
        <Text style={styles.userEmail}>{user?.email}</Text>
      </View>

      {/* Informações rápidas */}
      <View style={styles.quickInfoContainer}>
        <View style={styles.quickInfoCard}>
          <Text style={styles.quickInfoNumber}>3</Text>
          <Text style={styles.quickInfoLabel}>Consultas</Text>
        </View>
        <View style={styles.quickInfoCard}>
          <Text style={styles.quickInfoNumber}>2</Text>
          <Text style={styles.quickInfoLabel}>Exames</Text>
        </View>
        <View style={styles.quickInfoCard}>
          <Text style={styles.quickInfoNumber}>5</Text>
          <Text style={styles.quickInfoLabel}>Total</Text>
        </View>
      </View>

      {/* Opções do perfil */}
      <View style={styles.optionsContainer}>
        {profileOptions.map(option => (
          <TouchableOpacity
            key={option.id}
            style={styles.optionItem}
            onPress={option.onPress}>
            <View style={styles.optionLeft}>
              <MaterialIcons name={option.icon} size={24} color="#4A90E2" />
              <Text style={styles.optionTitle}>{option.title}</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#666" />
          </TouchableOpacity>
        ))}
      </View>

      {/* Botão de logout */}
      <View style={styles.logoutContainer}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <MaterialIcons name="logout" size={24} color="#FF6B6B" />
          <Text style={styles.logoutText}>Sair da Conta</Text>
        </TouchableOpacity>
      </View>

      {/* Informações da versão */}
      <View style={styles.versionContainer}>
        <Text style={styles.versionText}>MediBook v1.0.0</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  profileHeader: {
    backgroundColor: '#4A90E2',
    padding: 30,
    alignItems: 'center',
  },
  avatarContainer: {
    marginBottom: 15,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: '#E8F4FD',
  },
  quickInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 20,
  },
  quickInfoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  quickInfoNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 5,
  },
  quickInfoLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  optionsContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  optionItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionTitle: {
    fontSize: 16,
    color: '#333',
    marginLeft: 15,
  },
  logoutContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FF6B6B',
  },
  logoutText: {
    fontSize: 16,
    color: '#FF6B6B',
    fontWeight: '600',
    marginLeft: 10,
  },
  versionContainer: {
    alignItems: 'center',
    paddingBottom: 30,
  },
  versionText: {
    fontSize: 12,
    color: '#999',
  },
});

export default ProfileScreen;