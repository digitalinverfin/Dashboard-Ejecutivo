import * as XLSX from 'xlsx'
import { jsPDF } from 'jspdf'
import 'jspdf-autotable'

/**
 * Exporta datos a Excel
 */
export function exportToExcel(data, fileName = 'datos') {
  if (!data || data.length === 0) {
    alert('No hay datos para exportar')
    return
  }

  const worksheet = XLSX.utils.json_to_sheet(data.map(row => ({
    Nombre: row.name || '',
    Email: row.email || '',
    Teléfono: row.phone || '',
    Producto: row.product || '',
    Cantidad: row.quantity || 0,
    Valor: row.value || 0,
    Fecha: row.date instanceof Date 
      ? row.date.toLocaleDateString('es-PY')
      : row.date || '',
    Estado: row.status || ''
  })))

  // Ajustar ancho de columnas
  worksheet['!cols'] = [
    { wch: 20 },
    { wch: 25 },
    { wch: 15 },
    { wch: 20 },
    { wch: 10 },
    { wch: 15 },
    { wch: 12 },
    { wch: 12 }
  ]

  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Datos')

  XLSX.writeFile(workbook, `${fileName}_${new Date().toISOString().split('T')[0]}.xlsx`)
}

/**
 * Exporta reporte a PDF
 */
export function exportToPDF(kpis, data, fileName = 'reporte') {
  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  let yPosition = 20

  // Encabezado
  doc.setFontSize(20)
  doc.text('Reporte Inverfin Dashboard', 20, yPosition)
  yPosition += 10

  // Fecha
  doc.setFontSize(10)
  doc.setTextColor(100)
  doc.text(`Generado: ${new Date().toLocaleDateString('es-PY')} a las ${new Date().toLocaleTimeString('es-PY')}`, 20, yPosition)
  yPosition += 15

  // KPIs
  doc.setFontSize(14)
  doc.setTextColor(0)
  doc.text('Resumen Ejecutivo', 20, yPosition)
  yPosition += 8

  const kpiData = [
    ['Métrica', 'Valor'],
    ['Total de Registros', kpis.totalRecords.toString()],
    ['Valor Total', `Gs. ${kpis.totalValue.toLocaleString('es-PY')}`],
    ['Valor Promedio', `Gs. ${kpis.averageValue.toLocaleString('es-PY')}`],
    ['Valor Mínimo', `Gs. ${kpis.minValue.toLocaleString('es-PY')}`],
    ['Valor Máximo', `Gs. ${kpis.maxValue.toLocaleString('es-PY')}`],
    ['Mediana', `Gs. ${kpis.medianValue.toLocaleString('es-PY')}`],
    ['Registros Recuperados', kpis.recoveredCount.toString()],
    ['Registros Pendientes', kpis.pendingCount.toString()],
    ['Registros Abandonados', kpis.abandonedCount.toString()],
    ['Tasa de Recuperación', `${kpis.recoveryRate.toFixed(2)}%`]
  ]

  doc.autoTable({
    startY: yPosition,
    head: [kpiData[0]],
    body: kpiData.slice(1),
    theme: 'grid',
    styles: {
      fontSize: 10,
      cellPadding: 5
    },
    headStyles: {
      fillColor: [52, 144, 220],
      textColor: 255,
      fontStyle: 'bold'
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245]
    }
  })

  yPosition = doc.lastAutoTable.finalY + 15

  // Tabla de datos
  if (data && data.length > 0) {
    doc.setFontSize(14)
    doc.text('Detalle de Registros', 20, yPosition)
    yPosition += 8

    const tableData = data.slice(0, 50).map(row => [
      row.name || '',
      row.email || '',
      row.phone || '',
      row.product || '',
      (row.quantity || 0).toString(),
      `Gs. ${(row.value || 0).toLocaleString('es-PY')}`,
      row.date instanceof Date 
        ? row.date.toLocaleDateString('es-PY')
        : row.date || '',
      row.status || ''
    ])

    doc.autoTable({
      startY: yPosition,
      head: [['Nombre', 'Email', 'Teléfono', 'Producto', 'Cantidad', 'Valor', 'Fecha', 'Estado']],
      body: tableData,
      theme: 'grid',
      styles: {
        fontSize: 8,
        cellPadding: 3,
        overflow: 'linebreak'
      },
      headStyles: {
        fillColor: [52, 144, 220],
        textColor: 255,
        fontStyle: 'bold'
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245]
      },
      columnStyles: {
        5: { halign: 'right' }
      }
    })

    if (data.length > 50) {
      const lastPage = doc.internal.pages.length - 1
      doc.setPage(lastPage)
      doc.setFontSize(10)
      doc.setTextColor(150)
      doc.text(`... y ${data.length - 50} registros más`, 20, pageHeight - 20)
    }
  }

  // Pie de página
  const totalPages = doc.internal.pages.length - 1
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i)
    doc.setFontSize(9)
    doc.setTextColor(150)
    doc.text(`Página ${i} de ${totalPages}`, pageWidth - 30, pageHeight - 10)
  }

  doc.save(`${fileName}_${new Date().toISOString().split('T')[0]}.pdf`)
}
