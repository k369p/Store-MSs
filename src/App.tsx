import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ItemsProvider } from './contexts/ItemsContext';
import { CartProvider } from './contexts/CartContext';
import { Layout } from './components/common/Layout';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { InventoryPage } from './pages/InventoryPage';
import { PosPage } from './pages/PosPage';

// Protected route component
const ProtectedRoute: React.FC<{ 
  element: React.ReactNode; 
  allowedRoles?: Array<'admin' | 'employee' | 'customer'>;
}> = ({ element, allowedRoles }) => {
  const { state } = useAuth();
  
  // Check if user is authenticated
  if (!state.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // Check if user has the required role
  if (allowedRoles && state.user && !allowedRoles.includes(state.user.role)) {
    return <Navigate to="/" replace />;
  }
  
  return <>{element}</>;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <ItemsProvider>
          <CartProvider>
            <Layout>
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                
                {/* Protected routes */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute 
                      element={<DashboardPage />} 
                      allowedRoles={['admin', 'employee']}
                    />
                  }
                />
                
                <Route
                  path="/inventory"
                  element={
                    <ProtectedRoute 
                      element={<InventoryPage />} 
                      allowedRoles={['admin']}
                    />
                  }
                />
                
                <Route
                  path="/pos"
                  element={
                    <ProtectedRoute 
                      element={<PosPage />} 
                      allowedRoles={['admin', 'employee']}
                    />
                  }
                />
                
                {/* Fallback route */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Layout>
          </CartProvider>
        </ItemsProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;