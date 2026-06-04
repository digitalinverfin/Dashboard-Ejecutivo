import React, { useState, useRef } from 'react'
import { Upload, AlertCircle } from 'lucide-react'
import { readExcelFile, readCSVFile } from '../utils/fileReader'
import ColumnMapping from './ColumnMapping'

export default function DataUploader({ onDataLoaded }) {
  const [isDragging, setIsDragging] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [rawData, setRawData] = useState(null)
  const [columns, setColumns] = useState([])
  const [fileName, setFileName] = useState('')
  const fileInputRef = useRef(null)

  const processFile = async (file) => {
    setError('')
    setLoading(true)

    try {
      let data, headers

      if (file.name.endsWith('.xlsx')) {
        const result = readExcelFile(file)
        data = result.data
        headers = result.headers
      } else if (file.name.endsWith('.csv')) {
        const result = await readCSVFile(file)
        data = result.data
        headers = result.headers
      } else {
        throw new Error('Solo se aceptan archivos .xlsx o .csv')
      }

      if (!data || data.length === 0) {
        throw new Error('El archivo está vacío')
      }

      setRawData(data)
      setColumns(headers)
      setFileName(file.name)
    } catch (err) {
      setError(err.message || 'Error al procesar el archivo')
    } finally {
      setLoading(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer.files[0]
    if (file) processFile(file)
  }

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0]
    if (file) processFile(file)
  }

  if (rawData && columns.length > 0) {
    return (
      <ColumnMapping
        data={rawData}
        columns={columns}
        fileName={fileName}
        onDataLoaded={onDataLoaded}
        onBack={() => {
          setRawData(null)
          setColumns([])
          setFileName('')
        }}
      />
    )
  }

  return (
    <div className="uploader-container">
      <div
        className={`drop-zone ${isDragging ? 'active' : ''}`}
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        <Upload size={48} className="upload-icon" />
        <h2>Arrastra un archivo Excel o CSV aquí</h2>
        <p>o</p>
        <button
          className="btn-browse"
          onClick={() => fileInputRef.current?.click()}
        >
          Selecciona un archivo
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".xlsx,.csv"
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />
        <p className="file-hint">Soporta archivos .xlsx y .csv</p>
      </div>

      {error && (
        <div className="error-message">
          <AlertCircle size={20} />
          <p>{error}</p>
        </div>
      )}

      {loading && (
        <div className="loading">
          <div className="spinner"></div>
          <p>Procesando archivo...</p>
        </div>
      )}
    </div>
  )
}
