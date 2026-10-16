import React, { useState } from 'react';
import { X, ShieldCheck, Mail, Lock, CheckCircle, Smartphone } from 'lucide-react';
import { UserAccount, Language } from '../types';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onLoginSuccess: (user: UserAccount) => void;
}

export default function LoginModal({ isOpen, onClose, lang, onLoginSuccess }: LoginModalProps) {
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleManualLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!email || !password) {
      setErrorMsg(lang === 'ID' ? 'Harap isi semua bidang form.' : 'Please fill all form fields.');
      return;
    }

    if (activeTab === 'signin') {
      // Simulate login
      const mockUser: UserAccount = {
        name: email.split('@')[0].toUpperCase(),
        email: email,
        loggedIn: true
      };
      setSuccessMsg(lang === 'ID' ? 'Login berhasil! Selamat datang kembali.' : 'Login successful! Welcome back.');
      setTimeout(() => {
        onLoginSuccess(mockUser);
        onClose();
        setSuccessMsg(null);
      }, 1200);
    } else {
      // Simulate registration & email verification
      if (!fullName) {
        setErrorMsg(lang === 'ID' ? 'Harap isi nama lengkap Anda.' : 'Please enter your full name.');
        return;
      }
      setSuccessMsg(
        lang === 'ID'
          ? `Tautan verifikasi email telah dikirim ke ${email}! Silakan konfirmasi akun Anda.`
          : `Email verification link has been sent to ${email}! Please confirm your account.`
      );
      setTimeout(() => {
        const mockUser: UserAccount = {
          name: fullName,
          email: email,
          loggedIn: true
        };
        onLoginSuccess(mockUser);
        onClose();
        setSuccessMsg(null);
      }, 3500);
    }
  };

  const handleGoogleLogin = () => {
    const mockUser: UserAccount = {
      name: 'Ardian Lukman',
      email: 'ardilukman51@gmail.com',
      loggedIn: true
    };
    setSuccessMsg(lang === 'ID' ? 'Login sukses via Google OAuth!' : 'Login successful with Google OAuth!');
    setTimeout(() => {
      onLoginSuccess(mockUser);
      onClose();
      setSuccessMsg(null);
    }, 1000);
  };

  return (
    <div id="login-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div 
        id="login-modal-container" 
        className="w-full max-w-md bg-white rounded-2xl overflow-hidden shadow-2xl border border-slate-100 flex flex-col relative transition-all duration-300"
      >
        {/* Verification banner (matching first screenshot exactly) */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-600 p-6 text-white relative">
          <button 
            id="close-login-modal-btn"
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-1.5 rounded-full transition-colors"
          >
            <X size={18} />
          </button>
          
          <div className="flex items-center gap-2 mb-2 text-xs font-semibold tracking-wider text-amber-300">
            <ShieldCheck size={14} className="animate-pulse" />
            <span>{lang === 'ID' ? 'VERIFIKASI RESMI' : 'OFFICIAL VERIFICATION'}</span>
          </div>
          
          <h3 className="text-xl font-bold tracking-tight">
            {lang === 'ID' ? 'Akses Terpadu LABBOOK' : 'Integrated LABBOOK Access'}
          </h3>
          <p className="text-xs text-blue-100 mt-1">
            {lang === 'ID' 
              ? 'Hubungkan dengan ratusan laboratorium akreditasi' 
              : 'Connect with hundreds of accredited laboratories'}
          </p>
        </div>

        {/* Tab selector */}
        <div className="flex border-b border-slate-100">
          <button
            id="tab-signin"
            onClick={() => { setActiveTab('signin'); setErrorMsg(null); }}
            className={`flex-1 py-4 text-center font-bold text-sm transition-all relative ${
              activeTab === 'signin' ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            {lang === 'ID' ? 'MASUK' : 'SIGN IN'}
            {activeTab === 'signin' && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-blue-600 rounded-full" />
            )}
          </button>
          <button
            id="tab-signup"
            onClick={() => { setActiveTab('signup'); setErrorMsg(null); }}
            className={`flex-1 py-4 text-center font-bold text-sm transition-all relative ${
              activeTab === 'signup' ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            {lang === 'ID' ? 'DAFTAR BARU' : 'SIGN UP'}
            {activeTab === 'signup' && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-blue-600 rounded-full" />
            )}
          </button>
        </div>

        {/* Notification Statuses */}
        {successMsg && (
          <div className="mx-6 mt-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-start gap-2.5 animate-fadeIn">
            <CheckCircle size={16} className="text-emerald-600 shrink-0 mt-0.5" />
            <span>{successMsg}</span>
          </div>
        )}

        {errorMsg && (
          <div className="mx-6 mt-4 p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl flex items-start gap-2.5">
            <span className="text-rose-600 font-bold">⚠️</span>
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Modal Form */}
        <form onSubmit={handleManualLogin} className="p-6 flex-1 flex flex-col gap-4">
          {activeTab === 'signup' && (
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-slate-500 tracking-wider">
                {lang === 'ID' ? 'NAMA LENGKAP' : 'FULL NAME'}
              </label>
              <div className="relative">
                <input
                  id="login-name-input"
                  type="text"
                  placeholder="e.g. Dr. Lukman Wijaya"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-all text-slate-850"
                />
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">👤</span>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-slate-500 tracking-wider">EMAIL</label>
            <div className="relative">
              <input
                id="login-email-input"
                type="email"
                placeholder="username@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-all text-slate-850"
                required
              />
              <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-slate-500 tracking-wider">PASSWORD</label>
            <div className="relative">
              <input
                id="login-password-input"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-all text-slate-850"
                required
              />
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>
          </div>

          {activeTab === 'signin' && (
            <div className="text-right">
              <a href="#reset" className="text-xs font-semibold text-blue-600 hover:underline">
                {lang === 'ID' ? 'Lupa Password?' : 'Forgot Password?'}
              </a>
            </div>
          )}

          <button
            id="submit-auth-btn"
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-11 rounded-xl text-sm shadow-md hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20 active:scale-[0.98] mt-2"
          >
            {activeTab === 'signin' 
              ? (lang === 'ID' ? 'Masuk' : 'Sign In') 
              : (lang === 'ID' ? 'Verifikasi & Daftar' : 'Verify & Sign Up')}
          </button>

          {/* Social login divider */}
          <div className="relative my-3 text-center">
            <span className="block w-full h-[1px] bg-slate-100" />
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-[10px] font-bold text-slate-400 tracking-widest uppercase">
              {lang === 'ID' ? 'ATAU MASUK INSTAN' : 'OR INSTANT LOGIN'}
            </span>
          </div>

          {/* Google SSO Button (matching styling across screens) */}
          <button
            id="google-sso-btn"
            type="button"
            onClick={handleGoogleLogin}
            className="w-full border border-slate-250 hover:bg-slate-50 text-slate-700 font-semibold h-11 rounded-xl text-sm flex items-center justify-center gap-3 transition-colors active:scale-[0.98]"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
            </svg>
            <span>
              {lang === 'ID' ? 'Masuk Instan dengan Google' : 'Instant Sign-In with Google'}
            </span>
          </button>
        </form>
      </div>
    </div>
  );
}
