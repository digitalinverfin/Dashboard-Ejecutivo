/**
 * Calcula todos los KPIs a partir de los datos procesados
 */
export function calculateKPIs(data) {
  if (!data || data.length === 0) {
    return {
      totalRecords: 0,
      totalValue: 0,
      averageValue: 0,
      recoveredCount: 0,
      recoveryRate: 0,
      pendingCount: 0,
      abandonedCount: 0,
      minValue: 0,
      maxValue: 0,
      medianValue: 0
    }
  }

  // Contar estados
  const recoveredCount = data.filter(d => d.status === 'recovered').length
  const pendingCount = data.filter(d => d.status === 'pending').length
  const abandonedCount = data.filter(d => d.status === 'abandoned').length

  // Cálculos de valor
  const values = data.map(d => d.value || 0).filter(v => v > 0)
  const totalValue = values.reduce((sum, v) => sum + v, 0)
  const averageValue = data.length > 0 ? totalValue / data.length : 0

  // Valores mín/máx
  const minValue = values.length > 0 ? Math.min(...values) : 0
  const maxValue = values.length > 0 ? Math.max(...values) : 0

  // Mediana
  const sortedValues = [...values].sort((a, b) => a - b)
  const medianValue = sortedValues.length > 0
    ? sortedValues.length % 2 === 0
      ? (sortedValues[sortedValues.length / 2 - 1] + sortedValues[sortedValues.length / 2]) / 2
      : sortedValues[Math.floor(sortedValues.length / 2)]
    : 0

  // Tasa de recuperación
  const recoveryRate = data.length > 0 ? (recoveredCount / data.length) * 100 : 0

  return {
    totalRecords: data.length,
    totalValue: Math.round(totalValue),
    averageValue: Math.round(averageValue),
    recoveredCount,
    recoveryRate,
    pendingCount,
    abandonedCount,
    minValue: Math.round(minValue),
    maxValue: Math.round(maxValue),
    medianValue: Math.round(medianValue)
  }
}

/**
 * Filtra datos por rango de fechas
 */
export function filterDataByDate(data, dateFrom, dateTo) {
  if (!dateFrom && !dateTo) return data

  return data.filter(row => {
    const rowDate = row.date instanceof Date ? row.date : new Date(row.date)

    if (dateFrom && rowDate < dateFrom) return false
    if (dateTo && rowDate > dateTo) return false

    return true
  })
}

/**
 * Agrupa datos por un campo específico
 */
export function groupByField(data, field) {
  const groups = {}

  data.forEach(row => {
    const key = row[field] || 'Sin valor'
    if (!groups[key]) {
      groups[key] = []
    }
    groups[key].push(row)
  })

  return groups
}

/**
 * Calcula estadísticas por grupo
 */
export function calculateGroupStats(data, groupField) {
  const groups = groupByField(data, groupField)
  const stats = {}

  for (const [key, groupData] of Object.entries(groups)) {
    const kpis = calculateKPIs(groupData)
    stats[key] = {
      ...kpis,
      groupKey: key
    }
  }

  return stats
}
