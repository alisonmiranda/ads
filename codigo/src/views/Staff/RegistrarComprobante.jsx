/**
 * VISTA MVC - RF03 y RF04: Registrar Comprobante y Subir Documento
 * Componente para que el Staff registre comprobantes
 */
import React, { useState } from 'react';
import SessionManager from '@/patterns/Singleton/SessionManager.js';
import { comprobanteController } from '@/controllers/GlobalControllers.js';
import './RegistrarComprobante.css';

const RegistrarComprobante = () => {
  const sessionManager = SessionManager.getInstance();
  const currentUser = sessionManager.getCurrentUser();

  const [formData, setFormData] = useState({
    numeroComprobante: '',
    fecha: new Date().toISOString().split('T')[0],
    proveedor: '',
    monto: '',
    descripcion: '',
    staffCedula: currentUser?.cedula || '',
    staffNombre: currentUser?.name || ''
  });

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [comprobanteId, setComprobanteId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    // RF03: Registrar comprobante
    const registroResult = await comprobanteController.registrarComprobante(formData);

    if (!registroResult.success) {
      setLoading(false);
      setResult(registroResult);
      return;
    }

    setComprobanteId(registroResult.data.id);

    // RF04: Subir documento si hay archivo seleccionado
    if (file) {
      const uploadResult = await comprobanteController.subirDocumento(
        registroResult.data.id,
        file
      );

      if (uploadResult.success) {
        setResult({
          success: true,
          message: 'Comprobante registrado y documento subido correctamente',
          data: registroResult.data
        });
      } else {
        setResult({
          success: true,
          message: 'Comprobante registrado pero hubo un error al subir el documento',
          warning: uploadResult.message
        });
      }
    } else {
      setResult(registroResult);
    }

    setLoading(false);

    // Limpiar formulario si fue exitoso
    if (registroResult.success) {
      setFormData({
        numeroComprobante: '',
        fecha: new Date().toISOString().split('T')[0],
        proveedor: '',
        monto: '',
        descripcion: '',
        staffCedula: currentUser?.cedula || '',
        staffNombre: currentUser?.name || ''
      });
      setFile(null);
      document.getElementById('fileInput').value = '';
    }
  };

  return (
    <div className="registrar-comprobante-container">
      <h2>RF03 y RF04: Registrar Comprobante</h2>
      <p className="subtitle">Ingrese los datos de su comprobante de gasto</p>

      <form onSubmit={handleSubmit} className="comprobante-form">
        <div className="form-row">
          <div className="form-group">
            <label>Número de Comprobante *</label>
            <input
              type="text"
              name="numeroComprobante"
              value={formData.numeroComprobante}
              onChange={handleInputChange}
              placeholder="Ej: 001-001-000123"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Fecha *</label>
            <input
              type="date"
              name="fecha"
              value={formData.fecha}
              onChange={handleInputChange}
              required
              disabled={loading}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Proveedor *</label>
          <input
            type="text"
            name="proveedor"
            value={formData.proveedor}
            onChange={handleInputChange}
            placeholder="Nombre del proveedor o empresa"
            required
            disabled={loading}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Monto (USD) *</label>
            <input
              type="number"
              name="monto"
              value={formData.monto}
              onChange={handleInputChange}
              placeholder="0.00"
              step="0.01"
              min="0"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Tu Cédula</label>
            <input
              type="text"
              name="staffCedula"
              value={formData.staffCedula}
              readOnly
              disabled
            />
          </div>
        </div>

        <div className="form-group">
          <label>Descripción *</label>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleInputChange}
            placeholder="Describa brevemente el gasto realizado"
            rows="4"
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label>Documento del Comprobante (PDF o Imagen)</label>
          <input
            id="fileInput"
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileChange}
            disabled={loading}
          />
          {file && (
            <div className="file-info">
              <span>📄 {file.name}</span>
              <span>{(file.size / 1024).toFixed(2)} KB</span>
            </div>
          )}
        </div>

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? '⏳ Procesando...' : '✅ Registrar Comprobante'}
        </button>
      </form>

      {result && (
        <div className={`result-box ${result.success ? 'success' : 'error'}`}>
          <h3>{result.success ? '✅ Éxito' : '❌ Error'}</h3>
          <p>{result.message}</p>
          
          {result.warning && (
            <p className="warning">⚠️ {result.warning}</p>
          )}

          {result.errors && (
            <ul className="errors-list">
              {result.errors.map((err, idx) => (
                <li key={idx}>{err}</li>
              ))}
            </ul>
          )}

          {result.success && comprobanteId && (
            <div className="success-details">
              <p>🆔 <strong>ID:</strong> {comprobanteId}</p>
              <p>📊 <strong>Estado:</strong> Pendiente de validación</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RegistrarComprobante;
