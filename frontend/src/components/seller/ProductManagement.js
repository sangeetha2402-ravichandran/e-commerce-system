import React, { useState, useEffect } from 'react';
import { Package, Search, Plus, Edit, Trash2, Eye, TrendingUp, AlertCircle } from 'lucide-react';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock API call
    const fetchProducts = async () => {
      try {
        const mockProducts = [
          {
            id: 1,
            name: 'Wireless Headphones',
            sku: 'WH-001',
            price: 299.99,
            stock: 15,
            status: 'active',
            category: 'Electronics',
            sales: 45,
            rating: 4.5,
            createdAt: '2024-01-10',
            description: 'Premium wireless headphones with noise cancellation'
          },
          {
            id: 2,
            name: 'Smart Watch',
            sku: 'SW-002',
            price: 199.99,
            stock: 8,
            status: 'active',
            category: 'Electronics',
            sales: 32,
            rating: 4.3,
            createdAt: '2024-01-08',
            description: 'Fitness tracking smartwatch with heart rate monitor'
          },
          {
            id: 3,
            name: 'Running Shoes',
            sku: 'RS-003',
            price: 129.99,
            stock: 0,
            status: 'out_of_stock',
            category: 'Sports',
            sales: 67,
            rating: 4.7,
            createdAt: '2024-01-05',
            description: 'Professional running shoes for athletes'
          },
          {
            id: 4,
            name: 'Laptop Backpack',
            sku: 'LB-004',
            price: 49.99,
            stock: 30,
            status: 'inactive',
            category: 'Accessories',
            sales: 12,
            rating: 4.2,
            createdAt: '2024-01-03',
            description: 'Durable backpack with laptop compartment'
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
        product.sku.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(product => product.status === statusFilter);
    }

    setFilteredProducts(filtered);
  }, [searchTerm, statusFilter, products]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'out_of_stock':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStockColor = (stock) => {
    if (stock === 0) return 'text-red-600';
    if (stock < 10) return 'text-yellow-600';
    return 'text-green-600';
  };

  const handleAddProduct = () => {
    alert('Opening add product form...');
  };

  const handleEditProduct = (product) => {
    alert(`Editing product: ${product.name}`);
  };

  const handleDeleteProduct = (product) => {
    if (window.confirm(`Are you sure you want to delete ${product.name}?`)) {
      alert(`Deleted product: ${product.name}`);
    }
  };

  const handleViewProduct = (product) => {
    alert(`Viewing details for: ${product.name}`);
  };

  const toggleProductStatus = (product) => {
    alert(`${product.status === 'active' ? 'Deactivating' : 'Activating'} product: ${product.name}`);
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Product Management</h1>
          <p className="text-gray-600">Manage your product listings</p>
        </div>
        <button
          onClick={handleAddProduct}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

          {/* Status Filter */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="out_of_stock">Out of Stock</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <img
                src={`https://via.placeholder.com/300x200?text=${encodeURIComponent(product.name)}`}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <span className={`absolute top-2 right-2 px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(product.status)}`}>
                {product.status.replace('_', ' ').toUpperCase()}
              </span>
              {product.stock < 10 && product.stock > 0 && (
                <span className="absolute top-2 left-2 px-2 py-1 bg-yellow-500 text-white text-xs rounded">
                  Low Stock
                </span>
              )}
            </div>
            
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-gray-900">{product.name}</h3>
                  <p className="text-sm text-gray-500">SKU: {product.sku}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">${product.price}</p>
                  <p className={`text-sm font-medium ${getStockColor(product.stock)}`}>
                    {product.stock} in stock
                  </p>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
              
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    <span className="text-yellow-400">â</span>
                    <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500">({product.sales} sold)</span>
                </div>
                <div className="flex items-center">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-600 ml-1">{product.sales}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleViewProduct(product)}
                  className="flex-1 px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 flex items-center justify-center"
                >
                  <Eye className="w-4 h-4 mr-1" />
                  View
                </button>
                <button
                  onClick={() => handleEditProduct(product)}
                  className="flex-1 px-3 py-2 text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 flex items-center justify-center"
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </button>
                <button
                  onClick={() => toggleProductStatus(product)}
                  className={`px-3 py-2 text-sm rounded-md flex items-center justify-center ${
                    product.status === 'active' 
                      ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' 
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                  }`}
                >
                  {product.status === 'active' ? 'Pause' : 'Activate'}
                </button>
                <button
                  onClick={() => handleDeleteProduct(product)}
                  className="px-3 py-2 text-sm bg-red-100 text-red-700 rounded-md hover:bg-red-200"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-600">
            {searchTerm || statusFilter !== 'all' 
              ? 'Try adjusting your search or filters' 
              : 'You haven\'t added any products yet'}
          </p>
          <button
            onClick={handleAddProduct}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Add Your First Product
          </button>
        </div>
      )}

      {/* Low Stock Alert */}
      {products.some(p => p.stock > 0 && p.stock < 10) && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div>
              <h3 className="text-sm font-medium text-yellow-800">Low Stock Alert</h3>
              <p className="text-sm text-yellow-700 mt-1">
                {products.filter(p => p.stock > 0 && p.stock < 10).length} products are running low on inventory. 
                Consider restocking soon to avoid running out.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;
