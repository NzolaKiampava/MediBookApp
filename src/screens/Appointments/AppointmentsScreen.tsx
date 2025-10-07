import React, {useMemo, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {MaterialIcons} from '@expo/vector-icons';

import {colors, gradients} from '../../theme/colors';

type AppointmentType = 'consulta' | 'exame' | 'procedimento';

type AppointmentStatus = 'agendado' | 'confirmado' | 'cancelado' | 'realizado';

type Appointment = {
  id: string;
  type: AppointmentType;
  title: string;
  doctor?: string;
  specialty?: string;
  date: string;
  time: string;
  hospital: string;
  address: string;
  status: AppointmentStatus;
};

type TabKey = 'proximos' | 'historico';

type TypeVisual = {
  icon: keyof typeof MaterialIcons.glyphMap;
  color: string;
  label: string;
};

type StatusVisual = {
  color: string;
  background: string;
  label: string;
};

const typeVisuals: Record<AppointmentType, TypeVisual> = {
  consulta: {
    icon: 'medical-services',
    color: colors.primary,
    label: 'Consulta',
  },
  exame: {
    icon: 'biotech',
    color: colors.success,
    label: 'Exame',
  },
  procedimento: {
    icon: 'healing',
    color: '#6C2BD9',
    label: 'Procedimento',
  },
};

const statusVisuals: Record<AppointmentStatus, StatusVisual> = {
  agendado: {
    color: colors.warning,
    background: '#FEF3C7',
    label: 'Agendado',
  },
  confirmado: {
    color: colors.success,
    background: '#D1FAE5',
    label: 'Confirmado',
  },
  cancelado: {
    color: colors.danger,
    background: '#FEE2E2',
    label: 'Cancelado',
  },
  realizado: {
    color: colors.primary,
    background: '#DBEAFE',
    label: 'Realizado',
  },
};

const appointmentsData: Appointment[] = [
  {
    id: '1',
    type: 'consulta',
    title: 'Consulta cardiológica',
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
    title: 'Hemograma completo',
    date: '2025-09-28',
    time: '08:00',
    hospital: 'Laboratório Diagnóstica',
    address: 'Av. Principal, 456',
    status: 'agendado',
  },
  {
    id: '3',
    type: 'consulta',
    title: 'Consulta dermatológica',
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
    title: 'Microcirurgia ambulatorial',
    doctor: 'Dr. Carlos Lima',
    specialty: 'Cirurgia Geral',
    date: '2025-08-20',
    time: '09:00',
    hospital: 'Hospital Central',
    address: 'Av. Central, 100',
    status: 'cancelado',
  },
];

const formatDate = (isoDate: string) => {
  const date = new Date(isoDate);
  return new Intl.DateTimeFormat('pt-BR', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
  }).format(date);
};

