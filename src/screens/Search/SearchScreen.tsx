import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';

interface Hospital {
  id: string;
  nome: string;
  endereco: string;
  telefone: string;
  especialidades: string[];
  avaliacao: number;
  distancia: string;
}

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('todos');

  // Dados mock de hospitais
  const hospitals: Hospital[] = [
    {
      id: '1',
      nome: 'Hospital São Lucas',
      endereco: 'Rua das Flores, 123 - Centro',
      telefone: '(11) 3333-4444',
      especialidades: ['Cardiologia', 'Neurologia', 'Ortopedia'],
      avaliacao: 4.5,
      distancia: '2.3 km',
    },
    {
      id: '2',
      nome: 'Hospital Santa Maria',
      endereco: 'Av. Principal, 456 - Jardim América',
      telefone: '(11) 5555-6666',
      especialidades: ['Pediatria', 'Ginecologia', 'Dermatologia'],
      avaliacao: 4.2,
      distancia: '3.1 km',
    },
    {
      id: '3',
      nome: 'Clínica Vida Nova',
      endereco: 'Rua da Saúde, 789 - Vila Nova',
      telefone: '(11) 7777-8888',
      especialidades: ['Clínica Geral', 'Cardiologia'],
      avaliacao: 4.0,
      distancia: '1.8 km',
    },
  ];

  const filters = [
    {id: 'todos', label: 'Todos'},
    {id: 'hospitais', label: 'Hospitais'},
    {id: 'clinicas', label: 'Clínicas'},
    {id: 'laboratorios', label: 'Laboratórios'},
  ];

  const filteredHospitals = hospitals.filter(hospital =>
    hospital.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
    hospital.especialidades.some(esp =>
      esp.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const renderHospitalCard = ({item}: {item: Hospital}) => (
    <TouchableOpacity style={styles.hospitalCard}>
      <View style={styles.hospitalHeader}>
        <Text style={styles.hospitalName}>{item.nome}</Text>
        <View style={styles.ratingContainer}>
          <MaterialIcons name="star" size={16} color="#FFD93D" />
          <Text style={styles.rating}>{item.avaliacao}</Text>
        </View>
      </View>
      
      <Text style={styles.hospitalAddress}>{item.endereco}</Text>
      <Text style={styles.hospitalPhone}>{item.telefone}</Text>
      <Text style={styles.distance}>{item.distancia}</Text>
      
      <View style={styles.specialtiesContainer}>
        {item.especialidades.map((especialidade, index) => (
          <View key={index} style={styles.specialtyTag}>
            <Text style={styles.specialtyText}>{especialidade}</Text>
          </View>
        ))}
      </View>
      
      <View style={styles.cardActions}>
        <TouchableOpacity style={styles.actionButton}>
          <MaterialIcons name="phone" size={18} color="#4A90E2" />
          <Text style={styles.actionText}>Ligar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <MaterialIcons name="directions" size={18} color="#4A90E2" />
          <Text style={styles.actionText}>Direções</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.primaryAction]}>
          <MaterialIcons name="calendar-today" size={18} color="#FFFFFF" />
          <Text style={[styles.actionText, styles.primaryActionText]}>
            Agendar
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Barra de pesquisa */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <MaterialIcons name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar hospitais, clínicas ou especialidades..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Filtros */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.filtersContainer}>
        {filters.map(filter => (
          <TouchableOpacity
            key={filter.id}
            style={[
              styles.filterButton,
              activeFilter === filter.id && styles.filterButtonActive,
            ]}
            onPress={() => setActiveFilter(filter.id)}>
            <Text
              style={[
                styles.filterText,
                activeFilter === filter.id && styles.filterTextActive,
              ]}>
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Lista de resultados */}
      <FlatList
        data={filteredHospitals}
        renderItem={renderHospitalCard}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  searchContainer: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E1E1E1',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
  },
  filtersContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
  },
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#E1E1E1',
  },
  filterButtonActive: {
    backgroundColor: '#4A90E2',
    borderColor: '#4A90E2',
  },
  filterText: {
    fontSize: 14,
    color: '#666',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  listContainer: {
    padding: 20,
  },
  hospitalCard: {
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
  hospitalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  hospitalName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    marginLeft: 4,
    fontSize: 14,
    color: '#666',
  },
  hospitalAddress: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  hospitalPhone: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  distance: {
    fontSize: 14,
    color: '#4A90E2',
    fontWeight: '600',
    marginBottom: 10,
  },
  specialtiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  specialtyTag: {
    backgroundColor: '#E8F4FD',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 4,
  },
  specialtyText: {
    fontSize: 12,
    color: '#4A90E2',
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: '#F8F9FA',
    flex: 1,
    marginHorizontal: 2,
    justifyContent: 'center',
  },
  primaryAction: {
    backgroundColor: '#4A90E2',
  },
  actionText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#4A90E2',
  },
  primaryActionText: {
    color: '#FFFFFF',
  },
});

export default SearchScreen;