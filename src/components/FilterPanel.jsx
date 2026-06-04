import React from 'react'
import { X } from 'lucide-react'

export default function FilterPanel({ filters, data, onFiltersChange }) {
  // Obtener rango de fechas disponibles
  const dates = data
    .map(row => row.date ? new Date(row.date) : null)
    .filter(d => d !== null)
    .sort((a, b) => a - b)

  const minDate = dates.length > 0 ? dates[0].toISOString().split('T')[0] : ''
  const maxDate = dates.length > 0 ? dates[dates.length - 1].toISOString().split('T')[0] : ''

  const handleDateFromChange = (e) => {
    onFiltersChange({
      ...filters,
      dateFrom: e.target.value ? new Date(e.target.value) : null
    })
  }

  const handleDateToChange = (e) => {
    onFiltersChange({
      ...filters,
      dateTo: e.target.value ? new Date(e.target.value) : null
    })
  }

  const handleClearFilters = () => {
    onFiltersChange({ dateFrom: null, dateTo: null })
  }

  return (
    <div className="filter-panel">
      <div className="filter-header">
        <h3>Filtros</h3>
        <button onClick={handleClearFilters} className="btn-clear-filters">
          <X size={18} />
        </button>
      </div>

      <div className="filter-group">
        <label>Desde</label>
        <input
          type="date"
          min={minDate}
          max={maxDate}
          value={filters.dateFrom ? filters.dateFrom.toISOString().split('T')[0] : ''}
          onChange={handleDateFromChange}
          className="input-date"
        />
      </div>

      <div className="filter-group">
        <label>Hasta</label>
        <input
          type="date"
          min={minDate}
          max={maxDate}
          value={filters.dateTo ? filters.dateTo.toISOString().split('T')[0] : ''}
          onChange={handleDateToChange}
          className="input-date"
        />
      </div>

      {(filters.dateFrom || filters.dateTo) && (
        <div className="filter-info">
          {filters.dateFrom && (
            <p>Desde: {filters.dateFrom.toLocaleDateString('es-PY')}</p>
          )}
          {filters.dateTo && (
            <p>Hasta: {filters.dateTo.toLocaleDateString('es-PY')}</p>
          )}
        </div>
      )}
    </div>
  )
}
