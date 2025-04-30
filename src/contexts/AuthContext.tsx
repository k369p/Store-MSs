import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { AuthState, User } from '../types';

// Initial state
const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

// Action types
type AuthAction = 
  | { type: 'LOGIN_SUCCESS'; payload: { user: User; token: string } }
  | { type: 'LOGIN_FAIL'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'AUTH_ERROR' }
  | { type: 'CLEAR_ERROR' }
  | { type: 'LOADING' };

// Reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case 'LOGIN_FAIL':
    case 'AUTH_ERROR':
      localStorage.removeItem('token');
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.type === 'LOGIN_FAIL' ? action.payload : 'Authentication error',
      };
    case 'LOGOUT':
      localStorage.removeItem('token');
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    case 'LOADING':
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
};

// Create context
interface AuthContextProps {
  state: AuthState;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check if user is logged in
  useEffect(() => {
    const loadUser = async () => {
      if (state.token) {
        try {
          // In a real app, you would verify the token with your API
          // This is a mock implementation for demonstration
          const user: User = {
            id: '1',
            username: 'admin',
            role: 'admin',
          };
          
          dispatch({
            type: 'LOGIN_SUCCESS',
            payload: { user, token: state.token },
          });
        } catch (err) {
          dispatch({ type: 'AUTH_ERROR' });
        }
      } else {
        dispatch({ type: 'AUTH_ERROR' });
      }
    };

    loadUser();
  }, []);

  // Login
  const login = async (username: string, password: string) => {
    try {
      dispatch({ type: 'LOADING' });
      
      // Mock login - in a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (username === 'admin' && password === 'password') {
        const user: User = { id: '1', username: 'admin', role: 'admin' };
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: { user, token: 'mock-jwt-token-for-admin' },
        });
      } else if (username === 'employee' && password === 'password') {
        const user: User = { id: '2', username: 'employee', role: 'employee' };
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: { user, token: 'mock-jwt-token-for-employee' },
        });
      } else {
        dispatch({
          type: 'LOGIN_FAIL',
          payload: 'Invalid credentials',
        });
      }
    } catch (err) {
      dispatch({
        type: 'LOGIN_FAIL',
        payload: 'Login failed',
      });
    }
  };

  // Logout
  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  // Clear errors
  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  return (
    <AuthContext.Provider value={{ state, login, logout, clearError }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};