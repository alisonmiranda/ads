# Guía de Pruebas del Sistema

## 🧪 Casos de Prueba Detallados

---

## RF01: Iniciar Sesión

### Caso de prueba 1: Login exitoso - Staff
**Pasos:**
1. Abrir http://localhost:3000
2. Ingresar:
   - Email: `staff@example.com`
   - Contraseña: `123456`
3. Hacer clic en "Iniciar Sesión"

**Resultado esperado:**
- ✅ Mensaje: "Bienvenido Juan Pérez"
- ✅ Redirección a página principal
- ✅ Menú lateral muestra: "Registrar Comprobante (RF03/RF04)"
- ✅ Barra superior muestra: "👤 Juan Pérez (staff)"

---

### Caso de prueba 2: Login exitoso - Jefe de Ticketera
**Pasos:**
1. Ingresar:
   - Email: `jefe@example.com`
   - Contraseña: `123456`
2. Hacer clic en "Iniciar Sesión"

**Resultado esperado:**
- ✅ Mensaje: "Bienvenido María González"
- ✅ Menú lateral muestra:
  - "Importar Excel (RF02)"
  - "Validar Comprobantes (RF05)"

---

### Caso de prueba 3: Login con credenciales incorrectas
**Pasos:**
1. Ingresar:
   - Email: `invalido@example.com`
   - Contraseña: `wrong`
2. Hacer clic en "Iniciar Sesión"

**Resultado esperado:**
- ❌ Mensaje de error: "Credenciales incorrectas"
- ❌ No se redirige
- ❌ Usuario permanece en página de login

---

### Caso de prueba 4: Login con campos vacíos
**Pasos:**
1. Dejar campos vacíos
2. Hacer clic en "Iniciar Sesión"

**Resultado esperado:**
- ❌ Validación HTML5 impide envío
- ❌ Mensaje: "Complete todos los campos"

---

## RF02: Cargar Archivo Excel del Staff

### Caso de prueba 5: Importar Excel válido
**Prerrequisito:** Estar logueado como Jefe de Ticketera

**Pasos:**
1. Ir a "Importar Excel (RF02)"
2. Ingresar nombre del evento: "Festival Musical 2024"
3. Crear archivo Excel con esta estructura:
   ```
   cedula     | nombre          | correo              | monto
   1234567890 | Juan Pérez      | juan@example.com    | 500
   0987654321 | María González  | maria@example.com   | 750
   ```
4. Seleccionar archivo
5. Hacer clic en "Importar Datos"

**Resultado esperado:**
- ✅ Mensaje: "Datos del staff cargados correctamente. 2 registros procesados"
- ✅ Contador: "Registros procesados: 2"
- ✅ Contador: "Registros con error: 0"
- ✅ Cuadro verde de éxito

---

### Caso de prueba 6: Importar Excel sin columnas requeridas
**Pasos:**
1. Crear Excel sin columna "correo"
2. Intentar importar

**Resultado esperado:**
- ❌ Mensaje: "Formato de archivo no válido"
- ❌ Lista de errores: "Columnas faltantes: correo"
- ❌ Cuadro rojo de error

---

### Caso de prueba 7: Importar archivo con formato incorrecto
**Pasos:**
1. Intentar subir un archivo .txt o .jpg
2. Hacer clic en "Importar Datos"

**Resultado esperado:**
- ❌ Mensaje: "Formato de archivo no válido. Use Excel (.xlsx, .xls) o CSV"

---

### Caso de prueba 8: Excel con datos inválidos
**Pasos:**
1. Crear Excel con:
   ```
   cedula | nombre | correo        | monto
   123    | A      | correo_malo   | -100
   ```
2. Importar archivo

**Resultado esperado:**
- ⚠️ Mensaje: "Datos del staff cargados correctamente. 0 registros procesados"
- ⚠️ "Registros con error: 1"
- ⚠️ Lista de errores detallada

---

## RF03: Registrar Datos Básicos de Comprobante

### Caso de prueba 9: Registrar comprobante válido
**Prerrequisito:** Estar logueado como Staff

**Pasos:**
1. Ir a "Registrar Comprobante (RF03/RF04)"
2. Llenar formulario:
   - Número: `001-001-000123`
   - Fecha: `2024-12-10`
   - Proveedor: `Restaurante El Buen Sabor`
   - Monto: `45.50`
   - Descripción: `Alimentación para el equipo durante el evento`
