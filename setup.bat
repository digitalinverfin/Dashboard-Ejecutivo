@echo off
REM setup.bat
REM Script de instalación automática para Inverfin Dashboard en Windows
REM Uso: Haz doble click o ejecuta en CMD: setup.bat

setlocal enabledelayedexpansion

cls
echo.
echo ════════════════════════════════════════════════════════════
echo   🚀 INVERFIN DASHBOARD - INSTALACION AUTOMATICA
echo ════════════════════════════════════════════════════════════
echo.

REM Definir ruta del proyecto
set "projectPath=%USERPROFILE%\Desktop\inverfin-dashboard"

REM Verificar Node.js
echo 📋 Verificando requisitos...
node --version >nul 2>&1
if errorlevel 1 (
  echo.
  echo ❌ Node.js no está instalado
  echo    Descargalo de: https://nodejs.org/
  echo.
  pause
  exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set nodeVersion=%%i
for /f "tokens=*" %%i in ('npm --version') do set npmVersion=%%i

echo ✅ Node.js %nodeVersion%
echo ✅ npm %npmVersion%
echo.

REM Crear directorios
echo 📁 Creando estructura de carpetas...

if not exist "%projectPath%" (
  mkdir "%projectPath%"
  echo ✅ Carpeta creada: %projectPath%
) else (
  echo ⚠️  La carpeta ya existe. Continuando...
)

if not exist "%projectPath%\src\components" mkdir "%projectPath%\src\components"
if not exist "%projectPath%\src\utils" mkdir "%projectPath%\src\utils"

echo ✅ Carpetas de componentes creadas
echo.

REM Crear package.json
echo 📝 Generando package.json...

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
echo     "papaparse": "^5.4.1",
echo     "lucide-react": "^0.294.0",
echo     "date-fns": "^2.30.0",
echo     "jspdf": "^2.5.1",
echo     "html2canvas": "^1.4.1"
echo   },
echo   "devDependencies": {
echo     "@vitejs/plugin-react": "^4.2.0",
echo     "vite": "^5.0.0"
echo   }
echo }
) > "%projectPath%\package.json"

echo ✅ package.json creado
echo.

REM Crear vite.config.js
echo ⚙️  Generando vite.config.js...

(
echo import { defineConfig } from 'vite'
echo import react from '@vitejs/plugin-react'
echo.
echo export default defineConfig^({
echo   plugins: [react^(^)],
echo   server: {
echo     port: 5173,
echo     open: true
echo   },
echo   build: {
echo     outDir: 'dist',
echo     sourcemap: false
echo   }
echo }^)
) > "%projectPath%\vite.config.js"

echo ✅ vite.config.js creado
echo.

REM Crear .gitignore
echo 📄 Generando .gitignore...

(
echo node_modules/
echo dist/
echo .DS_Store
echo *.log
echo .env.local
echo .vscode/
echo .idea/
) > "%projectPath%\.gitignore"

echo ✅ .gitignore creado
echo.

REM Crear index.html
echo 🌐 Generando index.html...

(
echo ^<!DOCTYPE html^>
echo ^<html lang="es"^>
echo ^<head^>
echo   ^<meta charset="UTF-8"^>
echo   ^<meta name="viewport" content="width=device-width, initial-scale=1.0"^>
echo   ^<title^>Inverfin Dashboard - Análisis Offline^</title^>
echo ^</head^>
echo ^<body^>
echo   ^<div id="root"^>^</div^>
echo   ^<script type="module" src="/src/main.jsx"^>^</script^>
echo ^</body^>
echo ^</html^>
) > "%projectPath%\index.html"

echo ✅ index.html creado
echo.

REM Cambiar directorio e instalar
cd /d "%projectPath%"

echo ════════════════════════════════════════════════════════════
echo 📦 INSTALANDO DEPENDENCIAS
echo ════════════════════════════════════════════════════════════
echo Esto puede tomar 2-5 minutos la primera vez...
echo.

call npm install

if errorlevel 1 (
  echo.
  echo ❌ Error en la instalación de dependencias
  echo    Intenta ejecutar manualmente: npm install
  echo.
  pause
  exit /b 1
)

cls
echo.
echo ════════════════════════════════════════════════════════════
echo 🎉 ¡INSTALACION COMPLETADA!
echo ════════════════════════════════════════════════════════════
echo.

echo 📁 Proyecto ubicado en:
echo    %projectPath%
echo.

echo 📝 PROXIMOS PASOS:
echo.
echo 1️⃣  Copia todos los archivos del proyecto a:
echo    %projectPath%
echo    - Carpeta 'src\components\' (7 archivos .jsx)
echo    - Carpeta 'src\utils\' (5 archivos .js)
echo    - App.jsx y main.jsx en 'src\'
echo    - styles.css en 'src\'
echo.
echo 2️⃣  Ejecuta el servidor de desarrollo:
echo    npm run dev
echo.
echo 3️⃣  Abre en tu navegador:
echo    http://localhost:5173/
echo.

echo 💡 COMANDOS UTILES:
echo.
echo   npm run dev       = Desarrollo con hot reload
echo   npm run build     = Build para producción
echo   npm run preview   = Previsualizar build
echo.

echo ════════════════════════════════════════════════════════════
echo.

REM Ofrecer abrir carpeta
set /p openFolder="¿Deseas abrir la carpeta del proyecto? (s/n): "
if /i "%openFolder%"=="s" (
  start "" "%projectPath%"
)

echo.
echo ¡Gracias por usar Inverfin Dashboard! 🚀
echo.
pause
