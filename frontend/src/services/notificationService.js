class NotificationService {
  constructor() {
    this.preferences = this.loadPreferences();
    this.notificationHistory = this.loadNotificationHistory();
  }

  loadPreferences() {
    const saved = localStorage.getItem('customerPreferences');
    return saved ? JSON.parse(saved) : {
      emailNotifications: true,
      pushNotifications: false,
      orderUpdates: true,
      promotions: false,
      newsletter: true,
      smsAlerts: false
    };
  }

  loadNotificationHistory() {
    const saved = localStorage.getItem('notificationHistory');
    return saved ? JSON.parse(saved) : [];
  }

  saveNotificationHistory(history) {
    localStorage.setItem('notificationHistory', JSON.stringify(history));
  }

  updatePreferences(newPreferences) {
    this.preferences = { ...this.preferences, ...newPreferences };
    localStorage.setItem('customerPreferences', JSON.stringify(this.preferences));
  }

  async sendEmailNotification(type, subject, message, data = {}) {
    if (!this.preferences.emailNotifications) {
      return { success: false, reason: 'Email notifications disabled' };
    }

    // Check specific preferences
    if (type === 'order_update' && !this.preferences.orderUpdates) {
      return { success: false, reason: 'Order updates disabled' };
    }
    if (type === 'promotion' && !this.preferences.promotions) {
      return { success: false, reason: 'Promotional emails disabled' };
    }
    if (type === 'newsletter' && !this.preferences.newsletter) {
      return { success: false, reason: 'Newsletter disabled' };
    }

    // Simulate email sending
    const notification = {
      id: Date.now(),
      type: 'email',
      category: type,
      subject,
      message,
      data,
      timestamp: new Date().toISOString(),
      status: 'sent'
    };

    this.addToHistory(notification);
    this.showBrowserNotification(subject, message, 'email');

    return { success: true, notification };
  }

  async sendSMSNotification(type, message, data = {}) {
    if (!this.preferences.smsAlerts) {
      return { success: false, reason: 'SMS notifications disabled' };
    }

    // Simulate SMS sending
    const notification = {
      id: Date.now(),
      type: 'sms',
      category: type,
      message,
      data,
      timestamp: new Date().toISOString(),
      status: 'sent'
    };

    this.addToHistory(notification);
    this.showBrowserNotification('SMS Alert', message, 'sms');

    return { success: true, notification };
  }

  async sendPushNotification(type, title, message, data = {}) {
    if (!this.preferences.pushNotifications) {
      return { success: false, reason: 'Push notifications disabled' };
    }

    // Request permission if needed
    if ('Notification' in window && Notification.permission === 'default') {
      await Notification.requestPermission();
    }

    // Show browser notification
    this.showBrowserNotification(title, message, 'push');

    const notification = {
      id: Date.now(),
      type: 'push',
      category: type,
      title,
      message,
      data,
      timestamp: new Date().toISOString(),
      status: 'sent'
    };

    this.addToHistory(notification);
    return { success: true, notification };
  }

  showBrowserNotification(title, message, type = 'general') {
    if ('Notification' in window && Notification.permission === 'granted') {
      const iconUrl = this.getNotificationIcon(type);
      console.log('Showing browser notification with icon:', type, iconUrl);
      
      const notification = new Notification(title, {
        body: message,
        icon: iconUrl,
        tag: `ecommerce-${type}`,
        requireInteraction: type === 'order_update'
      });

      notification.onclick = () => {
        window.focus();
        notification.close();
      };

      // Auto-close after 5 seconds
      setTimeout(() => {
        notification.close();
      }, 5000);
    } else {
      console.log('Browser notifications not available or permission not granted');
    }
  }

  getNotificationIcon(type) {
    // Create SVG icons as data URLs for browser notifications
    const svgIcons = {
      'email': 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiByeD0iOCIgZmlsbD0iIzNCMkY2RiIvPgo8cGF0aCBkPSJNMTIgMThMMjQgMjZMMzYgMThIMTIWiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTEyIDMwTDI0IDM4TDM2IDMwSDEyWiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+',
      'sms': 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiByeD0iOCIgZmlsbD0iIzEwQjk4MSIvPgo8cmVjdCB4PSIxMiIgeT0iMTIiIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgcng9IjQiIGZpbGw9IndoaXRlIi8+CjxjaXJjbGUgY3g9IjE4IiBjeT0iMjIiIHI9IjIiIGZpbGw9IiMxMEI5ODEiLz4KPHJlY3QgeD0iMTYiIHk9IjI2IiB3aWR0aD0iNCIgaGVpZ2h0PSI4IiByeD0iMSIgZmlsbD0id2hpdGUiLz4KPC9zdmc+',
      'push': 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiByeD0iOCIgZmlsbD0iIzlDQ0Q0MSIvPgo8Y2lyY2xlIGN4PSIyNCIgY3k9IjE4IiByPSI2IiBmaWxsPSJ3aGl0ZSIvPgo8cmVjdCB4PSIyMiIgeT0iMjQiIHdpZHRoPSI0IiBoZWlnaHQ9IjEwIiByeD0iMiIgZmlsbD0id2hpdGUiLz4KPHJlY3QgeD0iMTgiIHk9IjMwIiB3aWR0aD0iMTIiIGhlaWdodD0iNCIgcng9IjIiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPg==',
      'order_update': 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiByeD0iOCIgZmlsbD0iIzYzNjZGMSIvPgo8cmVjdCB4PSIxMCIgeT0iMTYiIHdpZHRoPSIyOCIgaGVpZ2h0PSIyMCIgcng9IjIiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0xOCAyNEgzMEwyNCAyOEwxOCAzMloiIGZpbGw9IiM2MzY2RjEiLz4KPHJlY3QgeD0iMTYiIHk9IjI2IiB3aWR0aD0iMTYiIGhlaWdodD0iMiIgZmlsbD0iIzYzNjZGMSIvPgo8L3N2Zz4=',
      'promotion': 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiByeD0iOCIgZmlsbD0iIzEwQjk4MSIvPgo8Y2lyY2xlIGN4PSIyNCIgY3k9IjE2IiByPSI4IiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNMjAgMjBMMjggMjBMMjQgMjhMMjAgMjBaIiBmaWxsPSIjMTBCOTgxIi8+CjxwYXRoIGQ9Ik0yOCAyMEwzNiAyMEwzMiAyOEwyOCAyMFoiIGZpbGw9IiMxMEI5ODEiLz4KPHBhdGggZD0iTTI0IDE2TDI4IDIwTDI0IDI0TDIwIDIwTDI0IDE2WiIgZmlsbD0iIzEwQjk4MSIvPgo8L3N2Zz4=',
      'newsletter': 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiByeD0iOCIgZmlsbD0iIzQ0NDQ0NCIvPgo8cmVjdCB4PSIxMCIgeT0iMTYiIHdpZHRoPSIyOCIgaGVpZ2h0PSIxNiIgcng9IjIiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0xMCAxOEwzOCAxOEwyNCAyNkwxMCAxOFoiIGZpbGw9IiM0NDQ0NDQiLz4KPHBhdGggZD0iTTEwIDI2TDM4IDI2TDI0IDM0TDEwIDI2WiIgZmlsbD0iIzQ0NDQ0NCIvPgo8L3N2Zz4=',
      'general': 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiByeD0iOCIgZmlsbD0iIzY3N0I4MyIvPgo8Y2lyY2xlIGN4PSIyNCIgY3k9IjI0IiByPSI4IiBmaWxsPSJ3aGl0ZSIvPgo8Y2lyY2xlIGN4PSIyNCIgY3k9IjI0IiByPSIzIiBmaWxsPSIjNjc3QjgzIi8+Cjwvc3ZnPg=='
    };
    return svgIcons[type] || svgIcons.general;
  }

  addToHistory(notification) {
    this.notificationHistory.unshift(notification);
    // Keep only last 50 notifications
    if (this.notificationHistory.length > 50) {
      this.notificationHistory = this.notificationHistory.slice(0, 50);
    }
    this.saveNotificationHistory(this.notificationHistory);
  }

  getNotificationHistory(limit = 20) {
    return this.notificationHistory.slice(0, limit);
  }

  clearHistory() {
    this.notificationHistory = [];
    this.saveNotificationHistory([]);
  }

  // Specific notification methods for different events
  async notifyOrderPlaced(orderData) {
    const emailSubject = `Order #${orderData.orderId} Confirmed!`;
    const emailMessage = `Thank you for your order! Your order #${orderData.orderId} has been placed successfully and will be delivered to ${orderData.shippingAddress}.`;
    
    const smsMessage = `Order #${orderData.orderId} confirmed! Total: $${orderData.total}. Track your order online.`;

    await this.sendEmailNotification('order_update', emailSubject, emailMessage, orderData);
    await this.sendSMSNotification('order_update', smsMessage, orderData);
  }

  async notifyOrderShipped(orderData) {
    const emailSubject = `Your Order #${orderData.orderId} Has Shipped!`;
    const emailMessage = `Great news! Your order #${orderData.orderId} has been shipped and is on its way. Expected delivery: ${orderData.expectedDelivery}.`;
    
    const smsMessage = `Order #${orderData.orderId} shipped! Expected delivery: ${orderData.expectedDelivery}. Track: ${orderData.trackingUrl}`;

    await this.sendEmailNotification('order_update', emailSubject, emailMessage, orderData);
    await this.sendSMSNotification('order_update', smsMessage, orderData);
  }

  async notifyOrderDelivered(orderData) {
    const emailSubject = `Order #${orderData.orderId} Delivered Successfully!`;
    const emailMessage = `Your order #${orderData.orderId} has been delivered! We hope you enjoy your purchase. Please leave a review if you have a moment.`;
    
    const smsMessage = `Order #${orderData.orderId} delivered! Thank you for shopping with us.`;

    await this.sendEmailNotification('order_update', emailSubject, emailMessage, orderData);
    await this.sendSMSNotification('order_update', smsMessage, orderData);
  }

  async notifyPromotion(promoData) {
    const emailSubject = `🎉 Special Offer: ${promoData.title}`;
    const emailMessage = `Don't miss out on ${promoData.title}! ${promoData.description}. Use code ${promoData.code} for ${promoData.discount} off. Valid until ${promoData.validUntil}.`;
    
    const smsMessage = `Special offer! ${promoData.title}. Use code ${promoData.code} for ${promoData.discount} off. Shop now!`;

    await this.sendEmailNotification('promotion', emailSubject, emailMessage, promoData);
    await this.sendSMSNotification('promotion', smsMessage, promoData);
  }

  async notifyNewsletter(newsletterData) {
    const emailSubject = `${newsletterData.title} - Weekly Newsletter`;
    const emailMessage = newsletterData.content;

    await this.sendEmailNotification('newsletter', emailSubject, emailMessage, newsletterData);
  }

  async notifyLowStock(productData) {
    const emailSubject = `Low Stock Alert: ${productData.name}`;
    const emailMessage = `The product "${productData.name}" in your wishlist is running low on stock. Only ${productData.stock} items left!`;
    
    const smsMessage = `Low stock alert: ${productData.name} has only ${productData.stock} items left. Buy now!`;

    await this.sendEmailNotification('order_update', emailSubject, emailMessage, productData);
    await this.sendSMSNotification('order_update', smsMessage, productData);
  }

  // Test notification method
  async testNotifications() {
    await this.sendEmailNotification('order_update', 'Test Email', 'This is a test email notification');
    await this.sendSMSNotification('order_update', 'Test SMS: This is a test SMS notification');
    await this.sendPushNotification('promotion', 'Test Push', 'This is a test push notification');
  }
}

// Create singleton instance
const notificationService = new NotificationService();

export default notificationService;
