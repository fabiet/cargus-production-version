import React, { useState, useEffect } from 'react';
import { Ship, Globe, Clock, Shield, ArrowRight, Menu, X, Languages, Instagram } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';
import logo2 from '../assets/logo2.svg';
import logo from '../assets/logo.svg';

interface AboutProps {
  onNavigate: (page: string) => void;
}

function About({ onNavigate }: AboutProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { currentLanguage, toggleLanguage } = useLanguage();
  const t = translations[currentLanguage];

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const openInstagram = () => {
    window.open('https://www.instagram.com/carguslogistics/', '_blank');
  };

  const handleServicesClick = () => {
    onNavigate('home');
    // Small delay to ensure page loads, then scroll to services
    setTimeout(() => {
      const servicesElement = document.getElementById('services');
      if (servicesElement) {
        servicesElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen font-sans bg-slate-950 text-white">
      {/* Modern Gradient Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-cyan-500/10 animate-gradient-shift"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-blue-500/5 to-purple-500/10"></div>
      </div>

      {/* Navigation - Standard Responsive Design */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-slate-950/80 backdrop-blur-md border-b border-slate-800/50 py-4' 
          : 'bg-transparent py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <button 
            onClick={() => onNavigate('home')}
            className="flex items-center space-x-2 hover:scale-105 transition-transform duration-200 group"
          >
            <img src={logo2} alt="Cargus Logo" className="w-16 h-16" />
            <img src={logo} alt="Cargus Logistics" className="h-20" />
          </button>

          {/* Desktop Menu - Only shows on lg screens and above (1024px+) */}
          <div className="hidden lg:flex items-center space-x-8">
            <button 
              onClick={toggleLanguage}
              className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors group"
            >
              <Languages size={16} className="group-hover:scale-110 transition-transform duration-200" />
              <span>{t.languageToggle}</span>
            </button>
            <button 
              onClick={handleServicesClick}
              className="text-slate-300 hover:text-white transition-colors"
            >
              {t.services}
            </button>
            <span className="text-white font-medium">{t.about}</span>
            <button 
              onClick={() => onNavigate('contact')}
              className="text-slate-300 hover:text-white transition-colors"
            >
              {t.contact}
            </button>
            <button 
              onClick={openInstagram}
              className="text-slate-300 hover:text-pink-400 transition-colors group"
              aria-label="Follow us on Instagram"
            >
              <Instagram size={20} className="group-hover:scale-110 transition-transform duration-200" />
            </button>
            <button 
              onClick={() => onNavigate('getQuote')}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium transition-colors"
            >
              {t.getQuote}
            </button>
          </div>

          {/* Mobile Menu Button - Only shows below lg breakpoint */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 rounded-lg hover:bg-slate-800/50 transition-colors"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X size={24} className="text-white" />
            ) : (
              <Menu size={24} className="text-white" />
            )}
          </button>
        </div>

        {/* Mobile Menu - Only shows below lg breakpoint */}
        <div className={`lg:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen 
            ? 'max-h-96 opacity-100' 
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="px-6 py-4 bg-slate-950/95 backdrop-blur-md border-t border-slate-800/50">
            <div className="flex flex-col space-y-4">
              <button 
                onClick={() => {
                  toggleLanguage();
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors py-2 border-b border-slate-800/50"
              >
                <Languages size={16} />
                <span>{t.languageToggle}</span>
              </button>
              <button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleServicesClick();
                }}
                className="text-slate-300 hover:text-white transition-colors py-2 border-b border-slate-800/50 text-left"
              >
                {t.services}
              </button>
              <span className="text-white font-medium py-2 border-b border-slate-800/50">
                {t.about}
              </span>
              <button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onNavigate('contact');
                }}
                className="text-slate-300 hover:text-white transition-colors py-2 border-b border-slate-800/50 text-left"
              >
                {t.contact}
              </button>
              <button 
                onClick={() => {
                  openInstagram();
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center space-x-2 text-slate-300 hover:text-pink-400 transition-colors py-2 border-b border-slate-800/50"
              >
                <Instagram size={16} />
                <span>Instagram</span>
              </button>
              <button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onNavigate('getQuote');
                }}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-3 rounded-lg font-medium transition-colors text-center mt-2"
              >
                {t.getQuote}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-6 pt-32 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                {t.weDeliver}
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                {t.beyondBorders}
              </span>
            </h1>
            
            <p className="text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto">
              {t.aboutDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Large Container Ship Image */}
      <section className="relative z-10 px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <img 
              src="https://images.pexels.com/photos/906982/pexels-photo-906982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
              alt="Large container ship with colorful containers at sea during golden hour"
              className="w-full h-[400px] md:h-[600px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent"></div>
            <div className="absolute bottom-8 left-8 right-8">
              <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-3xl font-bold text-blue-400 mb-2">15+</div>
                    <div className="text-slate-300">{t.yearsExperience}</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-orange-400 mb-2">25+</div>
                    <div className="text-slate-300">{t.countriesServed}</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-green-400 mb-2">10K+</div>
                    <div className="text-slate-300">{t.shipmentsDelivered}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Two-Column Section with Aerial Port View */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Aerial Port Image */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="https://images.pexels.com/photos/1117210/pexels-photo-1117210.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Aerial view of port with cranes and containers at sunset"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent"></div>
              </div>
              
              {/* Floating stats card */}
              <div className="absolute -bottom-6 -right-6 bg-slate-800/90 backdrop-blur-sm rounded-xl p-6 border border-slate-700 shadow-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <Ship size={24} className="text-blue-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">99.8%</div>
                    <div className="text-sm text-slate-400">{t.onTimeDelivery}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-bold mb-6 text-white">
                  {t.connectingAmericas}
                </h2>
                <p className="text-lg text-slate-300 leading-relaxed mb-6">
                  {t.aboutContent1}
                </p>
                <p className="text-lg text-slate-300 leading-relaxed mb-8">
                  {t.aboutContent2}
                </p>
              </div>

              {/* Key Features */}
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Globe size={16} className="text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">{t.globalNetwork}</h3>
                    <p className="text-slate-400">{t.globalNetworkDesc}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Clock size={16} className="text-orange-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">{t.timeCritical}</h3>
                    <p className="text-slate-400">{t.timeCriticalDesc}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Shield size={16} className="text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">{t.secureInsured}</h3>
                    <p className="text-slate-400">{t.secureInsuredDesc}</p>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="pt-4">
                <button 
                  onClick={() => onNavigate('getQuote')}
                  className="group bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center space-x-2"
                >
                  <span>{t.startShipment}</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Curved Section Divider */}
      <div className="relative">
        <svg className="w-full h-24 fill-slate-900" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
        </svg>
      </div>

      {/* Mission Statement Section */}
      <section className="relative bg-slate-900 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">{t.commitmentTitle}</h2>
          <p className="text-xl text-slate-300 leading-relaxed mb-8">
            {t.commitmentDescription}
          </p>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
            <blockquote className="text-2xl font-medium text-white italic">
              "{t.commitmentQuote}"
            </blockquote>
            <div className="mt-4 text-slate-400">{t.commitmentAuthor}</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-slate-950 py-20 px-6 border-t border-slate-800">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-12">
            <img src={logo2} alt="Cargus Logo" className="w-16 h-16" />
            <img src={logo} alt="Cargus Logistics" className="h-20" />
          </div>
          <p className="text-slate-400 mb-8">
            {t.footerDescription}
          </p>
          
          {/* Social Media Section */}
          <div className="flex items-center justify-center mb-8">
            <button 
              onClick={openInstagram}
              className="group bg-slate-800/50 hover:bg-pink-500/20 p-3 rounded-xl border border-slate-700 hover:border-pink-500/50 transition-all duration-300 hover:-translate-y-1"
              aria-label="Follow us on Instagram"
            >
              <Instagram size={24} className="text-slate-400 group-hover:text-pink-400 transition-colors duration-300" />
            </button>
          </div>
          
          <div className="flex items-center justify-center space-x-8 text-sm text-slate-500">
            <span>{t.copyright}</span>
            <a href="#" className="hover:text-slate-300 transition-colors">{t.privacyPolicy}</a>
            <a href="#" className="hover:text-slate-300 transition-colors">{t.termsOfService}</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default About;