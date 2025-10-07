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

type ServiceId = 'consulta' | 'exame' | 'procedimento';

type ServiceOption = {
  id: ServiceId;
  title: string;
  subtitle: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  gradient: string[];
};

type HospitalOption = {
  id: string;
  name: string;
  distance: string;
  rating: number;
  address: string;
};

const services: ServiceOption[] = [
  {
    id: 'consulta',
    title: 'Consulta médica',
    subtitle: 'Atendimento com especialistas',
    icon: 'medical-services',
    gradient: gradients.primary,
  },
  {
    id: 'exame',
    title: 'Exames e diagnósticos',
    subtitle: 'Laboratório e imagem com agilidade',
    icon: 'biotech',
    gradient: ['#1CB09A', '#119B84'],
  },
  {
    id: 'procedimento',
    title: 'Procedimentos clínicos',
    subtitle: 'Tratamentos e pequenas cirurgias',
    icon: 'healing',
    gradient: ['#6650F2', '#4C3BD6'],
  },
];

const hospitals: HospitalOption[] = [
  {
    id: '1',
    name: 'Hospital São Lucas',
    distance: '2.3 km',
    rating: 4.5,
    address: 'Rua das Flores, 123',
  },
  {
    id: '2',
    name: 'Hospital Santa Maria',
    distance: '3.1 km',
    rating: 4.2,
    address: 'Av. Principal, 456',
  },
  {
    id: '3',
    name: 'Clínica Vida Nova',
    distance: '1.8 km',
    rating: 4.0,
    address: 'Rua da Saúde, 789',
  },
];

const availableDates = ['2025-09-25', '2025-09-26', '2025-09-27', '2025-09-30', '2025-10-01'];

const availableTimes = ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'];

const formatDate = (isoDate: string) => {
  const date = new Date(isoDate);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  if (date.toDateString() === today.toDateString()) {
    return 'Hoje';
  }
  if (date.toDateString() === tomorrow.toDateString()) {
    return 'Amanhã';
  }

  return new Intl.DateTimeFormat('pt-BR', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
  }).format(date);
};

const getLongDate = (isoDate: string) =>
  new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date(isoDate));

