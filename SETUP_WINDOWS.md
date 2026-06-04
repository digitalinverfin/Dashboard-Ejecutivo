# 🚀 GUÍA COMPLETA: EJECUTAR INVERFIN DASHBOARD EN WINDOWS

## Requisitos Previos

✅ **Node.js 16+** - Descargar desde https://nodejs.org/
- Verifica: `node --version` y `npm --version`

✅ **Git** (opcional) - Para clonar pero no necesario
✅ **Un editor de código** (VS Code recomendado)
✅ **Un navegador moderno** (Chrome, Edge, Firefox)

---

## OPCIÓN 1: DESDE CERO (Recomendado)

### Paso 1: Crear la carpeta del proyecto

```bash
mkdir inverfin-dashboard
cd inverfin-dashboard
```

### Paso 2: Crear estructura de carpetas

```
inverfin-dashboard/
├── src/
│   ├── components/
│   ├── utils/
│   ├── App.jsx
│   ├── main.jsx
│   └── styles.css
├── index.html
├── package.json
├── vite.config.js
└── .gitignore
```

**En Windows (PowerShell o CMD):**

```powershell
mkdir src
mkdir src\components
mkdir src\utils
```

### Paso 3: Crear package.json

En la carpeta raíz `inverfin-dashboard/`, crear archivo `package.json`:

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
    "lucide-react": "^0.294.0",
    "date-fns": "^2.30.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.0",
    "vite": "^5.0.0",
    "jspdf": "^2.5.1"
  }
}
```

### Paso 4: Instalar dependencias

```bash
npm install
```

**Esto descargará:**
- React 18.3
- React DOM 18.3
- Recharts 2.10 (gráficos)
- XLSX 0.18 (lectura Excel)
- PapaParse 5.4 (lectura CSV)
- jsPDF 2.5 (exportación PDF)
- date-fns 2.30 (fechas)
- lucide-react 0.294 (iconos)
- Vite 5.0 (bundler)

⏱️ **Tarda**: 2-5 minutos (primera vez)

### Paso 5: Copiar archivos del proyecto

Copia todos los archivos de:
- `src/App.jsx`
- `src/main.jsx`
- `src/styles.css`
- `src/components/*.jsx` (7 archivos)
- `src/utils/*.js` (5 archivos)
- `index.html`
- `vite.config.js`
- `.gitignore`

A sus respectivas carpetas en tu proyecto local.

### Paso 6: Ejecutar en modo desarrollo

```bash
npm run dev
```

**Salida esperada:**
```
  VITE v5.0.0  ready in 234 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

✅ Se abrirá automáticamente en tu navegador (http://localhost:5173/)

---

## OPCIÓN 2: SCRIPT AUTOMÁTICO (Windows PowerShell)

Crea un archivo llamado `setup.ps1` en tu carpeta de usuario y ejecuta:

```powershell
# setup.ps1
# Script para crear e instalar Inverfin Dashboard en Windows

$projectPath = "C:\Users\$env:USERNAME\Desktop\inverfin-dashboard"

Write-Host "🚀 Creando proyecto Inverfin Dashboard..." -ForegroundColor Green

# Crear carpetas
New-Item -ItemType Directory -Path "$projectPath\src\components" -Force | Out-Null
New-Item -ItemType Directory -Path "$projectPath\src\utils" -Force | Out-Null

# Cambiar a directorio
Set-Location $projectPath

# Crear package.json
$packageJson = @"
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
    "lucide-react": "^0.294.0",
    "date-fns": "^2.30.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.0",
    "vite": "^5.0.0",
    "jspdf": "^2.5.1"
  }
}
"@

$packageJson | Out-File -FilePath "$projectPath\package.json" -Encoding UTF8

Write-Host "✅ package.json creado" -ForegroundColor Green

# Instalar dependencias
Write-Host "📦 Instalando dependencias (esto puede tomar 2-5 minutos)..." -ForegroundColor Yellow
npm install

if ($LASTEXITCODE -eq 0) {
  Write-Host "✅ Dependencias instaladas" -ForegroundColor Green
  Write-Host ""
  Write-Host "🎉 Instalación completada!" -ForegroundColor Green
  Write-Host ""
  Write-Host "Próximos pasos:" -ForegroundColor Cyan
  Write-Host "1. Copia todos los archivos del proyecto a $projectPath"
  Write-Host "2. Ejecuta: npm run dev"
  Write-Host "3. Abre: http://localhost:5173/"
}
else {
  Write-Host "❌ Error en la instalación" -ForegroundColor Red
}
```

**Para ejecutar en Windows:**

```powershell
# Abre PowerShell como administrador
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
.\setup.ps1
```

---

## OPCIÓN 3: SCRIPT BATCH (Windows CMD)

Crea `setup.bat`:

```batch
@echo off
REM setup.bat - Script para Windows CMD

setlocal enabledelayedexpansion

set "projectPath=%USERPROFILE%\Desktop\inverfin-dashboard"

echo.
echo 🚀 Creando proyecto Inverfin Dashboard...
echo.

REM Crear carpetas
if not exist "%projectPath%\src\components" mkdir "%projectPath%\src\components"
if not exist "%projectPath%\src\utils" mkdir "%projectPath%\src\utils"

REM Cambiar directorio
cd /d "%projectPath%"

REM Crear package.json
(
echo {
echo   "name": "inverfin-dashboard",
echo   "version": "1.0.0",
echo   "description": "Dashboard Ejecutivo - Aplicación Offline basada en Excel",
echo   "type": "module",
echo   "scripts": {
echo     "dev": "vite",
echo     "build": "vite build",
echo     "preview": "vite preview"
echo   },
echo   "dependencies": {
echo     "react": "^18.3.1",
echo     "react-dom": "^18.3.1",
echo     "recharts": "^2.10.3",
echo     "xlsx": "^0.18.5",
echo     "lucide-react": "^0.294.0",
echo     "date-fns": "^2.30.0"
echo   },
echo   "devDependencies": {
echo     "@vitejs/plugin-react": "^4.2.0",
echo     "vite": "^5.0.0",
echo     "jspdf": "^2.5.1"
echo   }
echo }
) > package.json

echo ✅ package.json creado
echo.
echo 📦 Instalando dependencias...
echo Esto puede tomar 2-5 minutos...
echo.

call npm install

if %errorlevel% equ 0 (
  echo.
  echo ✅ Dependencias instaladas correctamente
  echo.
  echo 🎉 Instalación completada!
  echo.
  echo Próximos pasos:
  echo 1. Copia los archivos del proyecto a: %projectPath%
  echo 2. Ejecuta: npm run dev
  echo 3. Abre en el navegador: http://localhost:5173/
  echo.
  pause
) else (
  echo.
  echo ❌ Error en la instalación
  pause
)
```

**Para ejecutar:**
- Haz doble click en `setup.bat`
- O ejecuta en CMD: `setup.bat`

---

## Estructura Mínima Funcional

```
inverfin-dashboard/
│
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
└── node_modules/ (se crea con npm install)
```

**Total de archivos a crear/copiar: 20**

---

## Cómo Funciona el Importador de Excel

### Flujo Paso a Paso:

**1. Usuario arrastra/selecciona archivo**
```
DataUploader.jsx
↓
readExcelFile() o readCSVFile()
↓
XLSX o PapaParse procesa archivo
↓
Retorna: { headers: [...], data: [...] }
```

**2. Sistema detecta columnas automáticamente**
```
ColumnMapping.jsx
↓
detectColumnMapping(headers)
↓
Busca patrones en nombres: "nombre", "email", "valor", "fecha", etc.
↓
Mapeo automático: { name: "Nombre", email: "Email", ... }
```

**3. Usuario revisa/ajusta mapeo**
```
Selecciona qué columna corresponde a cada campo
↓
Click "Siguiente"
↓
Preview de datos validados
```

**4. Validación y procesamiento**
```
processData(rawData, mapping)
↓
Para cada fila:
  - Valida email
  - Convierte valor a número
  - Parsea fecha (múltiples formatos)
  - Normaliza estado
  - Guarda en array si es válido
  - O registra error si falla
```

**5. Dashboard se actualiza automáticamente**
```
calculateKPIs(validData)
↓
Genera 6 KPIs
↓
Crea 4 gráficos con Recharts
↓
Tabla sorteable y paginada
```

---

## Verificación Post-Instalación

Después de ejecutar `npm run dev`, verifica:

```bash
# Debería mostrar:
✅ VITE v5.0.0 ready in XXX ms
✅ Local: http://localhost:5173/
```

Abre http://localhost:5173/ y deberías ver:
- [ ] Header azul con logo "Inverfin Dashboard"
- [ ] Zona de drop-zone para archivos
- [ ] Botón "Selecciona un archivo"

---

## Archivos Listos para Copiar

Todo el código fuente está en las respuestas anteriores. Solo necesitas:

1. Copiar cada archivo `.jsx` a `src/components/`
2. Copiar cada `.js` a `src/utils/`
3. Copiar `App.jsx` y `main.jsx` a `src/`
4. Copiar `styles.css` a `src/`
5. Copiar `index.html` a raíz
6. Copiar `vite.config.js` a raíz
7. Crear `.gitignore`

---

## Troubleshooting

### Error: "node is not recognized"
```
→ Node.js no está instalado
→ Descarga de: https://nodejs.org/
→ Instala y reinicia PowerShell/CMD
```

### Error: "EACCES: permission denied"
```
→ En Windows, ejecuta CMD como administrador
→ O abre PowerShell como administrador
```

### El navegador no abre automáticamente
```
→ Abre manualmente: http://localhost:5173/
```

### Error: "Module not found"
```
→ Asegúrate de que todos los archivos están en su lugar
→ Verifica que sea: src/components/DataUploader.jsx
→ NO: src/DataUploader.jsx
```

### Port 5173 en uso
```
→ Vite usa otro puerto automáticamente
→ O cierra lo que usa el puerto 5173
```

---

## Archivos de Configuración Mínimos

### `index.html`
```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Inverfin Dashboard</title>
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.jsx"></script>
</body>
</html>
```

### `vite.config.js`
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true
  }
})
```

### `.gitignore`
```
node_modules/
dist/
.DS_Store
*.log
.env.local
```

---

## Comandos Útiles

```bash
# Desarrollo (con hot reload)
npm run dev

# Build para producción
npm run build

# Previsualizar build
npm run preview

# Borrar y reinstalar dependencias (si hay problemas)
rm -r node_modules
npm install

# En Windows (borrar carpeta):
rmdir /s /q node_modules
npm install
```

---

## Resumen Rápido

```bash
# 1. Crear carpeta
mkdir inverfin-dashboard
cd inverfin-dashboard

# 2. Crear carpetas internas
mkdir src\components src\utils

# 3. Copiar package.json (de arriba)

# 4. Instalar
npm install

# 5. Copiar todos los archivos .jsx, .js, etc.

# 6. Ejecutar
npm run dev

# 7. Abrir navegador
http://localhost:5173/
```

**¡Y listo!** Tendrás el dashboard funcionando. 🎉

