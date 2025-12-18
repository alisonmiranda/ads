/**
 * VISTA MVC - RF02: Importar Excel
 * Componente para que el Jefe de Ticketera cargue el Excel del staff
 */
import React, { useState } from 'react';
import { staffController } from '@/controllers/GlobalControllers.js';
import './ImportarExcel.css';

const ImportarExcel = () => {
  const [file, setFile] = useState(null);
  const [eventoNombre, setEventoNombre] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setResult(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      alert('Por favor seleccione un archivo');
      return;
    }

    if (!eventoNombre.trim()) {
      alert('Por favor ingrese el nombre del evento');
      return;
    }

    setLoading(true);
    setResult(null);

    const importResult = await staffController.importarExcel(file, eventoNombre);
    
    setLoading(false);
    setResult(importResult);

    if (importResult.success) {
      setFile(null);
      setEventoNombre('');
      // Reset file input
      document.getElementById('fileInput').value = '';
    }
  };

  return (
    <div className="importar-excel-container">
      <h2>RF02: Cargar Archivo Excel del Staff</h2>
      <p className="subtitle">Importe los datos oficiales del personal del evento</p>

      <form onSubmit={handleSubmit} className="import-form">
        <div className="form-group">
          <label>Nombre del Evento *</label>
          <input
            type="text"
            value={eventoNombre}
            onChange={(e) => setEventoNombre(e.target.value)}
            placeholder="Ej: Concierto Navidad 2024"
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label>Archivo Excel *</label>
          <input
            id="fileInput"
            type="file"
            accept=".xlsx,.xls,.csv"
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

        <div className="info-box">
          <h4>📋 Formato requerido del Excel:</h4>
          <ul>
            <li><strong>Cédula:</strong> Número de identificación</li>
            <li><strong>Nombre:</strong> Nombre completo del trabajador</li>
            <li><strong>Correo:</strong> Email del trabajador</li>
            <li><strong>Monto:</strong> Monto asignado para gastos</li>
          </ul>
        </div>

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? '⏳ Procesando...' : '📤 Importar Datos'}
        </button>
      </form>

      {result && (
        <div className={`result-box ${result.success ? 'success' : 'error'}`}>
          <h3>{result.success ? '✅ Éxito' : '❌ Error'}</h3>
          <p>{result.message}</p>
          
          {result.success && result.data && (
            <div className="result-details">
              <p><strong>Registros procesados:</strong> {result.data.registrosProcesados}</p>
              {result.data.registrosConError > 0 && (
                <p className="warning">
                  <strong>Registros con error:</strong> {result.data.registrosConError}
                </p>
              )}
            </div>
          )}

          {result.errors && result.errors.length > 0 && (
            <div className="errors-list">
              <h4>Errores encontrados:</h4>
              <ul>
                {result.errors.map((err, idx) => (
                  <li key={idx}>
                    {err.fila ? `Fila ${err.fila}: ` : ''}{err.errores || err}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImportarExcel;
