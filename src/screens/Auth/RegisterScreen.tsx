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

const RegisterScreen = ({navigation}: any) => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    cpf: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {signUp} = useAuth();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({...prev, [field]: value}));
  };

  const validateForm = () => {
    const {nome, email, telefone, cpf, password, confirmPassword} = formData;

    if (!nome || !email || !telefone || !cpf || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return false;
    }

    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return false;
    }

    if (password.length < 6) {
      Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres');
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      const {confirmPassword, ...userData} = formData;
      await signUp(userData);
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Erro ao criar conta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <View style={styles.logoCircle}>
              <MaterialIcons name="person-add" size={32} color="#FFFFFF" />
            </View>
            <Text style={styles.headerTitle}>Criar Conta</Text>
            <Text style={styles.headerSubtitle}>
              Junte-se ao MediBook hoje
            </Text>
          </View>
        </View>

        {/* Form */}
        <View style={styles.formContainer}>
          <View style={styles.progressIndicator}>
            <View style={[styles.progressDot, styles.progressDotActive]} />
            <View style={styles.progressLine} />
            <View style={[styles.progressDot, styles.progressDotActive]} />
            <View style={styles.progressLine} />
            <View style={[styles.progressDot, styles.progressDotActive]} />
          </View>

          <Text style={styles.formTitle}>Informações Pessoais</Text>

          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <MaterialIcons name="person" size={20} color="#6B7280" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Nome completo"
                placeholderTextColor="#9CA3AF"
                value={formData.nome}
                onChangeText={value => handleInputChange('nome', value)}
                autoCapitalize="words"
              />
            </View>

            <View style={styles.inputWrapper}>
              <MaterialIcons name="email" size={20} color="#6B7280" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#9CA3AF"
                value={formData.email}
                onChangeText={value => handleInputChange('email', value)}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View style={styles.inputWrapper}>
              <MaterialIcons name="phone" size={20} color="#6B7280" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Telefone"
                placeholderTextColor="#9CA3AF"
                value={formData.telefone}
                onChangeText={value => handleInputChange('telefone', value)}
                keyboardType="phone-pad"
              />
            </View>

            <View style={styles.inputWrapper}>
              <MaterialIcons name="badge" size={20} color="#6B7280" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="CPF"
                placeholderTextColor="#9CA3AF"
                value={formData.cpf}
                onChangeText={value => handleInputChange('cpf', value)}
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputWrapper}>
              <MaterialIcons name="lock" size={20} color="#6B7280" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Senha"
                placeholderTextColor="#9CA3AF"
                value={formData.password}
                onChangeText={value => handleInputChange('password', value)}
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

            <View style={styles.inputWrapper}>
              <MaterialIcons name="lock" size={20} color="#6B7280" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Confirmar senha"
                placeholderTextColor="#9CA3AF"
                value={formData.confirmPassword}
                onChangeText={value => handleInputChange('confirmPassword', value)}
                secureTextEntry={!showConfirmPassword}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                <MaterialIcons
                  name={showConfirmPassword ? 'visibility' : 'visibility-off'}
                  size={20}
                  color="#6B7280"
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.termsContainer}>
            <MaterialIcons name="info" size={16} color="#6B7280" />
            <Text style={styles.termsText}>
              Ao criar uma conta, você concorda com nossos{' '}
              <Text style={styles.termsLink}>Termos de Uso</Text> e{' '}
              <Text style={styles.termsLink}>Política de Privacidade</Text>
            </Text>
          </View>

          <TouchableOpacity
            style={[styles.registerButton, loading && styles.registerButtonDisabled]}
            onPress={handleRegister}
            disabled={loading}>
            {loading ? (
              <View style={styles.loadingContainer}>
                <MaterialIcons name="hourglass-empty" size={20} color="#FFFFFF" />
                <Text style={styles.registerButtonText}>Criando conta...</Text>
              </View>
            ) : (
              <Text style={styles.registerButtonText}>Criar conta</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginButtonText}>
              Já tem conta? Faça login
            </Text>
          </TouchableOpacity>
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
    height: height * 0.25,
    backgroundColor: '#10B981',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingTop: 50,
    paddingHorizontal: 24,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerContent: {
    alignItems: 'center',
  },
  logoCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
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
  formContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 32,
  },
  progressIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E5E7EB',
  },
  progressDotActive: {
    backgroundColor: '#10B981',
  },
  progressLine: {
    width: 20,
    height: 2,
    backgroundColor: '#10B981',
    marginHorizontal: 4,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 24,
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
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
    paddingHorizontal: 4,
  },
  termsText: {
    flex: 1,
    marginLeft: 8,
    fontSize: 12,
    color: '#6B7280',
    lineHeight: 16,
  },
  termsLink: {
    color: '#10B981',
    fontWeight: '500',
  },
  registerButton: {
    backgroundColor: '#10B981',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#10B981',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  registerButtonDisabled: {
    backgroundColor: '#9CA3AF',
    shadowOpacity: 0.1,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  loginButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  loginButtonText: {
    color: '#10B981',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default RegisterScreen;