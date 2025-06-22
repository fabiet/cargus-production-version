import React, { useState, useEffect } from 'react';
import { MapPin, Mail, Phone, Clock, Menu, X, Send, ExternalLink, Truck, Languages, CheckCircle, Instagram } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';
import { supabase } from '../supabaseClient';
import logo2 from '../assets/logo2.svg';
import logo from '../assets/logo.svg';

interface ContactProps {
  onNavigate: (page: string) => void;
}

function Contact({ onNavigate }: ContactProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { currentLanguage, toggleLanguage } = useLanguage();
  const t = translations[currentLanguage];
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    if (!formData.fullName.trim()) newErrors.fullName = t.fullNameRequired;
    if (!formData.email.trim()) newErrors.email = t.emailRequired;
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = t.emailInvalid;
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const { error } = await supabase
        .from('messages')
        .insert([
          {
            full_name: formData.fullName,
            email: formData.email,
            message: formData.message,
            created_at: new Date().toISOString()
          }
        ]);
      if (error) {
        alert('There was an error submitting your message: ' + error.message);
        return;
      }
      setIsSubmitted(true);
      setFormData({ fullName: '', email: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (err) {
      alert('Unexpected error. Please try again.');
      console.error(err);
    }
  };

  const openInGoogleMaps = () => {
    const address = "7861 NW 46th St, Doral, FL 33166";
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
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
            <button 
              onClick={() => onNavigate('about')}
              className="text-slate-300 hover:text-white transition-colors"
            >
              {t.about}
            </button>
            <span className="text-white font-medium">{t.contact}</span>
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
              <button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onNavigate('about');
                }}
                className="text-slate-300 hover:text-white transition-colors py-2 border-b border-slate-800/50 text-left"
              >
                {t.about}
              </button>
              <span className="text-white font-medium py-2 border-b border-slate-800/50">
                {t.contact}
              </span>
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

      {/* Hero Section with Logistics Image */}
      <section className="relative z-10 px-6 pt-32 pb-16">
        <div className="max-w-7xl mx-auto">
          {/* Hero Image */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl mb-16">
            <img 
              src="https://images.pexels.com/photos/1427541/pexels-photo-1427541.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
              alt="Large cargo plane being loaded with containers at airport during golden hour"
              className="w-full h-[300px] md:h-[400px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>
            
            {/* Floating contact info overlay */}
            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-slate-900/90 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <Truck size={20} className="text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{t.readyToShip}</h3>
                    <p className="text-slate-300 text-sm">{t.getQuoteToday}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Phone size={16} className="text-orange-400" />
                    <span className="text-slate-300">+1 (786) 217-3287</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail size={16} className="text-green-400" />
                    <span className="text-slate-300">info@carguslogistics.com</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock size={16} className="text-purple-400" />
                    <span className="text-slate-300">{t.mondayFriday} {t.businessTime}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                {t.getInTouch}
              </span>
            </h1>
            
            <p className="text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto">
              {t.contactDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="relative z-10 px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Left Side - Contact Information */}
            <div className="space-y-8">
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
                <h2 className="text-3xl font-bold mb-8 text-white">{t.contactInformation}</h2>
                
                <div className="space-y-6">
                  {/* Location */}
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                      <MapPin size={20} className="text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-2">{t.ourLocation}</h3>
                      <p className="text-slate-300 leading-relaxed">
                        7861 NW 46 STREET<br />
                        DORAL, FL 33166
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                      <Mail size={20} className="text-green-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-2">{t.emailUs}</h3>
                      <a 
                        href="mailto:info@carguslogistics.com" 
                        className="text-slate-300 hover:text-blue-400 transition-colors"
                      >
                        info@carguslogistics.com
                      </a>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                      <Phone size={20} className="text-orange-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-2">{t.callUs}</h3>
                      <a 
                        href="tel:+17862173287" 
                        className="text-slate-300 hover:text-blue-400 transition-colors"
                      >
                        +1 (786) 217-3287
                      </a>
                    </div>
                  </div>

                  {/* Business Hours */}
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                      <Clock size={20} className="text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-2">{t.businessHours}</h3>
                      <p className="text-slate-300">
                        {t.mondayFriday}<br />
                        {t.businessTime}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Interactive Map Section */}
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
                <h3 className="text-xl font-semibold text-white mb-4">{t.findUs}</h3>
                
                {/* Map Image with Overlay - Updated with logistics warehouse */}
                <div className="relative rounded-xl overflow-hidden shadow-lg group cursor-pointer" onClick={openInGoogleMaps}>
                  <img 
                    src="https://images.pexels.com/photos/4481259/pexels-photo-4481259.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                    alt="Modern logistics warehouse and distribution center with trucks"
                    className="w-full h-[300px] object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/20 transition-all duration-300 flex items-center justify-center">
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 text-center transform group-hover:scale-105 transition-transform duration-300">
                      <MapPin size={32} className="text-blue-600 mx-auto mb-3" />
                      <h4 className="font-bold text-slate-900 mb-2">7861 NW 46th Street</h4>
                      <p className="text-slate-700 mb-3">Doral, FL 33166</p>
                      <div className="flex items-center justify-center space-x-2 text-blue-600 font-medium">
                        <ExternalLink size={16} />
                        <span>{t.openInMaps}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Alternative Text Link */}
                <div className="mt-4 text-center">
                  <button 
                    onClick={openInGoogleMaps}
                    className="text-blue-400 hover:text-blue-300 transition-colors text-sm flex items-center justify-center space-x-2 mx-auto"
                  >
                    <MapPin size={16} />
                    <span>{t.clickDirections}</span>
                    <ExternalLink size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Side - Contact Form */}
            <div className="flex items-center">
              <div className="w-full bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
                <h2 className="text-3xl font-bold mb-8 text-white">{t.sendMessage}</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Full Name */}
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-slate-300 mb-2">
                      {t.fullName} *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder={t.enterFullName}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                      {t.emailAddress} *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder={t.enterEmail}
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                      {t.message} *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                      placeholder={t.messagePlaceholder}
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitted}
                    className={`group w-full font-semibold py-4 px-8 rounded-xl shadow-lg flex items-center justify-center space-x-2 transition-all duration-300
                      ${isSubmitted
                        ? 'bg-gradient-to-r from-green-600 to-green-700 text-white cursor-default'
                        : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white hover:-translate-y-1 hover:shadow-xl'}`}
                  >
                    {isSubmitted ? (
                      <>
                        <CheckCircle size={20} />
                        <span>Message Sent</span>
                      </>
                    ) : (
                      <>
                        <Send size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
                        <span>{t.sendBtn}</span>
                      </>
                    )}
                  </button>
                </form>

                <div className="mt-6 p-4 bg-slate-700/30 rounded-xl border border-slate-600">
                  <p className="text-sm text-slate-400 text-center">
                    {t.responseTime}
                  </p>
                </div>
              </div>
            </div>
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

export default Contact;