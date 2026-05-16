import React, { useState, useEffect } from 'react';
import { Bell, Mail, Smartphone, X, Check, AlertCircle, Trash2, Settings } from 'lucide-react';
import notificationService from '../../services/notificationService';

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState([]);
  const [preferences, setPreferences] = useState({});
  const [loading, setLoading] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setLoading(true);
    const notificationHistory = notificationService.getNotificationHistory();
    const currentPreferences = notificationService.preferences;
    
    setNotifications(notificationHistory);
    setPreferences(currentPreferences);
    setLoading(false);
  };

  const handlePreferenceChange = (key, value) => {
    notificationService.updatePreferences({ [key]: value });
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  const clearHistory = () => {
    notificationService.clearHistory();
    setNotifications([]);
  };

  const testNotifications = async () => {
    try {
      await notificationService.testNotifications();
      alert('Test notifications sent! Check your browser notifications and the notification history below.');
      loadData();
    } catch (error) {
      console.error('Error sending test notifications:', error);
      alert('Error sending test notifications.');
    }
  };

  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        alert('Browser notifications enabled! You will now receive notifications in your browser.');
      } else {
        alert('Browser notifications are blocked. Please enable them in your browser settings to receive notifications.');
      }
    }
  };

  const getNotificationIcon = (type) => {
    const icons = {
      'email': <Mail className="w-5 h-5 text-blue-500" />,
      'sms': <Smartphone className="w-5 h-5 text-green-500" />,
      'push': <Bell className="w-5 h-5 text-purple-500" />
    };
    const icon = icons[type] || <Bell className="w-5 h-5 text-gray-500" />;
    console.log('Getting notification icon for type:', type, icon);
    return icon;
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'order_update': <AlertCircle className="w-4 h-4 text-indigo-500" />,
      'promotion': <Check className="w-4 h-4 text-green-500" />,
      'newsletter': <Mail className="w-4 h-4 text-blue-500" />
    };
    return icons[category] || <Bell className="w-4 h-4 text-gray-500" />;
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hours ago`;
    return date.toLocaleDateString();
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    return notification.type === filter;
  });

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
          <h1 className="text-2xl font-bold text-gray-900">Notification Center</h1>
          <p className="text-gray-600">Manage your notifications and preferences</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={requestNotificationPermission}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
          >
            Enable Browser Notifications
          </button>
          <button
            onClick={testNotifications}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Test Notifications
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Notification Preferences */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Preferences</h2>
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="text-gray-400 hover:text-gray-600"
              >
                <Settings className="w-5 h-5" />
              </button>
            </div>

            {showSettings && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">Email Notifications</h3>
                    <p className="text-sm text-gray-500">Receive email updates</p>
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
                    <p className="text-sm text-gray-500">Browser notifications</p>
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
                    <h3 className="font-medium text-gray-900">SMS Alerts</h3>
                    <p className="text-sm text-gray-500">Text message alerts</p>
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

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">Order Updates</h3>
                    <p className="text-sm text-gray-500">Order status changes</p>
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
                    <h3 className="font-medium text-gray-900">Promotions</h3>
                    <p className="text-sm text-gray-500">Special offers and deals</p>
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
                    <p className="text-sm text-gray-500">Weekly newsletter</p>
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
              </div>
            )}

            <div className="mt-6 pt-6 border-t">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Browser Permission</span>
                  <span className={`font-medium ${
                    Notification.permission === 'granted' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {Notification.permission === 'granted' ? 'Granted' : 'Blocked'}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total Notifications</span>
                  <span className="font-medium text-gray-900">{notifications.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Notification History */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Notification History</h2>
                <div className="flex items-center space-x-4">
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="all">All Types</option>
                    <option value="email">Email</option>
                    <option value="sms">SMS</option>
                    <option value="push">Push</option>
                  </select>
                  <button
                    onClick={clearHistory}
                    className="text-red-600 hover:text-red-700 text-sm font-medium"
                  >
                    Clear All
                  </button>
                </div>
              </div>
            </div>

            <div className="divide-y">
              {filteredNotifications.length === 0 ? (
                <div className="p-12 text-center">
                  <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No notifications</h3>
                  <p className="text-gray-600 mb-6">You haven't received any notifications yet.</p>
                  <button
                    onClick={testNotifications}
                    className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700"
                  >
                    Send Test Notifications
                  </button>
                </div>
              ) : (
                filteredNotifications.map((notification) => (
                  <div key={notification.id} className="p-6 hover:bg-gray-50">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          {getCategoryIcon(notification.category)}
                          <p className="text-sm font-medium text-gray-900">
                            {notification.subject || notification.title || 'Notification'}
                          </p>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          {notification.message}
                        </p>
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-gray-500">
                            {formatTimestamp(notification.timestamp)}
                          </p>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            notification.type === 'email' ? 'bg-blue-100 text-blue-800' :
                            notification.type === 'sms' ? 'bg-green-100 text-green-800' :
                            notification.type === 'push' ? 'bg-purple-100 text-purple-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {notification.type.toUpperCase()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationCenter;
