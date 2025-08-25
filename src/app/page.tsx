"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  MapPin, 
  Calendar, 
  Shield, 
  Umbrella, 
  Star, 
  Bell, 
  User, 
  Home, 
  Map,
  Clock,
  Award,
  Droplets,
  Wifi,
  Car,
  Phone,
  Mail,
  Eye,
  EyeOff,
  ChevronRight,
  Gift,
  Coffee,
  Zap,
  Sun,
  CloudRain,
  Cloud,
  Navigation,
  LogOut,
  Settings,
  Heart,
  Battery,
  BatteryCharging,
  Thermometer,
  Wind,
  Map as MapIcon,
  AlertCircle,
  CheckCircle,
  X,
  Filter,
  Search,
  Plus,
  Minus,
  RotateCw,
  BarChart3,
  TrendingUp,
  Crown,
  Sparkles
} from 'lucide-react';

// Interfaces TypeScript
// Interfaces TypeScript
interface Weather {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  feelsLike: number;
}

interface ToastProps {
  message: string;
  type?: 'success' | 'error';
  onClose: () => void;
}

interface WeatherWidgetProps {
  weather: Weather | null;
}

interface User {
  name: string;
  email: string;
  phone: string;
  vehicle: string;
  memberSince: string;
  level: string;
  nextLevel: string;
  pointsToNextLevel: number;
  points: number;
  credits: number;
}

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone: string;
  vehicle: string;
  cpf: string;
  birthDate: string;
}

interface Location {
  lat: number;
  lng: number;
}

interface SupportPoint {
  id: number;
  name: string;
  address: string;
  distance: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  services: string[];
  available: boolean;
  waitTime: number;
  rating: number;
  totalReviews: number;
  openingHours: string;
  phone: string;
  images: string[];
  amenities: {
    showers: number;
    parking: boolean;
    restrooms: boolean;
    charging: boolean;
    lounge: boolean;
    cafe?: boolean;
  };
}

interface BathBooking {
  date: string;
  time: string;
  service: string;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
  read: boolean;
}

