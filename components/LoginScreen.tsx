
import React, { useState } from 'react';
import { Lock, User, ArrowRight, Flower2 } from 'lucide-react';

interface LoginScreenProps {
  onLogin: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'Lisa' && password === 'EONSR') {
      onLogin();
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-giay-diep flex items-center justify-center p-4">
      {/* Decorative patterns imitating traditional patterns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 border-r-8 border-b-8 border-red-800 rounded-br-[100px]"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 border-l-8 border-t-8 border-red-800 rounded-tl-[100px]"></div>
      </div>

      <div className="bg-[#b91c1c] p-1 rounded-2xl shadow-2xl w-full max-w-md relative z-10 woodblock-shadow">
        <div className="bg-[#fdfbf7] border-2 border-[#5c1914] p-8 rounded-xl bg-giay-diep">
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-4 border-2 border-red-700 rounded-full flex items-center justify-center bg-red-50">
               <Flower2 size={40} className="text-red-700" />
            </div>
            <h1 className="text-4xl font-black text-red-800 mb-2 font-serif tracking-tight">InfographAI</h1>
            <p className="text-stone-600 italic font-serif">Enter the Artist's Workshop</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-stone-800 uppercase tracking-widest ml-1">Artist Name</label>
              <div className="relative group">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-red-700 transition-colors" size={20} />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-white border-2 border-stone-300 rounded-lg py-3 pl-10 pr-4 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-red-700 focus:ring-1 focus:ring-red-700 transition-all font-serif"
                  placeholder="Username"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-stone-800 uppercase tracking-widest ml-1">Secret Key</label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-red-700 transition-colors" size={20} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white border-2 border-stone-300 rounded-lg py-3 pl-10 pr-4 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-red-700 focus:ring-1 focus:ring-red-700 transition-all font-serif"
                  placeholder="Password"
                />
              </div>
            </div>

            {error && (
              <div className="text-red-800 text-sm font-bold text-center bg-red-100 py-3 px-4 rounded border-l-4 border-red-600">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-red-700 hover:bg-red-800 text-[#fdfbf7] font-bold text-lg py-4 rounded-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2 border-2 border-red-900"
            >
              <span>Enter Workshop</span>
              <ArrowRight size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
