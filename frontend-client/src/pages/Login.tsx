import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Scale, Eye, EyeOff } from 'lucide-react';
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
      <div className="min-h-screen bg-[#080d1e] flex items-center justify-center px-4 relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-600/15 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-orange-600/10 rounded-full blur-[100px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 w-full max-w-sm"
        >
          <div className="glass-card p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center">
                <Scale size={20} className="text-orange-400" />
              </div>
              <span className="font-poppins font-bold text-white tracking-wide">BORGEL &amp; ASSOCIÉS</span>
            </div>

            <h1 className="text-2xl font-bold text-white mb-1">Connexion</h1>
            <p className="text-sm text-white/50 mb-8">Accès réservé à l'administration</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs text-white/60 mb-2 uppercase tracking-wider">Identifiant</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="input-dark"
                  placeholder="admin"
                />
              </div>
              <div>
                <label className="block text-xs text-white/60 mb-2 uppercase tracking-wider">Mot de passe</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="input-dark pr-12"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition"
                    aria-label={showPassword ? 'Masquer' : 'Afficher'}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="w-full py-3.5 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-400 transition shadow-lg shadow-orange-500/25 disabled:opacity-60"
              >
                {loading ? 'Connexion...' : 'Se connecter'}
              </motion.button>
            </form>

            <p className="mt-6 text-center text-xs text-white/30">
              Accès réservé aux administrateurs autorisés
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
}