3. Hacer clic en "Registrar Comprobante"

**Resultado esperado:**
- ✅ Mensaje: "Comprobante registrado correctamente"
- ✅ Muestra ID del comprobante
- ✅ Estado: "Pendiente de validación"
- ✅ Formulario se limpia automáticamente

---

### Caso de prueba 10: Registrar con campos vacíos
**Pasos:**
1. Dejar campo "Proveedor" vacío
2. Intentar registrar

**Resultado esperado:**
- ❌ Mensaje: "Complete todos los campos requeridos"
- ❌ Lista de errores específicos

---

### Caso de prueba 11: Monto inválido (negativo o cero)
**Pasos:**
1. Ingresar monto: `0` o `-50`
2. Intentar registrar

**Resultado esperado:**
- ❌ Validación HTML5 impide envío
- ❌ Mensaje: "Monto debe ser mayor a 0"

---

## RF04: Subir Imagen o PDF del Comprobante

### Caso de prueba 12: Subir PDF válido
**Pasos:**
1. Registrar comprobante (RF03)
2. Adjuntar archivo PDF (máx 5MB)
3. Hacer clic en "Registrar Comprobante"

**Resultado esperado:**
- ✅ Mensaje: "Comprobante registrado y documento subido correctamente"
- ✅ Muestra nombre del archivo
- ✅ Muestra tamaño del archivo

---

### Caso de prueba 13: Subir imagen válida (JPG/PNG)
**Pasos:**
1. Adjuntar imagen JPG o PNG (< 5MB)
2. Registrar

**Resultado esperado:**
- ✅ Archivo se acepta y procesa correctamente

---

### Caso de prueba 14: Archivo muy grande (>5MB)
**Pasos:**
1. Intentar subir archivo de 10MB
2. Registrar

**Resultado esperado:**
- ❌ Mensaje: "El archivo supera el tamaño máximo permitido (5MB)"

---

### Caso de prueba 15: Formato no permitido
**Pasos:**
1. Intentar subir archivo .docx o .txt
2. Registrar

**Resultado esperado:**
- ❌ Mensaje: "Formato no válido. Use JPEG, PNG o PDF"

---

## RF05: Validar Coincidencia con Datos Oficiales

### Caso de prueba 16: Validación exitosa
**Prerrequisitos:**
1. Jefe de Ticketera debe importar Excel con estos datos:
   ```
   cedula     | nombre     | correo            | monto
   1234567890 | Juan Pérez | juan@example.com  | 500
   ```
2. Staff (con cédula 1234567890) debe registrar comprobante con monto $45

**Pasos (como Jefe de Ticketera o Contadora):**
1. Ir a "Validar Comprobantes (RF05)"
2. Seleccionar el comprobante de la lista
3. Hacer clic en "Validar contra Datos Oficiales"

**Resultado esperado:**
- ✅ Mensaje: "Comprobante validado correctamente"
- ✅ Muestra datos oficiales coincidentes:
  - ✅ Nombre: Juan Pérez
  - ✅ Cédula: 1234567890
  - ✅ Correo: juan@example.com
  - ✅ Monto asignado: $500
- ✅ Estado del comprobante cambia a "Aprobado"

---

### Caso de prueba 17: Cédula no existe en Excel
**Pasos:**
1. Staff con cédula `9999999999` (no en Excel) registra comprobante
2. Jefe intenta validar

**Resultado esperado:**
- ❌ Mensaje: "La factura no corresponde al trabajador"
- ❌ Motivo: "No existe en datos oficiales"
- ❌ Estado: "Rechazado"

---

### Caso de prueba 18: Nombre no coincide
**Pasos:**
1. Excel tiene: `Juan Pérez`
2. Comprobante dice: `Juan Lopez`
3. Validar

**Resultado esperado:**
- ❌ Mensaje: "La factura no corresponde al trabajador"
- ❌ Lista de errores: "Nombre no coincide"
- ❌ Estado: "Rechazado"

---

### Caso de prueba 19: Monto excede asignado
**Pasos:**
1. Excel asigna: `$500`
2. Comprobante solicita: `$600`
3. Validar