const BookingScreen = () => {
  const [selectedService, setSelectedService] = useState<ServiceId | null>(null);
  const [selectedHospital, setSelectedHospital] = useState<HospitalOption['id'] | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const stepProgress = useMemo(() => {
    if (!selectedService) return 1;
    if (!selectedHospital) return 2;
    if (!selectedDate) return 3;
    if (!selectedTime) return 4;
    return 5;
  }, [selectedDate, selectedHospital, selectedService, selectedTime]);

  const handleBooking = () => {
    if (!selectedService || !selectedHospital || !selectedDate || !selectedTime) {
      Alert.alert('Campos incompletos', 'Por favor, finalize as etapas do agendamento antes de confirmar.');
      return;
    }

    Alert.alert('Agendamento confirmado', 'Você receberá os detalhes no seu e-mail cadastrado.', [
      {
        text: 'Concluir',
        onPress: () => {
          setSelectedService(null);
          setSelectedHospital(null);
          setSelectedDate(null);
          setSelectedTime(null);
        },
      },
    ]);
  };

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <LinearGradient colors={gradients.primary} style={styles.heroBanner}>
          <Text style={styles.heroEyebrow}>Novo agendamento</Text>
          <Text style={styles.heroTitle}>Monte sua consulta, exame ou procedimento em cinco passos guiados.</Text>
          <View style={styles.progressWrapper}>
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, {width: `${(stepProgress / 5) * 100}%`}]} />
            </View>
            <Text style={styles.progressLabel}>Passo {stepProgress} de 5</Text>
          </View>
          <View style={styles.stepperRow}>
            {[1, 2, 3, 4, 5].map(step => (
              <View
                key={step}
                style={[
                  styles.stepPill,
                  stepProgress >= step ? styles.stepPillActive : undefined,
                ]}>
                <Text
                  style={[
                    styles.stepPillText,
                    stepProgress >= step ? styles.stepPillTextActive : undefined,
                  ]}>
                  {step}
                </Text>
              </View>
            ))}
          </View>
        </LinearGradient>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionBadge}>
              <Text style={styles.sectionBadgeText}>1</Text>
            </View>
            <Text style={styles.sectionTitle}>Escolha o tipo de serviço</Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.serviceRow}>
            {services.map(service => (
              <LinearGradient key={service.id} colors={service.gradient} style={styles.serviceCard}>
                <TouchableOpacity
                  style={[styles.serviceContent, selectedService === service.id && styles.serviceContentActive]}
                  onPress={() => {
                    setSelectedService(service.id);
                    setSelectedHospital(null);
                    setSelectedDate(null);
                    setSelectedTime(null);
                  }}
                  activeOpacity={0.9}>
                  <View style={styles.serviceIconWrapper}>
                    <MaterialIcons name={service.icon} size={26} color="#FFFFFF" />
                  </View>
                  <Text style={styles.serviceTitle}>{service.title}</Text>
                  <Text style={styles.serviceSubtitle}>{service.subtitle}</Text>
                  {selectedService === service.id && (
                    <View style={styles.serviceCheck}>
                      <MaterialIcons name="check-circle" size={20} color="#FFFFFF" />
                    </View>
                  )}
                </TouchableOpacity>
              </LinearGradient>
            ))}
          </ScrollView>
        </View>

        {selectedService && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionBadge}>
                <Text style={styles.sectionBadgeText}>2</Text>
              </View>
              <Text style={styles.sectionTitle}>Selecione a unidade de atendimento</Text>
            </View>
            <View style={styles.hospitalList}>
              {hospitals.map(hospital => {
                const isActive = selectedHospital === hospital.id;
                return (
                  <TouchableOpacity
                    key={hospital.id}
                    style={[styles.hospitalCard, isActive && styles.hospitalCardActive]}
                    onPress={() => {
                      setSelectedHospital(hospital.id);
                      setSelectedDate(null);
                      setSelectedTime(null);
                    }}
                    activeOpacity={0.85}>
                    <View style={styles.hospitalInfoRow}>
                      <View style={styles.hospitalIcon}>
                        <MaterialIcons name="local-hospital" size={20} color={colors.primary} />
                      </View>
                      <View style={styles.hospitalTextGroup}>
                        <Text style={styles.hospitalName}>{hospital.name}</Text>
                        <Text style={styles.hospitalAddress}>{hospital.address}</Text>
                        <View style={styles.hospitalMetaRow}>
                          <View style={styles.ratingChip}>
                            <MaterialIcons name="star" size={14} color={colors.warning} />
                            <Text style={styles.ratingText}>{hospital.rating}</Text>
                          </View>
                          <Text style={styles.distanceText}>{hospital.distance}</Text>
                        </View>
                      </View>
                    </View>
                    {isActive && <MaterialIcons name="check-circle" size={20} color={colors.primary} />}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}

        {selectedHospital && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionBadge}>
                <Text style={styles.sectionBadgeText}>3</Text>
              </View>
              <Text style={styles.sectionTitle}>Defina a data da consulta</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.dateRow}>
                {availableDates.map(date => {
                  const isActive = selectedDate === date;
                  return (
                    <TouchableOpacity
                      key={date}
                      style={[styles.dateCard, isActive && styles.dateCardActive]}
                      onPress={() => {
                        setSelectedDate(date);
                        setSelectedTime(null);
                      }}
                      activeOpacity={0.85}>
                      <Text style={[styles.dateLabel, isActive && styles.dateLabelActive]}>{formatDate(date)}</Text>
                      <Text style={[styles.dateNumber, isActive && styles.dateNumberActive]}>
                        {new Date(date).getDate()}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ScrollView>
          </View>
        )}

        {selectedDate && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionBadge}>
                <Text style={styles.sectionBadgeText}>4</Text>
              </View>
              <Text style={styles.sectionTitle}>Selecione o horário disponível</Text>
            </View>
            <View style={styles.timeGrid}>
              {availableTimes.map(time => {
                const isActive = selectedTime === time;
                return (
                  <TouchableOpacity
                    key={time}
                    style={[styles.timeCard, isActive && styles.timeCardActive]}
                    onPress={() => setSelectedTime(time)}
                    activeOpacity={0.85}>
                    <MaterialIcons
                      name="schedule"
                      size={18}
                      color={isActive ? colors.primary : colors.subsection}
                    />
                    <Text style={[styles.timeText, isActive && styles.timeTextActive]}>{time}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}

        {selectedTime && selectedDate && selectedHospital && selectedService && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionBadge}>
                <Text style={styles.sectionBadgeText}>5</Text>
              </View>
              <Text style={styles.sectionTitle}>Revise antes de confirmar</Text>
            </View>
            <View style={styles.summaryCard}>
              <View style={styles.summaryHeader}>
                <MaterialIcons name="event" size={22} color={colors.primary} />
                <Text style={styles.summaryTitle}>Resumo do agendamento</Text>
              </View>
              <View style={styles.summaryList}>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Serviço</Text>
                  <Text style={styles.summaryValue}>
                    {services.find(service => service.id === selectedService)?.title}
                  </Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Local</Text>
                  <Text style={styles.summaryValue}>
                    {hospitals.find(hospital => hospital.id === selectedHospital)?.name}
                  </Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Data</Text>
                  <Text style={styles.summaryValue}>{getLongDate(selectedDate)}</Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Horário</Text>
                  <Text style={styles.summaryValue}>{selectedTime}</Text>
                </View>
              </View>
            </View>

            <TouchableOpacity style={styles.confirmButton} onPress={handleBooking} activeOpacity={0.9}>
              <MaterialIcons name="check" size={20} color="#FFFFFF" />
              <Text style={styles.confirmButtonText}>Confirmar agendamento</Text>
            </TouchableOpacity>
          </View>
        )}
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
    paddingBottom: 32,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    gap: 20,
  },
  heroEyebrow: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '600',
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    lineHeight: 28,
  },
  progressWrapper: {
    gap: 8,
  },
  progressTrack: {
    width: '100%',
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: 999,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 999,
  },
  progressLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.82)',
    fontWeight: '500',
  },
  stepperRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  stepPill: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepPillActive: {
    backgroundColor: '#FFFFFF',
  },
  stepPillText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.8)',
  },
  stepPillTextActive: {
    color: colors.primaryDark,
  },
  section: {
    paddingHorizontal: 24,
    paddingTop: 28,
    gap: 18,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  sectionBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E0F2FE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionBadgeText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
  },
  sectionTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  serviceRow: {
    gap: 16,
    paddingRight: 10,
  },
  serviceCard: {
    width: 240,
    borderRadius: 22,
    padding: 1,
    shadowColor: '#0F172A',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 6,
  },
  serviceContent: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 22,
    padding: 18,
    gap: 14,
    minHeight: 180,
  },
  serviceContentActive: {
    backgroundColor: 'rgba(255,255,255,0.32)',
  },
  serviceIconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  serviceSubtitle: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.85)',
    lineHeight: 16,
  },
  serviceCheck: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  hospitalList: {
    gap: 14,
  },
  hospitalCard: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
    shadowColor: '#0F172A',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 5,
  },
  hospitalCardActive: {
    borderWidth: 2,
    borderColor: colors.primary,
  },
  hospitalInfoRow: {
    flexDirection: 'row',
    gap: 14,
    flex: 1,
  },
  hospitalIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#E0F2FE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hospitalTextGroup: {
    flex: 1,
    gap: 6,
  },
  hospitalName: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
  },
  hospitalAddress: {
    fontSize: 13,
    color: colors.muted,
  },
  hospitalMetaRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  ratingChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#B45309',
  },
  distanceText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
  },
  dateRow: {
    flexDirection: 'row',
    gap: 14,
    paddingRight: 20,
  },
  dateCard: {
    width: 92,
    borderRadius: 18,
    backgroundColor: colors.surface,
    paddingVertical: 14,
    alignItems: 'center',
    gap: 6,
    shadowColor: '#0F172A',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  dateCardActive: {
    backgroundColor: '#E0F2FE',
    borderWidth: 2,
    borderColor: colors.primary,
  },
  dateLabel: {
    fontSize: 12,
    color: colors.muted,
    textTransform: 'capitalize',
  },
  dateLabelActive: {
    color: colors.primaryDark,
    fontWeight: '700',
  },
  dateNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.subsection,
  },
  dateNumberActive: {
    color: colors.primaryDark,
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  timeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 14,
    backgroundColor: colors.surface,
    shadowColor: '#0F172A',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  timeCardActive: {
    backgroundColor: '#E0F2FE',
    borderWidth: 2,
    borderColor: colors.primary,
  },
  timeText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.subsection,
  },
  timeTextActive: {
    color: colors.primaryDark,
  },
  summaryCard: {
    backgroundColor: colors.surface,
    borderRadius: 22,
    padding: 20,
    gap: 16,
    shadowColor: '#0F172A',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 5,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  summaryList: {
    gap: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 18,
  },
  summaryLabel: {
    fontSize: 14,
    color: colors.muted,
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.subsection,
    textAlign: 'right',
    flex: 1,
  },
  confirmButton: {
    marginTop: 8,
    backgroundColor: colors.primary,
    borderRadius: 18,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    shadowColor: '#0F172A',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 6,
  },
  confirmButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

export default BookingScreen;