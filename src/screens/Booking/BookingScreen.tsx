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

const BookingScreen = () => {
  const [selectedService, setSelectedService] = useState('');
  const [selectedHospital, setSelectedHospital] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const services = [
    {
      id: 'consulta',
      title: 'Consulta Médica',
      subtitle: 'Atendimento com especialistas',
      icon: 'medical-services',
      color: '#3B82F6',
    },
    {
      id: 'exame',
      title: 'Exame',
      subtitle: 'Laboratório e diagnóstico',
      icon: 'assignment',
      color: '#10B981',
    },
    {
      id: 'procedimento',
      title: 'Procedimento',
      subtitle: 'Cirurgias e tratamentos',
      icon: 'local-hospital',
      color: '#8B5CF6',
    },
  ];

  const hospitals = [
    {
      id: '1', 
      name: 'Hospital São Lucas', 
      distance: '2.3 km',
      rating: 4.5,
      address: 'Rua das Flores, 123'
    },
    {
      id: '2', 
      name: 'Hospital Santa Maria', 
      distance: '3.1 km',
      rating: 4.2,
      address: 'Av. Principal, 456'
    },
    {
      id: '3', 
      name: 'Clínica Vida Nova', 
      distance: '1.8 km',
      rating: 4.0,
      address: 'Rua da Saúde, 789'
    },
  ];

  const availableDates = [
    '2025-09-25',
    '2025-09-26',
    '2025-09-27',
    '2025-09-30',
    '2025-10-01',
  ];

  const availableTimes = [
    '08:00', '09:00', '10:00', '11:00',
    '14:00', '15:00', '16:00', '17:00',
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Hoje';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Amanhã';
    } else {
      return date.toLocaleDateString('pt-BR', {
        weekday: 'short',
        day: '2-digit',
        month: 'short',
      });
    }
  };

  const handleBooking = () => {
    if (!selectedService || !selectedHospital || !selectedDate || !selectedTime) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    Alert.alert(
      'Agendamento Confirmado! 🎉',
      'Seu agendamento foi realizado com sucesso. Você receberá uma confirmação por email.',
      [
        {
          text: 'OK',
          onPress: () => {
            setSelectedService('');
            setSelectedHospital('');
            setSelectedDate('');
            setSelectedTime('');
          },
        },
      ]
    );
  };

  const getStepNumber = () => {
    if (!selectedService) return 1;
    if (!selectedHospital) return 2;
    if (!selectedDate) return 3;
    if (!selectedTime) return 4;
    return 5;
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Novo Agendamento</Text>
        <Text style={styles.headerSubtitle}>Siga os passos para agendar</Text>
        
        {/* Progress Indicator */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, {width: `${(getStepNumber() / 5) * 100}%`}]} />
          </View>
          <Text style={styles.progressText}>Passo {getStepNumber()} de 5</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Step 1: Service Type */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={[styles.stepNumber, selectedService && styles.stepNumberCompleted]}>
              <Text style={[styles.stepNumberText, selectedService && styles.stepNumberTextCompleted]}>1</Text>
            </View>
            <Text style={styles.sectionTitle}>Escolha o tipo de serviço</Text>
          </View>
          
          <View style={styles.serviceGrid}>
            {services.map(service => (
              <TouchableOpacity
                key={service.id}
                style={[
                  styles.serviceCard,
                  selectedService === service.id && styles.selectedServiceCard,
                ]}
                onPress={() => setSelectedService(service.id)}
                activeOpacity={0.8}>
                <View style={[styles.serviceIcon, {backgroundColor: `${service.color}20`}]}>
                  <MaterialIcons name={service.icon} size={24} color={service.color} />
                </View>
                <Text style={styles.serviceTitle}>{service.title}</Text>
                <Text style={styles.serviceSubtitle}>{service.subtitle}</Text>
                {selectedService === service.id && (
                  <View style={styles.checkIcon}>
                    <MaterialIcons name="check-circle" size={20} color={service.color} />
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Step 2: Hospital */}
        {selectedService && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={[styles.stepNumber, selectedHospital && styles.stepNumberCompleted]}>
                <Text style={[styles.stepNumberText, selectedHospital && styles.stepNumberTextCompleted]}>2</Text>
              </View>
              <Text style={styles.sectionTitle}>Escolha o local</Text>
            </View>
            
            {hospitals.map(hospital => (
              <TouchableOpacity
                key={hospital.id}
                style={[
                  styles.hospitalCard,
                  selectedHospital === hospital.id && styles.selectedHospitalCard,
                ]}
                onPress={() => setSelectedHospital(hospital.id)}
                activeOpacity={0.8}>
                <View style={styles.hospitalInfo}>
                  <View style={styles.hospitalIcon}>
                    <MaterialIcons name="local-hospital" size={20} color="#3B82F6" />
                  </View>
                  <View style={styles.hospitalDetails}>
                    <Text style={styles.hospitalName}>{hospital.name}</Text>
                    <Text style={styles.hospitalAddress}>{hospital.address}</Text>
                    <View style={styles.hospitalMeta}>
                      <View style={styles.ratingContainer}>
                        <MaterialIcons name="star" size={14} color="#F59E0B" />
                        <Text style={styles.rating}>{hospital.rating}</Text>
                      </View>
                      <Text style={styles.distance}>{hospital.distance}</Text>
                    </View>
                  </View>
                </View>
                {selectedHospital === hospital.id && (
                  <MaterialIcons name="check-circle" size={20} color="#3B82F6" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Step 3: Date */}
        {selectedHospital && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={[styles.stepNumber, selectedDate && styles.stepNumberCompleted]}>
                <Text style={[styles.stepNumberText, selectedDate && styles.stepNumberTextCompleted]}>3</Text>
              </View>
              <Text style={styles.sectionTitle}>Escolha a data</Text>
            </View>
            
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.dateContainer}>
                {availableDates.map(date => (
                  <TouchableOpacity
                    key={date}
                    style={[
                      styles.dateCard,
                      selectedDate === date && styles.selectedDateCard,
                    ]}
                    onPress={() => setSelectedDate(date)}
                    activeOpacity={0.8}>
                    <Text style={[
                      styles.dateLabel,
                      selectedDate === date && styles.selectedDateLabel,
                    ]}>
                      {formatDate(date)}
                    </Text>
                    <Text style={[
                      styles.dateNumber,
                      selectedDate === date && styles.selectedDateNumber,
                    ]}>
                      {new Date(date).getDate()}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
        )}

        {/* Step 4: Time */}
        {selectedDate && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={[styles.stepNumber, selectedTime && styles.stepNumberCompleted]}>
                <Text style={[styles.stepNumberText, selectedTime && styles.stepNumberTextCompleted]}>4</Text>
              </View>
              <Text style={styles.sectionTitle}>Escolha o horário</Text>
            </View>
            
            <View style={styles.timeGrid}>
              {availableTimes.map(time => (
                <TouchableOpacity
                  key={time}
                  style={[
                    styles.timeCard,
                    selectedTime === time && styles.selectedTimeCard,
                  ]}
                  onPress={() => setSelectedTime(time)}
                  activeOpacity={0.8}>
                  <Text style={[
                    styles.timeText,
                    selectedTime === time && styles.selectedTimeText,
                  ]}>
                    {time}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Step 5: Summary */}
        {selectedTime && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={[styles.stepNumber, styles.stepNumberCompleted]}>
                <Text style={[styles.stepNumberText, styles.stepNumberTextCompleted]}>5</Text>
              </View>
              <Text style={styles.sectionTitle}>Confirme os detalhes</Text>
            </View>
            
            <View style={styles.summaryCard}>
              <View style={styles.summaryHeader}>
                <MaterialIcons name="event" size={24} color="#3B82F6" />
                <Text style={styles.summaryTitle}>Resumo do Agendamento</Text>
              </View>
              
              <View style={styles.summaryContent}>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Serviço:</Text>
                  <Text style={styles.summaryValue}>
                    {services.find(s => s.id === selectedService)?.title}
                  </Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Local:</Text>
                  <Text style={styles.summaryValue}>
                    {hospitals.find(h => h.id === selectedHospital)?.name}
                  </Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Data:</Text>
                  <Text style={styles.summaryValue}>
                    {new Date(selectedDate).toLocaleDateString('pt-BR', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Horário:</Text>
                  <Text style={styles.summaryValue}>{selectedTime}</Text>
                </View>
              </View>
            </View>

            <TouchableOpacity style={styles.confirmButton} onPress={handleBooking}>
              <MaterialIcons name="check" size={20} color="#FFFFFF" />
              <Text style={styles.confirmButtonText}>Confirmar Agendamento</Text>
            </TouchableOpacity>
          </View>
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
    marginBottom: 20,
  },
  progressContainer: {
    alignItems: 'center',
  },
  progressBar: {
    width: '100%',
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  content: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stepNumberCompleted: {
    backgroundColor: '#10B981',
  },
  stepNumberText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#6B7280',
  },
  stepNumberTextCompleted: {
    color: '#FFFFFF',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  serviceGrid: {
    gap: 12,
  },
  serviceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    position: 'relative',
  },
  selectedServiceCard: {
    borderColor: '#3B82F6',
    backgroundColor: '#EFF6FF',
  },
  serviceIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  serviceSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  checkIcon: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  hospitalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  selectedHospitalCard: {
    borderColor: '#3B82F6',
    backgroundColor: '#EFF6FF',
  },
  hospitalInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  hospitalIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  hospitalDetails: {
    flex: 1,
  },
  hospitalName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 2,
  },
  hospitalAddress: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  hospitalMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 2,
  },
  distance: {
    fontSize: 12,
    color: '#3B82F6',
    fontWeight: '500',
  },
  dateContainer: {
    flexDirection: 'row',
    paddingRight: 24,
  },
  dateCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    alignItems: 'center',
    minWidth: 80,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  selectedDateCard: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  dateLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
    textTransform: 'capitalize',
  },
  selectedDateLabel: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
  dateNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  selectedDateNumber: {
    color: '#FFFFFF',
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  timeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    minWidth: (width - 72) / 4,
    alignItems: 'center',
  },
  selectedTimeCard: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  timeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  selectedTimeText: {
    color: '#FFFFFF',
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginLeft: 8,
  },
  summaryContent: {
    gap: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#6B7280',
    flex: 1,
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    flex: 2,
    textAlign: 'right',
  },
  confirmButton: {
    backgroundColor: '#10B981',
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#10B981',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  bottomSpacing: {
    height: 32,
  },
});

export default BookingScreen;