import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';

interface Appointment {
  id: string;
  type: 'consulta' | 'exame' | 'procedimento';
  title: string;
  doctor?: string;
  specialty?: string;
  date: string;
  time: string;
  hospital: string;
  address: string;
  status: 'agendado' | 'confirmado' | 'cancelado' | 'realizado';
}

const AppointmentsScreen = () => {
  const [activeTab, setActiveTab] = useState<'proximos' | 'historico'>('proximos');

  // Dados mock de agendamentos
  const appointments: Appointment[] = [
    {
      id: '1',
      type: 'consulta',
      title: 'Consulta Cardiológica',
      doctor: 'Dr. João Silva',
      specialty: 'Cardiologia',
      date: '2025-09-25',
      time: '14:30',
      hospital: 'Hospital São Lucas',
      address: 'Rua das Flores, 123',
      status: 'confirmado',
    },
    {
      id: '2',
      type: 'exame',
      title: 'Hemograma Completo',
      date: '2025-09-28',
      time: '08:00',
      hospital: 'Laboratório Diagnóstica',
      address: 'Av. Principal, 456',
      status: 'agendado',
    },
    {
      id: '3',
      type: 'consulta',
      title: 'Consulta Dermatológica',
      doctor: 'Dra. Maria Santos',
      specialty: 'Dermatologia',
      date: '2025-09-15',
      time: '10:00',
      hospital: 'Clínica Vida Nova',
      address: 'Rua da Saúde, 789',
      status: 'realizado',
    },
  ];

  const proximosAgendamentos = appointments.filter(
    app => app.status === 'agendado' || app.status === 'confirmado'
  );

  const historicoAgendamentos = appointments.filter(
    app => app.status === 'realizado' || app.status === 'cancelado'
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'agendado':
        return '#FFD93D';
      case 'confirmado':
        return '#50C878';
      case 'cancelado':
        return '#FF6B6B';
      case 'realizado':
        return '#4A90E2';
      default:
        return '#666';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'agendado':
        return 'Agendado';
      case 'confirmado':
        return 'Confirmado';
      case 'cancelado':
        return 'Cancelado';
      case 'realizado':
        return 'Realizado';
      default:
        return status;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'consulta':
        return 'medical-services';
      case 'exame':
        return 'assignment';
      case 'procedimento':
        return 'local-hospital';
      default:
        return 'event';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const handleCancelAppointment = (appointmentId: string) => {
    Alert.alert(
      'Cancelar Agendamento',
      'Tem certeza que deseja cancelar este agendamento?',
      [
        {text: 'Não', style: 'cancel'},
        {text: 'Sim', onPress: () => console.log('Agendamento cancelado')},
      ]
    );
  };

  const renderAppointmentCard = (appointment: Appointment) => (
    <View key={appointment.id} style={styles.appointmentCard}>
      <View style={styles.cardHeader}>
        <View style={styles.titleContainer}>
          <MaterialIcons
            name={getTypeIcon(appointment.type)}
            size={24}
            color="#4A90E2"
            style={styles.typeIcon}
          />
          <View style={styles.titleText}>
            <Text style={styles.appointmentTitle}>{appointment.title}</Text>
            {appointment.doctor && (
              <Text style={styles.doctorName}>{appointment.doctor}</Text>
            )}
            {appointment.specialty && (
              <Text style={styles.specialty}>{appointment.specialty}</Text>
            )}
          </View>
        </View>
        <View
          style={[
            styles.statusBadge,
            {backgroundColor: getStatusColor(appointment.status)},
          ]}>
          <Text style={styles.statusText}>
            {getStatusText(appointment.status)}
          </Text>
        </View>
      </View>

      <View style={styles.cardDetails}>
        <View style={styles.detailRow}>
          <MaterialIcons name="today" size={16} color="#666" />
          <Text style={styles.detailText}>
            {formatDate(appointment.date)} às {appointment.time}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <MaterialIcons name="location-on" size={16} color="#666" />
          <Text style={styles.detailText}>
            {appointment.hospital} - {appointment.address}
          </Text>
        </View>
      </View>

      {(appointment.status === 'agendado' || appointment.status === 'confirmado') && (
        <View style={styles.cardActions}>
          <TouchableOpacity style={styles.actionButton}>
            <MaterialIcons name="edit" size={18} color="#4A90E2" />
            <Text style={styles.actionText}>Reagendar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.cancelButton]}
            onPress={() => handleCancelAppointment(appointment.id)}>
            <MaterialIcons name="cancel" size={18} color="#FF6B6B" />
            <Text style={[styles.actionText, styles.cancelText]}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'proximos' && styles.activeTab,
          ]}
          onPress={() => setActiveTab('proximos')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'proximos' && styles.activeTabText,
            ]}>
            Próximos
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'historico' && styles.activeTab,
          ]}
          onPress={() => setActiveTab('historico')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'historico' && styles.activeTabText,
            ]}>
            Histórico
          </Text>
        </TouchableOpacity>
      </View>

      {/* Lista de agendamentos */}
      <ScrollView style={styles.content}>
        {activeTab === 'proximos' ? (
          proximosAgendamentos.length > 0 ? (
            proximosAgendamentos.map(renderAppointmentCard)
          ) : (
            <View style={styles.emptyState}>
              <MaterialIcons name="event-available" size={64} color="#E1E1E1" />
              <Text style={styles.emptyText}>
                Você não tem agendamentos próximos
              </Text>
            </View>
          )
        ) : (
          historicoAgendamentos.length > 0 ? (
            historicoAgendamentos.map(renderAppointmentCard)
          ) : (
            <View style={styles.emptyState}>
              <MaterialIcons name="history" size={64} color="#E1E1E1" />
              <Text style={styles.emptyText}>
                Você não tem histórico de agendamentos
              </Text>
            </View>
          )
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E1E1E1',
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#4A90E2',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
  },
  activeTabText: {
    color: '#4A90E2',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  appointmentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  titleContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  typeIcon: {
    marginRight: 10,
    marginTop: 2,
  },
  titleText: {
    flex: 1,
  },
  appointmentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  doctorName: {
    fontSize: 14,
    color: '#4A90E2',
    fontWeight: '600',
    marginBottom: 2,
  },
  specialty: {
    fontSize: 12,
    color: '#666',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  cardDetails: {
    marginBottom: 15,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 6,
    backgroundColor: '#F8F9FA',
    flex: 1,
    marginHorizontal: 5,
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: '#FFF0F0',
  },
  actionText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#4A90E2',
    fontWeight: '600',
  },
  cancelText: {
    color: '#FF6B6B',
  },
  emptyState: {
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    marginTop: 16,
    textAlign: 'center',
  },
});

export default AppointmentsScreen;