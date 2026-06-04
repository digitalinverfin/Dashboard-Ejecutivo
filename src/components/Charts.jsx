import React from 'react'
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function Charts({ data, kpis }) {
  // Preparar datos para gráfico de valores por fecha
  const dateGrouped = {}
  data.forEach(row => {
    const date = row.date ? new Date(row.date).toLocaleDateString('es-PY') : 'Sin fecha'
    if (!dateGrouped[date]) {
      dateGrouped[date] = { date, count: 0, value: 0, recovered: 0 }
    }
    dateGrouped[date].count += 1
    dateGrouped[date].value += row.value || 0
    if (row.status === 'recovered' || row.status === 'Recuperado') {
      dateGrouped[date].recovered += 1
    }
  })

  const dateData = Object.values(dateGrouped).slice(-30) // Últimos 30 días

  // Datos por estado
  const statusData = [
    { name: 'Pendientes', value: kpis.pendingCount, color: '#f59e0b' },
    { name: 'Recuperados', value: kpis.recoveredCount, color: '#10b981' },
    { name: 'Abandonados', value: kpis.abandonedCount, color: '#ef4444' }
  ].filter(d => d.value > 0)

  // Datos por cantidad
  const quantityGroups = {}
  data.forEach(row => {
    const qty = row.quantity || 1
    if (!quantityGroups[qty]) quantityGroups[qty] = 0
    quantityGroups[qty] += 1
  })
  const quantityData = Object.entries(quantityGroups)
    .map(([qty, count]) => ({ quantity: parseInt(qty), count }))
    .sort((a, b) => a.quantity - b.quantity)
    .slice(0, 10)

  return (
    <div className="charts-container">
      <div className="chart-section">
        <h3>Registros y Valor por Fecha</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={dateData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" angle={-45} textAnchor="end" height={100} />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line 
              yAxisId="left"
              type="monotone" 
              dataKey="count" 
              stroke="#3b82f6" 
              name="Cantidad de registros"
              strokeWidth={2}
            />
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="value" 
              stroke="#10b981" 
              name="Valor total"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="charts-row">
        <div className="chart-section">
          <h3>Distribución por Estado</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value, percent }) => `${name} (${value})`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => value.toLocaleString('es-PY')} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-section">
          <h3>Distribución por Cantidad</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={quantityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="quantity" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#8b5cf6" name="Registros" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="chart-section">
        <h3>Recuperación por Fecha</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dateData.filter(d => d.recovered > 0)}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" angle={-45} textAnchor="end" height={100} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#94a3b8" name="Total registros" />
            <Bar dataKey="recovered" fill="#10b981" name="Recuperados" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
