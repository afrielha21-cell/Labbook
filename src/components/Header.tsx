import React, { useState, useEffect } from 'react';
import { Layers, Compass, BarChart3, HelpCircle, User, LogOut, CheckSquare, PlusCircle, ShieldAlert, Globe, Menu, X, Landmark, FlaskConical } from 'lucide-react';
import { ActiveTab, Language, UserAccount } from '../types';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  lang: Language;
  setLang: (lang: Language) => void;
  compareCount: number;
  user: UserAccount | null;
  onOpenLogin: () => void;
  onLogout: () => void;
}

export default function Header({
  activeTab,
  setActiveTab,
  lang,
  setLang,
  compareCount,
  user,
  onOpenLogin,
  onLogout
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: lang === 'ID' ? 'Beranda' : 'Home', icon: Landmark },
    { id: 'search', label: lang === 'ID' ? 'Cari Lab' : 'Find Lab', icon: Compass },
    { 
      id: 'compare', 
      label: lang === 'ID' ? 'Bandingkan' : 'Compare', 
      icon: BarChart3, 
      badge: compareCount > 0 ? compareCount : undefined 
    },
    { id: 'roadmap', label: lang === 'ID' ? 'Rencana Riset' : 'Roadmap', icon: CheckSquare },
    { id: 'estimator', label: lang === 'ID' ? 'Estimator Biaya' : 'Cost Tool', icon: HelpCircle },
    { id: 'partner', label: lang === 'ID' ? 'Mitra Lab' : 'Lab Partner', icon: PlusCircle },
    { id: 'admin', label: lang === 'ID' ? 'Admin' : 'Admin', icon: ShieldAlert, highlight: true }
  ];

  const toggleLanguage = () => {
    setLang(lang === 'ID' ? 'EN' : 'ID');
  };

  return (
    <>
      {/* Spacer to avoid layout jump for normal sticky flow */}
      <div className="h-20 w-full" />

      <header
        id="main-app-header"
        className={`fixed left-0 right-0 z-40 transition-all duration-300 ease-in-out ${
          isScrolled
            ? 'top-2 mx-auto w-[94%] max-w-6xl rounded-full glass-effect border border-slate-200/60 shadow-lg py-2 px-6'
            : 'top-0 w-full bg-white border-b border-slate-100 py-3.5 px-6'
        }`}
      >
        <div className="flex items-center justify-between gap-4 max-w-7xl mx-auto">
          {/* Logo Brand Accent with AmbiSync tag */}
          <div 
            onClick={() => {
              setActiveTab('home');
              window.scrollTo({ top: 0, behavior: 'instant' });
            }} 
            className="flex items-center gap-2.5 cursor-pointer select-none group"
          >
            <div className="w-10 h-10 select-none flex items-center justify-center shrink-0">
              <svg viewBox="0 0 100 100" className="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="labbook-logo-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#0a2540" />
                    <stop offset="50%" stopColor="#0052cc" />
                    <stop offset="100%" stopColor="#0080ff" />
                  </linearGradient>
                </defs>
                
                {/* Binder notebook card outline */}
                <rect 
                  x="12" 
                  y="24" 
                  width="76" 
                  height="64" 
                  rx="16" 
                  stroke="url(#labbook-logo-gradient)" 
                  strokeWidth="8.5" 
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                
                {/* Binder rings */}
                <rect 
                  x="28" 
                  y="10" 
                  width="9" 
                  height="22" 
                  rx="4.5" 
                  fill="url(#labbook-logo-gradient)" 
                />
                <rect 
                  x="63" 
                  y="10" 
                  width="9" 
                  height="22" 
                  rx="4.5" 
                  fill="url(#labbook-logo-gradient)" 
                />
                
                {/* Conical beaker/flask inside binder */}
                <path 
                  d="M44 43 H56 M46 43 V49 L36 71 A 4 4 0 0 0 40 76 H60 A 4 4 0 0 0 64 71 L54 49 V43" 
                  stroke="url(#labbook-logo-gradient)" 
                  strokeWidth="6" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                />
                
                {/* Bubble details */}
                <circle cx="50" cy="61" r="3" fill="url(#labbook-logo-gradient)" />
                <circle cx="44" cy="69" r="2" fill="url(#labbook-logo-gradient)" />
                <circle cx="56" cy="68" r="2" fill="url(#labbook-logo-gradient)" />
              </svg>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center">
                <span className="font-extrabold tracking-tight text-slate-900 text-xl leading-none">Lab</span>
                <span className="font-extrabold tracking-tight text-blue-600 text-xl leading-none">book</span>
              </div>
              <span className="text-[8px] font-black text-blue-600 tracking-wider uppercase mt-1 leading-none">
                INDONESIA'S #1 LAB SEARCH PARTNER
              </span>
            </div>
          </div>

          {/* Desktop Navigation Items */}
          <nav className="hidden lg:flex items-center gap-1.5 bg-slate-50/60 p-1.5 rounded-full border border-slate-100/80">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              const IconComp = item.icon;
              return (
                <button
                  id={`nav-link-${item.id}`}
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id as ActiveTab);
                    setMobileMenuOpen(false);
                    window.scrollTo({ top: 0, behavior: 'instant' });
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-[12px] font-bold tracking-tight transition-all flex items-center gap-1.5 relative ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm'
                      : item.highlight
                      ? 'text-indigo-600 hover:bg-indigo-50 bg-indigo-50/40'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge !== undefined && (
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full leading-none shrink-0 ${isActive ? 'bg-white text-blue-600' : 'bg-orange-500 text-white'}`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Items: Lang Selector + Register / Login */}
          <div className="flex items-center gap-2">
            {/* Language Switch button */}
            <button
              id="lang-toggle-btn"
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold text-slate-700 hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer select-none"
              title="Ganti Bahasa / Switch Language"
            >
              <Globe size={13} className="text-slate-400" />
              <span>{lang === 'ID' ? 'ID' : 'EN'}</span>
            </button>

            {/* User State & Login Trigger */}
            {user ? (
              <div className="relative">
                <button
                  id="user-profile-menu-btn"
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-colors text-slate-800 text-xs font-bold"
                >
                  <div className="w-5 h-5 rounded-full bg-orange-500 text-white flex items-center justify-center font-extrabold text-[10px]">
                    {user.name[0]}
                  </div>
                  <span className="max-w-[70px] truncate hidden md:inline">{user.name}</span>
                </button>

                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-150 rounded-2xl shadow-xl py-2 z-50 animate-fadeIn">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-[10px] text-slate-400 font-bold tracking-wider">LOGGED IN AS</p>
                      <p className="text-xs font-bold text-slate-800 truncate">{user.email}</p>
                    </div>
                    
                    <button
                      id="profile-dropdown-admin-btn"
                      onClick={() => {
                        setActiveTab('admin');
                        setIsProfileDropdownOpen(false);
                        window.scrollTo({ top: 0, behavior: 'instant' });
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 flex items-center gap-2 transition-colors"
                    >
                      <ShieldAlert size={14} className="text-indigo-400" />
                      <span>Admin Dashboard</span>
                    </button>

                    <button
                      id="profile-dropdown-logout-btn"
                      onClick={() => {
                        onLogout();
                        setIsProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 flex items-center gap-2 transition-colors border-t border-slate-50"
                    >
                      <LogOut size={14} />
                      <span>{lang === 'ID' ? 'Keluar Akun' : 'Log Out'}</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                id="header-login-btn"
                onClick={onOpenLogin}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-5 py-1.5 rounded-full text-xs transition-colors shadow-md hover:shadow-lg flex items-center gap-1 cursor-pointer active:scale-95"
              >
                <span>{lang === 'ID' ? 'Masuk' : 'Sign In'}</span>
                <span className="text-[10px]">➔</span>
              </button>
            )}

            {/* Mobile menu Toggle */}
            <button
              id="mobile-nav-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-slate-100 flex flex-col gap-1.5 animate-slideDown">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  id={`mobile-nav-link-${item.id}`}
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id as ActiveTab);
                    setMobileMenuOpen(false);
                    window.scrollTo({ top: 0, behavior: 'instant' });
                  }}
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : item.highlight
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span className="tracking-tight">{item.label}</span>
                  {item.badge !== undefined && (
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isActive ? 'bg-white text-blue-600' : 'bg-orange-500 text-white'}`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </header>
    </>
  );
}