const AppointmentsScreen = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('proximos');

  const upcomingAppointments = useMemo(
    () =>
      appointmentsData.filter(appointment =>
        appointment.status === 'agendado' || appointment.status === 'confirmado',
      ),
    [],
  );

  const historicalAppointments = useMemo(
    () =>
      appointmentsData.filter(appointment =>
        appointment.status === 'realizado' || appointment.status === 'cancelado',
      ),
    [],
  );

  const handleCancelAppointment = (appointmentId: string) => {
    Alert.alert(
      'Cancelar agendamento',
      'Tem certeza de que deseja cancelar este agendamento?',
      [
        {text: 'Manter', style: 'cancel'},
        {text: 'Cancelar', style: 'destructive', onPress: () => console.log('Cancelar', appointmentId)},
      ],
    );
  };

  const renderAppointmentCard = (appointment: Appointment) => {
    const typeConfig = typeVisuals[appointment.type];
    const statusConfig = statusVisuals[appointment.status];

    return (
      <View key={appointment.id} style={styles.appointmentCard}>
        <View style={styles.cardHeader}>
          <View style={styles.cardTypeArea}>
            <View style={[styles.typeBadge, {backgroundColor: `${typeConfig.color}1A`}]}>
              <MaterialIcons name={typeConfig.icon} size={20} color={typeConfig.color} />
            </View>
            <View style={styles.cardTitleGroup}>
              <Text style={styles.cardTitle}>{appointment.title}</Text>
              <Text style={[styles.cardLabel, {color: typeConfig.color}]}>{typeConfig.label}</Text>
            </View>
          </View>
          <View style={[styles.statusChip, {backgroundColor: statusConfig.background}]}>
            <MaterialIcons name="event-available" size={16} color={statusConfig.color} />
            <Text style={[styles.statusText, {color: statusConfig.color}]}>{statusConfig.label}</Text>
          </View>
        </View>

        <View style={styles.cardBody}>
          {appointment.doctor && (
            <View style={styles.infoRow}>
              <MaterialIcons name="person-outline" size={16} color={colors.muted} />
              <Text style={styles.infoText}>{appointment.doctor}</Text>
            </View>
          )}
          {appointment.specialty && (
            <View style={styles.infoRow}>
              <MaterialIcons name="local-hospital" size={16} color={colors.muted} />
              <Text style={styles.infoText}>{appointment.specialty}</Text>
            </View>
          )}
          <View style={styles.infoRow}>
            <MaterialIcons name="today" size={16} color={colors.muted} />
            <Text style={styles.infoText}>
              {formatDate(appointment.date)} · {appointment.time}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <MaterialIcons name="business" size={16} color={colors.muted} />
            <Text style={styles.infoText}>{appointment.hospital}</Text>
          </View>
          <View style={styles.infoRow}>
            <MaterialIcons name="place" size={16} color={colors.muted} />
            <Text style={styles.infoText}>{appointment.address}</Text>
          </View>
        </View>

        {(appointment.status === 'agendado' || appointment.status === 'confirmado') && (
          <View style={styles.cardActions}>
            <TouchableOpacity style={styles.actionButton}>
              <MaterialIcons name="edit" size={18} color={colors.primary} />
              <Text style={[styles.actionText, {color: colors.primary}]}>Reagendar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <MaterialIcons name="directions" size={18} color={colors.success} />
              <Text style={[styles.actionText, {color: colors.success}]}>Direções</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleCancelAppointment(appointment.id)}>
              <MaterialIcons name="cancel" size={18} color={colors.danger} />
              <Text style={[styles.actionText, {color: colors.danger}]}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  const renderEmptyState = (tab: TabKey) => (
    <View style={styles.emptyState}>
      <View style={styles.emptyIconWrapper}>
        <MaterialIcons
          name={tab === 'proximos' ? 'event-available' : 'history'}
          size={56}
          color="rgba(15,107,168,0.25)"
        />
      </View>
      <Text style={styles.emptyTitle}>
        {tab === 'proximos' ? 'Nenhum compromisso próximo' : 'Sem registros anteriores'}
      </Text>
      <Text style={styles.emptyDescription}>
        {tab === 'proximos'
          ? 'Agende uma nova consulta ou exame para ver os detalhes aqui.'
          : 'Quando finalizar um atendimento ele aparecerá nesta seção.'}
      </Text>
      <TouchableOpacity style={styles.emptyButton} activeOpacity={0.85}>
        <Text style={styles.emptyButtonText}>Agendar agora</Text>
      </TouchableOpacity>
    </View>
  );

  const activeList = activeTab === 'proximos' ? upcomingAppointments : historicalAppointments;

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <LinearGradient colors={gradients.primary} style={styles.heroBanner}>
          <Text style={styles.heroEyebrow}>Meus cuidados</Text>
          <Text style={styles.heroTitle}>Acompanhe consultas, exames e procedimentos em um único lugar.</Text>
          <View style={styles.heroHighlights}>
            <View style={styles.highlightCard}>
              <Text style={styles.highlightValue}>{upcomingAppointments.length}</Text>
              <Text style={styles.highlightLabel}>Agendamentos ativos</Text>
            </View>
            <View style={styles.highlightCard}>
              <Text style={styles.highlightValue}>{historicalAppointments.length}</Text>
              <Text style={styles.highlightLabel}>Registros anteriores</Text>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.tabBar}>
          {(['proximos', 'historico'] as TabKey[]).map(tabKey => (
            <TouchableOpacity
              key={tabKey}
              style={[styles.tabButton, activeTab === tabKey && styles.tabButtonActive]}
              onPress={() => setActiveTab(tabKey)}
              activeOpacity={0.85}>
              <MaterialIcons
                name={tabKey === 'proximos' ? 'schedule' : 'history'}
                size={18}
                color={activeTab === tabKey ? '#FFFFFF' : colors.subsection}
              />
              <Text style={[styles.tabLabel, activeTab === tabKey && styles.tabLabelActive]}>
                {tabKey === 'proximos'
                  ? `Próximos (${upcomingAppointments.length})`
                  : `Histórico (${historicalAppointments.length})`}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.listArea}>
          {activeList.length > 0
            ? activeList.map(renderAppointmentCard)
            : renderEmptyState(activeTab)}
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
  heroBanner: {
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 36,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    gap: 18,
  },
  heroEyebrow: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.82)',
    fontWeight: '600',
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    lineHeight: 28,
  },
  heroHighlights: {
    flexDirection: 'row',
    gap: 16,
  },
  highlightCard: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: 18,
    padding: 18,
  },
  highlightValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  highlightLabel: {
    marginTop: 6,
    fontSize: 12,
    color: 'rgba(255,255,255,0.82)',
  },
  tabBar: {
    flexDirection: 'row',
    marginHorizontal: 24,
    marginTop: -18,
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: 6,
    shadowColor: '#0F172A',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 6,
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderRadius: 14,
  },
  tabButtonActive: {
    backgroundColor: colors.primary,
  },
  tabLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.subsection,
  },
  tabLabelActive: {
    color: '#FFFFFF',
  },
  listArea: {
    paddingHorizontal: 24,
    paddingTop: 28,
    gap: 18,
  },
  appointmentCard: {
    backgroundColor: colors.surface,
    borderRadius: 22,
    padding: 20,
    shadowColor: '#0F172A',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 5,
    gap: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTypeArea: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  typeBadge: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitleGroup: {
    flex: 1,
    gap: 4,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  cardLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  statusChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  cardBody: {
    gap: 10,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: colors.subsection,
  },
  cardActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#E2E8F0',
  },
  actionText: {
    fontSize: 13,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 24,
    backgroundColor: colors.surface,
    borderRadius: 22,
    shadowColor: '#0F172A',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.06,
    shadowRadius: 14,
    elevation: 4,
  },
  emptyIconWrapper: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyDescription: {
    fontSize: 13,
    color: colors.muted,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 18,
  },
  emptyButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 999,
  },
  emptyButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
});

export default AppointmentsScreen;