/**
 * Procesa y valida datos según el mapeo de columnas
 */
export function processData(rawData, mapping) {
  const valid = []
  const invalid = []

  rawData.forEach((row, rowIndex) => {
    const errors = []
    const processed = {}

    // Procesar nombre
    if (mapping.name) {
      const name = String(row[mapping.name] || '').trim()
      if (!name) {
        errors.push('Nombre vacío')
      }
      processed.name = name
    }

    // Procesar email
    if (mapping.email) {
      const email = String(row[mapping.email] || '').trim().toLowerCase()
      if (email && !isValidEmail(email)) {
        errors.push('Email inválido')
      }
      processed.email = email
    }

    // Procesar teléfono
    if (mapping.phone) {
      processed.phone = String(row[mapping.phone] || '').trim()
    }

    // Procesar producto
    if (mapping.product) {
      processed.product = String(row[mapping.product] || '').trim()
    }

    // Procesar cantidad
    if (mapping.quantity) {
      const qty = parseFloat(row[mapping.quantity])
      if (isNaN(qty) || qty <= 0) {
        errors.push('Cantidad inválida')
      }
      processed.quantity = isNaN(qty) ? 1 : Math.max(1, Math.round(qty))
    } else {
      processed.quantity = 1
    }

    // Procesar valor
    if (mapping.value) {
      const value = parseFloat(String(row[mapping.value]).replace(/[^\d.-]/g, ''))
      if (isNaN(value) || value <= 0) {
        errors.push('Valor debe ser mayor a 0')
      }
      processed.value = isNaN(value) ? 0 : Math.max(0, value)
    } else {
      processed.value = 0
    }

    // Procesar fecha
    if (mapping.date) {
      const dateStr = row[mapping.date]
      const date = parseDate(dateStr)
      if (!date) {
        errors.push('Fecha inválida')
      }
      processed.date = date || new Date()
    } else {
      processed.date = new Date()
    }

    // Procesar estado
    if (mapping.status) {
      const status = String(row[mapping.status] || '').trim().toLowerCase()
      const normalizedStatus = normalizeStatus(status)
      processed.status = normalizedStatus
    } else {
      processed.status = 'pending'
    }

    // Agregar a válidos o inválidos
    if (errors.length === 0) {
      valid.push(processed)
    } else {
      invalid.push({
        rowIndex: rowIndex + 2, // +2 porque Excel incluye header y es 1-indexed
        errors,
        data: processed
      })
    }
  })

  return { valid, invalid }
}

/**
 * Valida formato de email
 */
function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

/**
 * Parsea fecha de múltiples formatos
 */
function parseDate(dateStr) {
  if (!dateStr) return null

  // Si ya es objeto Date
  if (dateStr instanceof Date) {
    return isValidDate(dateStr) ? dateStr : null
  }

  const str = String(dateStr).trim()

  // Intenta parsear como ISO
  const isoDate = new Date(str)
  if (isValidDate(isoDate)) {
    return isoDate
  }

  // Intenta formatos comunes
  const formats = [
    /^(\d{4})-(\d{2})-(\d{2})$/, // YYYY-MM-DD
    /^(\d{2})\/(\d{2})\/(\d{4})$/, // DD/MM/YYYY
    /^(\d{2})-(\d{2})-(\d{4})$/, // DD-MM-YYYY
    /^(\d{1,2})\/(\d{1,2})\/(\d{2,4})$/ // D/M/YY o D/M/YYYY
  ]

  for (const format of formats) {
    const match = str.match(format)
    if (match) {
      let year, month, day

      if (format === formats[0]) {
        // YYYY-MM-DD
        [, year, month, day] = match
      } else if (format === formats[1]) {
        // DD/MM/YYYY
        [, day, month, year] = match
      } else if (format === formats[2]) {
        // DD-MM-YYYY
        [, day, month, year] = match
      } else if (format === formats[3]) {
        // D/M/YY o D/M/YYYY
        [, day, month, year] = match
        if (year.length === 2) {
          year = year < 50 ? '20' + year : '19' + year
        }
      }

      const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
      if (isValidDate(date)) {
        return date
      }
    }
  }

  return null
}

/**
 * Valida si una fecha es válida
 */
function isValidDate(date) {
  return date instanceof Date && !isNaN(date.getTime())
}

/**
 * Normaliza estados a un formato estándar
 */
function normalizeStatus(status) {
  const statusMap = {
    recuperado: 'recovered',
    recovered: 'recovered',
    recuperada: 'recovered',
    abonado: 'recovered',
    pagado: 'recovered',
    completado: 'recovered',
    completada: 'recovered',
    
    pendiente: 'pending',
    pending: 'pending',
    en_proceso: 'pending',
    en proceso: 'pending',
    
    abandonado: 'abandoned',
    abandoned: 'abandoned',
    perdido: 'abandoned',
    cancelado: 'abandoned',
    rechazado: 'abandoned'
  }

  return statusMap[status] || 'pending'
}
