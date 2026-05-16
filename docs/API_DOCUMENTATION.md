# API Documentation

## Overview

The E-Commerce System API provides RESTful endpoints for authentication, user management, product catalog, order processing, and administrative functions.

## Base URL
```
Development: http://localhost:8080
Production: https://api.yourdomain.com
```

## Authentication

### JWT Token Authentication
All API endpoints (except authentication endpoints) require a valid JWT token in the Authorization header:

```
Authorization: Bearer <jwt_token>
```

### Token Structure
```json
{
  "userId": "string",
  "email": "string",
  "role": "CUSTOMER|SELLER|ADMIN",
  "iat": "timestamp",
  "exp": "timestamp"
}
```

## Endpoints

### Authentication Endpoints

#### Register User
```http
POST /auth/register
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "CUSTOMER|SELLER|ADMIN"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "CUSTOMER",
    "createdAt": "2024-01-15T10:30:00Z"
  },
  "token": "jwt_token_here"
}
```

#### User Login
```http
POST /auth/login
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "CUSTOMER"
  },
  "token": "jwt_token_here"
}
```

#### Validate Token
```http
POST /auth/validate
```

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "success": true,
  "valid": true,
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "CUSTOMER"
  }
}
```

#### Health Check
```http
GET /health
```

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00Z",
  "version": "1.0.0"
}
```

### User Management Endpoints

#### Get All Users (Admin Only)
```http
GET /users
```

**Headers:**
```
Authorization: Bearer <admin_jwt_token>
```

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `role`: Filter by role (CUSTOMER|SELLER|ADMIN)
- `status`: Filter by status (ACTIVE|SUSPENDED|TERMINATED)

**Response:**
```json
{
  "success": true,
  "users": [
    {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "CUSTOMER",
      "status": "ACTIVE",
      "createdAt": "2024-01-15T10:30:00Z",
      "lastLogin": "2024-01-15T14:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "pages": 10
  }
}
```

#### Get User by ID
```http
GET /users/:id
```

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "CUSTOMER",
    "status": "ACTIVE",
    "profile": {
      "phone": "+1234567890",
      "address": "123 Main St, City, State",
      "avatar": "profile_image_url"
    },
    "createdAt": "2024-01-15T10:30:00Z",
    "lastLogin": "2024-01-15T14:30:00Z"
  }
}
```

#### Update User
```http
PUT /users/:id
```

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "name": "John Doe Updated",
  "phone": "+1234567890",
  "address": "123 Main St, City, State"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User updated successfully",
  "user": {
    "id": "user_id",
    "name": "John Doe Updated",
    "email": "john@example.com",
    "role": "CUSTOMER",
    "profile": {
      "phone": "+1234567890",
      "address": "123 Main St, City, State"
    }
  }
}
```

#### Delete User (Admin Only)
```http
DELETE /users/:id
```

**Headers:**
```
Authorization: Bearer <admin_jwt_token>
```

**Response:**
```json
{
  "success": true,
  "message": "User deleted successfully"
}
```

### Product Management Endpoints

#### Get All Products
```http
GET /products
```

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `category`: Filter by category
- `sellerId`: Filter by seller ID
- `status`: Filter by status (ACTIVE|INACTIVE|OUT_OF_STOCK)
- `sort`: Sort by (name|price|created_at|rating)
- `order`: Sort order (asc|desc)

**Response:**
```json
{
  "success": true,
  "products": [
    {
      "id": "product_id",
      "name": "Laptop Pro",
      "description": "High-performance laptop",
      "price": 1299.99,
      "category": "Electronics",
      "sellerId": "seller_id",
      "sellerName": "Tech Store",
      "images": ["image_url_1", "image_url_2"],
      "stock": 45,
      "status": "ACTIVE",
      "rating": 4.5,
      "reviews": 23,
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T14:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "pages": 10
  }
}
```

#### Get Product by ID
```http
GET /products/:id
```

