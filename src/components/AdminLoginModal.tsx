import React, { useState } from 'react';
import { AffiliateConfig } from '../lib/types';
import { X, Lock, User, Key, CheckCircle2, AlertCircle, Mail, ArrowLeft } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: AffiliateConfig;
  onLoginSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  config,
  onLoginSuccess,
}) => {
  const [isRecovering, setIsRecovering] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [recoveryEmail, setRecoveryEmail] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [successMsg, setSuccessMsg] = useState<string>('');

  if (!isOpen) return null;

  const expectedUser = config.adminUser || 'admin';
  const expectedPass = config.adminPass || 'admin123';
  const expectedEmail = config.adminEmail || 'admin@clickofertas.com';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() === expectedUser && password === expectedPass) {
      setErrorMsg('');
      setUsername('');
      setPassword('');
      onLoginSuccess();
    } else {
      setErrorMsg('Usuário ou senha incorretos. Padrão inicial: admin / admin123');
    }
  };

  const handleRecover = (e: React.FormEvent) => {
    e.preventDefault();
    if (recoveryEmail.trim().toLowerCase() === expectedEmail.toLowerCase()) {
      setSuccessMsg(`Instruções e senha atual enviadas para ${expectedEmail}. Senha atual: ${expectedPass}`);
      setErrorMsg('');
    } else {
      setErrorMsg(`E-mail não encontrado. E-mail cadastrado padrão: ${expectedEmail}`);
      setSuccessMsg('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-slate-900 w-full max-w-md rounded-2xl border border-slate-800 shadow-2xl p-6 text-slate-100 relative">
        
        <button
          onClick={() => {
            setIsRecovering(false);
            setErrorMsg('');
            setSuccessMsg('');
            onClose();
          }}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center text-center space-y-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shadow-lg">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">
              {isRecovering ? 'Recuperação de Senha' : 'Acesso Restrito · Admin'}
            </h2>
            <p className="text-xs text-slate-400">
              {isRecovering
                ? 'Informe seu e-mail de administrador cadastrado para recuperar a senha.'
                : 'Digite suas credenciais de administrador para acessar o painel de controle.'}
            </p>
          </div>
        </div>

        {!isRecovering ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-300">
                Usuário Administrador
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Ex: admin"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-slate-300">
                  Senha de Acesso
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setIsRecovering(true);
                    setErrorMsg('');
                    setSuccessMsg('');
                  }}
                  className="text-[11px] text-emerald-400 hover:underline"
                >
                  Esqueci minha senha?
                </button>
              </div>
              <div className="relative">
                <Key className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                  required
                />
              </div>
              <span className="text-[11px] text-slate-500 block">
                💡 Padrão de fábrica: usuário <code className="text-emerald-400 font-bold">admin</code> e senha <code className="text-emerald-400 font-bold">admin123</code>.
              </span>
            </div>

            {errorMsg && (
              <div className="p-3 bg-red-950/60 border border-red-800/80 rounded-xl text-xs text-red-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{errorMsg}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-900/30 transition-all cursor-pointer"
            >
              Entrar no Painel Administrativo
            </button>
          </form>
        ) : (
          <form onSubmit={handleRecover} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-300">
                E-mail de Administrador Cadastrado
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  value={recoveryEmail}
                  onChange={(e) => setRecoveryEmail(e.target.value)}
                  placeholder="admin@clickofertas.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                  required
                />
              </div>
              <span className="text-[11px] text-slate-500 block">
                E-mail padrão configurado: <code className="text-emerald-400 font-mono">{expectedEmail}</code>
              </span>
            </div>

            {errorMsg && (
              <div className="p-3 bg-red-950/60 border border-red-800/80 rounded-xl text-xs text-red-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{errorMsg}</span>
              </div>
            )}

            {successMsg && (
              <div className="p-3 bg-emerald-950/60 border border-emerald-800/80 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>{successMsg}</span>
              </div>
            )}

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setIsRecovering(false);
                  setErrorMsg('');
                  setSuccessMsg('');
                }}
                className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Voltar</span>
              </button>

              <button
                type="submit"
                className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-900/30 transition-all cursor-pointer"
              >
                Recuperar Senha
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
