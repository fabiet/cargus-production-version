import React, { useState, useEffect } from 'react';
import { Ship, Package, Globe, Truck, Plane, CheckCircle, Menu, X, Send, Calculator, Ruler, Languages, Instagram } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';
import { supabase } from '../supabaseClient';
import logo2 from '../assets/logo2.svg';
import logo from '../assets/logo.svg';

interface FormData {
  fullName: string;
  phoneNumber: string;
  email: string;
  originLocation: string;
  destinationLocation: string;
  cargoType: string;
  cargoDescription: string;
  approximateWeight: string;
  shippingMethod: string;
  cargoLength: string;
  cargoWidth: string;
  cargoHeight: string;
  dimensionUnit: string;
}

interface GetQuoteProps {
  onNavigate: (page: string) => void;
}

function GetQuote({ onNavigate }: GetQuoteProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { currentLanguage, toggleLanguage } = useLanguage();
  const t = translations[currentLanguage];
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    phoneNumber: '',
    email: '',
    originLocation: '',
    destinationLocation: '',
    cargoType: '',
    cargoDescription: '',
    approximateWeight: '',
    shippingMethod: '',
    cargoLength: '',
    cargoWidth: '',
    cargoHeight: '',
    dimensionUnit: 'inches'
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
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
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = t.phoneRequired;
    if (!formData.email.trim()) newErrors.email = t.emailRequired;
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = t.emailInvalid;
    if (!formData.originLocation.trim()) newErrors.originLocation = t.originRequired;
    if (!formData.destinationLocation.trim()) newErrors.destinationLocation = t.destinationRequired;
    if (!formData.cargoType) newErrors.cargoType = t.cargoTypeRequired;
    if (!formData.cargoDescription.trim()) newErrors.cargoDescription = t.cargoDescRequired;
    if (!formData.approximateWeight.trim()) newErrors.approximateWeight = t.weightRequired;
    if (!formData.shippingMethod) newErrors.shippingMethod = t.shippingMethodRequired;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        console.log('Submitting form data:', formData); // Log the data being sent
        
        const { data, error } = await supabase
          .from('quote_requests')
          .insert([
            {
              full_name: formData.fullName,
              phone_number: formData.phoneNumber,
              email: formData.email,
              origin_location: formData.originLocation,
              destination_location: formData.destinationLocation,
              cargo_type: formData.cargoType,
              cargo_description: formData.cargoDescription,
              approximate_weight: formData.approximateWeight,
              shipping_method: formData.shippingMethod,
              cargo_length: formData.cargoLength,
              cargo_width: formData.cargoWidth,
              cargo_height: formData.cargoHeight,
              dimension_unit: formData.dimensionUnit,
              created_at: new Date().toISOString()
            }
          ]);

        if (error) {
          console.error('Detailed Supabase error:', {
            message: error.message,
            details: error.details,
            hint: error.hint,
            code: error.code
          });
          alert(`Error submitting quote request: ${error.message}`);
          return;
        }

        console.log('Quote request submitted successfully:', data);
        setIsSubmitted(true);
        
        // Reset form after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({
            fullName: '',
            phoneNumber: '',
            email: '',
            originLocation: '',
            destinationLocation: '',
            cargoType: '',
            cargoDescription: '',
            approximateWeight: '',
            shippingMethod: '',
            cargoLength: '',
            cargoWidth: '',
            cargoHeight: '',
            dimensionUnit: 'inches'
          });
        }, 5000);
      } catch (error) {
        console.error('Unexpected error:', error);
        alert('There was an unexpected error submitting your quote request. Please try again.');
      }
    }
  };

  const handleServicesClick = () => {
    onNavigate('home');
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

      {/* Navigation */}
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

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
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
            <span className="text-white font-medium bg-blue-600/20 px-3 py-1 rounded-lg">{t.getQuote}</span>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-lg hover:bg-slate-800/50 transition-colors"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X size={24} className="text-white" />
            ) : (
              <Menu size={24} className="text-white" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
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
              <span className="text-white font-medium py-2 border-b border-slate-800/50 bg-blue-600/20 px-3 rounded-lg">
                {t.getQuote}
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-6 pt-32 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <div className="flex items-center justify-center space-x-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                <Calculator size={24} className="text-white" />
              </div>
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  {t.getQuote}
                </span>
              </h1>
            </div>
            
            <p className="text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto">
              {t.quoteDescription}
            </p>
          </div>

          {/* Trust indicators */}
          <div className="flex items-center justify-center space-x-8 mb-16">
            <div className="flex items-center space-x-2 text-sm text-slate-400">
              <CheckCircle size={16} className="text-green-400" />
              <span>{t.freeQuote}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-slate-400">
              <Globe size={16} className="text-blue-400" />
              <span>{t.globalCoverage}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-slate-400">
              <Truck size={16} className="text-orange-400" />
              <span>{t.response24h}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Logistics Images Section */}
      <section className="relative z-10 px-6 pb-16">
        <div className="max-w-7xl mx-auto">
          {/* Desktop: Side by side images */}
          <div className="hidden md:grid md:grid-cols-2 gap-8 mb-16">
            {/* Container Ship Image - NEW UNIQUE IMAGE */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl group">
              <img 
                src="https://images.pexels.com/photos/163726/belgium-antwerp-shipping-container-163726.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Massive container ship loaded with colorful shipping containers at port"
                className="w-full h-[400px] object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-slate-900/80 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <Ship size={20} className="text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{t.oceanFreight}</h3>
                      <p className="text-slate-300 text-sm">{t.oceanFreightDesc}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Aircraft Image - NEW UNIQUE IMAGE */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl group">
              <img 
                src="https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Commercial aircraft on runway during sunset with dramatic sky"
                className="w-full h-[400px] object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-slate-900/80 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                      <Plane size={20} className="text-orange-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{t.airFreight}</h3>
                      <p className="text-slate-300 text-sm">{t.airFreightDesc}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile: Stacked images */}
          <div className="md:hidden space-y-8 mb-16">
            {/* Container Ship Image - NEW UNIQUE IMAGE */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <img 
                src="https://images.pexels.com/photos/163726/belgium-antwerp-shipping-container-163726.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Massive container ship loaded with colorful shipping containers at port"
                className="w-full h-[300px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-slate-900/80 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <Ship size={16} className="text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-sm">{t.oceanFreight}</h3>
                      <p className="text-slate-300 text-xs">{t.oceanFreightDesc}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Aircraft Image - NEW UNIQUE IMAGE */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <img 
                src="https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Commercial aircraft on runway during sunset with dramatic sky"
                className="w-full h-[300px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-slate-900/80 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center">
                      <Plane size={16} className="text-orange-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-sm">{t.airFreight}</h3>
                      <p className="text-slate-300 text-xs">{t.airFreightDesc}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section className="relative z-10 px-6 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-slate-700 shadow-2xl">
            
            {/* Success Message */}
            {isSubmitted && (
              <div className="mb-8 p-6 bg-green-500/10 border border-green-500/20 rounded-2xl">
                <div className="flex items-center space-x-3">
                  <CheckCircle size={24} className="text-green-400" />
                  <div>
                    <h3 className="text-lg font-semibold text-green-400 mb-1">{t.quoteReceived}</h3>
                    <p className="text-slate-300">{t.quoteReceivedDesc}</p>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information Section */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <Package size={18} className="text-blue-400" />
                  </div>
                  <span>{t.personalInformation}</span>
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      className={`w-full px-4 py-3 bg-slate-700/50 border rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                        errors.fullName ? 'border-red-500' : 'border-slate-600'
                      }`}
                      placeholder={t.enterFullName}
                    />
                    {errors.fullName && <p className="mt-1 text-sm text-red-400">{errors.fullName}</p>}
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-slate-300 mb-2">
                      {t.phoneNumber} *
                    </label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-slate-700/50 border rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                        errors.phoneNumber ? 'border-red-500' : 'border-slate-600'
                      }`}
                      placeholder={t.enterPhone}
                    />
                    {errors.phoneNumber && <p className="mt-1 text-sm text-red-400">{errors.phoneNumber}</p>}
                  </div>

                  {/* Email */}
                  <div className="md:col-span-2">
                    <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                      {t.emailAddress} *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-slate-700/50 border rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                        errors.email ? 'border-red-500' : 'border-slate-600'
                      }`}
                      placeholder={t.enterEmail}
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
                  </div>
                </div>
              </div>

              {/* Shipping Details Section */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-3">
                  <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center">
                    <Globe size={18} className="text-orange-400" />
                  </div>
                  <span>{t.shippingDetails}</span>
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Origin Location */}
                  <div>
                    <label htmlFor="originLocation" className="block text-sm font-medium text-slate-300 mb-2">
                      {t.originCountry} *
                    </label>
                    <input
                      type="text"
                      id="originLocation"
                      name="originLocation"
                      value={formData.originLocation}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-slate-700/50 border rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                        errors.originLocation ? 'border-red-500' : 'border-slate-600'
                      }`}
                      placeholder={t.originPlaceholder}
                    />
                    {errors.originLocation && <p className="mt-1 text-sm text-red-400">{errors.originLocation}</p>}
                  </div>

                  {/* Destination Location */}
                  <div>
                    <label htmlFor="destinationLocation" className="block text-sm font-medium text-slate-300 mb-2">
                      {t.destinationCountry} *
                    </label>
                    <input
                      type="text"
                      id="destinationLocation"
                      name="destinationLocation"
                      value={formData.destinationLocation}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-slate-700/50 border rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                        errors.destinationLocation ? 'border-red-500' : 'border-slate-600'
                      }`}
                      placeholder={t.destinationPlaceholder}
                    />
                    {errors.destinationLocation && <p className="mt-1 text-sm text-red-400">{errors.destinationLocation}</p>}
                  </div>

                  {/* Cargo Type */}
                  <div>
                    <label htmlFor="cargoType" className="block text-sm font-medium text-slate-300 mb-2">
                      {t.cargoType} *
                    </label>
                    <select
                      id="cargoType"
                      name="cargoType"
                      value={formData.cargoType}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-slate-700/50 border rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                        errors.cargoType ? 'border-red-500' : 'border-slate-600'
                      }`}
                    >
                      <option value="">{t.selectCargoType}</option>
                      <option value="Industrial">{t.industrial}</option>
                      <option value="Personal">{t.personal}</option>
                      <option value="Commercial">{t.commercial}</option>
                    </select>
                    {errors.cargoType && <p className="mt-1 text-sm text-red-400">{errors.cargoType}</p>}
                  </div>

                  {/* Shipping Method */}
                  <div>
                    <label htmlFor="shippingMethod" className="block text-sm font-medium text-slate-300 mb-2">
                      {t.shippingMethod} *
                    </label>
                    <select
                      id="shippingMethod"
                      name="shippingMethod"
                      value={formData.shippingMethod}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-slate-700/50 border rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                        errors.shippingMethod ? 'border-red-500' : 'border-slate-600'
                      }`}
                    >
                      <option value="">{t.selectShippingMethod}</option>
                      <option value="Ocean Freight">{t.oceanFreight}</option>
                      <option value="Air Freight">{t.airFreight}</option>
                    </select>
                    {errors.shippingMethod && <p className="mt-1 text-sm text-red-400">{errors.shippingMethod}</p>}
                  </div>

                  {/* Approximate Weight */}
                  <div className="md:col-span-2">
                    <label htmlFor="approximateWeight" className="block text-sm font-medium text-slate-300 mb-2">
                      {t.approximateWeight} *
                    </label>
                    <input
                      type="text"
                      id="approximateWeight"
                      name="approximateWeight"
                      value={formData.approximateWeight}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-slate-700/50 border rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                        errors.approximateWeight ? 'border-red-500' : 'border-slate-600'
                      }`}
                      placeholder={t.weightPlaceholder}
                    />
                    {errors.approximateWeight && <p className="mt-1 text-sm text-red-400">{errors.approximateWeight}</p>}
                  </div>

                  {/* Cargo Dimensions Section */}
                  <div className="md:col-span-2">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-6 h-6 bg-purple-500/20 rounded-lg flex items-center justify-center">
                        <Ruler size={14} className="text-purple-400" />
                      </div>
                      <label className="text-sm font-medium text-slate-300">
                        {t.approximateDimensions}
                      </label>
                    </div>
                    
                    {/* Unit Toggle */}
                    <div className="mb-4">
                      <label htmlFor="dimensionUnit" className="block text-sm font-medium text-slate-300 mb-2">
                        {t.measurementUnit}
                      </label>
                      <select
                        id="dimensionUnit"
                        name="dimensionUnit"
                        value={formData.dimensionUnit}
                        onChange={handleInputChange}
                        className="px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      >
                        <option value="inches">{t.inches}</option>
                        <option value="feet">{t.feet}</option>
                        <option value="meters">{t.meters}</option>
                      </select>
                    </div>

                    {/* Dimension Inputs */}
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label htmlFor="cargoLength" className="block text-xs font-medium text-slate-400 mb-1">
                          {t.length} ({formData.dimensionUnit})
                        </label>
                        <input
                          type="text"
                          id="cargoLength"
                          name="cargoLength"
                          value={formData.cargoLength}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                          placeholder="0"
                        />
                      </div>
                      <div>
                        <label htmlFor="cargoWidth" className="block text-xs font-medium text-slate-400 mb-1">
                          {t.width} ({formData.dimensionUnit})
                        </label>
                        <input
                          type="text"
                          id="cargoWidth"
                          name="cargoWidth"
                          value={formData.cargoWidth}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                          placeholder="0"
                        />
                      </div>
                      <div>
                        <label htmlFor="cargoHeight" className="block text-xs font-medium text-slate-400 mb-1">
                          {t.height} ({formData.dimensionUnit})
                        </label>
                        <input
                          type="text"
                          id="cargoHeight"
                          name="cargoHeight"
                          value={formData.cargoHeight}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                          placeholder="0"
                        />
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 mt-2">
                      {t.dimensionsHelp}
                    </p>
                  </div>
                </div>
              </div>

              {/* Cargo Description Section */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <Package size={18} className="text-green-400" />
                  </div>
                  <span>{t.cargoDetails}</span>
                </h2>
                
                <div>
                  <label htmlFor="cargoDescription" className="block text-sm font-medium text-slate-300 mb-2">
                    {t.cargoDescription} *
                  </label>
                  <textarea
                    id="cargoDescription"
                    name="cargoDescription"
                    value={formData.cargoDescription}
                    onChange={handleInputChange}
                    rows={6}
                    className={`w-full px-4 py-3 bg-slate-700/50 border rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none ${
                      errors.cargoDescription ? 'border-red-500' : 'border-slate-600'
                    }`}
                    placeholder={t.cargoDescriptionPlaceholder}
                  />
                  {errors.cargoDescription && <p className="mt-1 text-sm text-red-400">{errors.cargoDescription}</p>}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isSubmitted}
                  className="group w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 disabled:from-green-600 disabled:to-green-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:transform-none transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  {isSubmitted ? (
                    <>
                      <CheckCircle size={20} />
                      <span>{t.quoteSent}</span>
                    </>
                  ) : (
                    <>
                      <Send size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
                      <span>{t.requestQuote}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Additional Info */}
              <div className="pt-4 p-6 bg-slate-700/30 rounded-xl border border-slate-600">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle size={14} className="text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">{t.whatHappensNext}</h4>
                    <ul className="text-sm text-slate-400 space-y-1">
                      <li>{t.step1}</li>
                      <li>{t.step2}</li>
                      <li>{t.step3}</li>
                      <li>{t.step4}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </form>
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

export default GetQuote;