import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { User, Lock, Mail } from 'lucide-react';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    role: 'CUSTOMER'
  });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Mock authentication - bypass network issues
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock user database - matches admin dashboard data
      const mockUsers = [
        { email: 'jane@example.com', password: 'admin123', name: 'Jane Smith', role: 'ADMIN', id: 2 },
        { email: 'grace@example.com', password: 'admin123', name: 'Grace Taylor', role: 'ADMIN', id: 8 },
        { email: 'alice@example.com', password: 'seller123', name: 'Alice Brown', role: 'SELLER', id: 4 },
        { email: 'frank@example.com', password: 'seller123', name: 'Frank Miller', role: 'SELLER', id: 7 },
        { email: 'john@example.com', password: 'customer123', name: 'John Doe', role: 'CUSTOMER', id: 1, phone: '+1 (555) 123-4567', address: '123 Main St, City, State 12345', dateOfBirth: '1990-01-01', gender: 'male' },
        { email: 'bob@example.com', password: 'customer123', name: 'Bob Johnson', role: 'CUSTOMER', id: 3, phone: '+1 (555) 987-6543', address: '456 Oak Ave, Town, State 67890', dateOfBirth: '1985-05-15', gender: 'male' },
        { email: 'charlie@example.com', password: 'customer123', name: 'Charlie Wilson', role: 'CUSTOMER', id: 5, phone: '+1 (555) 246-8135', address: '789 Pine Rd, Village, State 11223', dateOfBirth: '1992-09-20', gender: 'male' },
        { email: 'emma@example.com', password: 'customer123', name: 'Emma Davis', role: 'CUSTOMER', id: 6, phone: '+1 (555) 369-2580', address: '321 Elm St, City, State 44556', dateOfBirth: '1988-03-10', gender: 'female' },
        { email: 'henry@example.com', password: 'customer123', name: 'Henry Anderson', role: 'CUSTOMER', id: 9, phone: '+1 (555) 147-2583', address: '654 Maple Dr, Town, State 77889', dateOfBirth: '1991-07-25', gender: 'male' },
        { email: 'isabella@example.com', password: 'customer123', name: 'Isabella Martinez', role: 'CUSTOMER', id: 10, phone: '+1 (555) 852-9630', address: '987 Cedar Ln, Village, State 99887', dateOfBirth: '1993-11-30', gender: 'female' }
      ];

      if (isLogin) {
        // Login logic
        const user = mockUsers.find(u => u.email === formData.email && u.password === formData.password);
        
        if (user) {
          const mockToken = `mock-jwt-token-${Date.now()}-${user.id}`;
          login({ 
            id: user.id, 
            name: user.name, 
            email: user.email, 
            role: user.role,
            phone: user.phone,
            address: user.address,
            dateOfBirth: user.dateOfBirth,
            gender: user.gender
          }, mockToken);
          
          // Redirect based on role
          switch (user.role) {
            case 'CUSTOMER':
              navigate('/customer/dashboard');
              break;
            case 'ADMIN':
              navigate('/admin/dashboard');
              break;
            case 'SELLER':
              navigate('/seller/dashboard');
              break;
            default:
              navigate('/customer/dashboard');
          }
        } else {
          setError('Invalid email or password');
        }
      } else {
        // Registration logic
        const existingUser = mockUsers.find(u => u.email === formData.email);
        
        if (existingUser) {
          setError('User with this email already exists');
        } else {
          const newUser = {
            id: mockUsers.length + 1,
            name: formData.name,
            email: formData.email,
            role: formData.role,
            phone: '+1 (555) 000-0000',
            address: '123 Default St, City, State 12345',
            dateOfBirth: '1990-01-01',
            gender: 'male'
          };
          
          const mockToken = `mock-jwt-token-${Date.now()}-${newUser.id}`;
          login(newUser, mockToken);
          
          // Redirect based on role
          switch (formData.role) {
            case 'CUSTOMER':
              navigate('/customer/dashboard');
              break;
            case 'ADMIN':
              navigate('/admin/dashboard');
              break;
            case 'SELLER':
              navigate('/seller/dashboard');
              break;
            default:
              navigate('/customer/dashboard');
          }
        }
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {isLogin ? 'Sign in to your account' : 'Create your account'}
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          
          {!isLogin && (
            <div>
              <label htmlFor="name" className="sr-only">Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Full name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
            </div>
          )}

          <div>
            <label htmlFor="email" className="sr-only">Email address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete={isLogin ? "current-password" : "new-password"}
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          {!isLogin && (
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                Role
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="CUSTOMER">Customer</option>
                <option value="SELLER">Seller</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>
          )}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isLogin ? 'Sign in' : 'Sign up'}
            </button>
          </div>

          <div className="text-center">
            <button
              type="button"
              className="text-indigo-600 hover:text-indigo-500"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
