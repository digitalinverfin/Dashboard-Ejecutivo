import * as XLSX from 'xlsx'
import Papa from 'papaparse'

/**
 * Lee archivo Excel y retorna headers y data
 */
export function readExcelFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result)
        const workbook = XLSX.read(data, { type: 'array' })
        const worksheet = workbook.Sheets[workbook.SheetNames[0]]
        
        const headers = []
        const rows = XLSX.utils.sheet_to_json(worksheet, { defval: '' })
        
        if (rows.length > 0) {
          Object.keys(rows[0]).forEach(key => {
            headers.push(key)
          })
        }

        resolve({
          headers,
          data: rows
        })
      } catch (err) {
        reject(new Error('Error al leer Excel: ' + err.message))
      }
    }
    reader.onerror = () => reject(new Error('Error al leer archivo'))
    reader.readAsArrayBuffer(file)
  })
}

/**
 * Lee archivo CSV y retorna headers y data
 */
export function readCSVFile(file) {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      dynamicTyping: false,
      skipEmptyLines: true,
      complete: (results) => {
        const headers = results.meta.fields || []
        resolve({
          headers,
          data: results.data
        })
      },
      error: (error) => {
        reject(new Error('Error al leer CSV: ' + error.message))
      }
    })
  })
}
