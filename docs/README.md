# E-Commerce System Documentation

## Overview

A comprehensive multi-role e-commerce platform built with React and Node.js, supporting customers, sellers, and administrators with distinct portals and functionalities.

## Architecture

### Frontend (React)
- **Customer Portal**: Shopping experience with product browsing, cart management, and order tracking
- **Seller Portal**: Product management, order processing, analytics, and cart monitoring
- **Admin Portal**: User management, system oversight, and administrative controls

### Backend (Node.js/Express)
- **Authentication Service**: JWT-based authentication with role-based access control
- **API Gateway**: Request routing and middleware management
- **Microservices**: Modular service architecture for scalability

## Technology Stack

### Frontend
- **React 18**: Modern UI framework with hooks
- **React Router**: Client-side routing
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library
- **Axios**: HTTP client for API calls

### Backend
- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **JWT**: Authentication tokens
- **CORS**: Cross-origin resource sharing

## Quick Start

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd e-commerce-system
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   ```

4. **Start the application**
   ```bash
   # Terminal 1 - Backend
   cd backend
   node simple-auth-server.js
   
   # Terminal 2 - Frontend
   cd frontend
   npm start
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8080

## User Roles & Access

### Customer Role
- **Default Access**: Product browsing and shopping
- **Authentication**: Email/password login
- **Features**: Cart management, order tracking, profile settings

### Seller Role
- **Business Access**: Product and order management
- **Authentication**: Email/password login
- **Features**: Inventory management, sales analytics, customer cart monitoring

### Admin Role
- **System Access**: Full administrative control
- **Authentication**: Email/password login
- **Features**: User management, system oversight, configuration

## Directory Structure

```
e-commerce-system/
├── backend/
│   ├── simple-auth-server.js     # Authentication server
│   ├── api-gateway/              # API gateway service
│   ├── user-service/             # User management service
│   ├── product-service/          # Product catalog service
│   ├── order-service/            # Order processing service
│   ├── cart-service/             # Shopping cart service
│   └── package.json              # Backend dependencies
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.js          # Login component
│   │   │   ├── SellerPanel.js    # Seller portal wrapper
│   │   │   ├── CustomerPanel.js  # Customer portal wrapper
│   │   │   └── AdminPanel.js     # Admin portal wrapper
│   │   ├── components/seller/    # Seller-specific components
│   │   ├── components/customer/  # Customer-specific components
│   │   ├── components/admin/     # Admin-specific components
│   │   ├── contexts/             # React contexts
│   │   └── App.js                # Main app component
│   └── package.json              # Frontend dependencies
└── docs/                         # Documentation
```

## API Endpoints

### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `POST /auth/validate` - Token validation
- `GET /health` - Health check

### User Management
- `GET /users` - List all users
- `GET /users/:id` - Get user details
- `PUT /users/:id` - Update user information
- `DELETE /users/:id` - Delete user

### Product Management
- `GET /products` - List products
- `POST /products` - Create product
- `PUT /products/:id` - Update product
- `DELETE /products/:id` - Delete product

### Order Management
- `GET /orders` - List orders
- `POST /orders` - Create order
- `PUT /orders/:id` - Update order status
- `GET /orders/:id` - Get order details

## Security Features

### Authentication
- JWT-based authentication
- Role-based access control (RBAC)
- Secure password hashing
- Token expiration handling

### Data Protection
- Input validation and sanitization
- CORS configuration
- Error handling and logging
- Secure API endpoints

## Development Guidelines

### Code Structure
- Component-based architecture
- Separation of concerns
- Reusable UI components
- Consistent naming conventions

### Best Practices
- Responsive design principles
- Accessibility compliance
- Performance optimization
- Error boundary implementation

## Testing

### Frontend Testing
```bash
cd frontend
npm test
```

### Backend Testing
```bash
cd backend
npm test
```

## Deployment

### Production Build
```bash
cd frontend
npm run build
```

### Environment Variables
```bash
# Frontend
REACT_APP_API_URL=http://your-api-url.com

# Backend
PORT=8080
JWT_SECRET=your-jwt-secret
NODE_ENV=production
```

## Troubleshooting

### Common Issues

1. **Port conflicts**
   - Change frontend port: `PORT=3001 npm start`
   - Change backend port: Update `simple-auth-server.js`

2. **CORS errors**
   - Ensure backend CORS configuration allows frontend origin
   - Check API endpoint URLs

3. **Authentication issues**
   - Verify JWT secret configuration
   - Check token expiration settings

## Support

For technical support and questions:
- Review the troubleshooting section
- Check API documentation
- Verify configuration settings

## License

This project is licensed under the MIT License.
