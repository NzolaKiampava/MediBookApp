import React from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {MaterialIcons} from '@expo/vector-icons';
import {useAuth} from '../../context/AuthContext';
import {colors, gradients} from '../../theme/colors';

const ProfileScreen = () => {
  const {user, signOut} = useAuth();
  
  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <LinearGradient colors={gradients.primary} style={styles.header}>
          <View style={styles.avatar}>
            <MaterialIcons name="person" size={48} color={colors.primary} />
          </View>
          <Text style={styles.userName}>{user?.nome || 'Usuário'}</Text>
          <Text style={styles.userEmail}>{user?.email || 'email@example.com'}</Text>
        </LinearGradient>
        <View style={styles.section}>
          <TouchableOpacity style={styles.logoutButton} onPress={() => signOut()}>
            <MaterialIcons name="logout" size={20} color="#EF4444" />
            <Text style={styles.logoutText}>Sair</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {flex: 1, backgroundColor: colors.background},
  scrollContent: {paddingBottom: 90},
  header: {paddingVertical: 40, alignItems: 'center', borderBottomLeftRadius: 32, borderBottomRightRadius: 32},
  avatar: {width: 92, height: 92, borderRadius: 46, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center', marginBottom: 16},
  userName: {fontSize: 22, fontWeight: '700', color: '#FFF'},
  userEmail: {fontSize: 14, color: 'rgba(255,255,255,0.85)'},
  section: {padding: 20},
  logoutButton: {flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, backgroundColor: colors.surface, borderRadius: 18, paddingVertical: 16},
  logoutText: {fontSize: 15, fontWeight: '700', color: '#EF4444'},
});

export default ProfileScreen;
