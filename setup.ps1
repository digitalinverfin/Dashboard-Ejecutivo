# setup.ps1
# Script de instalación automática para Inverfin Dashboard en Windows
# Uso: En PowerShell, ejecuta: .\setup.ps1

param(
  [string]$ProjectPath = "$env:USERPROFILE\Desktop\inverfin-dashboard"
)

Write-Host "════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "  🚀 INVERFIN DASHBOARD - INSTALACIÓN AUTOMÁTICA" -ForegroundColor Green
Write-Host "════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

# Verificar Node.js
Write-Host "📋 Verificando requisitos..." -ForegroundColor Yellow
$nodeVersion = node --version 2>$null
$npmVersion = npm --version 2>$null

if (-not $nodeVersion) {
  Write-Host "❌ Node.js no está instalado" -ForegroundColor Red
  Write-Host "   Descargalo de: https://nodejs.org/" -ForegroundColor Yellow
  exit 1
}

Write-Host "✅ Node.js $nodeVersion" -ForegroundColor Green
Write-Host "✅ npm $npmVersion" -ForegroundColor Green
Write-Host ""

# Crear directorio
Write-Host "📁 Creando estructura de carpetas..." -ForegroundColor Yellow

if (Test-Path $ProjectPath) {
  Write-Host "⚠️  La carpeta ya existe. Continuando..." -ForegroundColor Yellow
} else {
  New-Item -ItemType Directory -Path $ProjectPath -Force | Out-Null
  Write-Host "✅ Carpeta creada: $ProjectPath" -ForegroundColor Green
}

# Crear subcarpetas
@(
  "$ProjectPath\src\components",
  "$ProjectPath\src\utils"
) | ForEach-Object {
  if (-not (Test-Path $_)) {
    New-Item -ItemType Directory -Path $_ -Force | Out-Null
  }
}

Write-Host "✅ Carpetas de componentes creadas" -ForegroundColor Green
Write-Host ""

# Crear package.json
Write-Host "📝 Generando package.json..." -ForegroundColor Yellow

$packageJson = @'
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
'@

$packageJson | Out-File -FilePath "$ProjectPath\package.json" -Encoding UTF8 -Force
Write-Host "✅ package.json creado" -ForegroundColor Green
Write-Host ""

# Crear vite.config.js
Write-Host "⚙️  Generando vite.config.js..." -ForegroundColor Yellow

$viteConfig = @'
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
'@

$viteConfig | Out-File -FilePath "$ProjectPath\vite.config.js" -Encoding UTF8 -Force
Write-Host "✅ vite.config.js creado" -ForegroundColor Green
Write-Host ""

# Crear .gitignore
Write-Host "📄 Generando .gitignore..." -ForegroundColor Yellow

$gitignore = @'
node_modules/
dist/
.DS_Store
*.log
.env.local
.vscode/
.idea/
'@

$gitignore | Out-File -FilePath "$ProjectPath\.gitignore" -Encoding UTF8 -Force
Write-Host "✅ .gitignore creado" -ForegroundColor Green
Write-Host ""

# Crear index.html
Write-Host "🌐 Generando index.html..." -ForegroundColor Yellow

$indexHtml = @'
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
'@

$indexHtml | Out-File -FilePath "$ProjectPath\index.html" -Encoding UTF8 -Force
Write-Host "✅ index.html creado" -ForegroundColor Green
Write-Host ""

# Cambiar al directorio
Set-Location $ProjectPath

# Instalar dependencias
Write-Host "════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "📦 INSTALANDO DEPENDENCIAS" -ForegroundColor Yellow
Write-Host "════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "Esto puede tomar 2-5 minutos la primera vez..." -ForegroundColor Yellow
Write-Host ""

npm install

if ($LASTEXITCODE -ne 0) {
  Write-Host ""
  Write-Host "❌ Error en la instalación de dependencias" -ForegroundColor Red
  Write-Host "   Intenta ejecutar: npm install" -ForegroundColor Yellow
  exit 1
}

Write-Host ""
Write-Host "════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "🎉 ¡INSTALACIÓN COMPLETADA!" -ForegroundColor Green
Write-Host "════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

Write-Host "📁 Proyecto ubicado en:" -ForegroundColor Cyan
Write-Host "   $ProjectPath" -ForegroundColor Green
Write-Host ""

Write-Host "📝 PRÓXIMOS PASOS:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1️⃣  Copia todos los archivos del proyecto a: $ProjectPath" -ForegroundColor Yellow
Write-Host "    - Carpeta 'src/components/' (7 archivos .jsx)" -ForegroundColor Gray
Write-Host "    - Carpeta 'src/utils/' (5 archivos .js)" -ForegroundColor Gray
Write-Host "    - App.jsx y main.jsx en 'src/'" -ForegroundColor Gray
Write-Host "    - styles.css en 'src/'" -ForegroundColor Gray
Write-Host ""
Write-Host "2️⃣  Ejecuta el servidor de desarrollo:" -ForegroundColor Yellow
Write-Host "    npm run dev" -ForegroundColor Green
Write-Host ""
Write-Host "3️⃣  Abre en tu navegador:" -ForegroundColor Yellow
Write-Host "    http://localhost:5173/" -ForegroundColor Green
Write-Host ""

Write-Host "💡 COMANDOS ÚTILES:" -ForegroundColor Cyan
Write-Host ""
Write-Host "  npm run dev       → Desarrollo con hot reload" -ForegroundColor Gray
Write-Host "  npm run build     → Build para producción" -ForegroundColor Gray
Write-Host "  npm run preview   → Previsualizar build" -ForegroundColor Gray
Write-Host ""

Write-Host "📚 DOCUMENTACIÓN:" -ForegroundColor Cyan
Write-Host "   Ver SETUP_WINDOWS.md para guía detallada" -ForegroundColor Gray
Write-Host ""

Write-Host "════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

# Ofrecer abrir carpeta
$openFolder = Read-Host "¿Deseas abrir la carpeta del proyecto? (s/n)"
if ($openFolder -eq "s" -or $openFolder -eq "S") {
  Invoke-Item $ProjectPath
}

Write-Host ""
Write-Host "¡Gracias por usar Inverfin Dashboard! 🚀" -ForegroundColor Green
