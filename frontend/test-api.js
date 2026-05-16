// Test the API directly from browser console
// Copy and paste this into your browser's developer console

async function testRegistration() {
  try {
    const response = await fetch('http://localhost:8080/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'testuser',
        email: 'test@test.com',
        password: 'password123',
        role: 'CUSTOMER'
      }),
    });

    const data = await response.json();
    console.log('SUCCESS:', data);
    return data;
  } catch (error) {
    console.error('ERROR:', error);
    return error;
  }
}

// Run the test
testRegistration();
