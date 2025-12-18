/**
 * PATRÓN SINGLETON
 * Gestiona la sesión de usuario de forma única en toda la aplicación
 * Garantiza que solo exista una instancia del manejador de sesión
 */
class SessionManager {
  static instance = null;
  currentUser = null;

  constructor() {
    if (SessionManager.instance) {
      return SessionManager.instance;
    }
    SessionManager.instance = this;
  }

  static getInstance() {
    if (!SessionManager.instance) {
      SessionManager.instance = new SessionManager();
    }
    return SessionManager.instance;
  }

  login(user) {
    this.currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
    return true;
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
  }

  getCurrentUser() {
    if (!this.currentUser) {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        this.currentUser = JSON.parse(storedUser);
      }
    }
    return this.currentUser;
  }

  isAuthenticated() {
    return this.getCurrentUser() !== null;
  }

  hasRole(role) {
    const user = this.getCurrentUser();
    return user && user.role === role;
  }
}

export default SessionManager;
