import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom';
import SessionManager from '@/patterns/Singleton/SessionManager.js';
import Login from '@/views/Login/Login.jsx';
import ImportarExcel from '@/views/JefeTicketera/ImportarExcel.jsx';
import RegistrarComprobante from '@/views/Staff/RegistrarComprobante.jsx';
import ValidarComprobantes from '@/views/Validacion/ValidarComprobantes.jsx';
import './App.css';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const sessionManager = SessionManager.getInstance();

  useEffect(() => {
    // Verificar si hay sesión activa
    const user = sessionManager.getCurrentUser();
    setCurrentUser(user);
  }, []);

  const handleLoginSuccess = (user, redirectTo) => {
    setCurrentUser(user);
    // La navegación se maneja por el Navigate component cuando currentUser cambia
  };

  const handleLogout = () => {
    sessionManager.logout();
    setCurrentUser(null);
  };

  // Componente de Layout con navegación
  const Layout = ({ children }) => (
    <div className="app-layout">
      <nav className="navbar">
        <div className="nav-brand">
          <h1>Sistema de Gestión de Comprobantes</h1>
        </div>
        <div className="nav-user">
          {currentUser && (
            <>
              <span className="user-info">
                👤 {currentUser.name} ({currentUser.role})
              </span>
              <button onClick={handleLogout} className="btn-logout">
                Cerrar Sesión
              </button>
            </>
          )}
        </div>
      </nav>
      <div className="content-wrapper">
        {currentUser && (
          <aside className="sidebar">
            <h3>Navegación</h3>
            <ul>
              {currentUser.role === 'staff' && (
                <>
                  <li><Link to="/registrar-comprobante">📝 Registrar Comprobante (RF03/RF04)</Link></li>
                </>
              )}
              {currentUser.role === 'jefe_ticketera' && (
                <>
                  <li><Link to="/importar-excel">📤 Importar Excel (RF02)</Link></li>
                  <li><Link to="/validar-comprobantes">✅ Validar Comprobantes (RF05)</Link></li>
                </>
              )}
              {currentUser.role === 'contadora' && (
                <>
                  <li><Link to="/validar-comprobantes">✅ Validar Comprobantes (RF05)</Link></li>
                </>
              )}
            </ul>
          </aside>
        )}
        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  );

  // Rutas protegidas
  const ProtectedRoute = ({ children, allowedRoles }) => {
    if (!currentUser) {
      return <Navigate to="/login" replace />;
    }
    if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
      return <Navigate to="/" replace />;
    }
    return <Layout>{children}</Layout>;
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={
            currentUser ? <Navigate to="/" replace /> : <Login onLoginSuccess={handleLoginSuccess} />
          } 
        />

        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <div className="welcome-screen">
                <h2>Bienvenido, {currentUser?.name}</h2>
                <p>Seleccione una opción del menú lateral</p>
                
                <div className="features-grid">
                  {currentUser?.role === 'staff' && (
                    <div className="feature-card">
                      <h3>RF03/RF04: Registrar Comprobante</h3>
                      <p>Registre sus comprobantes de gastos y suba documentos</p>
                      <Link to="/registrar-comprobante" className="btn-link">Ir al módulo →</Link>
                    </div>
                  )}
                  
                  {currentUser?.role === 'jefe_ticketera' && (
                    <>
                      <div className="feature-card">
                        <h3>RF02: Importar Excel</h3>
                        <p>Cargue los datos oficiales del staff del evento</p>
                        <Link to="/importar-excel" className="btn-link">Ir al módulo →</Link>
                      </div>
                      <div className="feature-card">
                        <h3>RF05: Validar Comprobantes</h3>
                        <p>Valide comprobantes contra datos oficiales</p>
                        <Link to="/validar-comprobantes" className="btn-link">Ir al módulo →</Link>
                      </div>
                    </>
                  )}
                  
                  {currentUser?.role === 'contadora' && (
                    <div className="feature-card">
                      <h3>RF05: Validar Comprobantes</h3>
                      <p>Valide comprobantes contra datos oficiales</p>
                      <Link to="/validar-comprobantes" className="btn-link">Ir al módulo →</Link>
                    </div>
                  )}
                </div>
              </div>
            </ProtectedRoute>
          } 
        />

        {/* Rutas de Staff */}
        <Route 
          path="/registrar-comprobante" 
          element={
            <ProtectedRoute allowedRoles={['staff']}>
              <RegistrarComprobante />
            </ProtectedRoute>
          } 
        />

        {/* Rutas de Jefe de Ticketera */}
        <Route 
          path="/importar-excel" 
          element={
            <ProtectedRoute allowedRoles={['jefe_ticketera']}>
              <ImportarExcel />
            </ProtectedRoute>
          } 
        />

        {/* Rutas compartidas */}
        <Route 
          path="/validar-comprobantes" 
          element={
            <ProtectedRoute allowedRoles={['jefe_ticketera', 'contadora']}>
              <ValidarComprobantes />
            </ProtectedRoute>
          } 
        />

        {/* Ruta por defecto */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
