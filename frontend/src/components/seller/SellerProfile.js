import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Building, CreditCard, Settings, Bell, Shield, Camera } from 'lucide-react';

const SellerProfile = () => {
  const [profile, setProfile] = useState({
    name: 'John Seller',
    email: 'seller@example.com',
    phone: '+1 (555) 123-4567',
    businessName: 'Tech Store',
    businessDescription: 'Premium electronics and accessories',
    address: '123 Business Ave, City, State 12345',
    website: 'www.techstore.com',
    taxId: 'TX-123456789',
    establishedYear: '2020'
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
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
        { name: 'phone', label: 'Phone Number', type: 'tel', icon: Phone }
      ]
    },
    {
      title: 'Business Information',
      icon: Building,
      fields: [
        { name: 'businessName', label: 'Business Name', type: 'text', icon: Building },
        { name: 'businessDescription', label: 'Business Description', type: 'textarea', icon: Building },
        { name: 'website', label: 'Website', type: 'url', icon: Building },
        { name: 'taxId', label: 'Tax ID', type: 'text', icon: Building },
        { name: 'establishedYear', label: 'Established Year', type: 'text', icon: Building }
      ]
    },
    {
      title: 'Address Information',
      icon: MapPin,
      fields: [
        { name: 'address', label: 'Business Address', type: 'text', icon: MapPin }
      ]
    }
  ];

  const quickActions = [
    {
      title: 'Payment Settings',
      description: 'Manage payment methods and payouts',
      icon: CreditCard,
      action: () => alert('Opening payment settings...')
    },
    {
      title: 'Notification Preferences',
      description: 'Configure email and push notifications',
      icon: Bell,
      action: () => alert('Opening notification settings...')
    },
    {
      title: 'Security Settings',
      description: 'Update password and security preferences',
      icon: Shield,
      action: () => alert('Opening security settings...')
    },
    {
      title: 'Store Settings',
      description: 'Configure store appearance and policies',
      icon: Settings,
      action: () => alert('Opening store settings...')
    }
  ];

  const sellerStats = [
    { label: 'Total Products', value: '45', icon: 'Box' },
    { label: 'Total Sales', value: '$12,567', icon: 'DollarSign' },
    { label: 'Customer Rating', value: '4.3', icon: 'Star' },
    { label: 'Member Since', value: 'Jan 2024', icon: 'Calendar' }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Seller Profile</h1>
          <p className="text-gray-600">Manage your seller account information</p>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center space-x-6">
          <div className="relative">
            <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center">
              <User className="w-12 h-12 text-indigo-600" />
            </div>
            <button className="absolute bottom-0 right-0 p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-900">{profile.name}</h2>
            <p className="text-gray-600">{profile.businessName}</p>
            <div className="flex items-center space-x-4 mt-2">
              <span className="text-sm text-gray-500">Member since Jan 2024</span>
              <span className="text-sm text-green-600 font-medium">Verified Seller</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {sellerStats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-lg font-semibold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
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
                        <div key={fieldIndex} className={field.type === 'textarea' ? 'md:col-span-2' : ''}>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {field.label}
                          </label>
                          <div className="relative">
                            {field.type !== 'textarea' && (
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FieldIcon className="h-5 w-5 text-gray-400" />
                              </div>
                            )}
                            
                            {field.type === 'textarea' ? (
                              <textarea
                                name={field.name}
                                value={profile[field.name]}
                                onChange={handleChange}
                                disabled={!isEditing}
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100"
                              />
                            ) : (
                              <input
                                type={field.type}
                                name={field.name}
                                value={profile[field.name]}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100 pl-10"
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

      {/* Store Performance */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Store Performance</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">4.3</div>
            <div className="text-sm text-gray-600">Average Rating</div>
            <div className="flex items-center justify-center mt-1">
              {[1, 2, 3, 4].map(i => (
                <span key={i} className="text-yellow-400">â</span>
              ))}
              <span className="text-gray-300">â</span>
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">98%</div>
            <div className="text-sm text-gray-600">On-Time Delivery</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">24h</div>
            <div className="text-sm text-gray-600">Avg Response Time</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">156</div>
            <div className="text-sm text-gray-600">Happy Customers</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerProfile;
