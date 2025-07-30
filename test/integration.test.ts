import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

describe('Authentication Endpoints', () => {
  it('should check if an email exists', async () => {
    const response = await axios.post(`${API_URL}/auth/check-email`, {
      email: 'test@example.com',
    });
    expect(response.data.exists).toBeDefined();
  });

  it('should send a signup OTP', async () => {
    const response = await axios.post(`${API_URL}/auth/signup`, {
      email: `test-${Date.now()}@example.com`,
    });
    expect(response.data.success).toBe(true);
  });

  it('should send a login OTP', async () => {
    // First, create a user
    const email = `test-${Date.now()}@example.com`;
    await axios.post(`${API_URL}/auth/signup`, { email });

    // Then, try to log in
    const response = await axios.post(`${API_URL}/auth/login`, { email });
    expect(response.data.success).toBe(true);
  });
});

describe('Contact Form Endpoint', () => {
    it('should send a contact form message', async () => {
        const response = await axios.post(`${API_URL}/contact`, {
            name: 'Test User',
            email: 'test@example.com',
            subject: 'Test Subject',
            message: 'Test Message',
        });
        expect(response.data.success).toBe(true);
    });
});
