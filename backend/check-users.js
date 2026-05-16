const http = require('http');

const options = {
  hostname: 'localhost',
  port: 8080,
  path: '/health',
  method: 'GET'
};

const req = http.request(options, (res) => {
  console.log(`Server is running on port 8080`);
  console.log(`Available endpoints:`);
  console.log(`  POST /auth/register`);
  console.log(`  POST /auth/login`);
  console.log(`  POST /auth/validate`);
  console.log(`  GET  /health`);
  console.log(`\nTo fix the network error:`);
  console.log(`1. Use a different email address (s@i.com is already taken)`);
  console.log(`2. Try: sangeetha@test.com or admin@test.com`);
  console.log(`3. Or use your own email address`);
});

req.on('error', (e) => {
  console.error(`Server might not be running: ${e.message}`);
});

req.end();
