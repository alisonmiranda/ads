# Sistema de Gestión y Validación de Comprobantes para Eventos

## 📋 Descripción General

Sistema web desarrollado en **React** que digitaliza y automatiza el proceso de registro, validación y pago de gastos del personal (staff) que trabaja en eventos organizados. Implementa los patrones de diseño **MVC**, **Singleton**, **Factory Method** y **Observer**.

---

## 🎯 Problema que Resuelve

Actualmente, la organización maneja manualmente:
- ❌ Registro de comprobantes de gastos del personal
- ❌ Validación de facturas y documentos
- ❌ Procesamiento de pagos al staff
- ❌ Control de gastos operativos

**Consecuencias:**
- Riesgo de fraude o suplantación
- Falta de trazabilidad
- Procesos lentos y propensos a errores
- El personal no conoce el estado de sus pagos

---

## ✅ Solución Propuesta

Sistema web con **tres roles de usuario** que automatiza el flujo completo:
1. **Staff:** Registra comprobantes y consulta estados
2. **Jefe de Ticketera:** Importa datos oficiales y valida comprobantes
3. **Contadora:** Valida comprobantes y procesa pagos

---

## 🏗️ Arquitectura del Sistema

### Patrón MVC (Model-View-Controller)

```
src/
├── models/                    # MODELOS
│   ├── UserModel.js
│   ├── StaffMemberModel.js
│   └── ComprobanteModel.js
│
├── views/                     # VISTAS (Componentes React)
│   ├── Login/
│   │   ├── Login.jsx
│   │   └── Login.css
│   ├── JefeTicketera/
│   │   ├── ImportarExcel.jsx
│   │   └── ImportarExcel.css
│   ├── Staff/
│   │   ├── RegistrarComprobante.jsx
│   │   └── RegistrarComprobante.css
│   └── Validacion/
│       ├── ValidarComprobantes.jsx
│       └── ValidarComprobantes.css
│
└── controllers/               # CONTROLADORES
    ├── AuthController.js
    ├── StaffController.js
    └── ComprobanteController.js
```

---

## 🎨 Patrones de Diseño Implementados

### 1. Singleton Pattern
**Archivo:** `src/patterns/Singleton/SessionManager.js`

**Propósito:** Garantizar una única instancia del manejador de sesión en toda la aplicación.

**Implementación:**
```javascript
class SessionManager {
  static instance = null;
  
  static getInstance() {
    if (!SessionManager.instance) {
      SessionManager.instance = new SessionManager();
    }
    return SessionManager.instance;
  }
  
  login(user) { ... }
  logout() { ... }
  getCurrentUser() { ... }
}
```

**Uso:**
```javascript
const sessionManager = SessionManager.getInstance();
sessionManager.login(user);
```

---

### 2. Factory Method Pattern
**Archivo:** `src/patterns/FactoryMethod/UserFactory.js`

**Propósito:** Crear instancias de diferentes tipos de usuarios según su rol.

**Implementación:**
```javascript
class UserFactory {
  static createUser(userData) {
    switch (userData.role) {
      case 'staff':
        return new StaffUser(id, name, email, cedula);
      case 'jefe_ticketera':
        return new JefeTicketeraUser(id, name, email, cedula);
      case 'contadora':
        return new ContadoraUser(id, name, email, cedula);
    }
  }
}
```

**Ventajas:**
- Encapsula la lógica de creación de usuarios
- Cada tipo de usuario tiene sus propios permisos y rutas
- Fácil de extender con nuevos roles

---

### 3. Observer Pattern
**Archivo:** `src/patterns/Observer/NotificationSystem.js`

**Propósito:** Notificar a múltiples componentes sobre cambios en el sistema.

**Implementación:**
```javascript
class NotificationSystem extends Subject {
  addNotification(type, message, details) {
    const notification = { type, message, details, timestamp: new Date() };
    this.notifications.push(notification);
    this.notify({ action: 'new_notification', notification });
  }
  
  success(message, details) { ... }
  error(message, details) { ... }
}
```

**Uso:**
```javascript
const notificationSystem = NotificationSystem.getInstance();
notificationSystem.success('Comprobante registrado correctamente');
```

---

## 📚 Requisitos Funcionales Implementados

### RF01: Iniciar Sesión según Rol del Sistema

**Usuario:** Jefe de Ticketera / Contadora / Staff  
**Prioridad:** Alta  
**Archivos:**
- `src/controllers/AuthController.js`
- `src/views/Login/Login.jsx`

**Flujo:**
1. Usuario ingresa credenciales (correo/cédula y contraseña)
2. Sistema valida contra base de datos simulada
3. Si válido: Crea sesión con **Singleton** y crea usuario con **Factory Method**
4. Redirige a interfaz según rol

**Validaciones:**
- ❌ Credenciales incorrectas → "Credenciales incorrectas"
- ✅ Credenciales válidas → Redirección automática según rol

**Credenciales de prueba:**
```
Staff:           staff@example.com / 123456
Jefe Ticketera:  jefe@example.com / 123456
Contadora:       contadora@example.com / 123456
```

---

### RF02: Cargar Archivo Excel con Datos Oficiales del Staff

