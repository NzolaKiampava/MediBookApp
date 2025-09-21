import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import {useAuth} from '../../context/AuthContext';

const {width, height} = Dimensions.get('window');

const LoginScreen = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const {signIn} = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    try {
      setLoading(true);
      await signIn(email, password);
    } catch (error: any) {
      Alert.alert('Erro', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header with gradient background */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <View style={styles.logoCircle}>
              <MaterialIcons name="local-hospital" size={40} color="#FFFFFF" />
            </View>
            <Text style={styles.appName}>MediBook</Text>
            <Text style={styles.tagline}>Sua saúde em primeiro lugar</Text>
          </View>
        </View>

        {/* Login Form */}
        <View style={styles.formContainer}>
          <Text style={styles.welcomeTitle}>Bem-vindo de volta!</Text>
          <Text style={styles.welcomeSubtitle}>
            Entre na sua conta para continuar
          </Text>

          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <MaterialIcons name="email" size={20} color="#6B7280" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Digite seu email"
                placeholderTextColor="#9CA3AF"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View style={styles.inputWrapper}>
              <MaterialIcons name="lock" size={20} color="#6B7280" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Digite sua senha"
                placeholderTextColor="#9CA3AF"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowPassword(!showPassword)}>
                <MaterialIcons
                  name={showPassword ? 'visibility' : 'visibility-off'}
                  size={20}
                  color="#6B7280"
                />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.loginButton, loading && styles.loginButtonDisabled]}
            onPress={handleLogin}
            disabled={loading}>
            {loading ? (
              <View style={styles.loadingContainer}>
                <MaterialIcons name="hourglass-empty" size={20} color="#FFFFFF" />
                <Text style={styles.loginButtonText}>Entrando...</Text>
              </View>
            ) : (
              <Text style={styles.loginButtonText}>Entrar</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Esqueceu sua senha?</Text>
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>ou</Text>
            <View style={styles.dividerLine} />
          </View>

          <TouchableOpacity
            style={styles.registerButton}
            onPress={() => navigation.navigate('Register')}>
            <Text style={styles.registerButtonText}>
              Criar nova conta
            </Text>
          </TouchableOpacity>
        </View>

        {/* Demo credentials */}
        <View style={styles.demoContainer}>
          <View style={styles.demoCard}>
            <MaterialIcons name="info" size={16} color="#3B82F6" />
            <View style={styles.demoContent}>
              <Text style={styles.demoTitle}>Conta de demonstração</Text>
              <Text style={styles.demoText}>Email: teste@email.com</Text>
              <Text style={styles.demoText}>Senha: 123456</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    height: height * 0.35,
    backgroundColor: '#3B82F6',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 32,
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 16,
    color: '#1F2937',
  },
  eyeIcon: {
    padding: 4,
  },
  loginButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#3B82F6',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  loginButtonDisabled: {
    backgroundColor: '#9CA3AF',
    shadowOpacity: 0.1,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  forgotPassword: {
    alignItems: 'center',
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: '#3B82F6',
    fontSize: 14,
    fontWeight: '500',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  dividerText: {
    marginHorizontal: 16,
    color: '#6B7280',
    fontSize: 14,
  },
  registerButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#3B82F6',
  },
  registerButtonText: {
    color: '#3B82F6',
    fontSize: 16,
    fontWeight: '600',
  },
  demoContainer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  demoCard: {
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  demoContent: {
    marginLeft: 12,
    flex: 1,
  },
  demoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E40AF',
    marginBottom: 4,
  },
  demoText: {
    fontSize: 12,
    color: '#3730A3',
    marginBottom: 2,
  },
});

export default LoginScreen;