import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';

import {colors} from '../../theme/colors';

const HealthcareFooter = () => {
  return (
    <View style={styles.container}>
      <View style={styles.branding}>
        <View style={styles.iconCircle}>
          <MaterialIcons name="favorite" size={20} color={colors.primaryDark} />
        </View>
        <View>
          <Text style={styles.title}>MediBook Care</Text>
          <Text style={styles.subtitle}>Compromisso contínuo com a sua saúde</Text>
        </View>
      </View>

      <View style={styles.linksRow}>
        <View style={styles.linkGroup}>
          <Text style={styles.groupTitle}>Atendimento</Text>
          <Text style={styles.linkText}>Central 0800 900 200</Text>
          <Text style={styles.linkText}>suporte@medibook.com</Text>
        </View>
        <View style={styles.linkGroup}>
          <Text style={styles.groupTitle}>Serviços</Text>
          <Text style={styles.linkText}>Consultas presenciais</Text>
          <Text style={styles.linkText}>Telemedicina</Text>
          <Text style={styles.linkText}>Exames diagnósticos</Text>
        </View>
      </View>

      <View style={styles.bottomRow}>
        <Text style={styles.bottomText}>© {new Date().getFullYear()} MediBook. Todos os direitos reservados.</Text>
        <Text style={styles.bottomText}>Termos · Privacidade</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 20,
    paddingVertical: 24,
    gap: 16,
  },
  branding: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E0F2FE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primaryDark,
  },
  subtitle: {
    fontSize: 12,
    color: colors.muted,
  },
  linksRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  linkGroup: {
    flex: 1,
    gap: 4,
  },
  groupTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  linkText: {
    fontSize: 12,
    color: colors.muted,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomText: {
    fontSize: 11,
    color: '#94A3B8',
  },
});

export default HealthcareFooter;
