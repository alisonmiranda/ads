/**
 * MODELO MVC - Usuario
 * Representa la estructura de datos de un usuario en el sistema
 */
class UserModel {
  constructor(data = {}) {
    this.id = data.id || null;
    this.name = data.name || '';
    this.email = data.email || '';
    this.cedula = data.cedula || '';
    this.password = data.password || '';
    this.role = data.role || 'staff'; // staff, jefe_ticketera, contadora
    this.createdAt = data.createdAt || new Date();
  }

  validate() {
    const errors = [];

    if (!this.email || !this.email.includes('@')) {
      errors.push('Email inválido');
    }

    if (!this.cedula || this.cedula.length < 10) {
      errors.push('Cédula inválida');
    }

    if (!this.password || this.password.length < 6) {
      errors.push('Contraseña debe tener al menos 6 caracteres');
    }

    if (!['staff', 'jefe_ticketera', 'contadora'].includes(this.role)) {
      errors.push('Rol inválido');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      cedula: this.cedula,
      role: this.role,
      createdAt: this.createdAt
    };
  }
}

export default UserModel;
