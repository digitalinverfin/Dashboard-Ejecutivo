# 🎯 DÓNDE Y CÓMO EJECUTAR - WINDOWS

## PASO 1: Descargar los archivos

Ve a esta carpeta del proyecto y **descarga TODOS los archivos**:

```
inverfin-dashboard/
├── src/
├── package.json
├── vite.config.js
├── index.html
├── .gitignore
├── setup.ps1
├── setup.bat
└── README.md
```

Descarga todo a tu computadora.

---

## PASO 2: Elegir dónde guardar

Abre **Explorador de Archivos** (Win + E) y ve a:

```
C:\Users\[TuNombre]\Desktop\
```

O donde prefieras. Ejemplo:
```
C:\Users\Juan\Desktop\inverfin-dashboard\
```

---

## PASO 3: Ejecutar la instalación

### OPCIÓN A: Automático con setup.bat (MÁS FÁCIL)

1. **Busca el archivo `setup.bat`** que descargaste
2. **Haz doble click** en él
3. Se abre una ventana negra (CMD)
4. Automáticamente:
   - Crea carpetas
   - Genera archivos de configuración
   - Instala dependencias (espera 2-5 minutos)
5. Cuando termine, presiona cualquier tecla para cerrar

**Eso es todo.** La instalación está completa.

---

### OPCIÓN B: Automático con setup.ps1 (PowerShell)

1. **Abre PowerShell como administrador:**
   - Click derecho en el escritorio
   - Selecciona "PowerShell (Admin)"

2. **Ejecuta estos comandos:**
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   cd Desktop\inverfin-dashboard
   .\setup.ps1
   ```

3. El script hace todo automáticamente
4. Cuando termine, verás mensaje de éxito

---

### OPCIÓN C: Manual (Si los scripts fallan)

1. **Abre CMD o PowerShell:**
   - Win + R
   - Escribe: `cmd`
   - Presiona Enter

2. **Navega a tu carpeta:**
   ```bash
   cd Desktop\inverfin-dashboard
   ```

3. **Instala dependencias:**
   ```bash
   npm install
   ```
   (Espera 2-5 minutos)

4. **Luego copia los archivos:**
   - Ve al Explorador de Archivos
   - En la carpeta `inverfin-dashboard` que descargaste
   - Copia las subcarpetas:
     - `src/` (completa)
     - Junto con `package.json`, `vite.config.js`, etc.

---

## PASO 4: Copiar archivos fuente

Si usaste setup.bat/ps1, ve al Explorador y:

1. Abre tu carpeta: `C:\Users\[TuNombre]\Desktop\inverfin-dashboard\`

2. Copia estos archivos:
   - `src/components/` (7 archivos .jsx)
   - `src/utils/` (5 archivos .js)
   - `src/App.jsx`
   - `src/main.jsx`
   - `src/styles.css`

3. Pégalos en la misma carpeta (sobrescribe si pide)

---

## PASO 5: Ejecutar el dashboard

1. **Abre CMD o PowerShell** en tu carpeta:
   - Abre Explorador de Archivos
   - Ve a: `C:\Users\[TuNombre]\Desktop\inverfin-dashboard\`
   - Presiona Ctrl + Shift + Click derecho
   - Selecciona "Abrir PowerShell aquí" (o "CMD aquí")

2. **Escribe este comando:**
   ```bash
   npm run dev
   ```

3. **Deberías ver:**
   ```
   VITE v5.0.0  ready in 234 ms
   
   ➜  Local:   http://localhost:5173/
   ```

4. **Presiona Ctrl y click en el link**, o abre manualmente:
   ```
   http://localhost:5173/
   ```

---

## ✅ Debería verse así en el navegador:

- Header azul con "Inverfin Dashboard"
- Zona para arrastrar archivos Excel
- Botón "Selecciona un archivo"

**¡Listo!** Ya puedes cargar un Excel. 🎉

---

## Resumen en 3 pasos:

```
1. Descargar archivos → Desktop\inverfin-dashboard\

2. Doble click en setup.bat
   (o ejecutar setup.ps1 en PowerShell)

3. npm run dev
   (en la carpeta del proyecto)

4. Abre: http://localhost:5173/
```

---

## ¿Dónde están los archivos que descargué?

**Los archivos descargados estarán en:**
- Tu carpeta **Descargas** (por defecto)
- O donde hayas especificado

**Tienes que copiarlos a:**
- `C:\Users\[TuNombre]\Desktop\inverfin-dashboard\`

O cualquier carpeta que prefieras.

---

## ¿Qué es lo que hace setup.bat?

Setup.bat automáticamente:
1. ✅ Crea la estructura de carpetas
2. ✅ Genera `package.json` 
3. ✅ Genera `vite.config.js`
4. ✅ Genera `index.html`
5. ✅ Ejecuta `npm install` (descarga todas las librerías)

Luego TÚ copias los archivos `.jsx` y `.js` que descargaste.

---

## Ejemplo paso a paso real:

```
1. Descargas inverfin-dashboard (ZIP o archivos)

2. Extrae a: C:\Users\Juan\Desktop\inverfin-dashboard\

3. Doble click en setup.bat
   - Abre ventana negra
   - Instala todo
   - Cierra cuando termine

4. Abre PowerShell/CMD en esa carpeta

5. Escribe: npm run dev

6. Espera a ver: "ready in XXX ms"

7. Abre navegador: http://localhost:5173/

8. ¡Arrastra un Excel al dashboard!
```

---

## ¿Todavía no funciona?

**Verifica:**
1. ¿Instalaste Node.js? → `node --version` en CMD
2. ¿Estás en la carpeta correcta? → `cd Desktop\inverfin-dashboard`
3. ¿npm install completó? → Espera a que termine
4. ¿Copiaste todos los archivos .jsx y .js?

Si algo falla, ve a **SETUP_WINDOWS.md** en la carpeta del proyecto.

---

## 🎯 En Resumen:

**EJECUTAS:**
- `setup.bat` (automático)
- `npm run dev` (en CMD/PowerShell)

**VISITAS:**
- `http://localhost:5173/`

**¡LISTO!** 🚀
