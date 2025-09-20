import React, {createContext, useContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
}

interface AuthContextData {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (userData: RegisterData) => Promise<void>;
  signOut: () => Promise<void>;
}

interface RegisterData {
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  password: string;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

const AuthProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStoredUser();
  }, []);

  const loadStoredUser = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('@MediBook:user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Erro ao carregar usuário:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // Simulação de API call
      // Em um app real, você faria uma requisição para sua API
      if (email === 'teste@email.com' && password === '123456') {
        const userData: User = {
          id: '1',
          nome: 'João Silva',
          email: 'teste@email.com',
          telefone: '(11) 99999-9999',
          cpf: '123.456.789-00',
        };
        
        await AsyncStorage.setItem('@MediBook:user', JSON.stringify(userData));
        setUser(userData);
      } else {
        throw new Error('Email ou senha inválidos');
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (userData: RegisterData) => {
    try {
      setIsLoading(true);
      
      // Simulação de registro
      const newUser: User = {
        id: Date.now().toString(),
        nome: userData.nome,
        email: userData.email,
        telefone: userData.telefone,
        cpf: userData.cpf,
      };
      
      await AsyncStorage.setItem('@MediBook:user', JSON.stringify(newUser));
      setUser(newUser);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem('@MediBook:user');
      setUser(null);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        signIn,
        signUp,
        signOut,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;