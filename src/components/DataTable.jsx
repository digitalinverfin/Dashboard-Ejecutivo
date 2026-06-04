import React, { useState, useMemo } from 'react'
import { ChevronUp, ChevronDown } from 'lucide-react'

export default function DataTable({ data }) {
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' })
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 20

  const sortedData = useMemo(() => {
    let sorted = [...data]
    if (sortConfig.key) {
      sorted.sort((a, b) => {
        const aVal = a[sortConfig.key]
        const bVal = b[sortConfig.key]
        
        if (aVal === null || aVal === undefined) return 1
        if (bVal === null || bVal === undefined) return -1
        
        if (typeof aVal === 'number') {
          return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal
        }
        
        return sortConfig.direction === 'asc'
          ? String(aVal).localeCompare(String(bVal))
          : String(bVal).localeCompare(String(aVal))
      })
    }
    return sorted
  }, [data, sortConfig])

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    return sortedData.slice(start, start + itemsPerPage)
  }, [sortedData, currentPage])

  const totalPages = Math.ceil(sortedData.length / itemsPerPage)

  const toggleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }))
    setCurrentPage(1)
  }

  const SortIcon = ({ field }) => {
    if (sortConfig.key !== field) return <div style={{ width: 16, height: 16 }} />
    return sortConfig.direction === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
  }

  const columns = Object.keys(data[0] || {})

  return (
    <div className="data-table-container">
      <div className="table-info">
        <p>{sortedData.length} registros en total</p>
        <p className="pagination-info">
          Página {currentPage} de {totalPages}
        </p>
      </div>

      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              {columns.map(col => (
                <th key={col}>
                  <button
                    className="sort-button"
                    onClick={() => toggleSort(col)}
                  >
                    {col}
                    <SortIcon field={col} />
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, i) => (
              <tr key={i} className={row.status === 'recovered' || row.status === 'Recuperado' ? 'recovered' : ''}>
                {columns.map(col => (
                  <td key={col}>
                    {col === 'value' || col === 'price'
                      ? `Gs. ${(row[col] || 0).toLocaleString('es-PY')}`
                      : col === 'date' || col.includes('date')
                      ? new Date(row[col]).toLocaleDateString('es-PY')
                      : String(row[col] || '-')}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            ← Anterior
          </button>
          <span>Página {currentPage} de {totalPages}</span>
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Siguiente →
          </button>
        </div>
      )}
    </div>
  )
}
