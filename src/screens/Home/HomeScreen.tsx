import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useAuth} from '../../context/AuthContext';

const HomeScreen = ({navigation}: any) => {
  const {user} = useAuth();

  const quickActions = [
    {
      id: 1,
      title: 'Nova Consulta',
      icon: '🩺',
      color: '#4A90E2',
      onPress: () => navigation.navigate('Booking'),
    },
    {
      id: 2,
      title: 'Agendar Exame',
      icon: '📋',
      color: '#50C878',
      onPress: () => navigation.navigate('Booking'),
    },
    {
      id: 3,
      title: 'Buscar Hospital',
      icon: '🏥',
      color: '#FF6B6B',
      onPress: () => navigation.navigate('Search'),
    },
    {
      id: 4,
      title: 'Minhas Consultas',
      icon: '📅',
      color: '#FFD93D',
      onPress: () => navigation.navigate('Appointments'),
    },
  ];

  const recentBookings = [
    {
      id: 1,
      type: 'Consulta Médica',
      doctor: 'Dr. João Silva',
      specialty: 'Cardiologia',
      date: '25/09/2025',
      time: '14:30',
      hospital: 'Hospital São Lucas',
    },
    {
      id: 2,
      type: 'Exame',
      exam: 'Hemograma Completo',
      date: '28/09/2025',
      time: '08:00',
      hospital: 'Laboratório Diagnóstica',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header de boas-vindas */}
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Olá, {user?.nome}!</Text>
        <Text style={styles.subtitleText}>
          Como podemos ajudá-lo hoje?
        </Text>
      </View>

      {/* Ações rápidas */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ações Rápidas</Text>
        <View style={styles.quickActionsGrid}>
          {quickActions.map(action => (
            <TouchableOpacity
              key={action.id}
              style={[styles.quickActionCard, {borderLeftColor: action.color}]}
              onPress={action.onPress}>
              <Text style={[styles.quickActionIcon, {color: action.color}]}>
                {action.icon}
              </Text>
              <Text style={styles.quickActionTitle}>{action.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Agendamentos recentes */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Próximos Agendamentos</Text>
        {recentBookings.map(booking => (
          <View key={booking.id} style={styles.bookingCard}>
            <View style={styles.bookingHeader}>
              <Text style={styles.bookingType}>{booking.type}</Text>
              <Text style={styles.bookingDate}>
                {booking.date} às {booking.time}
              </Text>
            </View>
            <Text style={styles.bookingDetails}>
              {booking.doctor || booking.exam}
            </Text>
            {booking.specialty && (
              <Text style={styles.bookingSpecialty}>{booking.specialty}</Text>
            )}
            <Text style={styles.bookingHospital}>{booking.hospital}</Text>
          </View>
        ))}
      </View>

      {/* Dicas de saúde */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Dicas de Saúde</Text>
        <View style={styles.tipCard}>
          <Text style={[styles.tipIcon, {color: '#FFD93D'}]}>💡</Text>
          <Text style={styles.tipText}>
            Lembre-se de beber pelo menos 2 litros de água por dia!
          </Text>
        </View>
        <View style={styles.tipCard}>
          <Text style={[styles.tipIcon, {color: '#50C878'}]}>🏋️</Text>
          <Text style={styles.tipText}>
            30 minutos de exercício por dia fazem toda a diferença.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    backgroundColor: '#4A90E2',
    padding: 20,
    paddingTop: 40,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  subtitleText: {
    fontSize: 16,
    color: '#E8F4FD',
  },
  section: {
    margin: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    width: '48%',
    marginBottom: 10,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  quickActionIcon: {
    marginBottom: 8,
    fontSize: 24,
  },
  quickActionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  bookingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  bookingType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
  bookingDate: {
    fontSize: 14,
    color: '#666',
  },
  bookingDetails: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  bookingSpecialty: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  bookingHospital: {
    fontSize: 14,
    color: '#666',
  },
  tipCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tipText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: '#333',
  },
  tipIcon: {
    fontSize: 20,
  },
});

export default HomeScreen;