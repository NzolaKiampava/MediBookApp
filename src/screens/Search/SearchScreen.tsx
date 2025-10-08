import React, {useMemo, useState} from 'react';
import type {ListRenderItem} from 'react-native';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {MaterialIcons} from '@expo/vector-icons';

import {colors, gradients} from '../../theme/colors';

type FacilityKind = 'hospital' | 'clinica' | 'laboratorio';

type Hospital = {
  id: string;
  nome: string;
  endereco: string;
  telefone: string;
  especialidades: string[];
  avaliacao: number;
  distancia: string;
  tipo: FacilityKind;
  horarioFuncionamento: string;
};

type FilterOption = {
  id: 'todos' | FacilityKind;
  label: string;
  icon: keyof typeof MaterialIcons.glyphMap;
};

const filters: FilterOption[] = [
  {id: 'todos', label: 'Todos', icon: 'view-list'},
  {id: 'hospital', label: 'Hospitais', icon: 'local-hospital'},
  {id: 'clinica', label: 'Clínicas', icon: 'medical-services'},
  {id: 'laboratorio', label: 'Laboratórios', icon: 'science'},
];

const hospitalsData: Hospital[] = [
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

const getTypeConfig = (tipo: FacilityKind) => {
  switch (tipo) {
    case 'hospital':
      return {color: colors.primary, bg: '#E0F2FE'};
    case 'clinica':
      return {color: colors.success, bg: '#D1FAE5'};
    case 'laboratorio':
      return {color: '#6C2BD9', bg: '#EDE9FE'};
    default:
      return {color: colors.muted, bg: '#E2E8F0'};
  }
};

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterOption['id']>('todos');

  const filteredHospitals = useMemo(
    () =>
      hospitalsData.filter(hospital => {
        const query = searchQuery.trim().toLowerCase();
        const matchesSearch =
          query.length === 0 ||
          hospital.nome.toLowerCase().includes(query) ||
          hospital.especialidades.some(esp => esp.toLowerCase().includes(query));

        const matchesFilter = activeFilter === 'todos' || hospital.tipo === activeFilter;

        return matchesSearch && matchesFilter;
      }),
    [activeFilter, searchQuery],
  );

  const renderHospitalCard: ListRenderItem<Hospital> = ({item}) => {
    const typeConfig = getTypeConfig(item.tipo);

    return (
      <TouchableOpacity style={styles.hospitalCard} activeOpacity={0.85}>
        <View style={styles.hospitalHeader}>
          <View style={styles.hospitalTitleContainer}>
            <View style={[styles.typeIndicator, {backgroundColor: typeConfig.bg}]}> 
              <MaterialIcons
                name={
                  item.tipo === 'hospital'
                    ? 'local-hospital'
                    : item.tipo === 'clinica'
                    ? 'medical-services'
                    : 'science'
                }
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
            <MaterialIcons name="star" size={14} color={colors.warning} />
            <Text style={styles.rating}>{item.avaliacao}</Text>
          </View>
        </View>

        <View style={styles.hospitalDetails}>
          <View style={styles.detailRow}>
            <MaterialIcons name="location-on" size={16} color={colors.muted} />
            <Text style={styles.detailText}>{item.endereco}</Text>
          </View>
          <View style={styles.detailRow}>
            <MaterialIcons name="access-time" size={16} color={colors.muted} />
            <Text style={styles.detailText}>{item.horarioFuncionamento}</Text>
          </View>
          <View style={styles.detailRow}>
            <MaterialIcons name="near-me" size={16} color={colors.primary} />
            <Text style={[styles.detailText, {color: colors.primary, fontWeight: '600'}]}>
              {item.distancia}
            </Text>
          </View>
        </View>

        <View style={styles.specialtiesContainer}>
          <Text style={styles.specialtiesLabel}>Especialidades:</Text>
          <View style={styles.specialtiesList}>
            {item.especialidades.slice(0, 3).map(especialidade => (
              <View key={especialidade} style={[styles.specialtyTag, {backgroundColor: typeConfig.bg}]}> 
                <Text style={[styles.specialtyText, {color: typeConfig.color}]}>
                  {especialidade}
                </Text>
              </View>
            ))}
            {item.especialidades.length > 3 && (
              <View style={styles.moreSpecialties}>
                <Text style={styles.moreSpecialtiesText}>+{item.especialidades.length - 3}</Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.cardActions}>
          <TouchableOpacity style={styles.actionButton}>
            <MaterialIcons name="phone" size={18} color={colors.primary} />
            <Text style={[styles.actionText, {color: colors.primary}]}>Ligar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <MaterialIcons name="directions" size={18} color={colors.success} />
            <Text style={[styles.actionText, {color: colors.success}]}>Direções</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, styles.primaryAction]}>
            <MaterialIcons name="calendar-today" size={18} color="#FFFFFF" />
            <Text style={[styles.actionText, styles.primaryActionText]}>Agendar</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  const renderHeader = () => (
    <View>
      <LinearGradient colors={gradients.primary} style={styles.heroArea}>
        <Text style={styles.heroTitle}>Explore a nossa rede integrada</Text>
        <Text style={styles.heroSubtitle}>
          Conecte-se rapidamente aos melhores especialistas, hospitais e laboratórios perto de você.
        </Text>
        <View style={styles.searchBar}>
          <MaterialIcons name="search" size={20} color={colors.muted} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar por especialidade, unidade ou profissional"
            placeholderTextColor="rgba(15,74,131,0.6)"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <MaterialIcons name="close" size={18} color={colors.muted} />
            </TouchableOpacity>
          )}
        </View>
      </LinearGradient>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filtersContainer}
        contentContainerStyle={styles.filtersContent}>
        {filters.map(filter => (
          <TouchableOpacity
            key={filter.id}
            style={[styles.filterChip, activeFilter === filter.id && styles.filterChipActive]}
            onPress={() => setActiveFilter(filter.id)}
            activeOpacity={0.85}>
            <MaterialIcons
              name={filter.icon}
              size={16}
              color={activeFilter === filter.id ? '#FFFFFF' : colors.subsection}
            />
            <Text
              style={[styles.filterChipLabel, activeFilter === filter.id && styles.filterChipLabelActive]}>
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.resultsHeader}>
        <View>
          <Text style={styles.resultsCount}>{filteredHospitals.length} unidades encontradas</Text>
          <Text style={styles.resultsHint}>Resultados adaptados à sua localização e preferências</Text>
        </View>
        <TouchableOpacity style={styles.sortButton} activeOpacity={0.8}>
          <MaterialIcons name="tune" size={18} color={colors.primaryDark} />
          <Text style={styles.sortLabel}>Classificar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyState}>
      <View style={styles.emptyIconWrapper}>
        <MaterialIcons name="travel-explore" size={64} color="rgba(15,107,168,0.25)" />
      </View>
      <Text style={styles.emptyTitle}>Não encontramos resultados nesta busca</Text>
      <Text style={styles.emptyDescription}>
        Ajuste os filtros ou tente um termo diferente para descobrir novas possibilidades próximas a você.
      </Text>
    </View>
  );

  return (
    <View style={styles.screen}>
      <FlatList
        data={filteredHospitals}
        keyExtractor={item => item.id}
        renderItem={renderHospitalCard}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    paddingBottom: 90,
  },
  heroArea: {
    paddingHorizontal: 22,
    paddingTop: 28,
    paddingBottom: 32,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    gap: 16,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  heroSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.82)',
    lineHeight: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#0F172A',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.1,
    shadowRadius: 14,
    elevation: 6,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: colors.primaryDark,
  },
  filtersContainer: {
    marginTop: 18,
  },
  filtersContent: {
    paddingHorizontal: 20,
    gap: 10,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: '#E2E8F0',
    minHeight: 36,
  },
  filterChipActive: {
    backgroundColor: colors.primary,
    shadowColor: '#0F172A',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 4,
  },
  filterChipLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.subsection,
  },
  filterChipLabelActive: {
    color: '#FFFFFF',
  },
  resultsHeader: {
    marginTop: 24,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  resultsCount: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  resultsHint: {
    fontSize: 12,
    color: colors.muted,
    marginTop: 4,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
    backgroundColor: '#E0F2FE',
  },
  sortLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primaryDark,
  },
  hospitalCard: {
    backgroundColor: colors.surface,
    borderRadius: 22,
    marginHorizontal: 20,
    marginTop: 18,
    padding: 20,
    shadowColor: '#0F172A',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 6,
  },
  hospitalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
    gap: 12,
  },
  hospitalTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  typeIndicator: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hospitalInfo: {
    flex: 1,
  },
  hospitalName: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  hospitalType: {
    fontSize: 13,
    color: colors.muted,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    minWidth: 50,
    justifyContent: 'center',
  },
  rating: {
    fontSize: 12,
    color: '#B45309',
    fontWeight: '700',
  },
  hospitalDetails: {
    gap: 10,
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  detailText: {
    flex: 1,
    fontSize: 14,
    color: colors.subsection,
  },
  specialtiesContainer: {
    marginBottom: 16,
  },
  specialtiesLabel: {
    fontSize: 13,
    color: colors.muted,
    marginBottom: 8,
  },
  specialtiesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  specialtyTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  specialtyText: {
    fontSize: 12,
    fontWeight: '600',
  },
  moreSpecialties: {
    backgroundColor: '#E2E8F0',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  moreSpecialtiesText: {
    fontSize: 12,
    color: colors.subsection,
    fontWeight: '600',
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
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
  primaryAction: {
    backgroundColor: colors.primary,
  },
  primaryActionText: {
    color: '#FFFFFF',
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
    marginHorizontal: 20,
    marginTop: 32,
    backgroundColor: colors.surface,
    borderRadius: 24,
    shadowColor: '#0F172A',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
  emptyIconWrapper: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 13,
    color: colors.muted,
    textAlign: 'center',
    lineHeight: 20,
  },
  footerWrapper: {
    marginTop: 24,
  },
});

export default SearchScreen;