**Usuario:** Jefe de Ticketera  
**Prioridad:** Alta  
**Archivos:**
- `src/controllers/StaffController.js`
- `src/views/JefeTicketera/ImportarExcel.jsx`

**Flujo:**
1. Usuario selecciona archivo Excel (.xlsx, .xls, .csv)
2. Sistema valida formato y estructura
3. Verifica columnas requeridas: `cedula`, `nombre`, `correo`, `monto`
4. Procesa cada registro y valida datos
5. Guarda en "base de datos" (array en memoria)

**Validaciones:**
- ❌ Archivo sin columnas requeridas → "Formato de archivo no válido"
- ❌ Archivo vacío → "El archivo está vacío"
- ✅ Archivo válido → "Datos del staff cargados correctamente"

**Estructura del Excel:**
| Cédula     | Nombre          | Correo              | Monto |
|------------|-----------------|---------------------|-------|
| 1234567890 | Juan Pérez      | juan@example.com    | 500   |
| 0987654321 | María González  | maria@example.com   | 750   |

---

### RF03: Registrar Datos Básicos de un Comprobante

**Usuario:** Staff  
**Prioridad:** Alta  
**Archivos:**
- `src/controllers/ComprobanteController.js`
- `src/views/Staff/RegistrarComprobante.jsx`

**Flujo:**
1. Staff completa formulario con:
   - Número de comprobante
   - Fecha
   - Proveedor
   - Monto
   - Descripción
2. Sistema valida campos obligatorios
3. Crea instancia de `ComprobanteModel`
4. Guarda en base de datos

**Validaciones:**
- ❌ Campos vacíos → "Complete todos los campos requeridos"
- ❌ Monto ≤ 0 → "Monto debe ser mayor a 0"
- ✅ Formulario válido → "Comprobante registrado correctamente"

---

### RF04: Subir Imagen o PDF del Comprobante

**Usuario:** Staff  
**Prioridad:** Alta  
**Archivos:**
- `src/controllers/ComprobanteController.js`
- `src/views/Staff/RegistrarComprobante.jsx`

**Flujo:**
1. Usuario adjunta archivo (PDF, JPG, PNG)
2. Sistema valida:
   - Formato permitido (PDF, JPEG, PNG)
   - Tamaño máximo (5MB)
3. Simula subida de archivo
4. Asocia archivo al comprobante registrado

**Validaciones:**
- ❌ Archivo > 5MB → "El archivo supera el tamaño máximo permitido"
- ❌ Formato no válido → "Formato no válido. Use JPEG, PNG o PDF"
- ✅ Archivo válido → "Documento subido correctamente"

---

### RF05: Validar Coincidencia con Datos Oficiales del Staff

**Usuario:** Jefe de Ticketera / Contadora  
**Prioridad:** Alta  
**Archivos:**
- `src/controllers/ComprobanteController.js`
- `src/views/Validacion/ValidarComprobantes.jsx`

**Flujo:**
1. Usuario selecciona comprobante a validar
2. Sistema busca datos oficiales del staff por cédula
3. Compara:
   - Nombre del trabajador
   - Cédula
   - Monto (no debe exceder monto asignado)
4. Marca comprobante como `aprobado` o `rechazado`

**Validaciones:**
- ❌ Cédula no existe en Excel → "La factura no corresponde al trabajador"
- ❌ Nombre no coincide → Estado: Rechazado
- ❌ Monto excede asignado → Estado: Rechazado
- ✅ Todos los datos coinciden → "Comprobante validado correctamente"

---

## 🚀 Instalación y Ejecución

### Prerrequisitos
- Node.js 16+ 
- npm o yarn

### Pasos de instalación

1. **Instalar dependencias:**
```powershell
npm install
```

2. **Iniciar servidor de desarrollo:**
```powershell
npm run dev
```

3. **Acceder a la aplicación:**
```
http://localhost:3000
```

---

## 📁 Estructura del Proyecto

```
proyecto/
├── index.html                 # HTML principal
├── package.json               # Dependencias
├── vite.config.js             # Configuración de Vite
└── src/
    ├── main.jsx               # Punto de entrada
    ├── App.jsx                # Componente principal
    ├── App.css                # Estilos globales
    │
    ├── patterns/              # Patrones de diseño
    │   ├── Singleton/
    │   │   └── SessionManager.js
    │   ├── FactoryMethod/
    │   │   └── UserFactory.js
    │   └── Observer/
    │       └── NotificationSystem.js
    │
    ├── models/                # Modelos (MVC)
    │   ├── UserModel.js
    │   ├── StaffMemberModel.js
    │   └── ComprobanteModel.js
    │
    ├── controllers/           # Controladores (MVC)
    │   ├── AuthController.js
    │   ├── StaffController.js
    │   └── ComprobanteController.js
    │
    └── views/                 # Vistas (MVC)
        ├── Login/
        ├── JefeTicketera/
        ├── Staff/
        └── Validacion/
```

---

## 🔐 Roles y Permisos

### Staff
- ✅ Registrar comprobantes (RF03)
- ✅ Subir documentos (RF04)
- ✅ Consultar estado de comprobantes
- ✅ Consultar estado de pagos

