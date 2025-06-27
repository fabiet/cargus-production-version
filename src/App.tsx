import React, { useState, useEffect } from 'react';
import { Truck, Package2, ArrowRight, Globe, CheckCircle, Menu, X, Languages, Instagram, Warehouse, Bus, Search } from 'lucide-react';
import About from './components/About';
import Contact from './components/Contact';
import GetQuote from './components/GetQuote';
import { useLanguage } from './contexts/LanguageContext';
import { translations } from './translations';
import logo2 from './assets/logo2.svg';
import logo from './assets/logo.svg';
import { Analytics } from "@vercel/analytics/react";

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
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

  const handleNavigation = (page: string) => {
    setCurrentPage(page);
    setIsMobileMenuOpen(false); // Close mobile menu when navigating
    window.scrollTo(0, 0);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const openInstagram = () => {
    window.open('https://www.instagram.com/carguslogistics/', '_blank');
  };

  if (currentPage === 'about') {
    return <About onNavigate={handleNavigation} />;
  }

  if (currentPage === 'contact') {
    return <Contact onNavigate={handleNavigation} />;
  }

  if (currentPage === 'getQuote') {
    return <GetQuote onNavigate={handleNavigation} />;
  }

  return (
    <div className="min-h-screen font-sans bg-slate-950 text-white overflow-hidden">
      {/* Modern Gradient Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
        {/* Animated mesh overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-cyan-500/10 animate-gradient-shift"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-blue-500/5 to-purple-500/10"></div>
      </div>

      {/* Navigation - Standard Responsive Design */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-slate-950/90 backdrop-blur-md border-b border-slate-800/50 py-3' 
          : 'bg-transparent py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between min-h-[64px]">
          {/* Logo */}
          <button 
            onClick={() => handleNavigation('home')}
            className="flex items-center space-x-2 hover:scale-105 transition-transform duration-200 group flex-shrink-0"
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
            <a href="#services" className="text-slate-300 hover:text-white transition-colors">{t.services}</a>
            <button 
              onClick={() => handleNavigation('about')}
              className="text-slate-300 hover:text-white transition-colors"
            >
              {t.about}
            </button>
            <button 
              onClick={() => handleNavigation('contact')}
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
              onClick={() => handleNavigation('getQuote')}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium transition-colors"
            >
              {t.getQuote}
            </button>
          </div>

          {/* Mobile Menu Button - Only shows below lg breakpoint */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 rounded-lg hover:bg-slate-800/50 transition-colors flex items-center justify-center"
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
            ? 'max-h-screen opacity-100 visible' 
            : 'max-h-0 opacity-0 invisible overflow-hidden'
        }`}>
          <div className="px-6 py-6 bg-slate-950/95 backdrop-blur-md border-t border-slate-800/50">
            <div className="flex flex-col space-y-4">
              <button 
                onClick={() => {
                  toggleLanguage();
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center space-x-3 text-slate-300 hover:text-white transition-colors py-3 border-b border-slate-800/50"
              >
                <Languages size={20} />
                <span className="text-lg">{t.languageToggle}</span>
              </button>
              <a 
                href="#services" 
                className="text-slate-300 hover:text-white transition-colors py-3 border-b border-slate-800/50 text-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t.services}
              </a>
              <button 
                onClick={() => handleNavigation('about')}
                className="text-slate-300 hover:text-white transition-colors py-3 border-b border-slate-800/50 text-left text-lg"
              >
                {t.about}
              </button>
              <button 
                onClick={() => handleNavigation('contact')}
                className="text-slate-300 hover:text-white transition-colors py-3 border-b border-slate-800/50 text-left text-lg"
              >
                {t.contact}
              </button>
              <button 
                onClick={() => {
                  openInstagram();
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center space-x-3 text-slate-300 hover:text-pink-400 transition-colors py-3 border-b border-slate-800/50"
              >
                <Instagram size={20} />
                <span className="text-lg">Instagram</span>
              </button>
              <button 
                onClick={() => handleNavigation('getQuote')}
                className="bg-blue-600 hover:bg-blue-700 px-6 py-4 rounded-lg font-medium transition-colors text-center mt-4 text-lg"
              >
                {t.getQuote}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-6 pt-32 pb-32">
        <div className="max-w-7xl mx-auto">
          {/* Trust indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 mb-12">
            <div className="flex items-center space-x-2 text-sm text-slate-400">
              <CheckCircle size={16} className="text-green-400" />
              <span>{t.nvocc}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-slate-400">
              <Globe size={16} className="text-blue-400" />
              <span>{t.countries}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-slate-400">
              <Truck size={16} className="text-orange-400" />
              <span>{t.fastDelivery}</span>
            </div>
          </div>

          {/* Main headline */}
          <div className="text-center max-w-5xl mx-auto mb-16">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                {t.trustedPartner}
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                {t.globalCargo}
              </span>
            </h1>
            
            <p className="text-xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              {t.heroDescription}
            </p>

            {/* Key Metrics - Integrated into Hero */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto">
              <div className="group bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-1">
                <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2 group-hover:scale-110 transition-transform duration-300">
                  10K+
                </div>
                <div className="text-sm text-slate-400 font-medium">
                  {t.shipmentsDelivered}
                </div>
              </div>
              
              <div className="group bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-orange-500/30 transition-all duration-300 hover:-translate-y-1">
                <div className="text-3xl md:text-4xl font-bold text-orange-400 mb-2 group-hover:scale-110 transition-transform duration-300">
                  25+
                </div>
                <div className="text-sm text-slate-400 font-medium">
                  {t.countriesServed}
                </div>
              </div>
              
              <div className="group bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-green-500/30 transition-all duration-300 hover:-translate-y-1">
                <div className="text-3xl md:text-4xl font-bold text-green-400 mb-2 group-hover:scale-110 transition-transform duration-300">
                  99.8%
                </div>
                <div className="text-sm text-slate-400 font-medium">
                  {t.onTimeDelivery}
                </div>
              </div>
              
              <div className="group bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-purple-500/30 transition-all duration-300 hover:-translate-y-1">
                <div className="text-3xl md:text-4xl font-bold text-purple-400 mb-2 group-hover:scale-110 transition-transform duration-300">
                  15+
                </div>
                <div className="text-sm text-slate-400 font-medium">
                  {t.yearsExperience}
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <button 
                onClick={() => handleNavigation('getQuote')}
                className="group bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center space-x-2 text-lg"
              >
                <span>{t.getQuoteBtn}</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              
              <div className="relative group">
                <button 
                  className="text-slate-400 font-medium py-4 px-8 rounded-xl border border-slate-700 bg-slate-700/40 cursor-not-allowed opacity-60 flex items-center space-x-2 text-lg select-none pointer-events-none"
                  aria-disabled="true"
                >
                  <Search size={20} className="text-slate-500" />
                  <span>{t.trackCargo}</span>
                </button>
                
                {/* Coming Soon Badge */}
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                  {t.comingSoon}
                </div>
                
                {/* Tooltip on hover */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-slate-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap border border-slate-700 shadow-xl">
                  {t.trackingFeatureComingSoon}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-800"></div>
                </div>
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

      {/* Services Section - Redesigned for Perfect Symmetry */}
      <section id="services" className="relative bg-slate-900 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl mb-6 border border-blue-500/20">
              <Package2 size={32} className="text-blue-400" />
            </div>
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              {t.ourServices}
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
              {t.servicesDescription}
            </p>
          </div>

          {/* Services Grid - Perfect 2x3 Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            
            {/* Industrial Cargo */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
              <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 border border-slate-700/50 hover:border-blue-500/30 transition-all duration-500 hover:-translate-y-2 h-full">
                <div className="flex flex-col h-full">
                  <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-blue-500/20">
                    <Package2 size={28} className="text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-blue-300 transition-colors duration-300">
                    {t.industrialCargo}
                  </h3>
                  <p className="text-slate-400 leading-relaxed flex-grow group-hover:text-slate-300 transition-colors duration-300">
                    {t.industrialDescription}
                  </p>
                </div>
              </div>
            </div>

            {/* Express Delivery */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
              <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 border border-slate-700/50 hover:border-orange-500/30 transition-all duration-500 hover:-translate-y-2 h-full">
                <div className="flex flex-col h-full">
                  <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-orange-500/20">
                    <Truck size={28} className="text-orange-400" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-orange-300 transition-colors duration-300">
                    {t.expressDelivery}
                  </h3>
                  <p className="text-slate-400 leading-relaxed flex-grow group-hover:text-slate-300 transition-colors duration-300">
                    {t.expressDescription}
                  </p>
                </div>
              </div>
            </div>

            {/* Secure Transport */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
              <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 border border-slate-700/50 hover:border-green-500/30 transition-all duration-500 hover:-translate-y-2 h-full">
                <div className="flex flex-col h-full">
                  <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-green-500/20">
                    <img src={logo2} alt="Cargus Logo" className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-green-300 transition-colors duration-300">
                    {t.secureTransport}
                  </h3>
                  <p className="text-slate-400 leading-relaxed flex-grow group-hover:text-slate-300 transition-colors duration-300">
                    {t.secureDescription}
                  </p>
                </div>
              </div>
            </div>

            {/* Cargo Storage */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-violet-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
              <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 border border-slate-700/50 hover:border-purple-500/30 transition-all duration-500 hover:-translate-y-2 h-full">
                <div className="flex flex-col h-full">
                  <div className="bg-gradient-to-br from-purple-500/20 to-violet-500/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-purple-500/20">
                    <Warehouse size={28} className="text-purple-400" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-purple-300 transition-colors duration-300">
                    {t.cargoStorage}
                  </h3>
                  <p className="text-slate-400 leading-relaxed flex-grow group-hover:text-slate-300 transition-colors duration-300">
                    {t.cargoStorageDescription}
                  </p>
                </div>
              </div>
            </div>

            {/* Ground Transport */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-amber-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
              <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 border border-slate-700/50 hover:border-yellow-500/30 transition-all duration-500 hover:-translate-y-2 h-full">
                <div className="flex flex-col h-full">
                  <div className="bg-gradient-to-br from-yellow-500/20 to-amber-500/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-yellow-500/20">
                    <Bus size={28} className="text-yellow-400" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-yellow-300 transition-colors duration-300">
                    {t.groundTransport}
                  </h3>
                  <p className="text-slate-400 leading-relaxed flex-grow group-hover:text-slate-300 transition-colors duration-300">
                    {t.groundTransportDescription}
                  </p>
                </div>
              </div>
            </div>

            {/* Global Solutions - Now using translations */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-teal-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
              <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 border border-slate-700/50 hover:border-cyan-500/30 transition-all duration-500 hover:-translate-y-2 h-full">
                <div className="flex flex-col h-full">
                  <div className="bg-gradient-to-br from-cyan-500/20 to-teal-500/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-cyan-500/20">
                    <Globe size={28} className="text-cyan-400" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-cyan-300 transition-colors duration-300">
                    {t.globalSolutions}
                  </h3>
                  <p className="text-slate-400 leading-relaxed flex-grow group-hover:text-slate-300 transition-colors duration-300">
                    {t.globalSolutionsDescription}
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <button 
              onClick={() => handleNavigation('getQuote')}
              className="group bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center space-x-2 mx-auto"
            >
              <span>Get Started Today</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section with Wave Divider - Removed since metrics are now in hero */}
      <div className="relative">
        <svg className="w-full h-24 fill-slate-800 rotate-180" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
        </svg>
      </div>

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
      <Analytics />
    </div>
  );
}

export default App;