**Response:**
```json
{
  "success": true,
  "product": {
    "id": "product_id",
    "name": "Laptop Pro",
    "description": "High-performance laptop with advanced features",
    "price": 1299.99,
    "category": "Electronics",
    "sellerId": "seller_id",
    "sellerName": "Tech Store",
    "images": ["image_url_1", "image_url_2", "image_url_3"],
    "specifications": {
      "processor": "Intel Core i7",
      "memory": "16GB RAM",
      "storage": "512GB SSD"
    },
    "stock": 45,
    "status": "ACTIVE",
    "rating": 4.5,
    "reviews": 23,
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T14:30:00Z"
  }
}
```

#### Create Product (Seller Only)
```http
POST /products
```

**Headers:**
```
Authorization: Bearer <seller_jwt_token>
```

**Request Body:**
```json
{
  "name": "New Product",
  "description": "Product description",
  "price": 99.99,
  "category": "Electronics",
  "stock": 100,
  "images": ["image_url_1", "image_url_2"],
  "specifications": {
    "feature1": "value1",
    "feature2": "value2"
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Product created successfully",
  "product": {
    "id": "new_product_id",
    "name": "New Product",
    "description": "Product description",
    "price": 99.99,
    "category": "Electronics",
    "sellerId": "seller_id",
    "stock": 100,
    "status": "ACTIVE",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

#### Update Product (Seller Only)
```http
PUT /products/:id
```

**Headers:**
```
Authorization: Bearer <seller_jwt_token>
```

**Request Body:**
```json
{
  "name": "Updated Product Name",
  "price": 149.99,
  "stock": 75,
  "description": "Updated description"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Product updated successfully",
  "product": {
    "id": "product_id",
    "name": "Updated Product Name",
    "price": 149.99,
    "stock": 75,
    "updatedAt": "2024-01-15T14:30:00Z"
  }
}
```

#### Delete Product (Seller Only)
```http
DELETE /products/:id
```

**Headers:**
```
Authorization: Bearer <seller_jwt_token>
```

**Response:**
```json
{
  "success": true,
  "message": "Product deleted successfully"
}
```

### Order Management Endpoints

#### Get All Orders
```http
GET /orders
```

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `status`: Filter by status (PENDING|PROCESSING|SHIPPED|DELIVERED|CANCELLED)
- `customerId`: Filter by customer ID (Admin/Seller only)
- `sellerId`: Filter by seller ID (Admin only)

**Response:**
```json
{
  "success": true,
  "orders": [
    {
      "id": "order_id",
      "customerId": "customer_id",
      "customerName": "John Doe",
      "sellerId": "seller_id",
      "sellerName": "Tech Store",
      "items": [
        {
          "productId": "product_id",
          "productName": "Laptop Pro",
          "quantity": 1,
          "price": 1299.99,
          "total": 1299.99
        }
      ],
      "total": 1299.99,
      "status": "PROCESSING",
      "shippingAddress": {
        "street": "123 Main St",
        "city": "City",
        "state": "State",
        "zipCode": "12345",
        "country": "Country"
      },
      "paymentMethod": "credit_card",
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T14:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "pages": 5
  }
}
```

#### Get Order by ID
```http
GET /orders/:id
```

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "success": true,
  "order": {
    "id": "order_id",
    "customerId": "customer_id",
    "customerName": "John Doe",
    "sellerId": "seller_id",
    "sellerName": "Tech Store",
    "items": [
      {
        "productId": "product_id",
        "productName": "Laptop Pro",
        "quantity": 1,
        "price": 1299.99,
        "total": 1299.99,
        "image": "product_image_url"
      }
    ],
    "total": 1299.99,
    "status": "PROCESSING",
    "shippingAddress": {
      "street": "123 Main St",
      "city": "City",
      "state": "State",
      "zipCode": "12345",
      "country": "Country"
    },
    "paymentMethod": "credit_card",
    "paymentStatus": "paid",
    "trackingNumber": "tracking_number",
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T14:30:00Z"
  }
}
```

#### Create Order
```http
POST /orders
```

**Headers:**
```
Authorization: Bearer <customer_jwt_token>
```

**Request Body:**
```json
{
  "items": [
    {
      "productId": "product_id",
      "quantity": 1
    }
  ],
  "shippingAddress": {
    "street": "123 Main St",
    "city": "City",
    "state": "State",
    "zipCode": "12345",
    "country": "Country"
  },
  "paymentMethod": "credit_card"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Order created successfully",
  "order": {
    "id": "new_order_id",
    "items": [
      {
        "productId": "product_id",
        "productName": "Laptop Pro",
        "quantity": 1,
        "price": 1299.99,
        "total": 1299.99
      }
    ],
    "total": 1299.99,
    "status": "PENDING",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

#### Update Order Status (Seller/Admin Only)
```http
PUT /orders/:id/status
```

**Headers:**
```
Authorization: Bearer <seller_or_admin_jwt_token>
```

**Request Body:**
```json
{
  "status": "SHIPPED",
  "trackingNumber": "tracking_number",
  "notes": "Order shipped via UPS"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Order status updated successfully",
  "order": {
    "id": "order_id",
    "status": "SHIPPED",
    "trackingNumber": "tracking_number",
    "updatedAt": "2024-01-15T14:30:00Z"
  }
}
```

### Cart Management Endpoints

#### Get User Cart
```http
GET /cart
```

**Headers:**
```
Authorization: Bearer <customer_jwt_token>
```

**Response:**
```json
{
  "success": true,
  "cart": {
    "id": "cart_id",
    "customerId": "customer_id",
    "items": [
      {
        "productId": "product_id",
        "productName": "Laptop Pro",
        "quantity": 1,
        "price": 1299.99,
        "total": 1299.99,
        "image": "product_image_url"
      }
    ],
    "total": 1299.99,
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T14:30:00Z"
  }
}
```

#### Add Item to Cart
```http
POST /cart/items
```

**Headers:**
```
Authorization: Bearer <customer_jwt_token>
```

**Request Body:**
```json
{
  "productId": "product_id",
  "quantity": 1
}
```

**Response:**
```json
{
  "success": true,
  "message": "Item added to cart successfully",
  "cart": {
    "id": "cart_id",
    "items": [
      {
        "productId": "product_id",
        "productName": "Laptop Pro",
        "quantity": 1,
        "price": 1299.99,
        "total": 1299.99
      }
    ],
    "total": 1299.99
  }
}
```

#### Update Cart Item Quantity
```http
PUT /cart/items/:productId
```

**Headers:**
```
Authorization: Bearer <customer_jwt_token>
```

**Request Body:**
```json
{
  "quantity": 2
}
```

**Response:**
```json
{
  "success": true,
  "message": "Cart item updated successfully",
  "cart": {
    "id": "cart_id",
    "items": [
      {
        "productId": "product_id",
        "quantity": 2,
        "price": 1299.99,
        "total": 2599.98
      }
    ],
    "total": 2599.98
  }
}
```

#### Remove Item from Cart
```http
DELETE /cart/items/:productId
```

**Headers:**
```
Authorization: Bearer <customer_jwt_token>
```

**Response:**
```json
{
  "success": true,
  "message": "Item removed from cart successfully",
  "cart": {
    "id": "cart_id",
    "items": [],
    "total": 0
  }
}
```

#### Clear Cart
```http
DELETE /cart
```

**Headers:**
```
Authorization: Bearer <customer_jwt_token>
```

**Response:**
```json
{
  "success": true,
  "message": "Cart cleared successfully"
}
```

### Review Management Endpoints

#### Get Product Reviews
```http
GET /products/:id/reviews
```

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `rating`: Filter by rating (1-5)
- `sort`: Sort by (created_at|rating|helpful)
- `order`: Sort order (asc|desc)

**Response:**
```json
{
  "success": true,
  "reviews": [
    {
      "id": "review_id",
      "productId": "product_id",
      "customerId": "customer_id",
      "customerName": "John Doe",
      "rating": 5,
      "title": "Excellent product",
      "comment": "Great quality and fast shipping",
      "images": ["review_image_url"],
      "helpful": 10,
      "verified": true,
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "pages": 3
  }
}
```

#### Create Product Review
```http
POST /products/:id/reviews
```

**Headers:**
```
Authorization: Bearer <customer_jwt_token>
```

**Request Body:**
```json
{
  "rating": 5,
  "title": "Excellent product",
  "comment": "Great quality and fast shipping",
  "images": ["review_image_url"]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Review created successfully",
  "review": {
    "id": "review_id",
    "productId": "product_id",
    "customerId": "customer_id",
    "customerName": "John Doe",
    "rating": 5,
    "title": "Excellent product",
    "comment": "Great quality and fast shipping",
    "verified": true,
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

## Error Responses

### Standard Error Format
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message",
    "details": "Additional error details"
  }
}
```

### Common Error Codes

#### Authentication Errors
- `AUTH_001`: Invalid credentials
- `AUTH_002`: Token expired
- `AUTH_003`: Invalid token
- `AUTH_004`: Access denied

#### Validation Errors
- `VALIDATION_001`: Required field missing
- `VALIDATION_002`: Invalid email format
- `VALIDATION_003`: Invalid password format
- `VALIDATION_004`: Invalid input data

#### Resource Errors
- `RESOURCE_001`: Resource not found
- `RESOURCE_002`: Resource already exists
- `RESOURCE_003`: Insufficient permissions
- `RESOURCE_004`: Resource locked

#### Business Logic Errors
- `BUSINESS_001`: Insufficient stock
- `BUSINESS_002`: Invalid order status
- `BUSINESS_003`: Payment failed
- `BUSINESS_004`: Shipping not available

## Rate Limiting

### Rate Limit Headers
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 99
X-RateLimit-Reset: 1642234567
```

### Rate Limits by Endpoint
- **Authentication**: 5 requests per minute
- **User Management**: 100 requests per hour
- **Product Management**: 200 requests per hour
- **Order Management**: 100 requests per hour
- **Cart Management**: 50 requests per minute

## Pagination

### Standard Pagination Parameters
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10, max: 100)

### Pagination Response Format
```json
{
  "data": [],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "pages": 10,
    "hasNext": true,
    "hasPrev": false
  }
}
```

## Webhooks

### Order Status Webhook
```http
POST /webhooks/order-status
```

**Request Body:**
```json
{
  "event": "order.status.changed",
  "data": {
    "orderId": "order_id",
    "oldStatus": "PROCESSING",
    "newStatus": "SHIPPED",
    "timestamp": "2024-01-15T14:30:00Z"
  }
}
```

### Payment Webhook
```http
POST /webhooks/payment
```

**Request Body:**
```json
{
  "event": "payment.completed",
  "data": {
    "orderId": "order_id",
    "paymentId": "payment_id",
    "amount": 1299.99,
    "status": "completed",
    "timestamp": "2024-01-15T14:30:00Z"
  }
}
```

## SDK and Client Libraries

### JavaScript/Node.js
```bash
npm install ecommerce-api-client
```

```javascript
const EcommerceAPI = require('ecommerce-api-client');

const client = new EcommerceAPI({
  baseURL: 'http://localhost:8080',
  apiKey: 'your-api-key'
});

// Get products
const products = await client.products.list();

// Create order
const order = await client.orders.create({
  items: [{ productId: 'product_id', quantity: 1 }],
  shippingAddress: { /* address */ },
  paymentMethod: 'credit_card'
});
```

### Python
```bash
pip install ecommerce-api-python
```

```python
from ecommerce_api import EcommerceClient

client = EcommerceClient(
    base_url='http://localhost:8080',
    api_key='your-api-key'
)

# Get products
products = client.products.list()

# Create order
order = client.orders.create({
    'items': [{'product_id': 'product_id', 'quantity': 1}],
    'shipping_address': {'street': '123 Main St'},
    'payment_method': 'credit_card'
})
```

## Testing

### Test Environment
- **Base URL**: http://localhost:8080/test
- **Test Credentials**: Available in test environment setup

### API Testing Examples
```bash
# Health check
curl -X GET http://localhost:8080/health

# User registration
curl -X POST http://localhost:8080/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123","role":"CUSTOMER"}'

# User login
curl -X POST http://localhost:8080/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Get products
curl -X GET http://localhost:8080/products \
  -H "Authorization: Bearer <jwt_token>"
```

## Support

### API Support
- **Documentation**: Complete API reference
- **Status Page**: System status and uptime
- **Support Email**: api-support@yourdomain.com
- **Developer Forum**: Community support

### Common Issues
1. **Authentication Failures**: Check token validity and format
2. **Rate Limiting**: Implement exponential backoff
3. **Validation Errors**: Review request body format
4. **Network Issues**: Check connectivity and SSL certificates
