import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { IconScale, IconEye, IconEyeOff } from '@tabler/icons-react';
import toast from 'react-hot-toast';
import { authAPI } from '../api/client';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await authAPI.login(username, password);
      localStorage.setItem('access_token', data.access);
      localStorage.setItem('refresh_token', data.refresh);
      toast.success('Connexion réussie !');
      navigate('/admin');
    } catch {
      toast.error('Identifiants incorrects.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Administration — Borgel & Associés</title>
      </Helmet>
      <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#00d4b8]/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-[#00d4b8]/10 rounded-full blur-[100px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 w-full max-w-sm"
        >
          <div className="glass-card p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                   style={{ background: "rgba(0,212,184,0.10)", border: "1px solid rgba(0,212,184,0.20)" }}>
                <IconScale size={20} style={{ color: "#1e40af" }} />
              </div>
              <span className="font-poppins font-bold text-slate-900 tracking-wide">BORGEL &amp; ASSOCIÉS</span>
            </div>

            <h1 className="text-2xl font-bold text-slate-900 mb-1">Connexion</h1>
            <p className="text-sm text-slate-500 mb-8">Accès réservé à l'administration</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs text-slate-500 mb-2 uppercase tracking-wider font-medium">Identifiant</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="input-dark w-full"
                  placeholder="admin"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-2 uppercase tracking-wider font-medium">Mot de passe</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="input-dark w-full pr-12"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition"
                    aria-label={showPassword ? 'Masquer' : 'Afficher'}
                  >
                    {showPassword ? <IconEyeOff size={16} /> : <IconEye size={16} />}
                  </button>
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="w-full py-3.5 rounded-xl text-white font-bold transition disabled:opacity-60"
              style={{ background: "linear-gradient(90deg, #00d4b8 0%, #00b0f0 100%)", border: "none" }}
              >
                {loading ? 'Connexion...' : 'Se connecter'}
              </motion.button>
            </form>

            <p className="mt-6 text-center text-xs text-slate-400">
              Accès réservé aux administrateurs autorisés
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
}
