/**
 * MODELO MVC - Comprobante
 * Representa un comprobante de gasto registrado por el staff
 */
class ComprobanteModel {
  constructor(data = {}) {
    this.id = data.id || null;
    this.numeroComprobante = data.numeroComprobante || '';
    this.fecha = data.fecha || new Date();
    this.proveedor = data.proveedor || '';
    this.monto = data.monto || 0;
    this.descripcion = data.descripcion || '';
    this.staffCedula = data.staffCedula || '';
    this.staffNombre = data.staffNombre || '';
    this.archivoUrl = data.archivoUrl || null;
    this.archivoNombre = data.archivoNombre || null;
    this.estado = data.estado || 'pendiente'; // pendiente, aprobado, rechazado
    this.validadoDatosOficiales = data.validadoDatosOficiales || false;
    this.validadoDocumento = data.validadoDocumento || false;
    this.observaciones = data.observaciones || '';
    this.fechaRegistro = data.fechaRegistro || new Date();
  }

  validate() {
    const errors = [];

    if (!this.numeroComprobante || this.numeroComprobante.trim().length === 0) {
      errors.push('Número de comprobante es obligatorio');
    }

    if (!this.fecha) {
      errors.push('Fecha es obligatoria');
    }

    if (!this.proveedor || this.proveedor.trim().length < 3) {
      errors.push('Proveedor inválido');
    }

    if (!this.monto || this.monto <= 0) {
      errors.push('Monto debe ser mayor a 0');
    }

    if (!this.descripcion || this.descripcion.trim().length < 5) {
      errors.push('Descripción debe tener al menos 5 caracteres');
    }

    if (!this.staffCedula) {
      errors.push('Cédula del staff es obligatoria');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  isFullyValidated() {
    return this.validadoDatosOficiales && this.validadoDocumento;
  }

  getEstadoLabel() {
    const estados = {
      pendiente: 'Pendiente',
      aprobado: 'Aprobado',
      rechazado: 'Rechazado'
    };
    return estados[this.estado] || 'Desconocido';
  }

  toJSON() {
    return {
      id: this.id,
      numeroComprobante: this.numeroComprobante,
      fecha: this.fecha,
      proveedor: this.proveedor,
      monto: this.monto,
      descripcion: this.descripcion,
      staffCedula: this.staffCedula,
      staffNombre: this.staffNombre,
      archivoUrl: this.archivoUrl,
      archivoNombre: this.archivoNombre,
      estado: this.estado,
      validadoDatosOficiales: this.validadoDatosOficiales,
      validadoDocumento: this.validadoDocumento,
      observaciones: this.observaciones,
      fechaRegistro: this.fechaRegistro
    };
  }
}

export default ComprobanteModel;
