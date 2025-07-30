import { supabase } from './supabase';

export interface AuthUser {
  id: string;
  email: string;
  fullName?: string;
  isOnboarded: boolean;
}

export interface AuthSession {
  user: AuthUser;
  token: string;
  supabaseSession?: any;
}

export const authService = {
  // Check if email exists (determines signup vs login flow)
  async checkEmail(email: string): Promise<{
    exists: boolean;
    isOnboarded: boolean;
  }> {
    const response = await fetch('/api/auth/check-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    
    if (!response.ok) {
      let errorMessage = 'Failed to check email';
      try {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const error = await response.json();
          errorMessage = error.error || error.message || errorMessage;
        } else {
          const text = await response.text();
          errorMessage = `Server error (${response.status}): ${text.slice(0, 100)}...`;
        }
      } catch (e) {
        errorMessage = `Network error (${response.status}): ${response.statusText}`;
      }
      throw new Error(errorMessage);
    }
    
    const data = await response.json();
    return {
      exists: data.exists,
      isOnboarded: data.isOnboarded,
    };
  },

  // Send OTP for signup
  async signup(email: string): Promise<void> {
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    
    if (!response.ok) {
      let errorMessage = 'Failed to send signup OTP';
      try {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const error = await response.json();
          errorMessage = error.error || error.message || errorMessage;
        } else {
          const text = await response.text();
          errorMessage = `Server error (${response.status}): ${text.slice(0, 100)}...`;
        }
      } catch (e) {
        errorMessage = `Network error (${response.status}): ${response.statusText}`;
      }
      throw new Error(errorMessage);
    }
  },

  // Send OTP for login
  async login(email: string): Promise<{
    isOnboarded: boolean;
  }> {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    
    if (!response.ok) {
      let errorMessage = 'Failed to send login OTP';
      try {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const error = await response.json();
          errorMessage = error.error || error.message || errorMessage;
        } else {
          const text = await response.text();
          errorMessage = `Server error (${response.status}): ${text.slice(0, 100)}...`;
        }
      } catch (e) {
        errorMessage = `Network error (${response.status}): ${response.statusText}`;
      }
      throw new Error(errorMessage);
    }
    
    const data = await response.json();
    return {
      isOnboarded: data.isOnboarded,
    };
  },

  // Verify OTP
  async verifyOtp(email: string, code: string): Promise<AuthSession> {
    const response = await fetch('/api/auth/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, code }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to verify OTP');
    }
    
    const data = await response.json();
    return {
      user: data.user,
      token: data.token,
      supabaseSession: data.supabaseSession,
    };
  },

  // Get stored session with fallback support for mobile
  getStoredSession(): AuthSession | null {
    let stored = localStorage.getItem('auth_session');
    
    // Fallback to sessionStorage for mobile compatibility
    if (!stored) {
      stored = sessionStorage.getItem('auth_session');
    }
    
    if (!stored) return null;
    
    try {
      const session = JSON.parse(stored);
      // Check if session is still valid (not expired)
      const now = Date.now();
      if (session.expiresAt && now > session.expiresAt) {
        this.clearSession();
        return null;
      }
      return session;
    } catch {
      return null;
    }
  },

  // Store session with enhanced mobile compatibility
  storeSession(session: AuthSession): void {
    const sessionWithExpiry = {
      ...session,
      expiresAt: Date.now() + (7 * 24 * 60 * 60 * 1000), // 7 days
    };
    
    // Store in both localStorage and sessionStorage for better mobile compatibility
    try {
      localStorage.setItem('auth_session', JSON.stringify(sessionWithExpiry));
      sessionStorage.setItem('auth_session', JSON.stringify(sessionWithExpiry));
      // Also store token separately for legacy compatibility
      localStorage.setItem('authToken', session.token);
      sessionStorage.setItem('authToken', session.token);
    } catch (error) {
      console.error('Failed to store session data:', error);
    }
  },

  // Clear session from all storage locations
  clearSession(): void {
    try {
      localStorage.removeItem('auth_session');
      sessionStorage.removeItem('auth_session');
      localStorage.removeItem('authToken');
      sessionStorage.removeItem('authToken');
    } catch (error) {
      console.error('Failed to clear session data:', error);
    }
  },

  // Check if user is authenticated
  isAuthenticated(): boolean {
    const session = this.getStoredSession();
    return !!session?.token;
  },

  // Get current user
  getCurrentUser(): AuthUser | null {
    const session = this.getStoredSession();
    return session?.user || null;
  },

  // Initialize Supabase session
  async initializeSupabaseSession(): Promise<void> {
    const session = this.getStoredSession();
    if (session?.supabaseSession) {
      await supabase.auth.setSession(session.supabaseSession);
    }
  },

  // Sign out
  async signOut(): Promise<void> {
    await supabase.auth.signOut();
    this.clearSession();
  },
};