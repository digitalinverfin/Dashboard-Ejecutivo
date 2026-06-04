# 📋 GUÍA RÁPIDA - INVERFIN DASHBOARD

## ⚡ 3 OPCIONES PARA INSTALAR

### OPCIÓN 1: Script Automático (Recomendado) - PowerShell

```powershell
# 1. Abre PowerShell como administrador
# 2. Ejecuta estos comandos:

Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
cd Desktop
# Descarga setup.ps1 o crea el archivo
.\setup.ps1

# El script hará todo automáticamente:
# ✅ Crea carpetas
# ✅ Genera archivos de config
# ✅ Instala dependencias (npm install)
# ✅ Abre la carpeta del proyecto
```

### OPCIÓN 2: Script Automático - CMD

```batch
REM 1. Descarga setup.bat al Desktop
REM 2. Haz doble click en setup.bat
REM 3. Espera a que termine

REM El script hará:
REM ✅ Crear carpetas
REM ✅ Generar package.json, vite.config.js, index.html
REM ✅ Instalar con npm install
REM ✅ Abrir carpeta
```

### OPCIÓN 3: Manual (Si los scripts fallan)

```bash
# 1. Abre CMD o PowerShell
mkdir inverfin-dashboard
cd inverfin-dashboard

# 2. Crea carpetas
mkdir src\components
mkdir src\utils

# 3. Crea estos 4 archivos en la raíz:
# - package.json (copiar contenido de abajo)
# - vite.config.js (copiar contenido de abajo)
# - index.html (copiar contenido de abajo)
# - .gitignore (copiar contenido de abajo)

# 4. Instala dependencias
npm install

# 5. Copia todos los archivos .jsx y .js a sus carpetas

# 6. Ejecuta
npm run dev
```

---

## 📦 CONTENIDO DE ARCHIVOS DE CONFIG

### package.json
```json
{
  "name": "inverfin-dashboard",
  "version": "1.0.0",
  "description": "Dashboard Ejecutivo - Aplicación Offline basada en Excel",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "recharts": "^2.10.3",
    "xlsx": "^0.18.5",
    "papaparse": "^5.4.1",
    "lucide-react": "^0.294.0",
    "date-fns": "^2.30.0",
    "jspdf": "^2.5.1",
    "html2canvas": "^1.4.1"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.0",
    "vite": "^5.0.0"
  }
}
```

### vite.config.js
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: false
  }
})
```

### index.html
```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Inverfin Dashboard - Análisis Offline</title>
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.jsx"></script>
</body>
</html>
```

### .gitignore
```
node_modules/
dist/
.DS_Store
*.log
.env.local
.vscode/
.idea/
```

---

## 📁 ESTRUCTURA DEL PROYECTO

Después de instalar, la carpeta debe verse así:

```
inverfin-dashboard/
│
├── node_modules/          (creado por npm install)
├── src/
│   ├── components/
│   │   ├── DataUploader.jsx
│   │   ├── ColumnMapping.jsx
│   │   ├── Dashboard.jsx
│   │   ├── KPICards.jsx
│   │   ├── Charts.jsx
│   │   ├── DataTable.jsx
│   │   └── FilterPanel.jsx
│   │
│   ├── utils/
│   │   ├── fileReader.js
│   │   ├── columnDetector.js
│   │   ├── dataProcessor.js
│   │   ├── calculations.js
│   │   └── export.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── styles.css
│
├── index.html
├── package.json
├── vite.config.js
├── .gitignore
├── setup.ps1 (opcional)
├── setup.bat (opcional)
└── README.md
```

---

## 🚀 DESPUÉS DE INSTALAR

### Paso 1: Copiar archivos fuente
Copia estos archivos a sus carpetas correspondientes:

**src/components/** (7 archivos):
- DataUploader.jsx
- ColumnMapping.jsx
- Dashboard.jsx
- KPICards.jsx
- Charts.jsx
- DataTable.jsx
- FilterPanel.jsx

**src/utils/** (5 archivos):
- fileReader.js
- columnDetector.js
- dataProcessor.js
- calculations.js
- export.js

**src/** (2 archivos):
- App.jsx
- main.jsx
- styles.css

### Paso 2: Ejecutar servidor

```bash
npm run dev
```

**Esperado:**
```
VITE v5.0.0  ready in 234 ms