### Jefe de Ticketera
- ✅ Importar Excel del staff (RF02)
- ✅ Validar comprobantes (RF05)
- ✅ Registrar gastos operativos
- ✅ Consultar historial de gastos

### Contadora
- ✅ Validar comprobantes (RF05)
- ✅ Procesar pagos al staff
- ✅ Registrar pagos excepcionales
- ✅ Consultar historial de gastos

---

## 🧪 Casos de Prueba

### Prueba RF01: Login
1. **Caso válido:**
   - Email: `staff@example.com`
   - Password: `123456`
   - Resultado esperado: Redirección a `/staff/dashboard`

2. **Caso inválido:**
   - Email: `invalido@example.com`
   - Password: `wrong`
   - Resultado esperado: "Credenciales incorrectas"

---

### Prueba RF02: Importar Excel
1. **Caso válido:**
   - Archivo con columnas: cedula, nombre, correo, monto
   - Resultado esperado: "Datos del staff cargados correctamente"

2. **Caso inválido:**
   - Archivo sin columna "cedula"
   - Resultado esperado: "Formato de archivo no válido"

---

### Prueba RF03: Registrar Comprobante
1. **Caso válido:**
   - Todos los campos completos
   - Monto > 0
   - Resultado esperado: "Comprobante registrado correctamente"

2. **Caso inválido:**
   - Descripción vacía
   - Resultado esperado: "Complete todos los campos requeridos"

---

### Prueba RF04: Subir Documento
1. **Caso válido:**
   - Archivo PDF de 2MB
   - Resultado esperado: "Documento subido correctamente"

2. **Caso inválido:**
   - Archivo de 10MB
   - Resultado esperado: "El archivo supera el tamaño máximo permitido"

---

### Prueba RF05: Validar Comprobante
1. **Caso válido:**
   - Cédula existe en Excel
   - Nombre coincide
   - Monto dentro del asignado
   - Resultado esperado: "Comprobante validado correctamente"

2. **Caso inválido:**
   - Cédula no existe en Excel
   - Resultado esperado: "La factura no corresponde al trabajador"

---

## 📊 Diagrama de Flujo

### Flujo completo del proceso

```
1. PREPARACIÓN
   └─> [Jefe Ticketera] Importa Excel con datos oficiales (RF02)

2. REGISTRO
   ├─> [Staff] Registra comprobante (RF03)
   └─> [Staff] Sube documento (RF04)

3. VALIDACIÓN
   └─> [Jefe/Contadora] Valida contra datos oficiales (RF05)
         ├─> ✅ Aprobado → Estado: "Aprobado"
         └─> ❌ Rechazado → Estado: "Rechazado"

4. SEGUIMIENTO
   └─> [Staff] Consulta estado del comprobante
```

---

## 🛠️ Tecnologías Utilizadas

- **React 18.2** - Framework frontend
- **React Router DOM 6.20** - Enrutamiento
- **Vite 5** - Build tool
- **XLSX 0.18** - Lectura de archivos Excel
- **CSS3** - Estilos

---

## 📝 Notas Importantes

### Base de datos simulada
El sistema usa arrays en memoria para simular la base de datos. En producción, se debe implementar:
- Backend con Node.js/Express o similar
- Base de datos PostgreSQL/MySQL
- API REST para comunicación
- Autenticación con JWT

### Almacenamiento de archivos
Los archivos se simulan con URLs locales. En producción:
- Usar servicio de almacenamiento (AWS S3, Azure Blob, etc.)
- Implementar OCR para validación de documentos

### Validación de documentos
La validación RF06 (comparar formulario vs documento) requiere:
- OCR (Tesseract.js o servicio cloud)
- Análisis de imagen
- Extracción de datos

---

## 👥 Responsables del Desarrollo

### Historias RF01-RF05
- **Gabriel Vivanco** - Implementación completa de los 5 requisitos funcionales
- **Coordinador:** David Moran (RF01-RF08 del proyecto completo)
- **Coordinador:** Samir Mideros (RF09-RF12 del proyecto completo)

---

## 📄 Licencia

Este proyecto es parte de un trabajo académico para la materia de Análisis y Diseño de Sistemas.

**Universidad:** [Nombre de la universidad]  
**Semestre:** 6to Semestre  
**Fecha:** Diciembre 2024

---

## 🔍 Conceptos Clave

### Patrón MVC
- **Model:** Representa los datos (UserModel, ComprobanteModel)
- **View:** Interfaz de usuario (Login.jsx, ImportarExcel.jsx)
- **Controller:** Lógica de negocio (AuthController, StaffController)

### Singleton
- Una sola instancia en toda la aplicación
- Usado para SessionManager y NotificationSystem

### Factory Method
- Crea objetos sin especificar la clase exacta
- Usado para crear diferentes tipos de usuarios

### Observer
- Notifica cambios a múltiples observadores
- Usado para sistema de notificaciones

---

## 📞 Soporte

Para preguntas o problemas:
- Email: [correo del equipo]
- Repositorio: [URL del repositorio]

---

**¡Sistema listo para usar!** 🎉
