import React, { useState, useEffect } from 'react';
import { 
  ChevronDown,
  Instagram,
  Facebook,
  Linkedin,
  Search,
  Share2,
  PenTool,
  BookOpen,
  GraduationCap,
  Megaphone,
  CheckCircle,
  Star,
  Sun,
  Moon
} from 'lucide-react';

// Adicione este tipo para o formulário
type FormData = {
  name: string;
  phone: string;
  email: string;
  subject: 'Serviços' | 'Indica+' | 'Pacotes' | 'Outros';
  message: string;
};

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    subject: 'Serviços',
    message: ''
  });
  const [showPopup, setShowPopup] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const getThemeClasses = () => {
    if (isDarkMode) {
      return {
        background: 'bg-black',
        text: 'text-white',
        navBg: isScrolled ? 'bg-black/90' : 'bg-transparent',
        sectionBg: 'bg-black',
        cardBg: 'bg-black/50',
        inputBg: 'bg-black/50',
        textSecondary: 'text-gray-300',
        textMuted: 'text-gray-400'
      };
    }
    return {
      background: 'bg-white',
      text: 'text-black',
      navBg: isScrolled ? 'bg-white/90' : 'bg-transparent',
      sectionBg: 'bg-white',
      cardBg: 'bg-white/50',
      inputBg: 'bg-white/50',
      textSecondary: 'text-gray-700',
      textMuted: 'text-gray-600'
    };
  };

  const theme = getThemeClasses();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      subject: 'Serviços',
      message: ''
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    setShowPopup(true);
    
    const message = `*Nova mensagem de contato*\n\n*Nome:* ${formData.name}\n*Telefone:* ${formData.phone}\n*E-mail:* ${formData.email}\n*Assunto:* ${formData.subject}\n*Mensagem:* ${formData.message}`;
    
    const encodedMessage = encodeURIComponent(message);
    
    const whatsappUrl = `https://wa.me/5521986007494?text=${encodedMessage}`;
    
    setTimeout(() => {
      try {
        resetForm();
        setShowPopup(false);
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      } catch (error) {
        window.location.href = whatsappUrl;
      }
    }, 7000);
  };

  const services = [
    {
      icon: <Search className="w-12 h-12 text-[#D4AF37]" />,
      title: "SEO e Otimização",
      description: "Apareça no topo das buscas com nossas estratégias de SEO."
    },
    {
      icon: <Share2 className="w-12 h-12 text-[#D4AF37]" />,
      title: "Social Media",
      description: "Gerenciamento de redes sociais para engajar seu público."
    },
    {
      icon: <PenTool className="w-12 h-12 text-[#D4AF37]" />,
      title: "Criação de Conteúdo",
      description: "Conteúdo envolvente para Marketing Digital e conversão."
    },
    {
      icon: <BookOpen className="w-12 h-12 text-[#D4AF37]" />,
      title: "E-books e Audiobooks",
      description: "Produção de e-books e audiobooks personalizados."
    },
    {
      icon: <GraduationCap className="w-12 h-12 text-[#D4AF37]" />,
      title: "Cursos Online",
      description: "Transforme conhecimento em cursos online lucrativos."
    },
    {
      icon: <Megaphone className="w-12 h-12 text-[#D4AF37]" />,
      title: "Propaganda e Comerciais",
      description: "Criação de propagandas e comerciais impactantes para divulgação."
    }
  ];

  const packages = [
    {
      title: "Pacote Visibilidade Online",
      description: "Ideal para quem quer ser encontrado com SEO e Social Media.",
      features: [
        "SEO e Otimização de Negócios",
        "Gerenciamento de Social Media",
        "Relatórios mensais de performance"
      ]
    },
    {
      title: "Pacote Conteúdo Magnético",
      description: "Criação de Conteúdo e Social Media para atrair clientes.",
      features: [
        "Criação de Conteúdo (texto, imagens, vídeos)",
        "Gerenciamento de Social Media",
        "Estratégia de distribuição de conteúdo"
      ]
    },
    {
      title: "Pacote Autoridade Digital",
      description: "E-books, Audiobooks e Cursos Online para se destacar.",
      features: [
        "Criação de E-books e Audiobooks",
        "Produção de Cursos Online",
        "Estratégia de lançamento"
      ]
    },
    {
      title: "Pacote Personalizado",
      description: "Monte seu plano com Propaganda Comerciais e IA.",
      features: [
        "Propaganda Comerciais sob medida",
        "Soluções com Inteligência Artificial",
        "Atendimento personalizado"
      ]
    }
  ];

  const MobileMenu = () => (
    <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden fixed inset-0 z-50 ${theme.background}`}>
      <div className="flex flex-col items-center justify-center h-full space-y-8">
        <button 
          onClick={() => {
            scrollToSection('services');
            setIsMobileMenuOpen(false);
          }}
          className="text-xl hover:text-[#D4AF37] transition-colors"
        >
          Serviços
        </button>
        <button 
          onClick={() => {
            scrollToSection('packages');
            setIsMobileMenuOpen(false);
          }}
          className="text-xl hover:text-[#D4AF37] transition-colors"
        >
          Pacotes
        </button>
        <button 
          onClick={() => {
            scrollToSection('indica');
            setIsMobileMenuOpen(false);
          }}
          className="text-xl hover:text-[#D4AF37] transition-colors"
        >
          Indica+
        </button>
        <button 
          onClick={() => {
            scrollToSection('contact');
            setIsMobileMenuOpen(false);
          }}
          className="text-xl hover:text-[#D4AF37] transition-colors"
        >
          Contato
        </button>
      </div>
    </div>
  );

  const validatePhone = (phone: string) => {
    const phoneRegex = /^\(?([0-9]{2})\)?[-. ]?([0-9]{5})[-. ]?([0-9]{4})$/;
    return phoneRegex.test(phone);
  };

  const formatPhone = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{4})\d+?$/, '$1');
  };

  return (
    <div className={`min-h-screen ${theme.background} ${theme.text}`}>
      <nav className={`fixed w-full z-50 transition-all duration-300 ${theme.navBg} backdrop-blur-sm ${isScrolled ? 'py-4' : 'py-6'}`}>
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <img 
                src="/images/lif3_logo.png"
                alt="Lif3 Digital Media - Marketing Digital e SEO"
                className="h-12 md:h-16 transition-all duration-300 w-auto object-contain"
                loading="eager"
              />
            </div>
            
            <div className="flex items-center gap-8">
              <div className="hidden md:flex items-center gap-8">
                <button onClick={() => scrollToSection('services')} className="hover:text-[#D4AF37] transition-colors">Serviços</button>
                <button onClick={() => scrollToSection('packages')} className="hover:text-[#D4AF37] transition-colors">Pacotes</button>
                <button onClick={() => scrollToSection('indica')} className="hover:text-[#D4AF37] transition-colors">Indica+</button>
                <button onClick={() => scrollToSection('contact')} className="hover:text-[#D4AF37] transition-colors">Contato</button>
              </div>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-[#D4AF37]/20 transition-colors"
                aria-label="Alternar tema"
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5 text-[#D4AF37]" />
                ) : (
                  <Moon className="w-5 h-5 text-[#D4AF37]" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-24">
        <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/20 to-transparent z-0" />
        <div className={`absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center ${isDarkMode ? 'opacity-30' : 'opacity-10'} z-[-1]`} />
        <div className="container mx-auto px-6 text-center relative z-10 py-16">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-relaxed tracking-tight bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-transparent bg-clip-text pb-4">
              Marketing, Mídia e Inteligência Artificial<br className="md:hidden" /> para Sua Realidade Digital
            </h1>
          </div>
          <p className={`text-xl md:text-2xl ${theme.textSecondary} mb-12 max-w-3xl mx-auto`}>
            Soluções em SEO, Social Media, Criação de Conteúdo, Propaganda, Comerciais, E-books, Audiobooks e Cursos Online
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center mb-16">
            <button 
              onClick={() => scrollToSection('contact')}
              className="px-8 py-4 bg-[#D4AF37] hover:bg-[#B4941F] rounded-full transition-colors text-lg font-semibold text-black"
            >
              Começar Agora
            </button>
            <button 
              onClick={() => scrollToSection('indica')}
              className="px-8 py-4 border-2 border-[#D4AF37] hover:bg-[#D4AF37]/20 rounded-full transition-colors text-lg font-semibold"
            >
              Ver Indica+
            </button>
          </div>
          <div className="flex justify-center">
            <button 
              onClick={() => scrollToSection('services')}
              className="animate-bounce cursor-pointer"
            >
              <ChevronDown className="w-8 h-8 text-[#D4AF37]" />
            </button>
          </div>
        </div>
      </section>

      <section id="services" className={`py-20 ${theme.sectionBg}`}>
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-transparent bg-clip-text">
            Nossos Serviços de Marketing Digital
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className={`${theme.cardBg} p-8 rounded-lg border border-[#D4AF37]/20 hover:border-[#D4AF37] transition-colors group`}>
                <div className="mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-[#D4AF37] transition-colors">{service.title}</h3>
                <p className={theme.textMuted}>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="indica" className={`py-20 ${theme.cardBg}`}>
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-transparent bg-clip-text">
            Indica+
          </h2>
          <div className="max-w-4xl mx-auto text-center">
            <div className={`${theme.cardBg} p-8 rounded-lg border border-[#D4AF37]/20 hover:border-[#D4AF37] transition-colors`}>
              <Star className="w-16 h-16 text-[#D4AF37] mx-auto mb-6" />
              <h3 className="text-2xl font-semibold mb-4 text-[#D4AF37]">
                Programa de Bonificação
              </h3>
              <p className={`text-xl ${theme.textSecondary} mb-6`}>
                Indique nossos serviços de Marketing Digital, SEO e Inteligência Artificial e ganhe recompensas.
              </p>
              <div className="bg-[#D4AF37]/10 p-6 rounded-lg mb-8">
                <p className="text-2xl font-bold text-[#D4AF37]">
                  Ganhe até 10% de bonificação por cada contrato fechado!
                </p>
                <p className={`${theme.textSecondary} mt-2`}>
                  Para se cadastrar, basta selecionar o assunto Indica+ e enviar sua mensagem para ser direcionado para nossa IA.
                </p>
              </div>
              <button 
                onClick={() => scrollToSection('contact')}
                className="px-8 py-4 bg-[#D4AF37] hover:bg-[#B4941F] rounded-full transition-colors text-lg font-semibold text-black"
              >
                Quero Indicar
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="packages" className={`py-20 ${theme.sectionBg}`}>
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-transparent bg-clip-text">
            Pacotes com Inteligência Artificial
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {packages.map((pkg, index) => (
              <div key={index} className={`${theme.cardBg} p-8 rounded-lg border border-[#D4AF37]/20 hover:border-[#D4AF37] transition-colors group`}>
                <h3 className="text-xl font-semibold mb-6 group-hover:text-[#D4AF37] transition-colors">{pkg.title}</h3>
                <p className={`${theme.textMuted} mb-8`}>{pkg.description}</p>
                <ul className="space-y-4 mb-8">
                  {pkg.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                      <span className={theme.textSecondary}>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="w-full mt-4 px-6 py-3 bg-[#D4AF37] hover:bg-[#B4941F] rounded-full transition-colors text-black font-semibold"
                >
                  Solicitar Proposta
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className={`py-20 ${theme.cardBg}`}>
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-transparent bg-clip-text">
            Entre em Contato
          </h2>
          <p className={`text-center mb-8 ${theme.text}`}>
            Fale com nossa Inteligência Artificial sobre o que você precisa:
          </p>
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className={`block text-sm font-medium ${theme.textSecondary} mb-2`}>
                  Nome
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className={`w-full px-4 py-3 ${theme.inputBg} border border-[#D4AF37]/20 rounded-lg focus:border-[#D4AF37] focus:outline-none ${theme.text}`}
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className={`block text-sm font-medium ${theme.textSecondary} mb-2`}>
                  Telefone / WhatsApp
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => {
                    const formatted = formatPhone(e.target.value);
                    setFormData({...formData, phone: formatted});
                  }}
                  className={`w-full px-4 py-3 ${theme.inputBg} border border-[#D4AF37]/20 rounded-lg focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 focus:outline-none ${theme.text} ${validatePhone(formData.phone) ? 'border-green-500' : ''}`}
                  required
                  aria-label="Telefone ou WhatsApp"
                  pattern="\([0-9]{2}\) [0-9]{5}-[0-9]{4}"
                />
              </div>
              <div>
                <label htmlFor="email" className={`block text-sm font-medium ${theme.textSecondary} mb-2`}>
                  E-mail
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className={`w-full px-4 py-3 ${theme.inputBg} border border-[#D4AF37]/20 rounded-lg focus:border-[#D4AF37] focus:outline-none ${theme.text}`}
                  required
                />
              </div>
              <div>
                <label htmlFor="subject" className={`block text-sm font-medium ${theme.textSecondary} mb-2`}>
                  Assunto
                </label>
                <select
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value as FormData['subject']})}
                  className={`w-full px-4 py-3 ${theme.inputBg} border border-[#D4AF37]/20 rounded-lg focus:border-[#D4AF37] focus:outline-none ${theme.text}`}
                  required
                >
                  <option value="Serviços">Serviços</option>
                  <option value="Indica+">Indica+</option>
                  <option value="Pacotes">Pacotes</option>
                  <option value="Outros">Outros</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className={`block text-sm font-medium ${theme.textSecondary} mb-2`}>
                  Mensagem
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  rows={4}
                  className={`w-full px-4 py-3 ${theme.inputBg} border border-[#D4AF37]/20 rounded-lg focus:border-[#D4AF37] focus:outline-none ${theme.text}`}
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full px-8 py-4 bg-[#D4AF37] hover:bg-[#B4941F] rounded-full transition-colors text-lg font-semibold text-black"
              >
                Enviar Mensagem
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer className={`py-12 ${theme.sectionBg} border-t border-[#D4AF37]/20`}>
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center justify-center space-y-6">
            <div className="flex items-center justify-center space-x-6">
              <a 
                href="https://www.facebook.com/lif3digitalmedia" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity p-2 hover:bg-[#D4AF37]/20 rounded-full"
              >
                <Facebook className="w-6 h-6 text-[#D4AF37]" />
              </a>
              <a 
                href="https://www.instagram.com/lif3digitalmedia" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity p-2 hover:bg-[#D4AF37]/20 rounded-full"
              >
                <Instagram className="w-6 h-6 text-[#D4AF37]" />
              </a>
              <a 
                href="https://www.linkedin.com/company/lif3-digital-media" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity p-2 hover:bg-[#D4AF37]/20 rounded-full"
              >
                <Linkedin className="w-6 h-6 text-[#D4AF37]" />
              </a>
            </div>
            <a 
              href="mailto:contato@lif3digitalmedia.com.br"
              className={`${theme.textSecondary} hover:text-[#D4AF37] transition-colors`}
            >
              contato@lif3digitalmedia.com.br
            </a>
            <p className={`text-center ${theme.textMuted}`}>
              © {new Date().getFullYear()} Lif3 Digital Media - Marketing, Mídia, SEO e Inteligência Artificial. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div className={`${theme.cardBg} p-8 rounded-lg border border-[#D4AF37] shadow-lg relative z-10 max-w-md mx-4`}>
            <div className="text-center">
              <div className="mb-4">
                <img 
                  src="/images/lif3_logo.png"
                  alt="Lif3 Digital Media - Soluções em Marketing Digital"
                  className="h-16 mx-auto"
                />
              </div>
              <p className={`text-lg ${theme.text} mb-2`}>
                Nossa Inteligência Artificial vai te ajudar com Marketing Digital e Cursos Online no WhatsApp!
              </p>
              <div className="mt-4">
                <div className="w-8 h-8 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin mx-auto" />
              </div>
            </div>
          </div>
        </div>
      )}

      <MobileMenu />
    </div>
  );
}

export default App;
