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

const BookingScreen = () => {
  const [selectedService, setSelectedService] = useState('');
  const [selectedHospital, setSelectedHospital] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const services = [
    {
      id: 'consulta',
      title: 'Consulta Médica',
      icon: 'medical-services',
      color: '#4A90E2',
    },
    {
      id: 'exame',
      title: 'Exame',
      icon: 'assignment',
      color: '#50C878',
    },
    {
      id: 'procedimento',
      title: 'Procedimento',
      icon: 'local-hospital',
      color: '#FF6B6B',
    },
  ];

  const hospitals = [
    {id: '1', name: 'Hospital São Lucas', distance: '2.3 km'},
    {id: '2', name: 'Hospital Santa Maria', distance: '3.1 km'},
    {id: '3', name: 'Clínica Vida Nova', distance: '1.8 km'},
  ];

  const availableDates = [
    '2025-09-25',
    '2025-09-26',
    '2025-09-27',
    '2025-09-30',
    '2025-10-01',
  ];

  const availableTimes = [
    '08:00',
    '09:00',
    '10:00',
    '14:00',
    '15:00',
    '16:00',
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
      'Agendamento Confirmado',
      'Seu agendamento foi realizado com sucesso!',
      [
        {
          text: 'OK',
          onPress: () => {
            // Reset form
            setSelectedService('');
            setSelectedHospital('');
            setSelectedDate('');
            setSelectedTime('');
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Tipo de Serviço */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tipo de Serviço</Text>
        <View style={styles.serviceGrid}>
          {services.map(service => (
            <TouchableOpacity
              key={service.id}
              style={[
                styles.serviceCard,
                selectedService === service.id && styles.selectedCard,
                {borderLeftColor: service.color},
              ]}
              onPress={() => setSelectedService(service.id)}>
              <MaterialIcons
                name={service.icon}
                size={24}
                color={service.color}
                style={styles.serviceIcon}
              />
              <Text style={styles.serviceTitle}>{service.title}</Text>
              {selectedService === service.id && (
                <MaterialIcons
                  name="check-circle"
                  size={20}
                  color={service.color}
                  style={styles.checkIcon}
                />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Hospital */}
      {selectedService && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Escolha o Local</Text>
          {hospitals.map(hospital => (
            <TouchableOpacity
              key={hospital.id}
              style={[
                styles.hospitalOption,
                selectedHospital === hospital.id && styles.selectedOption,
              ]}
              onPress={() => setSelectedHospital(hospital.id)}>
              <View style={styles.hospitalInfo}>
                <MaterialIcons name="local-hospital" size={20} color="#4A90E2" />
                <View style={styles.hospitalDetails}>
                  <Text style={styles.hospitalName}>{hospital.name}</Text>
                  <Text style={styles.hospitalDistance}>{hospital.distance}</Text>
                </View>
              </View>
              {selectedHospital === hospital.id && (
                <MaterialIcons name="check-circle" size={20} color="#4A90E2" />
              )}
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Data */}
      {selectedHospital && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Escolha a Data</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.dateGrid}>
              {availableDates.map(date => (
                <TouchableOpacity
                  key={date}
                  style={[
                    styles.dateOption,
                    selectedDate === date && styles.selectedDateOption,
                  ]}
                  onPress={() => setSelectedDate(date)}>
                  <Text
                    style={[
                      styles.dateText,
                      selectedDate === date && styles.selectedDateText,
                    ]}>
                    {formatDate(date)}
                  </Text>
                  <Text
                    style={[
                      styles.dayText,
                      selectedDate === date && styles.selectedDayText,
                    ]}>
                    {new Date(date).getDate()}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      )}

      {/* Horário */}
      {selectedDate && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Escolha o Horário</Text>
          <View style={styles.timeGrid}>
            {availableTimes.map(time => (
              <TouchableOpacity
                key={time}
                style={[
                  styles.timeOption,
                  selectedTime === time && styles.selectedTimeOption,
                ]}
                onPress={() => setSelectedTime(time)}>
                <Text
                  style={[
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

      {/* Resumo e Confirmação */}
      {selectedTime && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resumo do Agendamento</Text>
          <View style={styles.summaryCard}>
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
                {new Date(selectedDate).toLocaleDateString('pt-BR')}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Horário:</Text>
              <Text style={styles.summaryValue}>{selectedTime}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.confirmButton} onPress={handleBooking}>
            <Text style={styles.confirmButtonText}>Confirmar Agendamento</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
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
  serviceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  serviceCard: {
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
    position: 'relative',
  },
  selectedCard: {
    borderColor: '#4A90E2',
    backgroundColor: '#F0F8FF',
  },
  serviceIcon: {
    marginBottom: 8,
  },
  serviceTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  checkIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  hospitalOption: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  selectedOption: {
    backgroundColor: '#F0F8FF',
    borderColor: '#4A90E2',
    borderWidth: 1,
  },
  hospitalInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hospitalDetails: {
    marginLeft: 10,
  },
  hospitalName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  hospitalDistance: {
    fontSize: 14,
    color: '#666',
  },
  dateGrid: {
    flexDirection: 'row',
  },
  dateOption: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginRight: 10,
    alignItems: 'center',
    minWidth: 80,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  selectedDateOption: {
    backgroundColor: '#4A90E2',
  },
  dateText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  selectedDateText: {
    color: '#FFFFFF',
  },
  dayText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  selectedDayText: {
    color: '#FFFFFF',
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  timeOption: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    width: '30%',
    marginBottom: 10,
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
  selectedTimeOption: {
    backgroundColor: '#4A90E2',
  },
  timeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  selectedTimeText: {
    color: '#FFFFFF',
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  confirmButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BookingScreen;