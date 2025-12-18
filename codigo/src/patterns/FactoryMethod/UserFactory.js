/**
 * PATRÓN FACTORY METHOD
 * Crea instancias de usuarios según su rol
 * Encapsula la lógica de creación de diferentes tipos de usuarios
 */

class User {
  constructor(id, name, email, cedula, role) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.cedula = cedula;
    this.role = role;
  }

  getPermissions() {
    return [];
  }

  getDashboardRoute() {
    return '/';
  }
}

class StaffUser extends User {
  constructor(id, name, email, cedula) {
    super(id, name, email, cedula, 'staff');
  }

  getPermissions() {
    return [
      'registrar_comprobante',
      'subir_documento',
      'consultar_estado_comprobante',
      'consultar_estado_pago'
    ];
  }

  getDashboardRoute() {
    return '/staff/dashboard';
  }
}

class JefeTicketeraUser extends User {
  constructor(id, name, email, cedula) {
    super(id, name, email, cedula, 'jefe_ticketera');
  }

  getPermissions() {
    return [
      'importar_excel',
      'validar_comprobantes',
      'registrar_gastos',
      'consultar_historial',
      'validar_datos_oficiales'
    ];
  }

  getDashboardRoute() {
    return '/jefe-ticketera/dashboard';
  }
}

class ContadoraUser extends User {
  constructor(id, name, email, cedula) {
    super(id, name, email, cedula, 'contadora');
  }

  getPermissions() {
    return [
      'procesar_pagos',
      'registrar_pago_excepcional',
      'registrar_gastos',
      'consultar_historial',
      'validar_comprobantes',
      'validar_datos_oficiales'
    ];
  }

  getDashboardRoute() {
    return '/contadora/dashboard';
  }
}

/**
 * Factory Method - Crea el tipo de usuario correcto según el rol
 */
class UserFactory {
  static createUser(userData) {
    const { id, name, email, cedula, role } = userData;

    switch (role) {
      case 'staff':
        return new StaffUser(id, name, email, cedula);
      case 'jefe_ticketera':
        return new JefeTicketeraUser(id, name, email, cedula);
      case 'contadora':
        return new ContadoraUser(id, name, email, cedula);
      default:
        throw new Error(`Rol de usuario no válido: ${role}`);
    }
  }
}

export { UserFactory, User, StaffUser, JefeTicketeraUser, ContadoraUser };
