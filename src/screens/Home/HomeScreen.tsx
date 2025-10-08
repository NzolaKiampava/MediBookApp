import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {MaterialIcons} from '@expo/vector-icons';

import {useAuth} from '../../context/AuthContext';
import {colors, gradients} from '../../theme/colors';

type QuickAction = {
  id: number;
  title: string;
  subtitle: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  onPress: () => void;
  gradient: string[];
};

type Appointment = {
  id: number;
  title: string;
  professional: string;
  modality: string;
  date: string;
  location: string;
  status: 'confirmado' | 'agendado';
  color: string;
};

type WellbeingInsight = {
  id: number;
  icon: keyof typeof MaterialIcons.glyphMap;
  title: string;
  description: string;
  color: string;
  textColor: string;
};

type CareTip = {
  id: number;
  icon: keyof typeof MaterialIcons.glyphMap;
  title: string;
  description: string;
};

const HomeScreen = ({navigation}: any) => {
  const {user} = useAuth();
  const firstName = user?.nome?.split(' ')[0] || 'Paciente';

  const quickActions: QuickAction[] = [
    {
      id: 1,
      title: 'Agendar consulta',
      subtitle: 'Escolha o especialista ideal',
      icon: 'medical-services',
      gradient: gradients.primary,
      onPress: () => navigation.navigate('Booking'),
    },
    {
      id: 2,
      title: 'Exames e diagnósticos',
      subtitle: 'Disponibilidade em tempo real',
      icon: 'biotech',
      gradient: ['#1CB09A', '#119B84'],
      onPress: () => navigation.navigate('Booking'),
    },
    {
      id: 3,
      title: 'Teleconsulta imediata',
      subtitle: 'Conecte-se em minutos',
      icon: 'video-call',
      gradient: ['#6650F2', '#4C3BD6'],
      onPress: () => navigation.navigate('Search'),
    },
    {
      id: 4,
      title: 'Histórico clínico',
      subtitle: 'Acompanhe sua jornada',
      icon: 'folder-open',
      gradient: ['#FF8B5C', '#F97316'],
      onPress: () => navigation.navigate('Appointments'),
    },
  ];

  const upcomingAppointments: Appointment[] = [
    {
      id: 1,
      title: 'Consulta de cardiologia',
      professional: 'Dra. Helena Martins',
      modality: 'Presencial',
      date: '25 Set · 14:30',
      location: 'Hospital Vida Plena · Sala 204',
      status: 'confirmado',
      color: colors.primary,
    },
    {
      id: 2,
      title: 'Exame · Hemograma completo',
      professional: 'Lab Diagnóstica',
      modality: 'Laboratorial',
      date: '28 Set · 08:00',
      location: 'Unidade Central · Andar Térreo',
      status: 'agendado',
      color: colors.success,
    },
  ];

  const wellbeingHighlights: WellbeingInsight[] = [
    {
      id: 1,
      icon: 'favorite-border',
      title: 'Sinais vitais estáveis',
      description: 'Últimos registros dentro da faixa recomendada',
      color: '#E0F2FE',
      textColor: colors.primaryDark,
    },
    {
      id: 2,
      icon: 'self-improvement',
      title: 'Hábitos saudáveis em progresso',
      description: 'Você completou 72% do plano de bem-estar',
      color: '#D1FAE5',
      textColor: colors.success,
    },
    {
      id: 3,
      icon: 'emoji-events',
      title: 'Recomendações personalizadas',
      description: '3 novos insights com base no seu perfil de saúde',
      color: '#EDE9FE',
      textColor: '#6C2BD9',
    },
  ];

  const careTips: CareTip[] = [
    {
      id: 1,
      icon: 'schedule',
      title: 'Mantenha agendamentos em dia',
      description: 'Lembre-se de chegar com 15 minutos de antecedência para atualizações cadastrais.',
    },
    {
      id: 2,
      icon: 'spa',
      title: 'Rotina de bem-estar',
      description: 'Reserve 30 minutos do seu dia para atividades que promovam relaxamento e equilíbrio.',
    },
    {
      id: 3,
      icon: 'health-and-safety',
      title: 'Seu seguro está ativo',
      description: 'Plano Prevent Senior · Cobertura total para consultas, exames e telemedicina.',
    },
  ];

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <LinearGradient colors={gradients.primary} style={styles.heroSection}>
          <View style={styles.heroHeader}>
            <View>
              <Text style={styles.greeting}>Olá, {firstName}</Text>
              <Text style={styles.heroTitle}>Como podemos cuidar de você hoje?</Text>
            </View>
            <View style={styles.heroBadge}>
              <MaterialIcons name="verified" size={18} color="#FFFFFF" />
              <Text style={styles.heroBadgeText}>Paciente Premium</Text>
            </View>
          </View>
          <View style={styles.heroStats}>
            <View style={styles.heroStatCard}>
              <Text style={styles.heroStatValue}>05</Text>
              <Text style={styles.heroStatLabel}>Consultas ativas</Text>
            </View>
            <View style={styles.heroStatCard}>
              <Text style={styles.heroStatValue}>02</Text>
              <Text style={styles.heroStatLabel}>Exames agendados</Text>
            </View>
            <View style={styles.heroStatCard}>
              <Text style={styles.heroStatValue}>98%</Text>
              <Text style={styles.heroStatLabel}>Satisfação geral</Text>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ações rápidas</Text>
          <Text style={styles.sectionSubtitle}>
            Gerencie seus agendamentos, teleconsultas e resultados em poucos toques.
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.quickActionsRow}>
            {quickActions.map(action => (
              <LinearGradient key={action.id} colors={action.gradient} style={styles.quickActionCard}>
                <TouchableOpacity activeOpacity={0.9} onPress={action.onPress}>
                  <View style={styles.quickActionContent}>
                    <View style={styles.quickIconWrapper}>
                      <MaterialIcons name={action.icon} size={24} color="#FFFFFF" />
                    </View>
                    <Text style={styles.quickActionTitle}>{action.title}</Text>
                    <Text style={styles.quickActionSubtitle}>{action.subtitle}</Text>
                  </View>
                  <View style={styles.quickActionFooter}>
                    <Text style={styles.quickActionFooterText}>Acessar</Text>
                    <MaterialIcons name="arrow-forward" size={18} color="#FFFFFF" />
                  </View>
                </TouchableOpacity>
              </LinearGradient>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Próximos compromissos</Text>
              <Text style={styles.sectionSubtitle}>Acompanhe horários, profissionais e status em tempo real.</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Appointments')} activeOpacity={0.8}>
              <Text style={styles.sectionLink}>Ver agenda</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.cardStack}>
            {upcomingAppointments.map(appointment => (
              <View key={appointment.id} style={styles.appointmentCard}>
                <View style={[styles.appointmentStatus, {backgroundColor: `${appointment.color}1A`}]}>
                  <MaterialIcons name="event-available" size={18} color={appointment.color} />
                  <Text style={[styles.appointmentStatusText, {color: appointment.color}]}> {appointment.status}</Text>
                </View>
                <Text style={styles.appointmentTitle}>{appointment.title}</Text>
                <Text style={styles.appointmentProfessional}>{appointment.professional}</Text>
                <View style={styles.appointmentInfoRow}>
                  <MaterialIcons name="access-time" size={16} color={colors.muted} />
                  <Text style={styles.appointmentInfoText}>{appointment.date}</Text>
                </View>
                <View style={styles.appointmentInfoRow}>
                  <MaterialIcons name="place" size={16} color={colors.muted} />
                  <Text style={styles.appointmentInfoText}>{appointment.location}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Bem-estar em destaque</Text>
          <Text style={styles.sectionSubtitle}>
            Monitore sua saúde com insights personalizados gerados pelas suas atividades recentes.
          </Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.wellbeingCarousel}
            style={styles.wellbeingScrollView}
          >
            {wellbeingHighlights.map((highlight, index) => (
              <View 
                key={highlight.id} 
                style={[
                  styles.wellbeingCard, 
                  {backgroundColor: highlight.color},
                  index === wellbeingHighlights.length - 1 && styles.lastCard
                ]}
              > 
                <View style={[styles.iconBadge, {backgroundColor: '#FFFFFF33'}]}>
                  <MaterialIcons name={highlight.icon} size={22} color={highlight.textColor} />
                </View>
                <Text style={[styles.wellbeingTitle, {color: highlight.textColor}]}>{highlight.title}</Text>
                <Text style={[styles.wellbeingDescription, {color: highlight.textColor}]}> {highlight.description}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cuidados recomendados</Text>
          <Text style={styles.sectionSubtitle}>
            Dicas personalizadas para manter sua saúde equilibrada ao longo da semana.
          </Text>
          <View style={styles.tipList}>
            {careTips.map(tip => (
              <View key={tip.id} style={styles.tipCard}>
                <View style={styles.tipIconWrapper}>
                  <MaterialIcons name={tip.icon} size={22} color={colors.primaryDark} />
                </View>
                <View style={styles.tipTextContainer}>
                  <Text style={styles.tipTitle}>{tip.title}</Text>
                  <Text style={styles.tipDescription}>{tip.description}</Text>
                </View>
              </View>
            ))}
          </View>
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
  heroSection: {
    paddingHorizontal: 24,
    paddingTop: 42,
    paddingBottom: 36,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    gap: 22,
  },
  heroHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  greeting: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.82)',
    marginBottom: 6,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    lineHeight: 30,
  },
  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.18)',
  },
  heroBadgeText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  heroStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  heroStatCard: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: 18,
    padding: 16,
  },
  heroStatValue: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  heroStatLabel: {
    marginTop: 6,
    fontSize: 12,
    color: 'rgba(255,255,255,0.82)',
  },
  section: {
    paddingHorizontal: 24,
    paddingTop: 28,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  sectionSubtitle: {
    marginTop: 6,
    fontSize: 13,
    color: colors.muted,
    lineHeight: 18,
  },
  sectionLink: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primary,
  },
  quickActionsRow: {
    paddingTop: 18,
    paddingBottom: 6,
    gap: 16,
  },
  quickActionCard: {
    width: 220,
    borderRadius: 20,
    padding: 1,
  },
  quickActionContent: {
    padding: 18,
    gap: 14,
  },
  quickIconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickActionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  quickActionSubtitle: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.82)',
    lineHeight: 16,
  },
  quickActionFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingBottom: 16,
  },
  quickActionFooterText: {
    fontSize: 13,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  cardStack: {
    gap: 16,
    marginTop: 18,
  },
  appointmentCard: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#0F172A',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
    gap: 10,
  },
  appointmentStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  appointmentStatusText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  appointmentTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  appointmentProfessional: {
    fontSize: 13,
    color: colors.muted,
  },
  appointmentInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  appointmentInfoText: {
    fontSize: 13,
    color: colors.subsection,
  },
  wellbeingScrollView: {
    marginTop: 18,
  },
  wellbeingCarousel: {
    paddingHorizontal: 0,
  },
  wellbeingCard: {
    width: 280,
    marginRight: 16,
    borderRadius: 18,
    padding: 18,
    gap: 10,
    shadowColor: '#0F172A',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 3,
  },
  lastCard: {
    marginRight: 0,
  },
  iconBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },
  wellbeingTitle: {
    fontSize: 15,
    fontWeight: '700',
  },
  wellbeingDescription: {
    fontSize: 13,
    lineHeight: 18,
  },
  tipList: {
    marginTop: 18,
    gap: 14,
  },
  tipCard: {
    flexDirection: 'row',
    gap: 14,
    padding: 16,
    backgroundColor: colors.surface,
    borderRadius: 18,
    shadowColor: '#0F172A',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4,
  },
  tipIconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tipTextContainer: {
    flex: 1,
    gap: 6,
  },
  tipTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
  },
  tipDescription: {
    fontSize: 13,
    color: colors.subsection,
    lineHeight: 18,
  },
});

export default HomeScreen;