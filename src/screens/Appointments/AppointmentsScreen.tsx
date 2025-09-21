import React, {useState} from 'react';
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

const {width} = Dimensions.get('window');

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
    {
      id: '4',
      type: 'procedimento',
      title: 'Cirurgia Menor',
      doctor: 'Dr. Carlos Lima',
      specialty: 'Cirurgia Geral',
      date: '2025-08-20',
      time: '09:00',
      hospital: 'Hospital Central',
      address: 'Av. Central, 100',
      status: 'cancelado',
    },
  ];

  const proximosAgendamentos = appointments.filter(
    app => app.status === 'agendado' || app.status === 'confirmado'
  );

  const historicoAgendamentos = appointments.filter(
    app => app.status === 'realizado' || app.status === 'cancelado'
  );

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'agendado':
        return { color: '#F59E0B', bg: '#FEF3C7', text: 'Agendado' };
      case 'confirmado':
        return { color: '#10B981', bg: '#D1FAE5', text: 'Confirmado' };
      case 'cancelado':
        return { color: '#EF4444', bg: '#FEE2E2', text: 'Cancelado' };
      case 'realizado':
        return { color: '#3B82F6', bg: '#DBEAFE', text: 'Realizado' };
      default:
        return { color: '#6B7280', bg: '#F3F4F6', text: status };
    }
  };

  const getTypeConfig = (type: string) => {
    switch (type) {
      case 'consulta':
        return { icon: 'medical-services', color: '#3B82F6' };
      case 'exame':
        return { icon: 'assignment', color: '#10B981' };
      case 'procedimento':
        return { icon: 'local-hospital', color: '#8B5CF6' };
      default:
        return { icon: 'event', color: '#6B7280' };
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
    });
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

  const renderAppointmentCard = (appointment: Appointment) => {
    const statusConfig = getStatusConfig(appointment.status);
    const typeConfig = getTypeConfig(appointment.type);

    return (
      <View key={appointment.id} style={styles.appointmentCard}>
        <View style={styles.cardHeader}>
          <View style={styles.typeContainer}>
            <View style={[styles.typeIcon, {backgroundColor: `${typeConfig.color}20`}]}>
              <MaterialIcons
                name={typeConfig.icon}
                size={20}
                color={typeConfig.color}
              />
            </View>
            <View style={styles.appointmentInfo}>
              <Text style={styles.appointmentTitle}>{appointment.title}</Text>
              {appointment.doctor && (
                <Text style={styles.doctorName}>{appointment.doctor}</Text>
              )}
              {appointment.specialty && (
                <Text style={styles.specialty}>{appointment.specialty}</Text>
              )}
            </View>
          </View>
          <View style={[styles.statusBadge, {backgroundColor: statusConfig.bg}]}>
            <Text style={[styles.statusText, {color: statusConfig.color}]}>
              {statusConfig.text}
            </Text>
          </View>
        </View>

        <View style={styles.cardDetails}>
          <View style={styles.detailRow}>
            <MaterialIcons name="today" size={16} color="#6B7280" />
            <Text style={styles.detailText}>
              {formatDate(appointment.date)} às {appointment.time}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <MaterialIcons name="location-on" size={16} color="#6B7280" />
            <Text style={styles.detailText}>
              {appointment.hospital}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <MaterialIcons name="place" size={16} color="#6B7280" />
            <Text style={styles.detailText}>
              {appointment.address}
            </Text>
          </View>
        </View>

        {(appointment.status === 'agendado' || appointment.status === 'confirmado') && (
          <View style={styles.cardActions}>
            <TouchableOpacity style={styles.actionButton}>
              <MaterialIcons name="edit" size={18} color="#3B82F6" />
              <Text style={styles.actionText}>Reagendar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <MaterialIcons name="directions" size={18} color="#10B981" />
              <Text style={[styles.actionText, {color: '#10B981'}]}>Direções</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, styles.cancelButton]}
              onPress={() => handleCancelAppointment(appointment.id)}>
              <MaterialIcons name="cancel" size={18} color="#EF4444" />
              <Text style={[styles.actionText, styles.cancelText]}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  const renderEmptyState = (type: 'proximos' | 'historico') => (
    <View style={styles.emptyState}>
      <View style={styles.emptyIconContainer}>
        <MaterialIcons 
          name={type === 'proximos' ? 'event-available' : 'history'} 
          size={64} 
          color="#E5E7EB" 
        />
      </View>
      <Text style={styles.emptyTitle}>
        {type === 'proximos' ? 'Nenhum agendamento próximo' : 'Sem histórico'}
      </Text>
      <Text style={styles.emptyText}>
        {type === 'proximos' 
          ? 'Você não tem consultas ou exames agendados'
          : 'Você ainda não tem histórico de agendamentos'
        }
      </Text>
      <TouchableOpacity style={styles.emptyButton}>
        <Text style={styles.emptyButtonText}>Agendar agora</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Meus Agendamentos</Text>
        <Text style={styles.headerSubtitle}>Gerencie suas consultas e exames</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'proximos' && styles.activeTab]}
          onPress={() => setActiveTab('proximos')}>
          <MaterialIcons 
            name="schedule" 
            size={20} 
            color={activeTab === 'proximos' ? '#3B82F6' : '#6B7280'} 
          />
          <Text style={[styles.tabText, activeTab === 'proximos' && styles.activeTabText]}>
            Próximos ({proximosAgendamentos.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'historico' && styles.activeTab]}
          onPress={() => setActiveTab('historico')}>
          <MaterialIcons 
            name="history" 
            size={20} 
            color={activeTab === 'historico' ? '#3B82F6' : '#6B7280'} 
          />
          <Text style={[styles.tabText, activeTab === 'historico' && styles.activeTabText]}>
            Histórico ({historicoAgendamentos.length})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'proximos' ? (
          proximosAgendamentos.length > 0 ? (
            proximosAgendamentos.map(renderAppointmentCard)
          ) : (
            renderEmptyState('proximos')
          )
        ) : (
          historicoAgendamentos.length > 0 ? (
            historicoAgendamentos.map(renderAppointmentCard)
          ) : (
            renderEmptyState('historico')
          )
        )}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </View>
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
    paddingBottom: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 24,
    marginTop: -12,
    borderRadius: 12,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#EFF6FF',
  },
  tabText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
    marginLeft: 8,
  },
  activeTabText: {
    color: '#3B82F6',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  appointmentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  typeContainer: {
    flexDirection: 'row',
    flex: 1,
    marginRight: 12,
  },
  typeIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  appointmentInfo: {
    flex: 1,
  },
  appointmentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  doctorName: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '600',
    marginBottom: 2,
  },
  specialty: {
    fontSize: 12,
    color: '#6B7280',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  cardDetails: {
    marginBottom: 16,
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#6B7280',
    flex: 1,
  },
  cardActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
    flex: 1,
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: '#FEE2E2',
  },
  actionText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#3B82F6',
    fontWeight: '500',
  },
  cancelText: {
    color: '#EF4444',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 32,
  },
  emptyIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  emptyButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  emptyButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  bottomSpacing: {
    height: 32,
  },
});

export default AppointmentsScreen;