**Resultado esperado:**
- ❌ Mensaje: "La factura no corresponde al trabajador"
- ❌ Error: "Monto excede el asignado. Solicitado: $600, Asignado: $500"
- ❌ Estado: "Rechazado"

---

## Pruebas de Integración

### Caso de prueba 20: Flujo completo exitoso
**Escenario:** Un miembro del staff registra un gasto que es validado

**Pasos:**
1. **[Jefe]** Importar Excel con datos de staff
2. **[Staff]** Hacer login
3. **[Staff]** Registrar comprobante con datos correctos
4. **[Staff]** Subir PDF del comprobante
5. **[Jefe]** Hacer login
6. **[Jefe]** Validar comprobante

**Resultado esperado:**
- ✅ Cada paso se completa exitosamente
- ✅ Comprobante termina con estado "Aprobado"
- ✅ Todas las validaciones pasan

---

### Caso de prueba 21: Control de acceso por roles
**Escenario:** Staff intenta acceder a funciones de Jefe

**Pasos:**
1. Hacer login como Staff
2. Intentar acceder manualmente a `/jefe/importar`

**Resultado esperado:**
- ❌ Redirección automática a página principal
- ❌ No se muestra la página de importación

---

## Pruebas de Patrones de Diseño

### Caso de prueba 22: Singleton - Sesión única
**Pasos:**
1. Abrir consola del navegador (F12)
2. Ejecutar:
   ```javascript
   const session1 = SessionManager.getInstance();
   const session2 = SessionManager.getInstance();
   console.log(session1 === session2); // debe ser true
   ```

**Resultado esperado:**
- ✅ Ambas variables apuntan a la misma instancia

---

### Caso de prueba 23: Factory - Creación de usuarios
**Pasos:**
1. Login como diferentes roles
2. Verificar que cada uno tenga diferentes permisos

**Resultado esperado:**
- ✅ Staff tiene permisos de Staff
- ✅ Jefe tiene permisos de Jefe
- ✅ Contadora tiene permisos de Contadora

---

### Caso de prueba 24: Observer - Notificaciones
**Pasos:**
1. Realizar cualquier acción (login, registrar, validar)
2. Observar notificaciones en la esquina

**Resultado esperado:**
- ✅ Aparece notificación visual
- ✅ Notificación tiene icono y color correcto
- ✅ Mensaje es descriptivo

---

## Checklist de Pruebas

### RF01: Login
- [ ] Login exitoso Staff
- [ ] Login exitoso Jefe Ticketera
- [ ] Login exitoso Contadora
- [ ] Login con credenciales incorrectas
- [ ] Login con campos vacíos

### RF02: Importar Excel
- [ ] Excel válido se procesa correctamente
- [ ] Excel sin columnas rechazado
- [ ] Archivo no-Excel rechazado
- [ ] Datos inválidos identificados

### RF03: Registrar Comprobante
- [ ] Registro exitoso con todos los datos
- [ ] Campos vacíos rechazados
- [ ] Monto inválido rechazado
- [ ] Formulario se limpia después

### RF04: Subir Documento
- [ ] PDF válido se sube
- [ ] JPG/PNG válidos se suben
- [ ] Archivo >5MB rechazado
- [ ] Formato no permitido rechazado

### RF05: Validar
- [ ] Validación exitosa con datos correctos
- [ ] Cédula no existente rechazada
- [ ] Nombre diferente rechazado
- [ ] Monto excedido rechazado

### Patrones de Diseño
- [ ] Singleton funciona correctamente
- [ ] Factory crea usuarios apropiados
- [ ] Observer notifica cambios
- [ ] MVC mantiene separación

---

## Herramientas de Prueba

### Navegadores recomendados:
- Google Chrome (última versión)
- Firefox (última versión)
- Microsoft Edge (última versión)

### Herramientas de desarrollo:
- React DevTools
- Consola del navegador (F12)
- Network tab para ver peticiones

---

## Reportar Bugs

Si encuentra un error, documente:
1. **Pasos para reproducir**
2. **Resultado esperado**
3. **Resultado actual**
4. **Capturas de pantalla**
5. **Navegador y versión**

---

**¡Felices pruebas!** 🧪✅
