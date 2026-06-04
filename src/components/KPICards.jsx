import React from 'react'
import { TrendingUp, TrendingDown, ShoppingCart, Users, FileText, DollarSign } from 'lucide-react'

export default function KPICards({ kpis }) {
  const cards = [
    {
      title: 'Total Registros',
      value: kpis.totalRecords,
      icon: FileText,
      color: 'blue',
      trend: null
    },
    {
      title: 'Valor Total',
      value: `Gs. ${kpis.totalValue.toLocaleString('es-PY')}`,
      icon: DollarSign,
      color: 'green',
      trend: null
    },
    {
      title: 'Valor Promedio',
      value: `Gs. ${kpis.averageValue.toLocaleString('es-PY')}`,
      icon: ShoppingCart,
      color: 'purple',
      trend: null
    },
    {
      title: 'Registros Recuperados',
      value: kpis.recoveredCount,
      icon: TrendingUp,
      color: 'emerald',
      trend: null
    },
    {
      title: 'Tasa de Recuperación',
      value: `${kpis.recoveryRate.toFixed(1)}%`,
      icon: TrendingUp,
      color: 'blue',
      trend: kpis.recoveryRate > 50 ? 'up' : 'down'
    },
    {
      title: 'Registros Pendientes',
      value: kpis.pendingCount,
      icon: Users,
      color: 'orange',
      trend: null
    }
  ]

  return (
    <div className="kpi-grid">
      {cards.map((card, i) => {
        const Icon = card.icon
        return (
          <div key={i} className={`kpi-card ${card.color}`}>
            <div className="kpi-header">
              <div className="kpi-icon">
                <Icon size={24} />
              </div>
              {card.trend && (
                <div className={`kpi-trend ${card.trend}`}>
                  {card.trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                </div>
              )}
            </div>
            <div className="kpi-title">{card.title}</div>
            <div className="kpi-value">{card.value}</div>
          </div>
        )
      })}
    </div>
  )
}
