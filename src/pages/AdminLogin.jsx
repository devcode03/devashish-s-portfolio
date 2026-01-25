import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Terminal, LogIn, AlertCircle } from 'lucide-react';
import { adminAPI } from '../services/api';
import { toast } from '../hooks/use-toast';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await adminAPI.login(credentials.username, credentials.password);
      
      if (response.success) {
        toast({
          title: "Login Successful",
          description: `Welcome back, ${response.username}!`,
        });
        navigate('/admin/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.detail || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Terminal className="text-purple-500" size={40} />
          </div>
          <h1 className="text-3xl font-bold text-white font-mono mb-2">Admin Portal</h1>
          <p className="text-gray-400 font-mono text-sm">Portfolio Management System</p>
        </div>

        {/* Login Card */}
        <div className="bg-gray-900 rounded-lg border border-purple-500/30 overflow-hidden">
          {/* Terminal Header */}
          <div className="bg-gray-800 px-4 py-3 border-b border-purple-500/30">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="ml-2 text-sm font-mono text-purple-400">admin_login.sh</span>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-start space-x-3">
                <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
                <p className="text-red-400 text-sm font-mono">{error}</p>
              </div>
            )}

            <div>
              <label className="block text-sm font-mono text-gray-400 mb-2">
                <span className="text-purple-400">--username</span>
              </label>
              <input
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                required
                className="w-full bg-gray-950 text-white px-4 py-3 rounded border border-purple-500/30 focus:border-pink-500 focus:outline-none font-mono"
                placeholder="Enter username"
              />
            </div>

            <div>
              <label className="block text-sm font-mono text-gray-400 mb-2">
                <span className="text-purple-400">--password</span>
              </label>
              <input
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                required
                className="w-full bg-gray-950 text-white px-4 py-3 rounded border border-purple-500/30 focus:border-pink-500 focus:outline-none font-mono"
                placeholder="Enter password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 text-white rounded font-mono transition-colors duration-200"
            >
              <LogIn size={18} />
              <span>{loading ? 'Authenticating...' : 'Login'}</span>
            </button>

            <div className="mt-6 p-4 bg-gray-950 rounded border border-purple-500/30">
              <p className="text-xs text-gray-500 font-mono">
                <span className="text-pink-500">$</span> Default credentials for demo:
              </p>
              <p className="text-xs text-gray-400 font-mono mt-1">
                Username: <span className="text-purple-400">admin</span>
              </p>
              <p className="text-xs text-gray-400 font-mono">
                Password: <span className="text-purple-400">admin123</span>
              </p>
            </div>
          </form>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <button
            onClick={() => navigate('/')}
            className="text-gray-400 hover:text-purple-400 font-mono text-sm transition-colors duration-200"
          >
            <span className="text-pink-500">←</span> Back to Portfolio
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;