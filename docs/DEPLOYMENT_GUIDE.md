# Deployment Guide

## Overview

This guide provides comprehensive instructions for deploying the E-Commerce System to various environments, from local development to production cloud deployment.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Local Development Setup](#local-development-setup)
3. [Staging Environment](#staging-environment)
4. [Production Deployment](#production-deployment)
5. [Docker Deployment](#docker-deployment)
6. [Cloud Deployment](#cloud-deployment)
7. [Environment Configuration](#environment-configuration)
8. [Monitoring and Maintenance](#monitoring-and-maintenance)
9. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### System Requirements
- **Node.js**: Version 16.0 or higher
- **npm**: Version 7.0 or higher
- **Git**: For version control
- **Modern Web Browser**: Chrome, Firefox, Safari, or Edge

### Development Tools (Recommended)
- **VS Code**: Code editor with React extensions
- **Postman**: API testing
- **Docker**: Containerization (optional)
- **MongoDB**: Database (for production)

### Cloud Accounts (Optional)
- **AWS**: Amazon Web Services
- **Google Cloud**: Google Cloud Platform
- **Azure**: Microsoft Azure
- **Heroku**: Platform as a Service

---

## Local Development Setup

### 1. Repository Setup
```bash
# Clone the repository
git clone <repository-url>
cd e-commerce-system

# Install dependencies
cd backend
npm install

cd ../frontend
npm install
```

### 2. Environment Configuration
```bash
# Backend environment (.env)
NODE_ENV=development
PORT=8080
JWT_SECRET=your-development-jwt-secret
CORS_ORIGIN=http://localhost:3000
DB_CONNECTION=mongodb://localhost:27017/ecommerce_dev

# Frontend environment (.env)
REACT_APP_API_URL=http://localhost:8080
REACT_APP_ENV=development
REACT_APP_DEBUG=true
```

### 3. Database Setup (Optional)
```bash
# Install MongoDB locally
# macOS
brew install mongodb-community

# Windows
# Download and install from mongodb.com

# Ubuntu/Debian
sudo apt-get install mongodb

# Start MongoDB
mongod --dbpath /path/to/your/db
```

### 4. Start Development Servers
```bash
# Terminal 1 - Backend
cd backend
node simple-auth-server.js

# Terminal 2 - Frontend
cd frontend
npm start

# Terminal 3 - MongoDB (if using)
mongod
```

### 5. Verify Installation
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:8080/health
- **API Test**: http://localhost:8080/auth/register

---

## Staging Environment

### 1. Server Setup
```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 for process management
sudo npm install -g pm2

# Install Nginx for reverse proxy
sudo apt install nginx -y

# Install MongoDB
sudo apt install mongodb -y
```

### 2. Application Deployment
```bash
# Clone repository
git clone <repository-url> /var/www/ecommerce-staging
cd /var/www/ecommerce-staging

# Install dependencies
cd backend && npm install --production
cd ../frontend && npm install

# Build frontend
cd frontend
npm run build

# Configure environment
cd ../backend
cp .env.staging .env
```

### 3. Staging Environment Configuration
```bash
# Backend .env.staging
NODE_ENV=staging
PORT=8080
JWT_SECRET=your-staging-jwt-secret
CORS_ORIGIN=https://staging.yourdomain.com
DB_CONNECTION=mongodb://localhost:27017/ecommerce_staging
LOG_LEVEL=info

# Frontend .env.staging
REACT_APP_API_URL=https://api-staging.yourdomain.com
REACT_APP_ENV=staging
REACT_APP_DEBUG=false
```

### 4. PM2 Configuration
```javascript
// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'ecommerce-backend',
    script: './backend/simple-auth-server.js',
    instances: 2,
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'staging',
      PORT: 8080
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true
  }]
};
```

### 5. Nginx Configuration
```nginx
# /etc/nginx/sites-available/ecommerce-staging
server {
    listen 80;
    server_name staging.yourdomain.com;

    # Frontend
    location / {
        root /var/www/ecommerce-staging/frontend/build;
        index index.html index.htm;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 6. Start Services
```bash
# Start MongoDB
sudo systemctl start mongodb
sudo systemctl enable mongodb

# Start backend with PM2
pm2 start ecosystem.config.js

# Configure and start Nginx
sudo ln -s /etc/nginx/sites-available/ecommerce-staging /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

## Production Deployment

### 1. Production Server Requirements
- **CPU**: 2+ cores minimum
- **RAM**: 4GB+ minimum
- **Storage**: 50GB+ SSD
- **Network**: 100Mbps+ bandwidth
- **OS**: Ubuntu 20.04 LTS or CentOS 8

### 2. Security Setup
```bash
# Create dedicated user
sudo adduser ecommerce
sudo usermod -aG sudo ecommerce

# Configure firewall
sudo ufw allow ssh
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable

# Install SSL certificate
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

### 3. Production Environment Configuration
```bash
# Backend .env.production
NODE_ENV=production
PORT=8080
JWT_SECRET=your-super-secure-production-jwt-secret
CORS_ORIGIN=https://yourdomain.com
DB_CONNECTION=mongodb://localhost:27017/ecommerce_prod
LOG_LEVEL=error
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX=100

# Frontend .env.production
REACT_APP_API_URL=https://api.yourdomain.com
REACT_APP_ENV=production
REACT_APP_DEBUG=false
```

### 4. Production PM2 Configuration
```javascript
// ecosystem.production.config.js
module.exports = {
  apps: [{
    name: 'ecommerce-backend',
    script: './backend/simple-auth-server.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 8080
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true,
    max_memory_restart: '1G',
    node_args: '--max-old-space-size=1024'
  }]
};
```

### 5. Production Nginx Configuration
```nginx
# /etc/nginx/sites-available/ecommerce-production
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;

    # Frontend
    location / {
        root /var/www/ecommerce/frontend/build;
        index index.html index.htm;
        try_files $uri $uri/ /index.html;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 86400;
    }

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private must-revalidate auth;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/javascript;
}
```

### 6. Database Setup
```bash
# Install and configure MongoDB
sudo apt install mongodb -y

# Configure MongoDB for production
sudo nano /etc/mongod.conf

# Add these configurations:
# storage:
#   dbPath: /var/lib/mongodb
#   journal:
#     enabled: true
# systemLog:
#   destination: file
#   logAppend: true
#   path: /var/log/mongodb/mongod.log
# net:
#   port: 27017
#   bindIp: 127.0.0.1
# processManagement:
#   timeZoneInfo: /usr/share/zoneinfo

# Start and enable MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod

# Create database and user
mongo
> use ecommerce_prod
> db.createUser({
    user: "ecommerce_user",
    pwd: "secure_password",
    roles: ["readWrite"]
  })
> exit
```

### 7. Deployment Script
```bash
#!/bin/bash
# deploy.sh

# Variables
APP_DIR="/var/www/ecommerce"
BACKUP_DIR="/var/backups/ecommerce"
DATE=$(date +%Y%m%d_%H%M%S)

# Create backup
echo "Creating backup..."
mkdir -p $BACKUP_DIR
tar -czf $BACKUP_DIR/backup_$DATE.tar.gz $APP_DIR

# Pull latest code
echo "Pulling latest code..."
cd $APP_DIR
git pull origin main

# Install dependencies
echo "Installing dependencies..."
cd backend && npm install --production
cd ../frontend && npm install

# Build frontend
echo "Building frontend..."
cd frontend
npm run build

# Restart services
echo "Restarting services..."
pm2 restart ecosystem.production.config.js
sudo systemctl reload nginx

echo "Deployment completed successfully!"
```

---

## Docker Deployment

### 1. Dockerfile Configuration

#### Backend Dockerfile
```dockerfile
# backend/Dockerfile
FROM node:16-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy application code
COPY . .

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

# Change ownership
RUN chown -R nodejs:nodejs /app
USER nodejs

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8080/health || exit 1

# Start application
CMD ["node", "simple-auth-server.js"]
```

#### Frontend Dockerfile
```dockerfile
# frontend/Dockerfile
FROM node:16-alpine as build

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built application
COPY --from=build /app/build /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
```

### 2. Docker Compose Configuration
```yaml
# docker-compose.yml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "8080:8080"
    environment:
      - NODE_ENV=production
      - JWT_SECRET=your-docker-jwt-secret
      - DB_CONNECTION=mongodb://mongo:27017/ecommerce
    depends_on:
      - mongo
    restart: unless-stopped

  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend
    restart: unless-stopped

  mongo:
    image: mongo:4.4
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db
    restart: unless-stopped

  nginx:
    image: nginx:alpine
    ports:
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/ssl/certs
    depends_on:
      - frontend
      - backend
    restart: unless-stopped

volumes:
  mongo_data:
```

### 3. Docker Deployment Commands
```bash
# Build and start containers
docker-compose up -d --build

# View logs
docker-compose logs -f

# Scale backend
docker-compose up -d --scale backend=3

# Update containers
docker-compose pull
docker-compose up -d

# Stop and remove
docker-compose down
```

---

## Cloud Deployment

### AWS Deployment

#### 1. EC2 Setup
```bash
# Launch EC2 instance
# - Ubuntu 20.04 LTS
# - t3.medium or larger
# - Configure security groups (80, 443, 22)

# Connect to instance
ssh -i your-key.pem ubuntu@your-ec2-ip

# Install Docker
sudo apt update
sudo apt install docker.io docker-compose -y
sudo usermod -aG docker ubuntu

# Clone repository
git clone <repository-url>
cd e-commerce-system

# Deploy with Docker
docker-compose up -d
```

#### 2. RDS MongoDB Setup
```bash
# Create MongoDB instance in AWS RDS
# Note connection string
# Update environment variables
DB_CONNECTION=mongodb://username:password@your-rds-endpoint:27017/ecommerce
```

#### 3. S3 for Static Assets
```bash
# Create S3 bucket
aws s3 mb s3://your-ecommerce-assets

# Configure CORS
aws s3api put-bucket-cors --bucket your-ecommerce-assets --cors-configuration file://cors.json
```

### Google Cloud Platform

#### 1. Compute Engine Setup
```bash
# Create VM instance
gcloud compute instances create ecommerce-vm \
  --machine-type=e2-medium \
  --image-family=ubuntu-2004-lts \
  --image-project=ubuntu-os-cloud \
  --boot-disk-size=50GB \
  --tags=http-server,https-server

# SSH into instance
gcloud compute ssh ecommerce-vm

# Deploy application
git clone <repository-url>
cd e-commerce-system
docker-compose up -d
```

#### 2. Cloud SQL for MongoDB
```bash
# Create Cloud SQL instance
gcloud sql instances create ecommerce-db \
  --database-version=MONGO_4_4 \
  --tier=db-n1-standard-1 \
  --region=us-central1
```

### Heroku Deployment

#### 1. Heroku Setup
```bash
# Install Heroku CLI
# Login to Heroku
heroku login

# Create app
heroku create your-ecommerce-app

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your-heroku-jwt-secret
heroku config:set MONGODB_URI=mongodb://your-mongodb-uri

# Deploy
git push heroku main
```

#### 2. Heroku Procfile
```
# Procfile
web: cd backend && node simple-auth-server.js
```

---

## Environment Configuration

### Development Environment
```bash
# .env.development
NODE_ENV=development
PORT=8080
JWT_SECRET=dev-secret-key
CORS_ORIGIN=http://localhost:3000
DB_CONNECTION=mongodb://localhost:27017/ecommerce_dev
LOG_LEVEL=debug
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX=1000
```

### Staging Environment
```bash
# .env.staging
NODE_ENV=staging
PORT=8080
JWT_SECRET=staging-secret-key
CORS_ORIGIN=https://staging.yourdomain.com
DB_CONNECTION=mongodb://localhost:27017/ecommerce_staging
LOG_LEVEL=info
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX=500
```

### Production Environment
```bash
# .env.production
NODE_ENV=production
PORT=8080
JWT_SECRET=super-secure-production-secret
CORS_ORIGIN=https://yourdomain.com
DB_CONNECTION=mongodb://username:password@your-db-host:27017/ecommerce_prod
LOG_LEVEL=error
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX=100
```

---

## Monitoring and Maintenance

### 1. Application Monitoring

#### PM2 Monitoring
```bash
# Monitor applications
pm2 monit

# View logs
pm2 logs

# Restart on failure
pm2 startup
pm2 save

# Update applications
pm2 update
```

#### Health Checks
```bash
# Create health check script
#!/bin/bash
# health-check.sh

# Check backend health
response=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8080/health)
if [ $response != "200" ]; then
    echo "Backend health check failed"
    pm2 restart ecommerce-backend
fi

# Check database connection
mongo --eval "db.adminCommand('ismaster')" > /dev/null 2>&1
if [ $? -ne 0 ]; then
    echo "Database health check failed"
    sudo systemctl restart mongod
fi
```

### 2. Log Management

#### Log Rotation
```bash
# Configure logrotate
sudo nano /etc/logrotate.d/ecommerce

# Content:
/var/www/ecommerce/logs/*.log {
    daily
    missingok
    rotate 52
    compress
    delaycompress
    notifempty
    create 644 ecommerce ecommerce
    postrotate
        pm2 reloadLogs
    endscript
}
```

#### Centralized Logging
```bash
# Install ELK stack (optional)
docker run -d --name elasticsearch -p 9200:9200 -e "discovery.type=single-node" elasticsearch:7.14.0
docker run -d --name logstash -p 5044:5044 --link elasticsearch:elasticsearch logstash:7.14.0
docker run -d --name kibana -p 5601:5601 --link elasticsearch:elasticsearch kibana:7.14.0
```

### 3. Backup Strategy

#### Database Backup
```bash
#!/bin/bash
# backup-db.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/var/backups/mongodb"
DB_NAME="ecommerce_prod"

# Create backup directory
mkdir -p $BACKUP_DIR

# Backup database
mongodump --db $DB_NAME --out $BACKUP_DIR/$DATE

# Compress backup
tar -czf $BACKUP_DIR/backup_$DATE.tar.gz $BACKUP_DIR/$DATE
rm -rf $BACKUP_DIR/$DATE

# Remove old backups (keep last 30 days)
find $BACKUP_DIR -name "backup_*.tar.gz" -mtime +30 -delete

echo "Backup completed: backup_$DATE.tar.gz"
```

#### Application Backup
```bash
#!/bin/bash
# backup-app.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/var/backups/ecommerce"
APP_DIR="/var/www/ecommerce"

# Create backup
tar -czf $BACKUP_DIR/app_backup_$DATE.tar.gz $APP_DIR

# Remove old backups
find $BACKUP_DIR -name "app_backup_*.tar.gz" -mtime +7 -delete
```

### 4. Performance Monitoring

#### System Metrics
```bash
# Install monitoring tools
sudo apt install htop iotop nethogs

# Monitor system resources
htop
iotop
nethogs
```

#### Application Performance
```bash
# Install Node.js monitoring
npm install -g clinic

# Profile application
clinic doctor -- node simple-auth-server.js
clinic bubbleprof -- node simple-auth-server.js
clinic flame -- node simple-auth-server.js
```

---

## Troubleshooting

### Common Issues

#### 1. Port Conflicts
```bash
# Check port usage
sudo netstat -tulpn | grep :8080

# Kill process using port
sudo kill -9 <PID>

# Change port in configuration
PORT=8081 node simple-auth-server.js
```

#### 2. Memory Issues
```bash
# Check memory usage
free -h
top

# Increase Node.js memory
node --max-old-space-size=2048 simple-auth-server.js

# Configure PM2 memory limit
pm2 start app.js --max-memory-restart 1G
```

#### 3. Database Connection Issues
```bash
# Check MongoDB status
sudo systemctl status mongod

# Check MongoDB logs
sudo tail -f /var/log/mongodb/mongod.log

# Restart MongoDB
sudo systemctl restart mongod
```

#### 4. SSL Certificate Issues
```bash
# Check certificate status
sudo certbot certificates

# Renew certificate
sudo certbot renew

# Test Nginx configuration
sudo nginx -t
```

### Debug Mode

#### Enable Debug Logging
```bash
# Set debug environment
export DEBUG=ecommerce:*
export NODE_ENV=development

# Start with debug
node --inspect simple-auth-server.js
```

#### Performance Profiling
```bash
# Generate CPU profile
node --prof simple-auth-server.js

# Analyze profile
node --prof-process isolate-*.log > processed.txt
```

### Emergency Procedures

#### Rollback Deployment
```bash
#!/bin/bash
# rollback.sh

# Find latest backup
LATEST_BACKUP=$(ls -t /var/backups/ecommerce/app_backup_*.tar.gz | head -n1)

# Restore backup
sudo rm -rf /var/www/ecommerce
sudo tar -xzf $LATEST_BACKUP -C /

# Restart services
pm2 restart ecosystem.production.config.js
sudo systemctl reload nginx

echo "Rollback completed using: $LATEST_BACKUP"
```

#### Emergency Maintenance Mode
```bash
# Enable maintenance mode
sudo nano /var/www/ecommerce/frontend/build/maintenance.html

# Update Nginx configuration
sudo nano /etc/nginx/sites-available/ecommerce-production

# Add maintenance mode configuration
# location / {
#     try_files /maintenance.html $uri $uri/ /index.html;
# }

# Reload Nginx
sudo systemctl reload nginx
```

---

## Security Best Practices

### 1. Server Security
```bash
# Update system regularly
sudo apt update && sudo apt upgrade -y

# Configure firewall
sudo ufw enable
sudo ufw deny incoming
sudo ufw allow ssh
sudo ufw allow 80
sudo ufw allow 443

# Disable root login
sudo nano /etc/ssh/sshd_config
# PermitRootLogin no
# PasswordAuthentication no

# Restart SSH
sudo systemctl restart ssh
```

### 2. Application Security
```bash
# Use environment variables for secrets
# Never commit secrets to git

# Implement rate limiting
# Configure in backend middleware

# Use HTTPS only
# Redirect HTTP to HTTPS

# Security headers
# Configure in Nginx
```

### 3. Database Security
```bash
# Use strong passwords
# Enable authentication
# Restrict network access
# Regular backups
# Monitor access logs
```

---

## Performance Optimization

### 1. Frontend Optimization
```bash
# Enable gzip compression
# Minify CSS and JavaScript
# Optimize images
# Implement caching
# Use CDN
```

### 2. Backend Optimization
```bash
# Use clustering
# Implement caching
# Optimize database queries
# Use connection pooling
# Monitor performance
```

### 3. Database Optimization
```bash
# Create indexes
# Optimize queries
# Monitor performance
# Regular maintenance
```

---

## Scaling Considerations

### 1. Horizontal Scaling
```bash
# Load balancing with Nginx
# Multiple backend instances
# Database replication
# Caching layer
```

### 2. Vertical Scaling
```bash
# Increase server resources
# Optimize application
# Monitor performance
# Upgrade when needed
```

### 3. Auto-scaling
```bash
# Cloud auto-scaling groups
# Monitor metrics
# Scale based on load
# Cost optimization
```

---

*This deployment guide covers the essential aspects of deploying the E-Commerce System to various environments. For specific cloud provider instructions, refer to their respective documentation.*
