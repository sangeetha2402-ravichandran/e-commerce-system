import React, { useState, useEffect } from 'react';
import { Search, Filter, ShoppingCart, Star, Heart } from 'lucide-react';
import notificationService from '../../services/notificationService';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState(() => {
    // Initialize cart from localStorage
    const savedCart = localStorage.getItem('customerCart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    // Mock API call
    const fetchProducts = async () => {
      try {
        const mockProducts = [
          {
            id: 1,
            name: 'Wireless Headphones',
            price: 299.99,
            category: 'Electronics',
            rating: 4.5,
            reviews: 128,
            image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxjaXJjbGUgY3g9IjE1MCIgY3k9IjEwMCIgcj0iNDAiIGZpbGw9IiM0QzU0QTUiLz4KPHJlY3QgeD0iMTAwIiB5PSIxNDAiIHdpZHRoPSIxMDAiIGhlaWdodD0iNDAiIHJ4PSI1IiBmaWxsPSIjNEM1NEE1Ii8+Cjx0ZXh0IHg9IjE1MCIgeT0iMTgwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjMzc0MTUxIiBmb250LXNpemU9IjE0IiBmb250LXdlaWdodD0iYm9sZCI+SGVhZHBob25lczwvdGV4dD4KPHN2Zz4K',
            description: 'Premium wireless headphones with noise cancellation',
            stock: 15
          },
          {
            id: 2,
            name: 'Smart Watch',
            price: 199.99,
            category: 'Electronics',
            rating: 4.3,
            reviews: 89,
            image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxjaXJjbGUgY3g9IjE1MCIgY3k9IjE1MCIgcj0iNTAiIGZpbGw9IiMxMEI5ODEiLz4KPHJlY3QgeD0iMTMwIiB5PSIxNDAiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcj0iNSIgZmlsbD0iIzEwQjk4MSIvPgo8dGV4dCB4PSIxNTAiIHk9IjIyMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzM3NDE1MSIgZm9udC1zaXplPSIxNCIgZm9udC13ZWlnaHQ9ImJvbGQiPlNtYXJ0IFdhdGNoPC90ZXh0Pgo8c3ZnPgo=',
            description: 'Fitness tracking smartwatch with heart rate monitor',
            stock: 8
          },
          {
            id: 3,
            name: 'Running Shoes',
            price: 129.99,
            category: 'Sports',
            rating: 4.7,
            reviews: 234,
            image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxlbGxpcHNlIGN4PSIxNTAiIGN5PSIxNDAiIHJ4PSI2MCIgcnk9IjMwIiBmaWxsPSIjRUY0NDQ0Ii8+CjxyZWN0IHg9IjkwIiB5PSIxNjAiIHdpZHRoPSIxMjAiIGhlaWdodD0iNDAiIHJ4PSI1IiBmaWxsPSIjRUY0NDQ0Ii8+Cjx0ZXh0IHg9IjE1MCIgeT0iMjIwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjMzc0MTUxIiBmb250LXNpemU9IjE0IiBmb250LXdlaWdodD0iYm9sZCI+UnVubmluZyBTaG9lczwvdGV4dD4KPHN2Zz4K',
            description: 'Professional running shoes for athletes',
            stock: 25
          },
          {
            id: 4,
            name: 'Laptop Backpack',
            price: 49.99,
            category: 'Accessories',
            rating: 4.2,
            reviews: 67,
            image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxyZWN0IHg9IjgwIiB5PSIxMDAiIHdpZHRoPSIxNDAiIGhlaWdodD0iMTAwIiByeD0iOCIgZmlsbD0iIzg0QTNBRCIvPgo8cmVjdCB4PSI5MCIgeT0iMTEwIiB3aWR0aD0iMTIwIiBoZWlnaHQ9IjgwIiByeD0iNCIgZmlsbD0iIzY3N0I4MyIvPgo8dGV4dCB4PSIxNTAiIHk9IjIyMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzM3NDE1MSIgZm9udC1zaXplPSIxNCIgZm9udC13ZWlnaHQ9ImJvbGQiPkJhY2twYWNrPC90ZXh0Pgo8c3ZnPgo=',
            description: 'Durable backpack with laptop compartment',
            stock: 30
          },
          {
            id: 5,
            name: 'Coffee Maker',
            price: 89.99,
            category: 'Home',
            rating: 4.6,
            reviews: 156,
            image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxjaXJjbGUgY3g9IjE1MCIgY3k9IjEwMCIgcj0iNDAiIGZpbGw9IiM5MjQwNEUiLz4KPHJlY3QgeD0iMTA1IiB5PSIxMzAiIHdpZHRoPSI5MCIgaGVpZ2h0PSI2MCIgcng9IjYiIGZpbGw9IiM5MjQwNEUiLz4KPHJlY3QgeD0iMTI1IiB5PSI5MCIgd2lkdGg9IjUwIiBoZWlnaHQ9IjQwIiByeD0iNCIgZmlsbD0iI0Y1OUIwQiIvPgo8dGV4dCB4PSIxNTAiIHk9IjIyMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzM3NDE1MSIgZm9udC1zaXplPSIxNCIgZm9udC13ZWlnaHQ9ImJvbGQiPkNvZmZlZSBNYWtlcjwvdGV4dD4KPHN2Zz4K',
            description: 'Automatic coffee maker with timer',
            stock: 12
          },
          {
            id: 6,
            name: 'Yoga Mat',
            price: 29.99,
            category: 'Sports',
            rating: 4.4,
            reviews: 92,
            image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxyZWN0IHg9IjcwIiB5PSIxMDAiIHdpZHRoPSIxNjAiIGhlaWdodD0iMTAwIiByeD0iMTAiIGZpbGw9IiMxMEI5ODEiLz4KPGNpcmNsZSBjeD0iMjAwIiBjeT0iMTUwIiByPSI4IiBmaWxsPSIjRjU5MEI5Ii8+CjxjaXJjbGUgY3g9IjEwMCIgY3k9IjE1MCIgcj0iOCIgZmlsbD0iI0Y1OTBCOSIvPgo8dGV4dCB4PSIxNTAiIHk9IjIyMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzM3NDE1MSIgZm9udC1zaXplPSIxNCIgZm9udC13ZWlnaHQ9ImJvbGQiPlvZ2EgTWF0PC90ZXh0Pgo8c3ZnPgo=',
            description: 'Non-slip exercise yoga mat',
            stock: 40
          }
        ];
        setProducts(mockProducts);
        setFilteredProducts(mockProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = products;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by price range
    filtered = filtered.filter(product =>
      product.price >= priceRange.min && product.price <= priceRange.max
    );

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, priceRange, products]);

  const categories = ['all', ...new Set(products.map(p => p.category))];

  const addToCart = async (product) => {
    console.log('Adding to cart:', product);
    
    // Check if product already exists in cart
    const existingItemIndex = cart.findIndex(item => item.id === product.id);
    
    let updatedCart;
    if (existingItemIndex >= 0) {
      // Update quantity if product already in cart
      updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += 1;
      console.log('Updated quantity for existing item:', updatedCart[existingItemIndex]);
    } else {
      // Add new product to cart
      updatedCart = [...cart, { ...product, quantity: 1 }];
      console.log('Added new item to cart:', { ...product, quantity: 1 });
    }
    
    // Save to localStorage
    localStorage.setItem('customerCart', JSON.stringify(updatedCart));
    console.log('Saved to localStorage:', updatedCart);
    
    // Update state
    setCart(updatedCart);
    
    // Send notifications
    try {
      await notificationService.sendPushNotification(
        'order_update',
        'Added to Cart',
        `${product.name} has been added to your cart!`,
        { productId: product.id, productName: product.name }
      );
    } catch (error) {
      console.error('Error sending notification:', error);
    }
    
    // Check for low stock and send alert if needed
    if (product.stock < 5) {
      try {
        await notificationService.notifyLowStock(product);
      } catch (error) {
        console.error('Error sending low stock alert:', error);
      }
    }
    
    // Show success message
    alert(`${product.name} added to cart!`);
  };

  const addToWishlist = (product) => {
    // In real app, this would make an API call
    alert(`${product.name} added to wishlist!`);
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
        <h1 className="text-2xl font-bold text-gray-900">Products</h1>
        <p className="text-gray-600">Browse our collection of products</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div className="flex items-center space-x-2">
            <input
              type="number"
              placeholder="Min"
              value={priceRange.min}
              onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
              className="w-20 px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <span>-</span>
            <input
              type="number"
              placeholder="Max"
              value={priceRange.max}
              onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
              className="w-20 px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <button
                onClick={() => addToWishlist(product)}
                className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
              >
                <Heart className="w-4 h-4 text-gray-600" />
              </button>
              {product.stock < 10 && (
                <span className="absolute top-2 left-2 px-2 py-1 bg-red-500 text-white text-xs rounded">
                  Low Stock
                </span>
              )}
            </div>
            
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
              <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>
              
              <div className="flex items-center mb-2">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                </div>
                <span className="text-sm text-gray-500 ml-2">({product.reviews} reviews)</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-bold text-gray-900">${product.price}</p>
                  <p className="text-xs text-gray-500">{product.stock} in stock</p>
                </div>
                <div className="text-sm text-gray-500">
                  View Details
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No products found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default ProductList;
