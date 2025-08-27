import { createContext, useContext, useReducer, ReactNode, useEffect } from "react";
import { User, LoginData, RegisterData } from "@shared/schema";

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

type AuthAction = 
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: { user: User; token: string } }
  | { type: 'LOGIN_ERROR'; payload: string }
  | { type: 'REGISTER_START' }
  | { type: 'REGISTER_SUCCESS'; payload: { user: User; token: string } }
  | { type: 'REGISTER_ERROR'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'CLEAR_ERROR' };

const AuthContext = createContext<{
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
} | undefined>(undefined);

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN_START':
    case 'REGISTER_START':
      return { ...state, isLoading: true, error: null };
    
    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
      localStorage.setItem('auth_token', action.payload.token);
      return { 
        ...state, 
        user: action.payload.user, 
        token: action.payload.token,
        isLoading: false, 
        error: null 
      };
    
    case 'LOGIN_ERROR':
    case 'REGISTER_ERROR':
      return { ...state, isLoading: false, error: action.payload };
    
    case 'LOGOUT':
      localStorage.removeItem('auth_token');
      return { user: null, token: null, isLoading: false, error: null };
    
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    
    default:
      return state;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    token: localStorage.getItem('auth_token'),
    isLoading: false,
    error: null,
  });

  const login = async (data: LoginData) => {
    dispatch({ type: 'LOGIN_START' });
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Login failed');
      }

      dispatch({ 
        type: 'LOGIN_SUCCESS', 
        payload: { user: result.user, token: result.token } 
      });
    } catch (error: any) {
      dispatch({ type: 'LOGIN_ERROR', payload: error.message });
      throw error;
    }
  };

  const register = async (data: RegisterData) => {
    dispatch({ type: 'REGISTER_START' });
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Registration failed');
      }

      dispatch({ 
        type: 'REGISTER_SUCCESS', 
        payload: { user: result.user, token: result.token } 
      });
    } catch (error: any) {
      dispatch({ type: 'REGISTER_ERROR', payload: error.message });
      throw error;
    }
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  // Check token on app load
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (token && !state.user) {
      fetch('/api/auth/me', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(response => response.json())
      .then(result => {
        if (result.user) {
          dispatch({ 
            type: 'LOGIN_SUCCESS', 
            payload: { user: result.user, token } 
          });
        } else {
          localStorage.removeItem('auth_token');
        }
      })
      .catch(() => {
        localStorage.removeItem('auth_token');
      });
    }
  }, []);

  const isAuthenticated = !!state.user;
  const isAdmin = state.user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ 
      state, 
      dispatch, 
      login, 
      register, 
      logout, 
      isAuthenticated,
      isAdmin 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}