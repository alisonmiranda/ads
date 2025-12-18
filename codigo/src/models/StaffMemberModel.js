/**
 * MODELO MVC - Miembro del Staff
 * Representa un registro del Excel oficial del staff
 */
class StaffMemberModel {
  constructor(data = {}) {
    this.id = data.id || null;
    this.cedula = data.cedula || '';
    this.nombre = data.nombre || '';
    this.correo = data.correo || '';
    this.montoAsignado = data.montoAsignado || 0;
    this.eventoId = data.eventoId || null;
    this.eventoNombre = data.eventoNombre || '';
    this.fechaCarga = data.fechaCarga || new Date();
  }

  validate() {
    const errors = [];

    if (!this.cedula || this.cedula.length < 10) {
      errors.push('Cédula inválida');
    }

    if (!this.nombre || this.nombre.trim().length < 3) {
      errors.push('Nombre inválido');
    }

    if (!this.correo || !this.correo.includes('@')) {
      errors.push('Correo inválido');
    }

    if (this.montoAsignado < 0) {
      errors.push('Monto asignado debe ser positivo');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  toJSON() {
    return {
      id: this.id,
      cedula: this.cedula,
      nombre: this.nombre,
      correo: this.correo,
      montoAsignado: this.montoAsignado,
      eventoId: this.eventoId,
      eventoNombre: this.eventoNombre,
      fechaCarga: this.fechaCarga
    };
  }
}

export default StaffMemberModel;
