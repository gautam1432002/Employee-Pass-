import React, { useState } from 'react';

interface AdminLoginProps {
  onLogin: (password: string) => boolean;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = onLogin(password);
    if (!success) {
      setError('Invalid password. Please try again.');
    } else {
      setError('');
    }
  };

  return (
    <div className="max-w-sm mx-auto bg-gray-800 rounded-xl shadow-2xl p-8 animate-fade-in-slide-up">
      <h2 className="text-2xl font-bold text-center text-white mb-2">Admin Access</h2>
      <p className="text-center text-gray-400 mb-6">Enter the password to manage employee data.</p>
      {error && <p className="text-red-400 bg-red-900/50 p-3 rounded-md mb-4 text-center">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="password" className="sr-only">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
            placeholder="Password"
          />
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 transition-transform transform hover:scale-105"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
