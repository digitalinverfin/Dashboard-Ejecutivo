import React, { useState, useMemo } from 'react'
import { ChevronRight, CheckCircle2 } from 'lucide-react'
import { detectColumnMapping } from '../utils/columnDetector'
import { processData } from '../utils/dataProcessor'

export default function ColumnMapping({ data, columns, fileName, onDataLoaded, onBack }) {
  const [mapping, setMapping] = useState(() => detectColumnMapping(columns))
  const [step, setStep] = useState('mapping') // mapping, preview, success
  const [processedData, setProcessedData] = useState(null)

  const preview = useMemo(() => {
    if (step !== 'preview') return null
    return processData(data, mapping)
  }, [step, data, mapping])

  const handleMappingChange = (field, column) => {
    setMapping(prev => ({
      ...prev,
      [field]: column
    }))
  }

  const handleContinue = () => {
    const processed = processData(data, mapping)
    setProcessedData(processed)
    setStep('preview')
  }

  const handleConfirm = () => {
    if (processedData) {
      onDataLoaded(processedData, fileName)
    }
  }

  if (step === 'preview' && preview) {
    return (
      <div className="mapping-container">
        <h2>Vista previa de datos</h2>
        <div className="preview-stats">
          <div className="stat">
            <span className="stat-label">Registros válidos</span>
            <span className="stat-value">{preview.valid.length}</span>
          </div>
          {preview.invalid.length > 0 && (
            <div className="stat warning">
              <span className="stat-label">Registros con errores</span>
              <span className="stat-value">{preview.invalid.length}</span>
            </div>
          )}
        </div>

        {preview.invalid.length > 0 && (
          <div className="errors-section">
            <h3>Errores encontrados:</h3>
            <ul className="error-list">
              {preview.invalid.slice(0, 5).map((item, i) => (
                <li key={i}>
                  <strong>Fila {item.rowIndex}:</strong> {item.errors.join(', ')}
                </li>
              ))}
              {preview.invalid.length > 5 && (
                <li>... y {preview.invalid.length - 5} errores más</li>
              )}
            </ul>
          </div>
        )}

        <div className="preview-table">
          <table>
            <thead>
              <tr>
                {Object.keys(mapping)
                  .filter(k => mapping[k])
                  .map(field => (
                    <th key={field}>{field}</th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {preview.valid.slice(0, 5).map((row, i) => (
                <tr key={i}>
                  {Object.keys(mapping)
                    .filter(k => mapping[k])
                    .map(field => (
                      <td key={field}>{row[field] || '-'}</td>
                    ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="button-group">
          <button onClick={() => setStep('mapping')} className="btn-secondary">
            ← Atrás
          </button>
          <button onClick={handleConfirm} className="btn-primary">
            <CheckCircle2 size={18} />
            Cargar datos
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="mapping-container">
      <h2>Mapeo de columnas</h2>
      <p className="subtitle">Selecciona las columnas que corresponden a cada campo:</p>

      <div className="mapping-grid">
        <div className="mapping-row">
          <label>Nombre / Cliente</label>
          <select
            value={mapping.name || ''}
            onChange={(e) => handleMappingChange('name', e.target.value || null)}
            className="select"
          >
            <option value="">-- No asignar --</option>
            {columns.map(col => (
              <option key={col} value={col}>
                {col}
              </option>
            ))}
          </select>
        </div>

        <div className="mapping-row">
          <label>Email</label>
          <select
            value={mapping.email || ''}
            onChange={(e) => handleMappingChange('email', e.target.value || null)}
            className="select"
          >
            <option value="">-- No asignar --</option>
            {columns.map(col => (
              <option key={col} value={col}>
                {col}
              </option>
            ))}
          </select>
        </div>

        <div className="mapping-row">
          <label>Teléfono</label>
          <select
            value={mapping.phone || ''}
            onChange={(e) => handleMappingChange('phone', e.target.value || null)}
            className="select"
          >
            <option value="">-- No asignar --</option>
            {columns.map(col => (
              <option key={col} value={col}>
                {col}
              </option>
            ))}
          </select>
        </div>

        <div className="mapping-row">
          <label>Producto</label>
          <select
            value={mapping.product || ''}
            onChange={(e) => handleMappingChange('product', e.target.value || null)}
            className="select"
          >
            <option value="">-- No asignar --</option>
            {columns.map(col => (
              <option key={col} value={col}>
                {col}
              </option>
            ))}
          </select>
        </div>

        <div className="mapping-row">
          <label>Cantidad</label>
          <select
            value={mapping.quantity || ''}
            onChange={(e) => handleMappingChange('quantity', e.target.value || null)}
            className="select"
          >
            <option value="">-- No asignar --</option>
            {columns.map(col => (
              <option key={col} value={col}>
                {col}
              </option>
            ))}
          </select>
        </div>

        <div className="mapping-row">
          <label>Valor / Precio</label>
          <select
            value={mapping.value || ''}
            onChange={(e) => handleMappingChange('value', e.target.value || null)}
            className="select"
          >
            <option value="">-- No asignar --</option>
            {columns.map(col => (
              <option key={col} value={col}>
                {col}
              </option>
            ))}
          </select>
        </div>

        <div className="mapping-row">
          <label>Fecha</label>
          <select
            value={mapping.date || ''}
            onChange={(e) => handleMappingChange('date', e.target.value || null)}
            className="select"
          >
            <option value="">-- No asignar --</option>
            {columns.map(col => (
              <option key={col} value={col}>
                {col}
              </option>
            ))}
          </select>
        </div>

        <div className="mapping-row">
          <label>Estado</label>
          <select
            value={mapping.status || ''}
            onChange={(e) => handleMappingChange('status', e.target.value || null)}
            className="select"
          >
            <option value="">-- No asignar --</option>
            {columns.map(col => (
              <option key={col} value={col}>
                {col}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="button-group">
        <button onClick={onBack} className="btn-secondary">
          ← Atrás
        </button>
        <button onClick={handleContinue} className="btn-primary">
          Siguiente
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  )
}
