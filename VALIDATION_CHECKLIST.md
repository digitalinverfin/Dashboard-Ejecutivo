# ✅ CHECKLIST DE INSTALACIÓN Y VALIDACIÓN

## PRE-INSTALACIÓN

- [ ] Windows 10 o superior
- [ ] Node.js 16+ instalado (verifica: `node --version`)
- [ ] npm instalado (verifica: `npm --version`)
- [ ] Acceso a carpeta Desktop o similar
- [ ] Editor de código (VS Code recomendado, pero opcional)
- [ ] Navegador moderno (Chrome, Edge, Firefox)

---

## DURANTE LA INSTALACIÓN

### Si usas setup.bat o setup.ps1:

- [ ] Script se ejecuta sin errores
- [ ] Se crean carpetas: src/components, src/utils
- [ ] Se generan archivos: package.json, vite.config.js, index.html, .gitignore
- [ ] npm install completa sin errores
- [ ] Se abre la carpeta del proyecto

### Si instalas manualmente:

- [ ] Creas carpeta: C:\Users\[TuUser]\Desktop\inverfin-dashboard
- [ ] Creas subcarpetas: src\components, src\utils
- [ ] Copias package.json a la raíz
- [ ] Copias vite.config.js a la raíz
- [ ] Copias index.html a la raíz
- [ ] Copias .gitignore a la raíz
- [ ] Ejecutas: npm install
- [ ] Se crea carpeta: node_modules/ (puede tardar 2-5 min)

---

## DESPUÉS DE INSTALAR - COPIAR ARCHIVOS

### src/components/ (7 archivos .jsx)

- [ ] DataUploader.jsx
- [ ] ColumnMapping.jsx
- [ ] Dashboard.jsx
- [ ] KPICards.jsx
- [ ] Charts.jsx
- [ ] DataTable.jsx
- [ ] FilterPanel.jsx

### src/utils/ (5 archivos .js)

- [ ] fileReader.js
- [ ] columnDetector.js
- [ ] dataProcessor.js
- [ ] calculations.js
- [ ] export.js

### src/ (3 archivos)

- [ ] App.jsx
- [ ] main.jsx
- [ ] styles.css

**Total: 15 archivos de código fuente**

---

## EJECUCIÓN

```bash
npm run dev
```

Verifica en la consola:

- [ ] `VITE v5.0.0 ready in XXX ms`
- [ ] `Local: http://localhost:5173/`
- [ ] Sin errores en rojo

El navegador debería:

- [ ] Abrir automáticamente http://localhost:5173/
- [ ] Mostrar header azul "Inverfin Dashboard"
- [ ] Mostrar zona de drag-drop para archivos
- [ ] Mostrar botón "Selecciona un archivo"

---

## PRUEBA DE FUNCIONALIDAD

### 1. Crear archivo de prueba (test.xlsx)

Crea un Excel con estas columnas:
```
Nombre          | Email                  | Producto       | Valor  | Fecha
John Doe        | john@example.com       | Producto A     | 50000  | 2024-06-01
Jane Smith      | jane@example.com       | Producto B     | 75000  | 2024-06-02
Bob Johnson     | bob@example.com        | Producto C     | 120000 | 2024-06-03
```

O descarga un Excel de prueba.

### 2. Cargar archivo

- [ ] Arrastra test.xlsx a la zona de drop
- [ ] **O** haz click en "Selecciona un archivo"
- [ ] El archivo se procesa (debería ser rápido)
- [ ] Aparece pantalla de "Mapeo de columnas"

### 3. Verificar detección automática

El sistema debe detectar automáticamente:
- [ ] `Nombre` → nombre (name)
- [ ] `Email` → email
- [ ] `Producto` → producto (product)
- [ ] `Valor` → valor (value)
- [ ] `Fecha` → fecha (date)

Si no detecta todo, puedes ajustar manualmente los selects.

### 4. Confirmar mapeo

- [ ] Revisa que el mapeo sea correcto
- [ ] Click en botón "Siguiente"
- [ ] Aparece "Vista previa de datos"

### 5. Validación de datos

Debe mostrar:
- [ ] "Registros válidos: 3"
- [ ] Si hay errores, aparecen en rojo
- [ ] Tabla preview con primeros 5 registros

### 6. Cargar en dashboard

- [ ] Click en "Cargar datos"
- [ ] El dashboard carga automáticamente
- [ ] Aparece nombre del archivo en header

### 7. Verificar KPIs

Debe mostrar 6 cards:
- [ ] Total Registros: 3
- [ ] Valor Total: Gs. 245.000
- [ ] Valor Promedio: Gs. 81.667
- [ ] Registros Recuperados: 0
- [ ] Tasa de Recuperación: 0%
- [ ] Registros Pendientes: 3

