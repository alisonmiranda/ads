/**
 * CONTROLADOR MVC - RF01: Autenticación
 * Gestiona la lógica de inicio de sesión
 */
import SessionManager from '@/patterns/Singleton/SessionManager.js';
import { UserFactory } from '@/patterns/FactoryMethod/UserFactory.js';
import { NotificationSystem } from '@/patterns/Observer/NotificationSystem.js';

class AuthController {
  constructor() {
    this.sessionManager = SessionManager.getInstance();
    this.notificationSystem = NotificationSystem.getInstance();
    // Simulación de base de datos de usuarios
    this.users = this.initializeMockUsers();
  }

  initializeMockUsers() {
    // RF01: Base de datos simulada de usuarios con credenciales de prueba
    // Usuarios pueden ingresar con correo o cédula
    return [
      {
        id: 1,
        name: 'Juan Pérez - Jefe de Ticketera',
        email: 'jefe@ticketera.com',
        cedula: '1234567890',
        password: 'jefe123',
        role: 'jefe_ticketera'
      },
      {
        id: 2,
        name: 'María González - Contadora',
        email: 'contadora@empresa.com',
        cedula: '0987654321',
        password: 'conta123',
        role: 'contadora'
      },
      {
        id: 3,
        name: 'Carlos Rodríguez - Staff',
        email: 'staff@evento.com',
        cedula: '1122334455',
        password: 'staff123',
        role: 'staff'
      }
    ];
  }

  /**
   * RF01: Iniciar sesión según rol del sistema
   * Validación: "Credenciales incorrectas" si no coinciden
   * Crea sesión segura y redirige según rol si son válidas
   * @param {string} identifier - Email o cédula del usuario
   * @param {string} password - Contraseña
   * @returns {Object} - Resultado del login
   */
  async login(identifier, password) {
    try {
      // Validar campos vacíos
      if (!identifier || !password) {
        this.notificationSystem.error('Complete todos los campos');
        return {
          success: false,
          message: 'Complete todos los campos',
          user: null,
          redirectTo: null
        };
      }

      // Buscar usuario por email o cédula (trim para evitar espacios)
      const userData = this.users.find(
        u => (u.email === identifier.trim() || u.cedula === identifier.trim()) 
             && u.password === password
      );

      // RF01 Validación: "Credenciales incorrectas"
      if (!userData) {
        this.notificationSystem.error('Credenciales incorrectas');
        return {
          success: false,
          message: 'Credenciales incorrectas',
          user: null,
          redirectTo: null
        };
      }

      // Crear usuario usando Factory Method Pattern
      const user = UserFactory.createUser(userData);

      // RF01: Crear sesión segura usando Singleton Pattern
      this.sessionManager.login(user);

      // Notificar éxito usando Observer Pattern
      this.notificationSystem.success(`Bienvenido ${user.name}`);

      // RF01: Redirigir automáticamente según el rol del usuario
      let redirectTo = '/';
      switch(userData.role) {
        case 'jefe_ticketera':
          redirectTo = '/importar-excel';
          break;
        case 'contadora':
          redirectTo = '/validar-comprobantes';
          break;
        case 'staff':
          redirectTo = '/registrar-comprobante';
          break;
      }

      return {
        success: true,
        message: 'Inicio de sesión exitoso',
        user: user,
        redirectTo: redirectTo
      };
    } catch (error) {
      this.notificationSystem.error('Error al iniciar sesión');
      return {
        success: false,
        message: 'Error al iniciar sesión',
        user: null,
        redirectTo: null
      };
    }
  }

  /**
   * Cerrar sesión del usuario actual
   */
  logout() {
    this.sessionManager.logout();
    this.notificationSystem.info('Sesión cerrada correctamente');
    return {
      success: true,
      message: 'Sesión cerrada',
      redirectTo: '/login'
    };
  }

  /**
   * Obtener usuario actual
   */
  getCurrentUser() {
    return this.sessionManager.getCurrentUser();
  }

  /**
   * Verificar si usuario está autenticado
   */
  isAuthenticated() {
    return this.sessionManager.isAuthenticated();
  }

  /**
   * Verificar si usuario tiene un rol específico
   */
  hasRole(role) {
    return this.sessionManager.hasRole(role);
  }
}

export default AuthController;
