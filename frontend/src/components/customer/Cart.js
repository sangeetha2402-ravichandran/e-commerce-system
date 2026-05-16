import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Plus, Minus, Trash2, CreditCard } from 'lucide-react';

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load cart from localStorage
    const loadCartItems = () => {
      try {
        const savedCart = localStorage.getItem('customerCart');
        console.log('Loading cart from localStorage:', savedCart);
        const cartItems = savedCart ? JSON.parse(savedCart) : [];
        console.log('Parsed cart items:', cartItems);
        setCartItems(cartItems);
      } catch (error) {
        console.error('Error loading cart items:', error);
        setCartItems([]);
      } finally {
        setLoading(false);
      }
    };

    loadCartItems();
    
    // Listen for cart updates from other components
    const handleStorageChange = () => {
      console.log('Storage changed, reloading cart');
      loadCartItems();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    const item = cartItems.find(item => item.id === itemId);
    if (newQuantity > item.stock) {
      alert(`Only ${item.stock} items available in stock`);
      return;
    }

    const updatedCart = cartItems.map(item =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    
    setCartItems(updatedCart);
    localStorage.setItem('customerCart', JSON.stringify(updatedCart));
  };

  const removeItem = (itemId) => {
    const updatedCart = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedCart);
    localStorage.setItem('customerCart', JSON.stringify(updatedCart));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.08; // 8% tax
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const proceedToCheckout = () => {
    console.log('Proceeding to checkout with cart items:', cartItems);
    console.log('Current pathname:', window.location.pathname);
    
    // Check if cart has items
    if (cartItems.length === 0) {
      alert('Your cart is empty. Add some items before checkout.');
      return;
    }
    
    // Save cart to localStorage (already done)
    // Navigate to checkout page
    console.log('Navigating to /customer/checkout');
    navigate('/customer/checkout');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Favorites</h1>
        <p className="text-gray-600">View your saved products</p>
      </div>

      {cartItems.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Your cart is empty</h3>
          <p className="text-gray-600 mb-6">Browse products to add items to your favorites!</p>
          <button className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700">
            Browse Products
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b">
                <h2 className="text-lg font-semibold text-gray-900">
                  Cart Items ({cartItems.length})
                </h2>
              </div>
              
              <div className="divide-y">
                {cartItems.map((item) => (
                  <div key={item.id} className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-20 h-20 flex items-center justify-center bg-gray-100 rounded-md">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-contain"
                          onError={(e) => {
                            // Fallback to a simple colored div if image fails to load
                            e.target.style.display = 'none';
                            e.target.parentElement.innerHTML = `
                              <div class="w-full h-full flex items-center justify-center bg-indigo-100 rounded">
                                <span class="text-indigo-600 text-xs font-semibold">${item.name.charAt(0)}</span>
                              </div>
                            `;
                          }}
                        />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{item.name}</h3>
                        <p className="text-gray-600">${item.price}</p>
                        <p className="text-sm text-gray-500">{item.stock} in stock</p>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 border border-gray-300 rounded hover:bg-gray-100"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-12 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 border border-gray-300 rounded hover:bg-gray-100"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                      
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${calculateSubtotal().toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (8%)</span>
                  <span className="font-medium">${calculateTax().toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">Free</span>
                </div>
                
                <div className="border-t pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-gray-900">Total</span>
                    <span className="text-lg font-semibold text-gray-900">
                      ${calculateTotal().toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 space-y-3">
                <input
                  type="text"
                  placeholder="Promo code"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button className="w-full bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300">
                  Apply Code
                </button>
              </div>
              
              <div className="w-full mt-6 bg-gray-100 text-gray-500 px-4 py-3 rounded-md flex items-center justify-center space-x-2">
                <CreditCard className="w-5 h-5" />
                <span>Checkout Disabled</span>
              </div>
              
              <button className="w-full mt-3 border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50">
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
