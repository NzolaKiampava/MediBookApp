# MediBook - Aplicativo de Reservas Hospitalares

MediBook é um aplicativo frontend em React Native com Expo, projetado para permitir que os pacientes agendem consultas médicas, exames e procedimentos em hospitais de forma conveniente e eficiente.

## 🏥 Funcionalidades

### ✅ Implementadas
- **Autenticação de usuário** - Login e cadastro de pacientes
- **Interface principal** - Dashboard com ações rápidas e informações
- **Busca de hospitais** - Pesquisa por hospitais, clínicas e especialidades
- **Sistema de agendamento** - Interface completa para agendar consultas, exames e procedimentos
- **Histórico de consultas** - Visualização de agendamentos passados e futuros
- **Perfil do usuário** - Gerenciamento de dados pessoais e configurações

### 🎯 Principais Telas
1. **Login/Cadastro** - Autenticação de usuários
2. **Home** - Dashboard principal com ações rápidas
3. **Busca** - Pesquisa de hospitais e clínicas
4. **Agendamento** - Sistema completo de reservas
5. **Consultas** - Histórico e agendamentos futuros
6. **Perfil** - Dados do usuário e configurações

## 🛠️ Tecnologias Utilizadas

- **React Native** - Framework principal
- **Expo** - Plataforma de desenvolvimento
- **React Navigation** - Navegação entre telas
- **@expo/vector-icons** - Ícones do MaterialIcons
- **AsyncStorage** - Armazenamento local
- **Context API** - Gerenciamento de estado
- **TypeScript** - Tipagem estática

## 📱 Estrutura do Projeto

```
medibook-app/
├── src/
│   ├── components/          # Componentes reutilizáveis
│   ├── screens/            # Telas do aplicativo
│   │   ├── Auth/           # Telas de autenticação
│   │   ├── Home/           # Tela principal
│   │   ├── Search/         # Busca de hospitais
│   │   ├── Booking/        # Sistema de agendamento
│   │   ├── Appointments/   # Histórico de consultas
│   │   └── Profile/        # Perfil do usuário
│   ├── navigation/         # Configuração de navegação
│   └── context/           # Contextos (AuthContext)
├── assets/                # Imagens e recursos
├── App.tsx               # Componente principal
├── app.json             # Configuração do Expo
└── package.json         # Dependências
```

## 🚀 Como Executar

### Pré-requisitos
- Node.js (versão 16 ou superior)
- npm ou yarn
- Expo CLI global: `npm install -g expo-cli`
- Aplicativo Expo Go no seu smartphone (iOS/Android)

### Instalação
1. Clone o repositório:
```bash
git clone <repositorio>
cd medibook-app
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o projeto:
```bash
npm start
# ou
expo start
```

4. Escaneie o QR Code com o aplicativo Expo Go

### Scripts Disponíveis
- `npm start` - Inicia o servidor de desenvolvimento
- `npm run android` - Executa no emulador Android
- `npm run ios` - Executa no simulador iOS
- `npm run web` - Executa no navegador

## 📱 Como Usar

### Login de Demonstração
Para testar o aplicativo, use estas credenciais:
- **Email:** teste@email.com
- **Senha:** 123456

### Fluxo Principal
1. **Faça login** com as credenciais de demonstração
2. **Explore o dashboard** na tela inicial
3. **Busque hospitais** na aba "Buscar"
4. **Agende uma consulta** na aba "Agendar"
5. **Visualize seus agendamentos** na aba "Consultas"
6. **Gerencie seu perfil** na aba "Perfil"

## 🎨 Design System

### Cores Principais
- **Azul primário:** #4A90E2 (botões, navegação)
- **Verde:** #50C878 (confirmações, sucesso)
- **Amarelo:** #FFD93D (avisos, ratings)
- **Vermelho:** #FF6B6B (cancelamentos, erros)
- **Cinza claro:** #F8F9FA (backgrounds)
- **Branco:** #FFFFFF (cards, containers)

### Tipografia
- **Títulos:** Peso bold, tamanhos 18-32px
- **Texto normal:** Peso normal, tamanhos 14-16px
- **Texto secundário:** Cor #666, tamanhos 12-14px

## 🔧 Configurações

### Customização
- Modifique cores em cada arquivo de estilo
- Adicione novos hospitais no array `hospitals` em `SearchScreen`
- Customize agendamentos mock em `AppointmentsScreen`
- Ajuste perfil de usuário em `AuthContext`

### Assets
Para personalizar ícones e splash screen:
1. Substitua arquivos na pasta `assets/`
2. Atualize `app.json` se necessário
3. Execute `expo build` para regenerar assets

## 📝 Notas de Desenvolvimento

### Estado Atual
- Interface completa implementada
- Dados mock para demonstração
- Navegação funcional entre todas as telas
- Sistema de autenticação simulado

### Próximos Passos (Backend)
- Integração com API real
- Autenticação JWT
- Base de dados de hospitais
- Sistema de notificações push
- Pagamentos integrados

## 🤝 Contribuição

Este é um projeto frontend de demonstração. Para expandir:

1. Implemente backend com API REST
2. Adicione autenticação real
3. Integre com base de dados
4. Adicione testes unitários
5. Configure CI/CD

## 📄 Licença

Este projeto é uma demonstração e está disponível para fins educacionais.

## 📞 Suporte

Para dúvidas sobre o projeto:
- Consulte a documentação do Expo
- Verifique issues do React Navigation
- Revisite a documentação do React Native

---

**MediBook v1.0.0** - Desenvolvido com React Native + Expo