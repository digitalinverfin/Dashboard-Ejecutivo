import React, { useState, useCallback } from 'react'
import { Upload, Download, BarChart3, Filter } from 'lucide-react'
import DataUploader from './components/DataUploader'
import Dashboard from './components/Dashboard'
import './styles.css'

export default function App() {
  const [data, setData] = useState(null)
  const [fileName, setFileName] = useState('')
  const [filters, setFilters] = useState({
    dateFrom: null,
    dateTo: null
  })

  const handleDataLoaded = useCallback((newData, name) => {
    setData(newData)
    setFileName(name)
    setFilters({ dateFrom: null, dateTo: null })
  }, [])

  const handleClearData = useCallback(() => {
    setData(null)
    setFileName('')
    setFilters({ dateFrom: null, dateTo: null })
  }, [])

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <BarChart3 size={28} />
            <h1>Inverfin Dashboard</h1>
          </div>
          <p className="subtitle">Análisis de datos offline basado en Excel</p>
        </div>
      </header>

      <main className="main-container">
        {!data ? (
          <DataUploader onDataLoaded={handleDataLoaded} />
        ) : (
          <div className="dashboard-container">
            <div className="file-header">
              <div className="file-info">
                <Upload size={20} />
                <span className="file-name">{fileName}</span>
              </div>
              <button onClick={handleClearData} className="btn-clear">
                Cargar nuevo archivo
              </button>
            </div>
            <Dashboard 
              data={data} 
              filters={filters} 
              onFiltersChange={setFilters}
            />
          </div>
        )}
      </main>
    </div>
  )
}
