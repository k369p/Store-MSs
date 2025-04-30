import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { User, Lock, AlertCircle } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { state, login, clearError } = useAuth();
  const navigate = useNavigate();

  // Clear any auth errors when component mounts
  useEffect(() => {
    clearError();
  }, []);

  // Redirect if already logged in
  useEffect(() => {
    if (state.isAuthenticated) {
      navigate('/dashboard');
    }
  }, [state.isAuthenticated]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    
    if (!username.trim() || !password.trim()) {
      setErrorMessage('Username and password are required');
      return;
    }
    
    try {
      await login(username, password);
    } catch (err) {
      setErrorMessage('Failed to log in');
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full px-6 py-8 bg-white shadow-md rounded-lg">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Log In to StoreManager</h1>
          <p className="text-gray-600 mt-2">Enter your credentials to access your account</p>
        </div>
        
        {(state.error || errorMessage) && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md flex items-start">
            <AlertCircle className="h-5 w-5 text-red-500 mr-3 mt-0.5" />
            <p className="text-red-700 text-sm">{state.error || errorMessage}</p>
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <Input
            id="username"
            type="text"
            label="Username"
            placeholder="Enter your username"
            icon={<User className="h-5 w-5" />}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
          />
          
          <Input
            id="password"
            type="password"
            label="Password"
            placeholder="Enter your password"
            icon={<Lock className="h-5 w-5" />}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />
          
          <div className="mt-8">
            <Button 
              type="submit"
              variant="primary"
              fullWidth
              isLoading={state.isLoading}
            >
              Log In
            </Button>
          </div>
          
          <div className="mt-4 text-center text-sm text-gray-600">
            <p>Demo Credentials:</p>
            <p className="mt-1">Admin: username <strong>admin</strong> / password <strong>password</strong></p>
            <p>Employee: username <strong>employee</strong> / password <strong>password</strong></p>
          </div>
        </form>
      </div>
    </div>
  );
};