import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions,
} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';

const {width} = Dimensions.get('window');

interface Hospital {
  id: string;
  nome: string;
  endereco: string;
  telefone: string;
  especialidades: string[];
  avaliacao: number;
  distancia: string;
  tipo: 'hospital' | 'clinica' | 'laboratorio';
  horarioFuncionamento: string;
}

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('todos');

  const hospitals: Hospital[] = [
    {
      id: '1',
      nome: 'Hospital São Lucas',
      endereco: 'Rua das Flores, 123 - Centro',
      telefone: '(11) 3333-4444',
      especialidades: ['Cardiologia', 'Neurologia', 'Ortopedia', 'Pediatria'],
      avaliacao: 4.5,
      distancia: '2.3 km',
      tipo: 'hospital',
      horarioFuncionamento: '24h',
    },
    {
      id: '2',
      nome: 'Hospital Santa Maria',
      endereco: 'Av. Principal, 456 - Jardim América',
      telefone: '(11) 5555-6666',
      especialidades: ['Pediatria', 'Ginecologia', 'Dermatologia', 'Psiquiatria'],
      avaliacao: 4.2,
      distancia: '3.1 km',
      tipo: 'hospital',
      horarioFuncionamento: '24h',
    },
    {
      id: '3',
      nome: 'Clínica Vida Nova',
      endereco: 'Rua da Saúde, 789 - Vila Nova',
      telefone: '(11) 7777-8888',
      especialidades: ['Clínica Geral', 'Cardiologia'],
      avaliacao: 4.0,
      distancia: '1.8 km',
      tipo: 'clinica',
      horarioFuncionamento: '6h às 22h',
    },
    {
      id: '4',
      nome: 'Laboratório Diagnóstica',
      endereco: 'Av. Central, 321 - Centro',
      telefone: '(11) 9999-0000',
      especialidades: ['Exames Laboratoriais', 'Diagnóstico por Imagem'],
      avaliacao: 4.3,
      distancia: '2.8 km',
      tipo: 'laboratorio',
      horarioFuncionamento: '6h às 18h',
    },
  ];

  const filters = [
    {id: 'todos', label: 'Todos', icon: 'view-list'},
    {id: 'hospital', label: 'Hospitais', icon: 'local-hospital'},
    {id: 'clinica', label: 'Clínicas', icon: 'medical-services'},
    {id: 'laboratorio', label: 'Laboratórios', icon: 'science'},
  ];

  const filteredHospitals = hospitals.filter(hospital => {
    const matchesSearch = hospital.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hospital.especialidades.some(esp =>
        esp.toLowerCase().includes(searchQuery.toLowerCase())
      );
    
    const matchesFilter = activeFilter === 'todos' || hospital.tipo === activeFilter;
    
    return matchesSearch && matchesFilter;
  });

  const getTypeConfig = (tipo: string) => {
    switch (tipo) {
      case 'hospital':
        return { color: '#3B82F6', bg: '#EFF6FF' };
      case 'clinica':
        return { color: '#10B981', bg: '#ECFDF5' };
      case 'laboratorio':
        return { color: '#8B5CF6', bg: '#F3E8FF' };
      default:
        return { color: '#6B7280', bg: '#F3F4F6' };
    }
  };

  const renderHospitalCard = ({item}: {item: Hospital}) => {
    const typeConfig = getTypeConfig(item.tipo);
    
    return (
      <TouchableOpacity style={styles.hospitalCard} activeOpacity={0.8}>
        <View style={styles.hospitalHeader}>
          <View style={styles.hospitalTitleContainer}>
            <View style={[styles.typeIndicator, {backgroundColor: typeConfig.bg}]}>
              <MaterialIcons 
                name={item.tipo === 'hospital' ? 'local-hospital' : 
                      item.tipo === 'clinica' ? 'medical-services' : 'science'} 
                size={16} 
                color={typeConfig.color} 
              />
            </View>
            <View style={styles.hospitalInfo}>
              <Text style={styles.hospitalName}>{item.nome}</Text>
              <Text style={styles.hospitalType}>
                {item.tipo.charAt(0).toUpperCase() + item.tipo.slice(1)}
              </Text>
            </View>
          </View>
          <View style={styles.ratingContainer}>
            <MaterialIcons name="star" size={16} color="#F59E0B" />
            <Text style={styles.rating}>{item.avaliacao}</Text>
          </View>
        </View>
        
        <View style={styles.hospitalDetails}>
          <View style={styles.detailRow}>
            <MaterialIcons name="location-on" size={16} color="#6B7280" />
            <Text style={styles.detailText}>{item.endereco}</Text>
          </View>
          <View style={styles.detailRow}>
            <MaterialIcons name="access-time" size={16} color="#6B7280" />
            <Text style={styles.detailText}>{item.horarioFuncionamento}</Text>
          </View>
          <View style={styles.detailRow}>
            <MaterialIcons name="near-me" size={16} color="#3B82F6" />
            <Text style={[styles.detailText, {color: '#3B82F6', fontWeight: '500'}]}>
              {item.distancia}
            </Text>
          </View>
        </View>
        
        <View style={styles.specialtiesContainer}>
          <Text style={styles.specialtiesLabel}>Especialidades:</Text>
          <View style={styles.specialtiesList}>
            {item.especialidades.slice(0, 3).map((especialidade, index) => (
              <View key={index} style={[styles.specialtyTag, {backgroundColor: typeConfig.bg}]}>
                <Text style={[styles.specialtyText, {color: typeConfig.color}]}>
                  {especialidade}
                </Text>
              </View>
            ))}
            {item.especialidades.length > 3 && (
              <View style={styles.moreSpecialties}>
                <Text style={styles.moreSpecialtiesText}>
                  +{item.especialidades.length - 3}
                </Text>
              </View>
            )}
          </View>
        </View>
        
        <View style={styles.cardActions}>
          <TouchableOpacity style={styles.actionButton}>
            <MaterialIcons name="phone" size={18} color="#3B82F6" />
            <Text style={styles.actionText}>Ligar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <MaterialIcons name="directions" size={18} color="#10B981" />
            <Text style={[styles.actionText, {color: '#10B981'}]}>Direções</Text>
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
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Buscar Unidades</Text>
        <Text style={styles.headerSubtitle}>Encontre hospitais, clínicas e laboratórios</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <MaterialIcons name="search" size={20} color="#6B7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar por nome ou especialidade..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <MaterialIcons name="clear" size={20} color="#6B7280" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Filters */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.filtersContainer}
        contentContainerStyle={styles.filtersContent}>
        {filters.map(filter => (
          <TouchableOpacity
            key={filter.id}
            style={[
              styles.filterButton,
              activeFilter === filter.id && styles.filterButtonActive,
            ]}
            onPress={() => setActiveFilter(filter.id)}
            activeOpacity={0.8}>
            <MaterialIcons 
              name={filter.icon} 
              size={16} 
              color={activeFilter === filter.id ? '#FFFFFF' : '#6B7280'} 
            />
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

      {/* Results */}
      <View style={styles.resultsHeader}>
        <Text style={styles.resultsCount}>
          {filteredHospitals.length} {filteredHospitals.length === 1 ? 'resultado' : 'resultados'} encontrados
        </Text>
        <TouchableOpacity style={styles.sortButton}>
          <MaterialIcons name="sort" size={16} color="#6B7280" />
          <Text style={styles.sortText}>Ordenar</Text>
        </TouchableOpacity>
      </View>

      {/* Hospital List */}
      {filteredHospitals.length > 0 ? (
        <FlatList
          data={filteredHospitals}
          renderItem={renderHospitalCard}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyState}>
          <View style={styles.emptyIconContainer}>
            <MaterialIcons name="search-off" size={64} color="#E5E7EB" />
          </View>
          <Text style={styles.emptyTitle}>Nenhum resultado encontrado</Text>
          <Text style={styles.emptyText}>
            Tente buscar por outro termo ou ajuste os filtros
          </Text>
        </View>
      )}
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
  searchContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#1F2937',
  },
  filtersContainer: {
    backgroundColor: '#FFFFFF',
    paddingBottom: 16,
  },
  filtersContent: {
    paddingHorizontal: 24,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  filterButtonActive: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  filterText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 6,
    fontWeight: '500',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  resultsCount: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 4,
  },
  listContainer: {
    padding: 24,
  },
  hospitalCard: {
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
  hospitalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  hospitalTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 12,
  },
  typeIndicator: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  hospitalInfo: {
    flex: 1,
  },
  hospitalName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 2,
  },
  hospitalType: {
    fontSize: 12,
    color: '#6B7280',
    textTransform: 'uppercase',
    fontWeight: '500',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  rating: {
    marginLeft: 4,
    fontSize: 14,
    color: '#92400E',
    fontWeight: '600',
  },
  hospitalDetails: {
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
  specialtiesContainer: {
    marginBottom: 16,
  },
  specialtiesLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
    marginBottom: 8,
  },
  specialtiesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  specialtyTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  specialtyText: {
    fontSize: 12,
    fontWeight: '500',
  },
  moreSpecialties: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
  },
  moreSpecialtiesText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
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
  primaryAction: {
    backgroundColor: '#3B82F6',
  },
  actionText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#3B82F6',
    fontWeight: '500',
  },
  primaryActionText: {
    color: '#FFFFFF',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  },
});

export default SearchScreen;