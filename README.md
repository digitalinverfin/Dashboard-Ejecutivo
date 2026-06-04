# Inverfin Dashboard - Aplicación Offline

## Instalación

```bash
npm install
npm run dev
```

## Funcionalidades

✅ **Carga de Excel/CSV** - Arrastra y suelta archivos .xlsx o .csv  
✅ **Detección Automática de Columnas** - El sistema identifica automáticamente:
  - Nombre/Cliente
  - Email
  - Teléfono
  - Producto
  - Cantidad
  - Valor/Precio
  - Fecha
  - Estado

✅ **Mapeo de Columnas** - Confirma o corrige el mapeo antes de procesar

✅ **Validación de Datos** - Valida:
  - Email válido
  - Valores numéricos positivos
  - Fechas en múltiples formatos
  - Estados normalizados

✅ **Dashboard Ejecutivo** con:
  - 6 KPI cards dinámicas
  - 4 gráficos interactivos (líneas, pie, barras)
  - Tabla de datos con sorting y paginación
  - Filtros por rango de fechas

✅ **Cálculos Correctos**:
  - Total de registros
  - Valor total y promedio
  - Mediana, mín, máx
  - Tasa de recuperación real
  - Distribución por estado

✅ **Exportación**:
  - Excel (.xlsx)
  - PDF con KPIs y tabla

✅ **100% Offline** - No requiere conexión a internet ni servidores

## Estructura del Proyecto

```
inverfin-dashboard/
├── src/
│   ├── App.jsx                 # Componente principal
│   ├── main.jsx                # Entry point
│   ├── styles.css              # Estilos globales
│   ├── components/
│   │   ├── DataUploader.jsx    # Carga de archivos
│   │   ├── ColumnMapping.jsx   # Mapeo de columnas
│   │   ├── Dashboard.jsx       # Dashboard principal
│   │   ├── KPICards.jsx        # KPI cards
│   │   ├── Charts.jsx          # Gráficos
│   │   ├── DataTable.jsx       # Tabla de datos
│   │   └── FilterPanel.jsx     # Filtros por fecha
│   └── utils/
│       ├── fileReader.js       # Lectura Excel/CSV
│       ├── columnDetector.js   # Detección automática
│       ├── dataProcessor.js    # Validación y procesamiento
│       ├── calculations.js     # Cálculo de KPIs
│       └── export.js           # Exportación a Excel/PDF
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

## Cómo Usar

1. **Cargar Archivo**
   - Arrastra un Excel o CSV a la zona de drop
   - O haz click para seleccionar archivo

2. **Mapear Columnas**
   - El sistema detecta automáticamente las columnas
   - Revisa y ajusta el mapeo si es necesario
   - Confirma para procesar

3. **Ver Dashboard**
   - Visualiza KPIs, gráficos y tabla
   - Aplica filtros por fecha si lo necesitas
   - Exporta en Excel o PDF

## Formatos Soportados

**Excel**: .xlsx (moderno)  
**CSV**: .csv con delimitador por coma

**Fechas Soportadas**:
- YYYY-MM-DD (2024-06-15)
- DD/MM/YYYY (15/06/2024)
- DD-MM-YYYY (15-06-2024)

**Estados Soportados**:
- Recuperado / Recovered / Recuperada / Abonado / Pagado / Completado
- Pendiente / Pending / En proceso
- Abandonado / Abandoned / Perdido / Cancelado / Rechazado

## Desarrollo

```bash
# Dev
npm run dev

# Build
npm run build

# Preview
npm run preview
```

## Requisitos

- Node.js 16+
- Navegador moderno

## Librerías Utilizadas

- **React 18.3** - UI framework
- **Recharts 2.10** - Gráficos
- **XLSX 0.18** - Lectura Excel
- **PapaParse 5.4** - Lectura CSV
- **jsPDF 2.5** - Exportación PDF
- **date-fns 2.30** - Manejo de fechas
- **lucide-react 0.294** - Iconos

## Sin Dependencias Externas

❌ No usa Supabase  
❌ No usa APIs externas  
❌ No usa Shopify  
❌ No usa GA4  
❌ No usa Klaviyo  
❌ No requiere autenticación  
❌ 100% funcionamiento offline

## Licencia

MIT
