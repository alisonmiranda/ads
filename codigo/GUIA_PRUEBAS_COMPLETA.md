# 🎯 GUÍA DE PRUEBA DEL SISTEMA

## Credenciales de Acceso

### 👨‍💼 Jefe de Ticketera
- **Email:** jefe@ticketera.com
- **Cédula:** 1234567890
- **Contraseña:** jefe123
- **Funciones:** 
  - RF02: Cargar Excel del Staff
  - RF05: Validar Comprobantes

### 👩‍💼 Contadora
- **Email:** contadora@empresa.com
- **Cédula:** 0987654321
- **Contraseña:** conta123
- **Funciones:**
  - RF05: Validar Comprobantes

### 👷 Staff
- **Email:** staff@evento.com
- **Cédula:** 1122334455
- **Contraseña:** staff123
- **Funciones:**
  - RF03: Registrar Comprobante
  - RF04: Subir Documento

---

## 📋 FLUJO DE PRUEBA COMPLETO

### PASO 1: Login (RF01)
1. Abrir http://localhost:3000
2. Ingresar email o cédula + contraseña
3. Sistema valida y redirige según rol
4. ✅ **Validación:** Muestra "Credenciales incorrectas" si los datos son inválidos

### PASO 2: Cargar Excel del Staff (RF02)
1. Iniciar sesión como **Jefe de Ticketera**
2. Ir a "Importar Excel"
3. Crear un archivo Excel con las siguientes columnas:
   - **Cedula** | **Nombre** | **Correo** | **Monto**
4. Ejemplo de datos:
   ```
   1122334455 | Carlos Rodríguez | staff@evento.com | 500
   1111111111 | Ana Martínez | ana@evento.com | 300
   2222222222 | Pedro López | pedro@evento.com | 400
   ```
5. Cargar el archivo
6. ✅ **Validación:** Muestra "Formato de archivo no válido" si faltan columnas
7. ✅ **Validación:** Muestra "Datos del staff cargados correctamente" si todo está bien

### PASO 3: Registrar Comprobante (RF03)
1. Cerrar sesión y entrar como **Staff**
2. Ir a "Registrar Comprobante"
3. Llenar el formulario:
   - Número: 001-001-000123
   - Fecha: (fecha actual)
   - Proveedor: Restaurant El Buen Sabor
   - Monto: 45.50
   - Descripción: Almuerzo para equipo de producción
4. ✅ **Validación:** Muestra "Complete todos los campos requeridos" si falta algo
5. ✅ **Validación:** Muestra "Comprobante registrado correctamente" cuando se guarda

### PASO 4: Subir Documento (RF04)
1. En el mismo formulario de registro
2. Seleccionar una imagen (JPG, PNG) o PDF
3. El archivo se adjunta automáticamente al comprobante
4. ✅ **Validación:** Muestra "Archivo no válido" si supera 5MB o formato incorrecto
5. ✅ **Validación:** Muestra confirmación cuando se sube correctamente

### PASO 5: Validar contra Datos Oficiales (RF05)
1. Cerrar sesión y entrar como **Jefe de Ticketera** o **Contadora**
2. Ir a "Validar Comprobantes"
3. Seleccionar un comprobante de la lista
4. Click en "Validar contra Datos Oficiales"
5. ✅ **Validación exitosa:** Si la cédula coincide con el Excel cargado
6. ❌ **Validación rechazada:** "La factura no corresponde al trabajador" si:
   - La cédula no existe en datos oficiales
   - El nombre no coincide
   - El monto excede el asignado

---

## 🎨 Patrones de Diseño Implementados

### 1. Singleton (SessionManager)
- Garantiza una única instancia del gestor de sesión
- Archivo: `src/patterns/Singleton/SessionManager.js`

### 2. Factory Method (UserFactory)
- Crea usuarios específicos según rol (Staff, Jefe, Contadora)
- Archivo: `src/patterns/FactoryMethod/UserFactory.js`

### 3. Observer (NotificationSystem)
- Sistema de notificaciones centralizado
- Archivo: `src/patterns/Observer/NotificationSystem.js`

### 4. MVC (Arquitectura completa)
- **Models:** ComprobanteModel, StaffMemberModel, UserModel
- **Views:** Login, ImportarExcel, RegistrarComprobante, ValidarComprobantes
- **Controllers:** AuthController, StaffController, ComprobanteController

---

## 🧪 PRUEBAS ESPECÍFICAS DE VALIDACIÓN

### RF01: Credenciales incorrectas
```
Email: usuario@falso.com
Password: cualquiera
Resultado esperado: "Credenciales incorrectas"
```

### RF02: Formato Excel inválido
```
Archivo sin columna "Monto"
Resultado esperado: "Formato de archivo no válido"
```

### RF03: Campos incompletos
```
Dejar campo "Proveedor" vacío
Resultado esperado: "Complete todos los campos requeridos"
```

### RF04: Archivo muy grande
```
Intentar subir archivo > 5MB
Resultado esperado: "Archivo no válido"
```

### RF05: Cédula no existe
```
Comprobante con cédula: 9999999999 (no existe en Excel)
Resultado esperado: "La factura no corresponde al trabajador"
```

### RF05: Monto excedido
```
Staff asignado: $500
Comprobante: $600
Resultado esperado: "La factura no corresponde al trabajador - Monto excede el asignado"
```

---

## 📊 Ejemplo de Excel para RF02

Crear archivo `staff_oficial.xlsx`:

| Cedula     | Nombre            | Correo              | Monto |
|------------|-------------------|---------------------|-------|
| 1122334455 | Carlos Rodríguez  | staff@evento.com    | 500   |
| 1111111111 | Ana Martínez      | ana@evento.com      | 300   |
| 2222222222 | Pedro López       | pedro@evento.com    | 400   |
| 3333333333 | Laura Silva       | laura@evento.com    | 350   |

Guardar como Excel (.xlsx) y usar en la carga.

---

## 🚀 Comandos de Ejecución

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Acceder al sistema
http://localhost:3000
```

---

## ✅ Checklist de Funcionalidades

- [x] RF01: Login con validación de credenciales
- [x] RF01: Redirección automática según rol
- [x] RF02: Carga de Excel con validación de estructura
- [x] RF02: Procesamiento y almacenamiento de datos oficiales
- [x] RF03: Formulario de registro de comprobantes
- [x] RF03: Validación de campos obligatorios
- [x] RF04: Subida de archivos (PDF/Imágenes)
- [x] RF04: Validación de formato y tamaño
- [x] RF05: Validación contra datos oficiales del Excel
- [x] RF05: Comparación de cédula, nombre y monto
- [x] Singleton Pattern (SessionManager)
- [x] Factory Method Pattern (UserFactory)
- [x] Observer Pattern (NotificationSystem)
- [x] Arquitectura MVC completa

---

## 📝 Notas Importantes

1. **Orden de prueba:** Primero cargar Excel (RF02), luego registrar comprobantes (RF03/RF04), finalmente validar (RF05)
2. **Datos persistentes:** Los datos se mantienen en memoria durante la sesión
3. **Validaciones:** Todas las validaciones especificadas en las historias de usuario están implementadas
4. **Notificaciones:** El sistema muestra notificaciones en tiempo real para cada acción

---

## 🎓 Documentación Adicional

- **PATRONES_DISEÑO.md**: Explicación detallada de cada patrón
- **ARQUITECTURA.md**: Estructura MVC del proyecto
- **API_ENDPOINTS.md**: Documentación de controladores
