/**
 * VISTA MVC - RF05: Validar Comprobantes
 * Componente para que Jefe de Ticketera o Contadora validen comprobantes
 */
import React, { useState, useEffect } from 'react';
import { comprobanteController } from '@/controllers/GlobalControllers.js';
import './ValidarComprobantes.css';

const ValidarComprobantes = () => {
  const [comprobantes, setComprobantes] = useState([]);
  const [selectedComprobante, setSelectedComprobante] = useState(null);
  const [validationResult, setValidationResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadComprobantes();
  }, []);

  const loadComprobantes = () => {
    const allComprobantes = comprobanteController.getAllComprobantes();
    setComprobantes(allComprobantes);
  };

  const handleSelectComprobante = (comprobante) => {
    setSelectedComprobante(comprobante);
    setValidationResult(null);
  };

  const handleValidar = async () => {
    if (!selectedComprobante) {
      alert('Seleccione un comprobante para validar');
      return;
    }

    setLoading(true);
    setValidationResult(null);

    // RF05: Validar contra datos oficiales
    const result = await comprobanteController.validarContraDatosOficiales(
      selectedComprobante.id
    );

    setValidationResult(result);
    setLoading(false);

    // Recargar lista de comprobantes
    loadComprobantes();
  };

  const getEstadoBadge = (estado) => {
    const badges = {
      pendiente: { class: 'badge-pending', text: '⏳ Pendiente' },
      aprobado: { class: 'badge-approved', text: '✅ Aprobado' },
      rechazado: { class: 'badge-rejected', text: '❌ Rechazado' }
    };
    return badges[estado] || badges.pendiente;
  };

  return (
    <div className="validar-comprobantes-container">
      <h2>RF05: Validar Comprobantes</h2>
      <p className="subtitle">Validación contra datos oficiales del staff</p>

      <div className="validation-layout">
        {/* Lista de comprobantes */}
        <div className="comprobantes-list">
          <h3>Comprobantes Registrados</h3>
          {comprobantes.length === 0 ? (
            <p className="empty-message">No hay comprobantes registrados</p>
          ) : (
            <div className="list-items">
              {comprobantes.map((comp) => {
                const badge = getEstadoBadge(comp.estado);
                return (
                  <div
                    key={comp.id}
                    className={`comprobante-item ${selectedComprobante?.id === comp.id ? 'selected' : ''}`}
                    onClick={() => handleSelectComprobante(comp)}
                  >
                    <div className="item-header">
                      <strong>{comp.numeroComprobante}</strong>
                      <span className={`badge ${badge.class}`}>{badge.text}</span>
                    </div>
                    <div className="item-info">
                      <p>👤 {comp.staffNombre}</p>
                      <p>💰 ${comp.monto}</p>
                      <p>🏢 {comp.proveedor}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Detalles y validación */}
        <div className="validation-panel">
          {!selectedComprobante ? (
            <div className="no-selection">
              <p>👈 Seleccione un comprobante para validar</p>
            </div>
          ) : (
            <>
              <h3>Detalles del Comprobante</h3>
              <div className="details-card">
                <div className="detail-row">
                  <strong>Número:</strong>
                  <span>{selectedComprobante.numeroComprobante}</span>
                </div>
                <div className="detail-row">
                  <strong>Fecha:</strong>
                  <span>{new Date(selectedComprobante.fecha).toLocaleDateString()}</span>
                </div>
                <div className="detail-row">
                  <strong>Staff:</strong>
                  <span>{selectedComprobante.staffNombre}</span>
                </div>
                <div className="detail-row">
                  <strong>Cédula:</strong>
                  <span>{selectedComprobante.staffCedula}</span>
                </div>
                <div className="detail-row">
                  <strong>Proveedor:</strong>
                  <span>{selectedComprobante.proveedor}</span>
                </div>
                <div className="detail-row">
                  <strong>Monto:</strong>
                  <span>${selectedComprobante.monto}</span>
                </div>
                <div className="detail-row">
                  <strong>Descripción:</strong>
                  <span>{selectedComprobante.descripcion}</span>
                </div>
                <div className="detail-row">
                  <strong>Estado actual:</strong>
                  <span className={`badge ${getEstadoBadge(selectedComprobante.estado).class}`}>
                    {getEstadoBadge(selectedComprobante.estado).text}
                  </span>
                </div>
                {selectedComprobante.observaciones && (
                  <div className="detail-row">
                    <strong>Observaciones:</strong>
                    <span>{selectedComprobante.observaciones}</span>
                  </div>
                )}
              </div>

              <button
                className="btn-validate"
                onClick={handleValidar}
                disabled={loading}
              >
                {loading ? '⏳ Validando...' : '🔍 Validar contra Datos Oficiales'}
              </button>

              {validationResult && (
                <div className={`validation-result ${validationResult.success ? 'success' : 'error'}`}>
                  <h4>{validationResult.success ? '✅ Validación Exitosa' : '❌ Validación Rechazada'}</h4>
                  <p>{validationResult.message}</p>
                  
                  {validationResult.data?.errores && (
                    <div className="errors-list">
                      <strong>Motivos del rechazo:</strong>
                      <ul>
                        {validationResult.data.errores.map((err, idx) => (
                          <li key={idx}>{err}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {validationResult.success && validationResult.data?.staffOficial && (
                    <div className="staff-info">
                      <strong>Datos oficiales coincidentes:</strong>
                      <p>✅ Nombre: {validationResult.data.staffOficial.nombre}</p>
                      <p>✅ Cédula: {validationResult.data.staffOficial.cedula}</p>
                      <p>✅ Correo: {validationResult.data.staffOficial.correo}</p>
                      <p>✅ Monto asignado: ${validationResult.data.staffOficial.montoAsignado}</p>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ValidarComprobantes;