➜  Local:   http://localhost:5173/
```

### Paso 3: Usar el dashboard

1. El navegador abrirá automáticamente http://localhost:5173/
2. Arrastra un archivo Excel (.xlsx) o CSV a la zona de drop
3. El sistema detectará las columnas automáticamente
4. Confirma el mapeo
5. ¡Listo! Tu dashboard está cargado

---

## 🔄 FLUJO DEL IMPORTADOR DE EXCEL

```
┌─────────────────────────────────────────┐
│  1. Usuario arrastra archivo Excel      │
└────────────┬──────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────┐
│  2. readExcelFile() o readCSVFile()     │
│     (XLSX o PapaParse procesan)         │
└────────────┬──────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────┐
│  3. detectColumnMapping()               │
│     Busca: "nombre", "email", "valor"  │
│     Retorna mapeo automático            │
└────────────┬──────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────┐
│  4. Usuario revisa/ajusta mapeo         │
│     Selecciona qué columna = qué campo  │
│     Click "Siguiente"                   │
└────────────┬──────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────┐
│  5. processData()                       │
│     ✅ Valida emails                    │
│     ✅ Convierte valores a números      │
│     ✅ Parsea fechas (múltiples fmt)    │
│     ✅ Normaliza estados                │
│     ✅ Detecta y reporta errores        │
└────────────┬──────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────┐
│  6. Preview de datos                    │
│     Muestra: registros válidos/errores  │
│     User confirma "Cargar datos"        │
└────────────┬──────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────┐
│  7. Dashboard se actualiza              │
│     - calculateKPIs() → 6 métricas      │
│     - Charts() → 4 gráficos             │
│     - DataTable() → tabla interactiva   │
│     - Filtros listos                    │
└─────────────────────────────────────────┘
```

---

## ✅ VALIDACIONES INCLUIDAS

El importador valida automáticamente:

```
EMAIL
├─ Formato válido (xxx@yyy.zzz)
└─ No duplicados

VALOR
├─ Es número
├─ Mayor a 0
└─ Maneja puntos y comas como decimales

FECHA (Soporta múltiples formatos)
├─ YYYY-MM-DD (2024-06-15)
├─ DD/MM/YYYY (15/06/2024)
├─ DD-MM-YYYY (15-06-2024)
└─ D/M/YY o D/M/YYYY (15/6/24)

CANTIDAD
├─ Es número
└─ Mayor a 0

ESTADO (Se normaliza)
├─ Recuperado / Recovered → "recovered"
├─ Pendiente / Pending → "pending"
├─ Abandonado / Abandoned → "abandoned"
└─ Otros → "pending"
```

---

## 📊 KPIs CALCULADOS

El dashboard genera automáticamente:

```
1. Total de Registros
2. Valor Total (suma de todos los valores)
3. Valor Promedio
4. Valor Mínimo
5. Valor Máximo
6. Mediana
7. Registros Recuperados (count)
8. Registros Pendientes (count)
9. Registros Abandonados (count)
10. Tasa de Recuperación (%)
```

---

## 📈 GRÁFICOS INCLUIDOS

```
1. Línea temporal
   - Cantidad de registros por fecha
   - Valor total por fecha

2. Pie Chart
   - Distribución por estado
   - (Recuperado, Pendiente, Abandonado)

3. Barras
   - Registros por cantidad

4. Barras (Recovery)
   - Recuperados vs Total por fecha
```

---

## 🛠️ COMANDOS ÚTILES

```bash
# Desarrollo (hot reload automático)
npm run dev

# Build para producción
npm run build

# Previsualizar build compilado
npm run preview

# Si algo falla, reinstalar todo
rm -r node_modules
npm install

# En Windows (borrar carpeta):
rmdir /s /q node_modules
npm install
```

---

## ❌ TROUBLESHOOTING RÁPIDO

| Problema | Solución |
|----------|----------|
| "node is not recognized" | Instala Node.js desde nodejs.org |
| "Permission denied" | Ejecuta CMD/PowerShell como admin |
| El navegador no abre | Abre http://localhost:5173/ manualmente |
| "Module not found" | Verifica que files estén en las carpetas correctas |
| Port 5173 en uso | Vite usa otro puerto automáticamente |
| Error en npm install | Borra node_modules y reinstala |

---

## 📝 RESUMEN SUPER RÁPIDO

```bash
# 1. Ejecuta setup.bat o setup.ps1
# ↓
# 2. Copia archivos .jsx y .js
# ↓
# 3. npm run dev
# ↓
# 4. http://localhost:5173/
# ↓
# 🎉 ¡Listo!
```

---

## 📞 NOTAS IMPORTANTES

✅ **NO requiere:**
- Supabase
- APIs externas
- Autenticación
- Servidor web
- Conexión a internet

✅ **TODO funciona OFFLINE:**
- Carga archivos locales
- Procesa en el navegador
- Guarda en memoria
- Exporta a Excel/PDF

✅ **Compatible con:**
- Windows 10/11
- MacOS
- Linux

---

**¡Listo para empezar!** 🚀
