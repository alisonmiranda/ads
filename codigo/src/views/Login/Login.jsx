/**
 * VISTA MVC - RF01: Login
 * Componente de inicio de sesión
 */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthController from '@/controllers/AuthController.js';
import './Login.css';

const Login = ({ onLoginSuccess }) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const authController = new AuthController();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await authController.login(identifier, password);

    setLoading(false);

    if (result.success) {
      onLoginSuccess(result.user, result.redirectTo);
      // Navegar a la ruta correspondiente
      navigate(result.redirectTo || '/');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Sistema de Gestión de Comprobantes</h1>
        <h2>Iniciar Sesión</h2>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Email o Cédula</label>
            <input
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="Ingrese su email o cédula"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingrese su contraseña"
              required
              disabled={loading}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>

        <div className="demo-credentials">
          <h3>Credenciales de prueba:</h3>
          <p><strong>Staff:</strong> staff@evento.com / staff123 (o cédula: 1122334455)</p>
          <p><strong>Jefe Ticketera:</strong> jefe@ticketera.com / jefe123 (o cédula: 1234567890)</p>
          <p><strong>Contadora:</strong> contadora@empresa.com / conta123 (o cédula: 0987654321)</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
