import React, { useState, useMemo } from 'react'
import { Filter, Download } from 'lucide-react'
import KPICards from './KPICards'
import Charts from './Charts'
import DataTable from './DataTable'
import FilterPanel from './FilterPanel'
import { calculateKPIs, filterDataByDate } from '../utils/calculations'
import { exportToExcel, exportToPDF } from '../utils/export'

export default function Dashboard({ data, filters, onFiltersChange }) {
  const [showFilters, setShowFilters] = useState(false)
  const [selectedTab, setSelectedTab] = useState('overview')

  const filteredData = useMemo(() => {
    return filterDataByDate(data, filters.dateFrom, filters.dateTo)
  }, [data, filters])

  const kpis = useMemo(() => {
    return calculateKPIs(filteredData)
  }, [filteredData])

  const handleExportExcel = () => {
    exportToExcel(filteredData, 'inverfin_datos')
  }

  const handleExportPDF = () => {
    exportToPDF(kpis, filteredData, 'inverfin_reporte')
  }

  return (
    <div className="dashboard">
      {/* Toolbar */}
      <div className="dashboard-toolbar">
        <div className="toolbar-left">
          <button
            className={`tab ${selectedTab === 'overview' ? 'active' : ''}`}
            onClick={() => setSelectedTab('overview')}
          >
            Resumen
          </button>
          <button
            className={`tab ${selectedTab === 'data' ? 'active' : ''}`}
            onClick={() => setSelectedTab('data')}
          >
            Datos
          </button>
        </div>

        <div className="toolbar-right">
          <button
            className={`btn-filter ${showFilters ? 'active' : ''}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={18} />
            Filtros
          </button>

          <button className="btn-export" onClick={handleExportExcel} title="Exportar a Excel">
            <Download size={18} />
            Excel
          </button>

          <button className="btn-export" onClick={handleExportPDF} title="Exportar a PDF">
            <Download size={18} />
            PDF
          </button>
        </div>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <FilterPanel
          filters={filters}
          data={data}
          onFiltersChange={onFiltersChange}
        />
      )}

      {/* Content */}
      <div className="dashboard-content">
        {selectedTab === 'overview' ? (
          <>
            <KPICards kpis={kpis} />
            <Charts data={filteredData} kpis={kpis} />
          </>
        ) : (
          <DataTable data={filteredData} />
        )}
      </div>
    </div>
  )
}
