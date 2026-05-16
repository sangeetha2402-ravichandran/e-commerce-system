import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, CreditCard, Shield, Bell } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState({
    name: user?.name || 'John Doe',
    email: user?.email || 'john.doe@example.com',
    phone: user?.phone || '+1 (555) 123-4567',
    address: user?.address || '123 Main St, City, State 12345',
    dateOfBirth: user?.dateOfBirth || '1990-01-01',
    gender: user?.gender || 'male'
  });
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: false,
    orderUpdates: true,
    promotions: false,
    newsletter: true,
    smsAlerts: false
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [loading, setLoading] = useState(false);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('customerProfile');
    const savedPreferences = localStorage.getItem('customerPreferences');
    
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    } else if (user) {
      // Use user context data if no saved profile
      setProfile({
        name: user.name || 'John Doe',
        email: user.email || 'john.doe@example.com',
        phone: user.phone || '+1 (555) 123-4567',
        address: user.address || '123 Main St, City, State 12345',
        dateOfBirth: user.dateOfBirth || '1990-01-01',
        gender: user.gender || 'male'
      });
    }
    
    if (savedPreferences) {
      setPreferences(JSON.parse(savedPreferences));
    }
  }, [user]);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const handlePreferenceChange = (key, value) => {
    const updatedPreferences = { ...preferences, [key]: value };
    setPreferences(updatedPreferences);
    localStorage.setItem('customerPreferences', JSON.stringify(updatedPreferences));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Save to localStorage
      localStorage.setItem('customerProfile', JSON.stringify(profile));
      
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      alert('Error updating profile');
    } finally {
      setLoading(false);
    }
  };

  const profileSections = [
    {
      title: 'Personal Information',
      icon: User,
      fields: [
        { name: 'name', label: 'Full Name', type: 'text', icon: User },
        { name: 'email', label: 'Email Address', type: 'email', icon: Mail },
        { name: 'phone', label: 'Phone Number', type: 'tel', icon: Phone },
        { name: 'dateOfBirth', label: 'Date of Birth', type: 'date', icon: User },
        { name: 'gender', label: 'Gender', type: 'select', icon: User, options: ['male', 'female', 'other'] }
      ]
    },
    {
      title: 'Address Information',
      icon: MapPin,
      fields: [
        { name: 'address', label: 'Shipping Address', type: 'text', icon: MapPin }
      ]
    }
  ];

  const quickActions = [
    {
      title: 'Payment Methods',
      description: 'Manage your payment options',
      icon: CreditCard,
      action: () => alert('Payment methods coming soon!')
    },
    {
      title: 'Security Settings',
      description: 'Update password and security preferences',
      icon: Shield,
      action: () => alert('Security settings coming soon!')
    },
    {
      title: 'Notification Preferences',
      description: 'Configure email and push notifications',
      icon: Bell,
      action: () => setShowPreferences(true)
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
          <p className="text-gray-600">Manage your account information</p>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

      {/* Profile Form */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            {profileSections.map((section, sectionIndex) => {
              const Icon = section.icon;
              return (
                <div key={sectionIndex} className={sectionIndex > 0 ? 'mt-8 pt-8 border-t' : ''}>
                  <div className="flex items-center mb-6">
                    <Icon className="w-5 h-5 text-gray-400 mr-2" />
                    <h2 className="text-lg font-semibold text-gray-900">{section.title}</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {section.fields.map((field, fieldIndex) => {
                      const FieldIcon = field.icon;
                      return (
                        <div key={fieldIndex}>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {field.label}
                          </label>
                          <div className="relative">
                            {field.type !== 'select' && (
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FieldIcon className="h-5 w-5 text-gray-400" />
                              </div>
                            )}
                            
                            {field.type === 'select' ? (
                              <select
                                name={field.name}
                                value={profile[field.name]}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100"
                              >
                                <option value="">Select...</option>
                                {field.options?.map(option => (
                                  <option key={option} value={option}>
                                    {option.charAt(0).toUpperCase() + option.slice(1)}
                                  </option>
                                ))}
                              </select>
                            ) : (
                              <input
                                type={field.type}
                                name={field.name}
                                value={profile[field.name]}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100 ${
                                  field.type !== 'select' ? 'pl-10' : ''
                                }`}
                              />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
            
            {isEditing && (
              <div className="mt-8 flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center mb-4">
                <Icon className="w-8 h-8 text-indigo-600 mr-3" />
                <div>
                  <h3 className="font-semibold text-gray-900">{action.title}</h3>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </div>
              </div>
              <button
                onClick={action.action}
                className="text-indigo-600 hover:text-indigo-700 font-medium text-sm"
              >
                Manage {action.title.split(' ')[0]} &rarr;
              </button>
            </div>
          );
        })}
      </div>

      {/* Account Statistics */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Account Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">24</div>
            <div className="text-sm text-gray-600">Total Orders</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">$2,456</div>
            <div className="text-sm text-gray-600">Total Spent</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">Jan 2024</div>
            <div className="text-sm text-gray-600">Member Since</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">Gold</div>
            <div className="text-sm text-gray-600">Member Level</div>
          </div>
        </div>
      </div>

      {/* Preferences Modal */}
      {showPreferences && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Notification Preferences</h2>
                <button
                  onClick={() => setShowPreferences(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">Email Notifications</h3>
                    <p className="text-sm text-gray-500">Receive order updates and promotional emails</p>
                  </div>
                  <button
                    onClick={() => handlePreferenceChange('emailNotifications', !preferences.emailNotifications)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      preferences.emailNotifications ? 'bg-indigo-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        preferences.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">Push Notifications</h3>
                    <p className="text-sm text-gray-500">Get real-time updates on your device</p>
                  </div>
                  <button
                    onClick={() => handlePreferenceChange('pushNotifications', !preferences.pushNotifications)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      preferences.pushNotifications ? 'bg-indigo-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        preferences.pushNotifications ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">Order Updates</h3>
                    <p className="text-sm text-gray-500">Notifications about your order status</p>
                  </div>
                  <button
                    onClick={() => handlePreferenceChange('orderUpdates', !preferences.orderUpdates)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      preferences.orderUpdates ? 'bg-indigo-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        preferences.orderUpdates ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">Promotional Offers</h3>
                    <p className="text-sm text-gray-500">Special deals and discount notifications</p>
                  </div>
                  <button
                    onClick={() => handlePreferenceChange('promotions', !preferences.promotions)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      preferences.promotions ? 'bg-indigo-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        preferences.promotions ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">Newsletter</h3>
                    <p className="text-sm text-gray-500">Weekly newsletter with latest products</p>
                  </div>
                  <button
                    onClick={() => handlePreferenceChange('newsletter', !preferences.newsletter)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      preferences.newsletter ? 'bg-indigo-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        preferences.newsletter ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">SMS Alerts</h3>
                    <p className="text-sm text-gray-500">Important updates via text message</p>
                  </div>
                  <button
                    onClick={() => handlePreferenceChange('smsAlerts', !preferences.smsAlerts)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      preferences.smsAlerts ? 'bg-indigo-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        preferences.smsAlerts ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6 border-t flex justify-end">
              <button
                onClick={() => setShowPreferences(false)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