interface Booking {
  id: string;
  pointId: number;
  pointName: string;
  service: string;
  date: string;
  time: string;
  location: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

interface DeliveryStats {
  totalDeliveries: number;
  completedToday: number;
  earnings: number;
  rating: number;
  efficiency: number;
  today: number;
  week: number;
  month: number;
}

interface ToastState {
  message: string;
  type: 'success' | 'error';
}

type ServiceIconKey = 'banho' | 'wifi' | 'agua' | 'protetor' | 'capa' | 'massagem' | 'microondas' | 'eletricidade' | 'lanche';

const serviceIcons: Record<ServiceIconKey, React.ReactElement> = {
  banho: <Droplets className="w-4 h-4" />,
  wifi: <Wifi className="w-4 h-4" />,
  agua: <Coffee className="w-4 h-4" />,
  protetor: <Shield className="w-4 h-4" />,
  capa: <Umbrella className="w-4 h-4" />,
  massagem: <Zap className="w-4 h-4" />,
  microondas: <Coffee className="w-4 h-4" />,
  eletricidade: <BatteryCharging className="w-4 h-4" />,
  lanche: <Gift className="w-4 h-4" />
};

// Componentes auxiliares
const LoadingSpinner: React.FC = () => (
  <div className="flex justify-center items-center py-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
  </div>
);

const ToastComponent: React.FC<ToastProps> = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg flex items-center space-x-2 ${
      type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
    }`}>
      {type === 'success' ? (
        <CheckCircle className="w-5 h-5" />
      ) : (
        <AlertCircle className="w-5 h-5" />
      )}
      <span>{message}</span>
      <button 
        onClick={onClose} 
        className="ml-2"
        aria-label="Fechar notificação"
        title="Fechar notificação"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

const WeatherWidget: React.FC<WeatherWidgetProps> = ({ weather }) => {
  if (!weather) return null;

  const getWeatherIcon = (condition: string) => {
    if (condition.includes('sol') || condition.includes('limpo')) {
      return <Sun className="w-6 h-6 text-yellow-500" />;
    } else if (condition.includes('chuva')) {
      return <CloudRain className="w-6 h-6 text-blue-500" />;
    } else {
      return <Cloud className="w-6 h-6 text-gray-500" />;
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-400 to-blue-300 rounded-xl p-4 text-white">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2">
            {getWeatherIcon(weather.condition)}
            <span className="text-2xl font-bold">{weather.temperature}°C</span>
          </div>
          <p className="text-sm opacity-90">{weather.condition}</p>
          <p className="text-xs opacity-75">Sensação: {weather.feelsLike}°C</p>
        </div>
        <div className="text-right text-sm">
          <div className="flex items-center space-x-1">
            <Droplets className="w-4 h-4" />
            <span>{weather.humidity}%</span>
          </div>
          <div className="flex items-center space-x-1 mt-1">
            <Wind className="w-4 h-4" />
            <span>{weather.windSpeed} km/h</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente principal
const EntregadoresApp: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<string>('home');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loginData, setLoginData] = useState<LoginData>({ email: '', password: '' });
  const [registerData, setRegisterData] = useState<RegisterData>({
    name: '',
    email: '',
    password: '',
    phone: '',
    vehicle: 'moto',
    cpf: '',
    birthDate: ''
  });
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [toast, setToast] = useState<ToastState | null>(null);
  const [userLocation, setUserLocation] = useState<Location | null>(null);
  const [weather, setWeather] = useState<Weather | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [serviceFilter, setServiceFilter] = useState<string>('all');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Estados para funcionalidades
  const [selectedSupport, setSupportPoint] = useState<SupportPoint | null>(null);
  const [bathBooking, setBathBooking] = useState<BathBooking>({ date: '', time: '', service: 'banho' });
  const [userCredits, setUserCredits] = useState<number>(3);
  const [userPoints, setUserPoints] = useState<number>(1250);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [deliveryStats, setDeliveryStats] = useState<DeliveryStats>({
    totalDeliveries: 0,
    completedToday: 0,
    earnings: 0,
    rating: 0,
    today: 0,
    week: 0,
    month: 0,
    efficiency: 0
  });

  // Referência para mapa (simulado)
  const mapRef = useRef<HTMLDivElement>(null);

  // Mock data melhorada
  const supportPoints: SupportPoint[] = [
    {
      id: 1,
      name: 'Ponto Vila',
    address: 'Av. Princesa Isabel, 123 - Vila',
    distance: '0.8 km',
    coordinates: { lat: -23.7781, lng: -45.3581 },
    services: ['banho', 'wifi', 'agua', 'protetor', 'capa', 'massagem', 'eletricidade'],
    available: true,
    waitTime: 5,
    rating: 4.8,
    totalReviews: 124,
    openingHours: '06:00 - 22:00',
    phone: '(12) 3896-1234',
      images: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'],
      amenities: {
        showers: 4,
        parking: true,
        restrooms: true,
        charging: true,
        lounge: true
      }
    },
    {
      id: 2,
      name: 'Ponto Perequê',
    address: 'Av. Pedro Paula de Moraes, 456 - Perequê',
    distance: '1.2 km',
    coordinates: { lat: -23.7892, lng: -45.3642 },
    services: ['banho', 'wifi', 'agua', 'protetor', 'microondas', 'eletricidade'],
    available: true,
    waitTime: 12,
    rating: 4.5,
    totalReviews: 87,
    openingHours: '07:00 - 23:00',
    phone: '(12) 3896-5678',
      images: ['https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'],
      amenities: {
        showers: 3,
        parking: true,
        restrooms: true,
        charging: true,
        lounge: false
      }
    },
    {
      id: 3,
      name: 'Ponto Barra Velha',
    address: 'Estrada da Barra Velha, 789 - Barra Velha',
    distance: '2.1 km',
    coordinates: { lat: -23.8123, lng: -45.3789 },
    services: ['banho', 'wifi', 'agua', 'capa', 'massagem', 'eletricidade'],
    available: false,
    waitTime: 0,
    rating: 4.2,
    totalReviews: 56,
    openingHours: '08:00 - 20:00',
    phone: '(12) 3896-9012',
      images: ['https://images.unsplash.com/photo-1584132967330-4f1bbf39ccf5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'],
      amenities: {
        showers: 2,
        parking: false,
        restrooms: true,
        charging: true,
        lounge: false
      }
    },
    {
      id: 4,
      name: 'Ponto Praia Grande Premium',
    address: 'Av. Força Expedicionária Brasileira, 1254 - Praia Grande',
    distance: '0.5 km',
    coordinates: { lat: -23.7654, lng: -45.3456 },
    services: ['banho', 'wifi', 'agua', 'protetor', 'capa', 'massagem', 'microondas', 'eletricidade', 'lanche'],
    available: true,
    waitTime: 3,
    rating: 4.9,
    totalReviews: 203,
    openingHours: '24 horas',
    phone: '(12) 3896-3456',
      images: ['https://images.unsplash.com/photo-1560448204-603b3fc33ddc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'],
      amenities: {
        showers: 6,
        parking: true,
        restrooms: true,
        charging: true,
        lounge: true,
        cafe: true
      }
    }
  ];

  const serviceIcons: Record<ServiceIconKey, React.ReactElement> = {
    banho: <Droplets className="w-4 h-4" />,
    wifi: <Wifi className="w-4 h-4" />,
    agua: <Coffee className="w-4 h-4" />,
    protetor: <Shield className="w-4 h-4" />,
    capa: <Umbrella className="w-4 h-4" />,
    massagem: <Zap className="w-4 h-4" />,
    microondas: <Coffee className="w-4 h-4" />,
    eletricidade: <BatteryCharging className="w-4 h-4" />,
    lanche: <Gift className="w-4 h-4" />
  };

  // Efeitos iniciais
  useEffect(() => {
    // Simular obtenção da localização do usuário
    setIsLoading(true);
    setTimeout(() => {
      setUserLocation({ lat: -23.5630, lng: -46.6525 });
      setWeather({
        temperature: 28,
        condition: 'Parcialmente nublado',
        humidity: 65,
        windSpeed: 12,
        feelsLike: 30
      });
      
      // Carregar notificações
      setNotifications([
        {
          id: '1',
          title: 'Novo ponto disponível',
          message: 'Ponto Praia Grande Premium agora está disponível!',
          type: 'info',
          timestamp: new Date().toISOString(),
          read: false
        }
      ]);
      
      // Carregar reservas
      setBookings([
        {
          id: '1',
          pointId: 1,
          pointName: 'Ponto Vila',
          service: 'banho',
          date: '2023-12-15',
          location: 'Av. Princesa Isabel, 123 - Vila',
          time: '14:00',
          status: 'confirmed'
        },
        {
          id: '2',
          pointId: 4,
          pointName: 'Ponto Praia Grande Premium',
          service: 'massagem',
          date: '2023-12-16',
          location: 'Av. Força Expedicionária Brasileira, 1254 - Praia Grande',
          time: '16:30',
          status: 'pending'
        }
      ]);
      
      setIsLoading(false);
    }, 1500);
  }, []);

  // Filtrar pontos de apoio
  const filteredSupportPoints = supportPoints.filter(point => {
    const matchesSearch = point.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          point.address.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesService = serviceFilter === 'all' || 
                          point.services.includes(serviceFilter);
    
    return matchesSearch && matchesService;
  });

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulação de login com API
    try {
      // Aqui seria uma chamada real à API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (loginData.email && loginData.password) {
        const userData = {
          name: loginData.email === 'marcos@email.com' ? 'Marcos Silva' : 
                loginData.email === 'joao@email.com' ? 'João Santos' : 'Juliana Costa',
          email: loginData.email,
          points: userPoints,
          credits: userCredits,
          phone: '(11) 98765-4321',
          vehicle: 'moto',
          memberSince: '2023-01-15',
          level: 'bronze',
          nextLevel: 'silver',
          pointsToNextLevel: 350
        };
        setCurrentUser(userData);
        setActiveTab('home');
        showToast('Login realizado com sucesso!', 'success');
      } else {
        showToast('Preencha todos os campos', 'error');
      }
    } catch (error) {
      showToast('Erro ao fazer login. Tente novamente.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulação de registro com API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (registerData.name && registerData.email && registerData.password) {
        const userData = {
          name: registerData.name,
          email: registerData.email,
          points: 0,
          credits: 3,
          phone: registerData.phone,
          vehicle: registerData.vehicle,
          memberSince: new Date().toISOString().split('T')[0],
          level: 'bronze',
          nextLevel: 'silver',
          pointsToNextLevel: 1500
        };
        setCurrentUser(userData);
        setActiveTab('home');
        showToast('Conta criada com sucesso! Bem-vindo!', 'success');
      } else {
        showToast('Preencha todos os campos obrigatórios', 'error');
      }
    } catch (error) {
      showToast('Erro ao criar conta. Tente novamente.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const openWaze = (point: SupportPoint) => {
    const wazeUrl = `https://waze.com/ul?ll=${point.coordinates.lat},${point.coordinates.lng}&navigate=yes`;
    window.open(wazeUrl, '_blank');
  };

  const openGoogleMaps = (point: SupportPoint) => {
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${point.coordinates.lat},${point.coordinates.lng}`;
    window.open(mapsUrl, '_blank');
  };

  const bookBath = () => {
    if (bathBooking.date && bathBooking.time && selectedSupport) {
      const newBooking: Booking = {
        id: Date.now().toString(),
        pointId: selectedSupport.id,
        pointName: selectedSupport.name,
        service: 'banho',
        date: bathBooking.date,
        time: bathBooking.time,
        location: selectedSupport.address,
        status: 'confirmed'
      };
      
      setBookings([...bookings, newBooking]);
      setBathBooking({ date: '', time: '', service: 'banho' });
      setSupportPoint(null);
      showToast('Banho agendado com sucesso!', 'success');
    }
  };

  const cancelBooking = (bookingId: string) => {
    setBookings(bookings.filter(booking => booking.id !== bookingId));
    showToast('Reserva cancelada com sucesso!', 'success');
  };

  const redeemSunscreen = () => {
    if (userCredits > 0) {
      setUserCredits(prev => prev - 1);
      showToast('Protetor solar liberado! Retire no ponto de apoio selecionado.', 'success');
    } else {
      showToast('Você não tem créditos suficientes', 'error');
    }
  };

  const borrowRaincoat = () => {
    showToast('Capa de chuva liberada! Código: #CHUVA123. Retire no ponto selecionado.', 'success');
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  // Tela de login/cadastro
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center p-4">
        {toast && <ToastComponent message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
        
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
          <div className="bg-blue-400 p-6 text-white text-center">
            <div className="bg-gradient-to-br from-white/30 to-white/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm border border-white/20">
              <MapPin className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold mb-2">DeliveryHub</h1>
            <p className="opacity-90">Sua rede de apoio na estrada</p>
          </div>

          <div className="p-8">
            <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  isLogin ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500'
                }`}
              >
                Entrar
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  !isLogin ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500'
                }`}
              >
                Cadastrar
              </button>
            </div>

            {isLogin ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-600" />
                    <input
                      type="email"
                      value={loginData.email}
                      onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-600"
                      placeholder="seu@email.com"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-gray-600 hover:text-gray-800"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={loginData.password}
                      onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                      className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-600"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                  <div className="text-right mt-1">
                    <a href="#" className="text-sm text-blue-600 hover:underline">Esqueceu a senha?</a>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isLoading ? <RotateCw className="w-5 h-5 animate-spin mr-2" /> : null}
                  {isLoading ? 'Entrando...' : 'Entrar'}
                </button>

                <div className="text-center text-sm text-gray-500 mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="font-medium mb-2">Contas de teste:</p>
                  <p>marcos@email.com / qualquer senha</p>
                  <p>joao@email.com / qualquer senha</p>
                  <p>juliana@email.com / qualquer senha</p>
                </div>
              </form>
            ) : (
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nome completo</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-5 h-5 text-gray-600" />
                    <input
                      type="text"
                      value={registerData.name}
                      onChange={(e) => setRegisterData({...registerData, name: e.target.value})}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-600"
                      placeholder="Seu nome completo"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-600" />
                    <input
                      type="email"
                      value={registerData.email}
                      onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-600"
                      placeholder="seu@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-600" />
                      <input
                        type="tel"
                        value={registerData.phone}
                        onChange={(e) => setRegisterData({...registerData, phone: e.target.value})}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-600"
                        placeholder="(11) 99999-9999"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">CPF</label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-5 h-5 text-gray-600" />
                      <input
                        type="text"
                        value={registerData.cpf}
                        onChange={(e) => setRegisterData({...registerData, cpf: e.target.value})}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-600"
                        placeholder="000.000.000-00"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Data de Nascimento</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-600" />
                    <input
                      type="date"
                      value={registerData.birthDate}
                      onChange={(e) => setRegisterData({...registerData, birthDate: e.target.value})}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-600"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Veículo</label>
                  <div className="relative">
                    <Car className="absolute left-3 top-3 w-5 h-5 text-gray-600" />
                    <select
                      value={registerData.vehicle}
                      onChange={(e) => setRegisterData({...registerData, vehicle: e.target.value})}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                    >
                      <option value="moto">Moto</option>
                      <option value="bicicleta">Bicicleta</option>
                      <option value="carro">Carro</option>
                      <option value="pe">A pé</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-gray-600 hover:text-gray-800"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={registerData.password}
                      onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                      className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-600"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                  <p className="text-xs text-gray-600 mt-1">Mínimo de 8 caracteres</p>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="terms"
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    required
                  />
                  <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                    Concordo com os <a href="#" className="text-blue-600 hover:underline">Termos de Uso</a> e <a href="#" className="text-blue-600 hover:underline">Política de Privacidade</a>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isLoading ? <RotateCw className="w-5 h-5 animate-spin mr-2" /> : null}
                  {isLoading ? 'Criando conta...' : 'Criar conta'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Interface principal do app
  const renderHome = () => (
    <div className="space-y-6">
      {/* Header com saudação */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-400 text-white p-6 rounded-2xl relative overflow-hidden">
  

        
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Olá, {currentUser.name.split(' ')[0]}! 👋</h2>
              <p className="opacity-90">Pronto para mais um dia de entregas?</p>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-2 mb-1 justify-end">
                <Star className="w-5 h-5 text-yellow-300" />
                <span className="font-bold">{userPoints}</span>
              </div>
              <p className="text-sm opacity-90">pontos acumulados</p>
            </div>
          </div>
          
          {weather && <WeatherWidget weather={weather} />}
        </div>
      </div>

      {/* Cards de status rápido */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200 shadow-sm">
          <div className="flex items-center space-x-2 mb-2">
            <Shield className="w-5 h-5 text-green-600" />
            <span className="font-semibold text-green-800">Protetor Solar</span>
          </div>
          <p className="text-2xl font-bold text-green-600">{userCredits}</p>
          <p className="text-sm text-green-600">créditos disponíveis</p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200 shadow-sm">
          <div className="flex items-center space-x-2 mb-2">
            <MapPin className="w-5 h-5 text-blue-600" />
            <span className="font-semibold text-blue-800">Pontos Próximos</span>
          </div>
          <p className="text-2xl font-bold text-blue-600">{supportPoints.filter(p => p.available).length}</p>
          <p className="text-sm text-blue-600">disponíveis agora</p>
        </div>
      </div>

      {/* Ações rápidas */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">Ações Rápidas</h3>
          <button 
            onClick={() => setActiveTab('map')}
            className="text-sm text-blue-600 font-medium flex items-center"
          >
            Ver todos <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        
        <button
          onClick={() => setActiveTab('schedule')}
          className="w-full bg-white border border-gray-200 p-4 rounded-xl flex items-center justify-between hover:bg-gray-50 transition-colors shadow-sm"
        >
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-left">
              <p className="font-medium text-gray-800">Agendar Banho</p>
              <p className="text-sm text-gray-500">Reserve seu horário</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>

        <button
          onClick={redeemSunscreen}
          disabled={userCredits === 0}
          className="w-full bg-white border border-gray-200 p-4 rounded-xl flex items-center justify-between hover:bg-gray-50 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div className="flex items-center space-x-3">
            <div className="bg-green-100 p-2 rounded-lg">
              <Shield className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-left">
              <p className="font-medium text-gray-800">Resgatar Protetor Solar</p>
              <p className="text-sm text-gray-500">{userCredits} créditos disponíveis</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>

        <button
          onClick={borrowRaincoat}
          className="w-full bg-white border border-gray-200 p-4 rounded-xl flex items-center justify-between hover:bg-gray-50 transition-colors shadow-sm"
        >
          <div className="flex items-center space-x-3">
            <div className="bg-purple-100 p-2 rounded-lg">
              <Umbrella className="w-5 h-5 text-purple-600" />
            </div>
            <div className="text-left">
              <p className="font-medium text-gray-800">Pedir Capa de Chuva</p>
              <p className="text-sm text-gray-500">Empréstimo rápido</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      {/* Próximas reservas */}
      {bookings.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800">Próximas Reservas</h3>
            <button 
              onClick={() => setActiveTab('schedule')}
              className="text-sm text-blue-600 font-medium flex items-center"
            >
              Ver todas <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          
          {bookings.slice(0, 2).map(booking => (
            <div key={booking.id} className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-800">{booking.pointName}</h4>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {booking.status === 'confirmed' ? 'Confirmado' : 'Pendente'}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>{booking.date} às {booking.time}</span>
                <span className="capitalize">{booking.service}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Promoções */}
      <div className="bg-gradient-to-r from-orange-400 to-red-500 text-white p-4 rounded-xl shadow-md">
        <div className="flex items-center space-x-2 mb-2">
          <Gift className="w-5 h-5" />
          <span className="font-semibold">Promoção do Dia</span>
        </div>
        <p className="mb-3">Massagem grátis no Ponto Vila! Válida até às 18h</p>
        <button 
          onClick={() => {
            const point = supportPoints.find(p => p.id === 1);
            setSupportPoint(point as SupportPoint);
            setActiveTab('map');
          }}
          className="bg-white text-orange-500 px-4 py-2 rounded-lg font-medium text-sm hover:bg-gray-100 transition-colors"
        >
          Ver Detalhes
        </button>
      </div>

      {/* Estatísticas rápidas */}
      <div className="bg-gray-50 p-4 rounded-xl">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Suas Estatísticas</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-800">{deliveryStats.today}</p>
            <p className="text-sm text-gray-600">Hoje</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-800">{deliveryStats.week}</p>
            <p className="text-sm text-gray-600">Esta semana</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-800">{deliveryStats.month}</p>
            <p className="text-sm text-gray-600">Este mês</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-800">{deliveryStats.rating}</p>
            <p className="text-sm text-gray-600">Avaliação</p>
          </div>
        </div>
        <button 
          onClick={() => setActiveTab('profile')}
          className="w-full mt-4 text-center text-blue-600 text-sm font-medium hover:underline"
        >
          Ver estatísticas detalhadas
        </button>
      </div>
    </div>
  );

  const renderMap = () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar pontos de apoio..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
            aria-label="Buscar pontos de apoio"
            title="Digite para buscar pontos de apoio"
          />
        </div>
        <button 
          onClick={() => setServiceFilter(serviceFilter === 'all' ? 'banho' : 'all')}
          className="p-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          <Filter className="w-5 h-5 text-gray-600" />
        </button>
      </div>
      
      {serviceFilter !== 'all' && (
        <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg flex items-center">
          <span className="text-blue-800 text-sm">Filtrando por: {serviceFilter}</span>
          <button 
            onClick={() => setServiceFilter('all')}
            className="ml-2 text-blue-600 hover:text-blue-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
      
      <div className="bg-white border border-gray-200 rounded-xl mb-4 relative overflow-hidden h-48">
  {/* Mapa simplificado e mais visível */}
  <div className="w-full h-full bg-blue-200 flex items-center justify-center relative">
    {/* Fundo do mapa com padrão */}
    <div className="absolute inset-0 bg-gradient-to-br from-blue-300 to-green-200"></div>
    
    {/* Grade do mapa */}
    <div className="absolute inset-0 opacity-30">
      <div className="absolute w-full border-t border-gray-500" style={{top: '25%'}}></div>
      <div className="absolute w-full border-t border-gray-500" style={{top: '50%'}}></div>
      <div className="absolute w-full border-t border-gray-500" style={{top: '75%'}}></div>
      <div className="absolute h-full border-l border-gray-500" style={{left: '25%'}}></div>
      <div className="absolute h-full border-l border-gray-500" style={{left: '50%'}}></div>
      <div className="absolute h-full border-l border-gray-500" style={{left: '75%'}}></div>
    </div>
    
    {/* Ilhas simuladas */}
    <div className="absolute w-12 h-8 bg-green-400 rounded opacity-70" style={{left: '20%', top: '25%'}}></div>
    <div className="absolute w-16 h-10 bg-green-500 rounded opacity-70" style={{left: '55%', top: '45%'}}></div>
    <div className="absolute w-10 h-6 bg-green-400 rounded opacity-70" style={{left: '35%', top: '70%'}}></div>
    
    {/* Pontos de apoio */}
    <div className="absolute inset-4 z-10">
      {supportPoints.slice(0, 3).map((point, index) => (
        <div
          key={point.id}
          className={`absolute w-4 h-4 rounded-full border-2 border-white shadow-lg cursor-pointer hover:scale-125 transition-transform ${
            point.available ? 'bg-green-500' : 'bg-red-500'
          }`}
          style={{
            left: `${20 + index * 25}%`,
            top: `${30 + index * 15}%`
          }}
          title={point.name}
        ></div>
      ))}
      
      {/* Sua localização */}
      <div 
        className="absolute w-5 h-5 bg-blue-600 rounded-full border-2 border-white shadow-lg z-20"
        style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
        title="Sua localização"
      >
        <div className="w-full h-full bg-blue-500 rounded-full animate-pulse"></div>
      </div>
    </div>
    
    {/* Label da cidade */}
    <div className="absolute top-2 left-2 bg-white px-2 py-1 rounded text-sm font-bold text-gray-800 shadow-md z-10">
      📍 Ilhabela - SP
    </div>
    
    {/* Zoom indicator */}
    <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded text-xs text-gray-600 shadow z-10">
      Zoom: 12
    </div>
  </div>
  
  {/* Botão de navegação */}
  <button className="absolute bottom-4 right-4 bg-blue-600 hover:bg-blue-700 p-2 rounded-full shadow-lg text-white transition-colors">
    <Navigation className="w-5 h-5" />
  </button>
</div>
      
      <h2 className="text-xl font-bold text-gray-800">Pontos de Apoio Próximos</h2>
      
      {isLoading ? (
        <LoadingSpinner />
      ) : filteredSupportPoints.length === 0 ? (
        <div className="text-center py-8">
          <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Nenhum ponto encontrado</p>
          <button 
            onClick={() => {
              setSearchTerm('');
              setServiceFilter('all');
            }}
            className="text-blue-600 mt-2 text-sm hover:underline"
          >
            Limpar filtros
          </button>
        </div>
      ) : (
        filteredSupportPoints.map((point) => (
          <div key={point.id} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="font-semibold text-gray-800">{point.name}</h3>
                  {point.available ? (
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  ) : (
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-1">{point.address}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>{point.distance}</span>
                  <span>•</span>
                  <span>{point.available ? `${point.waitTime} min de espera` : 'Indisponível'}</span>
                  <span>•</span>
                  <span className="flex items-center">
                    <Star className="w-3 h-3 text-yellow-400 mr-1" />
                    {point.rating}
                  </span>
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <button
                  onClick={() => openWaze(point)}
                  className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center space-x-1"
                >
                  <Map className="w-4 h-4" />
                  <span>Waze</span>
                </button>
                {point.available && (
                  <button
                    onClick={() => {
                      setSupportPoint(point);
                      showToast(`${point.name} selecionado!`);
                    }}
                    className="bg-green-600 text-white px-3 py-1 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                  >
                    Selecionar
                  </button>
                )}
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-3">
              {point.services.map((service) => (
                <div 
                  key={service} 
                  className="flex items-center space-x-1 bg-gray-100 px-2 py-1 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors"
                  onClick={() => setServiceFilter(service)}
                >
                  {serviceIcons[service as ServiceIconKey]}
                  <span className="text-xs text-gray-700 capitalize">{service}</span>
                </div>
              ))}
            </div>
            
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>{point.openingHours}</span>
              <a href={`tel:${point.phone}`} className="text-blue-600 hover:underline flex items-center">
                <Phone className="w-3 h-3 mr-1" />
                {point.phone}
              </a>
            </div>
          </div>
        ))
      )}

      {selectedSupport && (
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl sticky bottom-4 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-blue-800">Ponto Selecionado:</h3>
              <p className="text-blue-700">{selectedSupport.name}</p>
            </div>
            <button
              onClick={() => setSupportPoint(null)}
              className="text-blue-600 hover:text-blue-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="mt-2 flex space-x-2">
            <button
              onClick={() => openWaze(selectedSupport)}
              className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              <Navigation className="w-4 h-4 mr-1" />
              Ir agora
            </button>
            <button
              onClick={() => setActiveTab('schedule')}
              className="flex-1 bg-green-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
            >
              Agendar
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const renderSchedule = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-800">Agendamento de Serviços</h2>
      
      {!selectedSupport ? (
        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-yellow-600" />
            <p className="text-yellow-800">Primeiro selecione um ponto de apoio na aba "Mapa"</p>
          </div>
          <button 
            onClick={() => setActiveTab('map')}
            className="mt-2 text-yellow-800 underline hover:no-underline text-sm"
          >
            Ir para o Mapa
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-green-50 border border-green-200 p-4 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-800 font-medium">Ponto selecionado: {selectedSupport.name}</p>
                <p className="text-green-700 text-sm">{selectedSupport.address}</p>
              </div>
              <button
          onClick={() => setSupportPoint(null)}
          className="text-green-600 hover:text-green-800"
          aria-label="Fechar detalhes do ponto"
          title="Fechar detalhes"
        >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <h3 className="font-medium text-gray-800 mb-3">Selecionar Serviço</h3>
            <div className="grid grid-cols-2 gap-2">
              {selectedSupport.services.map(service => (
                <button
                  key={service}
                  className={`p-3 rounded-lg border flex flex-col items-center justify-center space-y-1 ${
                    bathBooking.service === service 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                  onClick={() => setBathBooking({...bathBooking, service})}
                >
                  <div className="text-blue-600">
                    {serviceIcons[service as ServiceIconKey]}
                  </div>
                  <span className="text-xs font-medium text-gray-700 capitalize">{service}</span>
                </button>
              ))}
            </div>
          </div>

          {bathBooking.service && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Data</label>
                <input
                  type="date"
                  value={bathBooking.date}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setBathBooking({...bathBooking, date: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Horário</label>
                <select
                  value={bathBooking.time}
                  onChange={(e) => setBathBooking({...bathBooking, time: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Selecione um horário</option>
                  <option value="08:00">08:00</option>
                  <option value="09:00">09:00</option>
                  <option value="10:00">10:00</option>
                  <option value="11:00">11:00</option>
                  <option value="14:00">14:00</option>
                  <option value="15:00">15:00</option>
                  <option value="16:00">16:00</option>
                  <option value="17:00">17:00</option>
                </select>
              </div>

              <button
                onClick={bookBath}
                disabled={!bathBooking.date || !bathBooking.time}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Confirmar Agendamento
              </button>
            </>
          )}
        </div>
      )}
      
      {/* Reservas ativas */}
      {bookings.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Suas Reservas</h3>
          <div className="space-y-3">
            {bookings.map(booking => (
              <div key={booking.id} className="bg-white border border-gray-200 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-800">{booking.pointName}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {booking.status === 'confirmed' ? 'Confirmado' : 'Pendente'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                  <span>{booking.date} às {booking.time}</span>
                  <span className="capitalize">{booking.service}</span>
                </div>
                <button
                  onClick={() => cancelBooking(booking.id)}
                  className="text-red-600 text-sm hover:underline"
                >
                  Cancelar reserva
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderRewards = () => (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-2xl relative overflow-hidden">
        
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-1">Seus Pontos</h2>
              <p className="opacity-90">Continue entregando para ganhar mais!</p>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-2">
                <Star className="w-8 h-8 text-yellow-300" />
                <span className="text-3xl font-bold">{userPoints}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progresso até o próximo nível */}
      <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-gray-800">Nível Atual: Entregador Bronze</h3>
          <Crown className="w-5 h-5 text-yellow-600" />
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
          <div 
            className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${Math.min(100, (userPoints / 1500) * 100)}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-gray-500">
          <span>Bronze</span>
          <span>Prata (1.500 pts)</span>
        </div>
        <div className="mt-2 text-sm text-gray-600">
          {userPoints < 1500 ? (
            <p>Faltam {1500 - userPoints} pontos para o próximo nível</p>
          ) : (
            <p className="text-green-600 font-medium">Parabéns! Você atingiu o nível Prata!</p>
          )}
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-800">Benefícios Disponíveis</h3>
        
        <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-2 rounded-lg">
                <Zap className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800">Sessão de Massagem</p>
                <p className="text-sm text-gray-500">15 minutos de relaxamento</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-purple-600">500 pts</p>
              <button
                onClick={() => {
                  if (userPoints >= 500) {
                    setUserPoints(prev => prev - 500);
                    showToast('Massagem resgatada! Código: #RELAX789. Válida por 7 dias.', 'success');
                  }
                }}
                disabled={userPoints < 500}
                className="mt-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-lg text-sm font-medium hover:from-purple-700 hover:to-pink-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Resgatar
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-green-100 to-teal-100 p-2 rounded-lg">
                <Shield className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800">Protetor Solar Extra</p>
                <p className="text-sm text-gray-500">3 créditos adicionais</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-green-600">300 pts</p>
              <button
                onClick={() => {
                  if (userPoints >= 300) {
                    setUserPoints(prev => prev - 300);
                    setUserCredits(prev => prev + 3);
                    showToast('3 créditos de protetor solar adicionados à sua conta!', 'success');
                  }
                }}
                disabled={userPoints < 300}
                className="mt-1 bg-gradient-to-r from-green-600 to-teal-600 text-white px-3 py-1 rounded-lg text-sm font-medium hover:from-green-700 hover:to-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Resgatar
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-blue-100 to-cyan-100 p-2 rounded-lg">
                <Umbrella className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800">Capa de Chuva Premium</p>
                <p className="text-sm text-gray-500">Impermeável com refletivos</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-blue-600">450 pts</p>
              <button
                onClick={() => {
                  if (userPoints >= 450) {
                    setUserPoints(prev => prev - 450);
                    showToast('Capa de chuva premium resgatada! Retire em qualquer ponto.', 'success');
                  }
                }}
                disabled={userPoints < 450}
                className="mt-1 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-3 py-1 rounded-lg text-sm font-medium hover:from-blue-700 hover:to-cyan-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Resgatar
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm opacity-75">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gray-100 p-2 rounded-lg">
                <Gift className="w-5 h-5 text-gray-400" />
              </div>
              <div>
                <p className="font-medium text-gray-600">Kit Lanche Grátis</p>
                <p className="text-sm text-gray-400">Sanduíche + bebida + sobremesa</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-gray-400">800 pts</p>
              <p className="text-xs text-gray-400 mt-1">Em breve</p>
            </div>
          </div>
        </div>

        {/* Histórico de pontos */}
        <div className="bg-gray-50 p-4 rounded-xl">
          <h4 className="font-medium text-gray-800 mb-3">Como ganhar pontos</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Entrega completada</span>
              <span className="font-medium text-green-600">+10 pts</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Entrega no prazo</span>
              <span className="font-medium text-green-600">+5 pts</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Avaliação 5 estrelas</span>
              <span className="font-medium text-green-600">+15 pts</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Uso do ponto de apoio</span>
              <span className="font-medium text-green-600">+3 pts</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Indicar amigo</span>
              <span className="font-medium text-green-600">+100 pts</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="space-y-6">
      {/* Header do perfil */}
      <div className="bg-gradient-to-r from-blue-300 to-blue-400 text-white p-6 rounded-2xl relative overflow-hidden">
        
        <div className="relative z-10">
          <div className="flex items-center space-x-4">
            <div className="bg-white bg-opacity-20 p-3 rounded-full">
              <User className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{currentUser.name}</h2>
              <p className="opacity-90">{currentUser.email}</p>
              <p className="text-sm opacity-90 mt-1">Membro desde {currentUser.memberSince}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white border border-gray-200 p-4 rounded-xl text-center shadow-sm">
          <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
            <Award className="w-6 h-6 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-gray-800">{deliveryStats.totalDeliveries}</p>
          <p className="text-sm text-gray-600">Entregas este mês</p>
        </div>
        
        <div className="bg-white border border-gray-200 p-4 rounded-xl text-center shadow-sm">
          <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
            <Star className="w-6 h-6 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-gray-800">{deliveryStats.rating}</p>
          <p className="text-sm text-gray-600">Avaliação média</p>
        </div>
        
        <div className="bg-white border border-gray-200 p-4 rounded-xl text-center shadow-sm">
          <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
            <TrendingUp className="w-6 h-6 text-purple-600" />
          </div>
          <p className="text-2xl font-bold text-gray-800">{deliveryStats.totalDeliveries}</p>
          <p className="text-sm text-gray-600">Entregas esta semana</p>
        </div>
        
        <div className="bg-white border border-gray-200 p-4 rounded-xl text-center shadow-sm">
          <div className="bg-yellow-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
            <BarChart3 className="w-6 h-6 text-yellow-600" />
          </div>
          <p className="text-2xl font-bold text-gray-800">92%</p>
          <p className="text-sm text-gray-600">Taxa de aceitação</p>
        </div>
      </div>

      {/* Informações pessoais */}
      <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm">
        <h3 className="font-semibold text-gray-800 mb-3">Informações Pessoais</h3>
        <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-black font-medium">Nome</span>
              <span className="font-semibold text-black">{currentUser.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-black font-medium">E-mail</span>
              <span className="font-semibold text-black">{currentUser.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-black font-medium">Telefone</span>
              <span className="font-semibold text-black">{currentUser.phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-black font-medium">Veículo</span>
              <span className="font-semibold text-black capitalize">{currentUser.vehicle}</span>
            </div>
          <button className="w-full mt-2 text-blue-600 text-sm font-medium hover:underline text-center">
            Editar informações
          </button>
        </div>
      </div>

      {/* Integrações de apps */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Aplicativos Integrados</h3>
        
        <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-red-100 p-2 rounded-lg">
                <Car className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800">iFood</p>
                <p className="text-sm text-green-600">Conectado</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">127 entregas</p>
              <p className="text-sm font-medium text-green-600">+1.270 pts ganhos</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-yellow-100 p-2 rounded-lg">
                <Car className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800">Rappi</p>
                <p className="text-sm text-green-600">Conectado</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">89 entregas</p>
              <p className="text-sm font-medium text-green-600">+890 pts ganhos</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <Car className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800">Uber Eats</p>
                <p className="text-sm text-gray-500">Não conectado</p>
              </div>
            </div>
            <button className="bg-green-600 text-white px-3 py-1 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
              Conectar
            </button>
          </div>
        </div>
      </div>

      {/* WiFi nos pontos */}
      <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-4 rounded-xl">
        <div className="flex items-center space-x-3 mb-3">
          <Wifi className="w-6 h-6" />
          <h3 className="text-lg font-semibold">WiFi Gratuito</h3>
        </div>
        <p className="mb-3 opacity-90">
          Conecte-se gratuitamente em todos os pontos de apoio e economize seus dados móveis!
        </p>
        <div className="bg-white bg-opacity-30 p-3 rounded-lg border border-white/20">
            <p className="font-mono text-sm text-gray-900 font-semibold">
              <strong>Rede:</strong> DeliveryHub_Free<br />
              <strong>Senha:</strong> entregador2025
            </p>
          </div>
      </div>

      {/* Configurações */}
      <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm">
        <h3 className="font-semibold text-gray-800 mb-3">Configurações</h3>
        <div className="space-y-3">
          <button className="w-full flex items-center justify-between py-2 text-gray-700 hover:text-blue-600">
            <span>Notificações</span>
            <ChevronRight className="w-4 h-4" />
          </button>
          <button className="w-full flex items-center justify-between py-2 text-gray-700 hover:text-blue-600">
            <span>Privacidade e segurança</span>
            <ChevronRight className="w-4 h-4" />
          </button>
          <button className="w-full flex items-center justify-between py-2 text-gray-700 hover:text-blue-600">
            <span>Acessibilidade</span>
            <ChevronRight className="w-4 h-4" />
          </button>
          <button className="w-full flex items-center justify-between py-2 text-gray-700 hover:text-blue-600">
            <span>Preferências de viagem</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Botão sair */}
      <button
        onClick={() => {
          setCurrentUser(null);
          setActiveTab('home');
          showToast('Logout realizado com sucesso!', 'success');
        }}
        className="w-full bg-red-500 text-white py-3 rounded-lg font-medium hover:bg-red-600 transition-colors flex items-center justify-center"
      >
        <LogOut className="w-5 h-5 mr-2" />
        Sair da Conta
      </button>
    </div>
  );

  const renderNotifications = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800">Notificações</h2>
        <button 
          onClick={() => {
            const unreadCount = notifications.filter(n => !n.read).length;
            if (unreadCount > 0) {
              setNotifications(notifications.map(n => ({ ...n, read: true })));
              showToast('Todas as notificações marcadas como lidas', 'success');
            }
          }}
          className="text-blue-600 text-sm font-medium"
        >
          Marcar todas como lidas
        </button>
      </div>
      
      {/* Notificações recentes */}
      <div className="space-y-3">
        {notifications.map((notification) => (
          <div 
            key={notification.id} 
            className={`border-l-4 p-4 rounded-r-xl cursor-pointer transition-all ${
              notification.read 
                ? 'bg-gray-50 border-gray-300' 
                : 'bg-blue-50 border-blue-500'
            }`}
            onClick={() => markNotificationAsRead(notification.id)}
          >
            <div className="flex items-start space-x-3">
              {!notification.read && (
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              )}
              <div className="flex-1">
                <p className={`font-medium ${
                  notification.read ? 'text-gray-800' : 'text-blue-800'
                }`}>
                  {notification.title}
                </p>
                <p className={`text-sm mt-1 ${
                  notification.read ? 'text-gray-600' : 'text-blue-700'
                }`}>
                  {notification.message}
                </p>
                <p className={`text-xs mt-2 ${
                  notification.read ? 'text-gray-500' : 'text-blue-600'
                }`}>
                  {notification.timestamp}
                </p>
              </div>
              {!notification.read && (
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    markNotificationAsRead(notification.id);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {notifications.length === 0 && (
        <div className="text-center py-8">
          <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Nenhuma notificação</p>
        </div>
      )}

      {/* Configurações de notificação */}
      <div className="bg-white border border-gray-200 p-4 rounded-xl">
        <h3 className="font-semibold text-gray-800 mb-3">Configurações</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-800">Promoções nos pontos</p>
              <p className="text-sm text-gray-600">Ofertas especiais e descontos</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-800">Lembretes de créditos</p>
              <p className="text-sm text-gray-600">Quando seus créditos expirarem</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-800">Novos benefícios</p>
              <p className="text-sm text-gray-600">Quando novos prêmios estiverem disponíveis</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen">
      {toast && <ToastComponent message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      
      {/* Conteúdo principal */}
      <main className="pb-20 px-4 pt-4">
        {activeTab === 'home' && renderHome()}
        {activeTab === 'map' && renderMap()}
        {activeTab === 'schedule' && renderSchedule()}
        {activeTab === 'rewards' && renderRewards()}
        {activeTab === 'profile' && renderProfile()}
        {activeTab === 'notifications' && renderNotifications()}
      </main>

      {/* Barra de navegação inferior */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 flex justify-between items-center max-w-md mx-auto">
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center px-3 py-2 rounded-lg ${activeTab === 'home' ? 'text-blue-600 bg-blue-50' : 'text-gray-500'}`}
        >
          <Home className="w-6 h-6" />
          <span className="text-xs mt-1">Início</span>
        </button>
        
        <button
          onClick={() => setActiveTab('map')}
          className={`flex flex-col items-center px-3 py-2 rounded-lg ${activeTab === 'map' ? 'text-blue-600 bg-blue-50' : 'text-gray-500'}`}
        >
          <Map className="w-6 h-6" />
          <span className="text-xs mt-1">Mapa</span>
        </button>
        
        <button
          onClick={() => setActiveTab('rewards')}
          className={`flex flex-col items-center px-3 py-2 rounded-lg ${activeTab === 'rewards' ? 'text-blue-600 bg-blue-50' : 'text-gray-500'}`}
        >
          <Star className="w-6 h-6" />
          <span className="text-xs mt-1">Benefícios</span>
        </button>
        
        <button
          onClick={() => setActiveTab('notifications')}
          className={`flex flex-col items-center px-3 py-2 rounded-lg ${activeTab === 'notifications' ? 'text-blue-600 bg-blue-50' : 'text-gray-500'}`}
        >
          <div className="relative">
            <Bell className="w-6 h-6" />
            {notifications.filter(n => !n.read).length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {notifications.filter(n => !n.read).length}
              </span>
            )}
          </div>
          <span className="text-xs mt-1">Notificações</span>
        </button>
        
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex flex-col items-center px-3 py-2 rounded-lg ${activeTab === 'profile' ? 'text-blue-600 bg-blue-50' : 'text-gray-500'}`}
        >
          <User className="w-6 h-6" />
          <span className="text-xs mt-1">Perfil</span>
        </button>
      </nav>
    </div>
  );
};

export default EntregadoresApp;