### 8. Verificar gráficos

- [ ] Gráfico de línea (Registros y Valor por Fecha)
- [ ] Gráfico pie (Distribución por Estado)
- [ ] Gráfico barras (Distribución por Cantidad)
- [ ] Gráfico barras (Recuperación por Fecha)

Todos deberían mostrar datos sin errores.

### 9. Verificar tabla de datos

- [ ] Tab "Datos" muestra tabla
- [ ] 3 filas de datos
- [ ] Columnas: Nombre, Email, Teléfono, Producto, Cantidad, Valor, Fecha, Estado
- [ ] Se puede hacer click en encabezados para sort
- [ ] Se puede cambiar de página (si hay muchos datos)

### 10. Verificar filtros

- [ ] Click en botón "Filtros"
- [ ] Aparece panel de filtros
- [ ] Selecciona fecha "Desde"
- [ ] Selecciona fecha "Hasta"
- [ ] Los datos se filtran automáticamente
- [ ] Click en X para borrar filtros

### 11. Verificar exportación

- [ ] Click en botón "Excel"
- [ ] Descarga archivo `.xlsx`
- [ ] Abre el Excel descargado
- [ ] Contiene los datos con columnas formateadas

- [ ] Click en botón "PDF"
- [ ] Descarga archivo `.pdf`
- [ ] Abre el PDF descargado
- [ ] Contiene KPIs resumido y tabla de datos

### 12. Verificar responsive

- [ ] Redimensiona navegador a mobile (F12 → Device Toolbar)
- [ ] Dashboard se adapta al tamaño
- [ ] KPIs se apilan en columna
- [ ] Gráficos se redimensionan
- [ ] Tabla es scrolleable

---

## POST-VALIDACIÓN

Si todo funciona:

- [ ] Puedes cargar cualquier Excel/CSV
- [ ] El sistema detecta y procesa automáticamente
- [ ] Los cálculos son correctos
- [ ] Los gráficos son interactivos
- [ ] Las exportaciones funcionan

Si algo falla:

- [ ] Revisa la consola del navegador (F12)
- [ ] Busca mensajes de error en rojo
- [ ] Verifica que todos los archivos .jsx y .js estén en sus carpetas
- [ ] Reinicia: npm run dev
- [ ] Borra cache: Ctrl+Shift+Del en navegador

---

## PROBLEMAS COMUNES Y SOLUCIONES

### Error: "Module not found: @/components/DataUploader"
**Causa**: Archivo no está en la carpeta correcta
**Solución**: Verifica que DataUploader.jsx esté en `src/components/`

### Error: "Cannot find module 'react'"
**Causa**: npm install no completó
**Solución**: Ejecuta nuevamente: `npm install`

### Error: "Port 5173 is already in use"
**Causa**: Otro proceso usa el puerto
**Solución**: Cierra la otra ventana o ejecuta: `npm run dev -- --port 5174`

### El navegador dice "Cannot GET /"
**Causa**: Vite no inició correctamente
**Solución**: Detén (Ctrl+C) y ejecuta nuevamente: `npm run dev`

### Los datos no se cargan al subir Excel
**Causa**: El Excel no tiene las columnas correctas
**Solución**: Asegúrate de que el Excel tenga columnas como "Nombre", "Email", "Valor", etc.

### Error: "readExcelFile is not a function"
**Causa**: El archivo fileReader.js no está bien importado
**Solución**: Verifica que esté en `src/utils/fileReader.js` y el path en el import sea correcto

---

## VERIFICACIÓN FINAL

Si pasaste todos los checks:

```
✅ Instalación completada
✅ Archivos en lugar correcto
✅ npm run dev ejecuta sin errores
✅ Dashboard carga en http://localhost:5173/
✅ Excel/CSV se cargan correctamente
✅ Datos se validan y procesan
✅ KPIs se calculan correctamente
✅ Gráficos se renderizan
✅ Tabla muestra datos
✅ Filtros funcionan
✅ Exportación a Excel/PDF funciona
✅ Responsive funciona en mobile
```

**¡Congratulaciones! Tu Inverfin Dashboard está 100% funcional.** 🎉

---

## SIGUIENTES PASOS

Ahora puedes:

1. **Personalizar**: Cambiar colores, logos, textos
2. **Expandir**: Agregar más gráficos, métricas, campos
3. **Producción**: Ejecutar `npm run build` para crear versión optimizada
4. **Compartir**: Subir a GitHub, Netlify, Vercel, etc.

---

**¿Problemas?** Revisa `SETUP_WINDOWS.md` o `QUICK_START.md` para guías detalladas.
