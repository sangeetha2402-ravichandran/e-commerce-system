const express = require('express');
const cors = require('cors');
const app = express();
const port = 8080;

// Completely disable all CORS restrictions
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Credentials', 'false');
  res.header('Access-Control-Max-Age', '86400');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

app.use(cors({
  origin: '*',
  methods: '*',
  allowedHeaders: '*',
  credentials: false
}));
app.use(express.json());


// In-memory user store
let users = [];
let userId = 1;

// Register endpoint
app.post('/auth/register', (req, res) => {
  const { name, email, password, role = 'CUSTOMER' } = req.body;
  
  console.log('Registration request:', { name, email, role });
  console.log('Current users:', users.map(u => ({ id: u.id, email: u.email })));
  
  // Check if user already exists
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    console.log('User already exists:', existingUser.email);
    return res.status(400).json({ message: 'User with this email already exists' });
  }
  
  // Create new user
  const newUser = {
    id: userId++,
    name,
    email,
    password, // In real app, this would be encrypted
    role,
    createdAt: new Date().toISOString()
  };
  
  users.push(newUser);
  
  // Generate mock token
  const token = `mock-jwt-token-${Date.now()}-${newUser.id}`;
  
  res.json({
    token,
    userId: newUser.id,
    name: newUser.name,
    email: newUser.email,
    role: newUser.role
  });
});

// Login endpoint
app.post('/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  // Find user
  const user = users.find(u => u.email === email);
  
  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }
  
  // Check password (simple check for demo)
  if (user.password !== password) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }
  
  // Generate mock token
  const token = `mock-jwt-token-${Date.now()}-${user.id}`;
  
  res.json({
    token,
    userId: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  });
});

// Validate token endpoint
app.post('/auth/validate', (req, res) => {
  const { token } = req.body;
  
  // Simple validation - check if token starts with "mock-jwt-token"
  const isValid = token && token.startsWith('mock-jwt-token');
  
  res.json(isValid);
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
app.listen(port, () => {
  console.log(`Mock Auth Server running on port ${port}`);
  console.log(`Available endpoints:`);
  console.log(`  POST /auth/register`);
  console.log(`  POST /auth/login`);
  console.log(`  POST /auth/validate`);
  console.log(`  GET  /health`);
});
