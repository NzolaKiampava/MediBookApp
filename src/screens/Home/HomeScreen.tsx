import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import {useAuth} from '../../context/AuthContext';

const {width} = Dimensions.get('window');

const HomeScreen = ({navigation}: any) => {
  const {user} = useAuth();

  const quickActions = [
    {
      id: 1,
      title: 'Nova Consulta',
      subtitle: 'Agendar consulta médica',
      icon: 'medical-services',
      color: '#3B82F6',
      gradient: ['#3B82F6', '#1D4ED8'],
      onPress: () => navigation.navigate('Booking'),
    },
    {
      id: 2,
      title: 'Agendar Exame',
      subtitle: 'Laboratório e diagnóstico',
      icon: 'assignment',
      color: '#10B981',
      gradient: ['#10B981', '#059669'],
      onPress: () => navigation.navigate('Booking'),
    },
    {
      id: 3,
      title: 'Buscar Hospital',
      subtitle: 'Encontrar unidades próximas',
      icon: 'local-hospital',
      color: '#F59E0B',
      gradient: ['#F59E0B', '#D97706'],
      onPress: () => navigation.navigate('Search'),
    },
    {
      id: 4,
      title: 'Minhas Consultas',
      subtitle: 'Histórico e agendamentos',
      icon: 'event',
      color: '#8B5CF6',
      gradient: ['#8B5CF6', '#7C3AED'],
      onPress: () => navigation.navigate('Appointments'),
    },
  ];

  const upcomingAppointments = [
    {
      id: 1,
      type: 'Consulta',
      title: 'Cardiologia',
      doctor: 'Dr. João Silva',
      date: '25/09/2025',
      time: '14:30',
      hospital: 'Hospital São Lucas',
      status: 'confirmado',
      color: '#3B82F6',
    },
    {
      id: 2,
      type: 'Exame',
      title: 'Hemograma Completo',
      date: '28/09/2025',
      time: '08:00',
      hospital: 'Lab Diagnóstica',
      status: 'agendado',
      color: '#10B981',
    },
  ];

  const healthTips = [
    {
      id: 1,
      icon: 'water-drop',
      title: 'Hidratação',
      tip: 'Beba pelo menos 2 litros de água por dia',
      color: '#06B6D4',
    },
    {
      id: 2,
      icon: 'fitness-center',
      title: 'Exercícios',
      tip: '30 minutos de atividade física diária',
      color: '#10B981',
    },
    {
      id: 3,
      icon: 'bedtime',
      title: 'Sono',
      tip: 'Durma de 7 a 9 horas por noite',
      color: '#8B5CF6',
    },
  ];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bom dia';
    if (hour < 18) return 'Boa tarde';
    return 'Boa noite';
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.greeting}>{getGreeting()},</Text>
            <Text style={styles.userName}>{user?.nome?.split(' ')[0] || 'Usuário'}</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <MaterialIcons name="notifications" size={24} color="#FFFFFF" />
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationBadgeText}>2</Text>
            </View>
          </TouchableOpacity>
        </View>
        <Text style={styles.headerSubtitle}>Como podemos cuidar da sua saúde hoje?</Text>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ações Rápidas</Text>
        <View style={styles.quickActionsGrid}>
          {quickActions.map(action => (
            <TouchableOpacity
              key={action.id}
              style={[styles.quickActionCard, {backgroundColor: action.color}]}
              onPress={action.onPress}
              activeOpacity={0.8}>
              <View style={styles.quickActionContent}>
                <MaterialIcons
                  name={action.icon}
                  size={28}
                  color="#FFFFFF"
                  style={styles.quickActionIcon}
                />
                <Text style={styles.quickActionTitle}>{action.title}</Text>
                <Text style={styles.quickActionSubtitle}>{action.subtitle}</Text>
              </View>
              <View style={styles.quickActionArrow}>
                <MaterialIcons name="arrow-forward" size={20} color="rgba(255, 255, 255, 0.8)" />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Upcoming Appointments */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Próximos Agendamentos</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Appointments')}>
            <Text style={styles.seeAllText}>Ver todos</Text>
          </TouchableOpacity>
        </View>
        
        {upcomingAppointments.map(appointment => (
          <View key={appointment.id} style={styles.appointmentCard}>
            <View style={[styles.appointmentIndicator, {backgroundColor: appointment.color}]} />
            <View style={styles.appointmentContent}>
              <View style={styles.appointmentHeader}>
                <View>
                  <Text style={styles.appointmentType}>{appointment.type}</Text>
                  <Text style={styles.appointmentTitle}>{appointment.title}</Text>
                  {appointment.doctor && (
                    <Text style={styles.appointmentDoctor}>{appointment.doctor}</Text>
                  )}
                </View>
                <View style={[styles.statusBadge, {backgroundColor: `${appointment.color}20`}]}>
                  <Text style={[styles.statusText, {color: appointment.color}]}>
                    {appointment.status}
                  </Text>
                </View>
              </View>
              <View style={styles.appointmentDetails}>
                <View style={styles.appointmentDetailItem}>
                  <MaterialIcons name="today" size={16} color="#6B7280" />
                  <Text style={styles.appointmentDetailText}>
                    {appointment.date} às {appointment.time}
                  </Text>
                </View>
                <View style={styles.appointmentDetailItem}>
                  <MaterialIcons name="location-on" size={16} color="#6B7280" />
                  <Text style={styles.appointmentDetailText}>{appointment.hospital}</Text>
                </View>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Health Tips */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Dicas de Saúde</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.healthTipsContainer}>
            {healthTips.map(tip => (
              <View key={tip.id} style={styles.healthTipCard}>
                <View style={[styles.healthTipIcon, {backgroundColor: `${tip.color}20`}]}>
                  <MaterialIcons name={tip.icon} size={24} color={tip.color} />
                </View>
                <Text style={styles.healthTipTitle}>{tip.title}</Text>
                <Text style={styles.healthTipText}>{tip.tip}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Bottom spacing */}
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
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  greeting: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  userName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#EF4444',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 22,
  },
  section: {
    paddingHorizontal: 24,
    marginTop: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  seeAllText: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '500',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    width: (width - 56) / 2,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quickActionContent: {
    flex: 1,
  },
  quickActionIcon: {
    marginBottom: 12,
  },
  quickActionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  quickActionSubtitle: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 16,
  },
  quickActionArrow: {
    marginLeft: 8,
  },
  appointmentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  appointmentIndicator: {
    width: 4,
  },
  appointmentContent: {
    flex: 1,
    padding: 16,
  },
  appointmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  appointmentType: {
    fontSize: 12,
    color: '#6B7280',
    textTransform: 'uppercase',
    fontWeight: '500',
    marginBottom: 2,
  },
  appointmentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 2,
  },
  appointmentDoctor: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '500',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  appointmentDetails: {
    gap: 8,
  },
  appointmentDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  appointmentDetailText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#6B7280',
  },
  healthTipsContainer: {
    flexDirection: 'row',
    paddingRight: 24,
  },
  healthTipCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginRight: 16,
    width: 160,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  healthTipIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  healthTipTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  healthTipText: {
    fontSize: 12,
    color: '#6B7280',
    lineHeight: 16,
  },
  bottomSpacing: {
    height: 32,
  },
});

export default HomeScreen;