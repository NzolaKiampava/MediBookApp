import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, SafeAreaView} from 'react-native';
import {DrawerHeaderProps} from '@react-navigation/drawer';
import {LinearGradient} from 'expo-linear-gradient';
import {MaterialIcons} from '@expo/vector-icons';

import {colors, gradients} from '../../theme/colors';

interface HealthcareHeaderProps extends DrawerHeaderProps {
  title?: string;
  subtitle?: string;
  actionLabel?: string;
  onActionPress?: () => void;
  showBackButton?: boolean;
  onBackPress?: () => void;
}

const HealthcareHeader: React.FC<HealthcareHeaderProps> = ({
  navigation,
  route,
  title,
  subtitle,
  actionLabel,
  onActionPress,
  showBackButton,
  onBackPress,
}) => {
  const headerTitle = title ?? route.name;

  return (
    <LinearGradient colors={gradients.primary} style={styles.headerBackground}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          {showBackButton ? (
            <TouchableOpacity
              style={styles.menuButton}
              onPress={onBackPress || (() => navigation.goBack())}
              activeOpacity={0.75}>
              <MaterialIcons name="arrow-back" size={26} color="#FFFFFF" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.menuButton}
              onPress={() => navigation.toggleDrawer()}
              activeOpacity={0.75}>
              <MaterialIcons name="menu" size={26} color="#FFFFFF" />
            </TouchableOpacity>
          )}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{headerTitle}</Text>
            {subtitle ? (
              <Text style={styles.subtitle}>{subtitle}</Text>
            ) : null}
          </View>
          {actionLabel && onActionPress ? (
            <TouchableOpacity
              style={styles.actionButton}
              onPress={onActionPress}
              activeOpacity={0.8}>
              <Text style={styles.actionButtonText}>{actionLabel}</Text>
              <MaterialIcons name="arrow-forward" size={18} color={colors.primaryDark} />
            </TouchableOpacity>
          ) : (
            <View style={styles.placeholder} />
          )}
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  headerBackground: {
    paddingBottom: 12,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  safeArea: {
    paddingHorizontal: 20,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  menuButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  titleContainer: {
    flex: 1,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
  subtitle: {
    marginTop: 4,
    fontSize: 13,
    color: 'rgba(255,255,255,0.86)',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    gap: 6,
  },
  actionButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primaryDark,
  },
  placeholder: {
    width: 44,
    height: 44,
  },
});

export default HealthcareHeader;
