# Patrones de Diseño - Documentación Técnica

## 1. Patrón Singleton - SessionManager

### Diagrama de Clase

```
┌─────────────────────────────────────┐
│         SessionManager              │
├─────────────────────────────────────┤
│ - static instance: SessionManager   │
│ - currentUser: User                 │
├─────────────────────────────────────┤
│ + static getInstance(): SessionMgr  │
│ + login(user: User): boolean        │
│ + logout(): void                    │
│ + getCurrentUser(): User            │
│ + isAuthenticated(): boolean        │
│ + hasRole(role: string): boolean    │
└─────────────────────────────────────┘
```

### Propósito
Garantizar que solo exista **una única instancia** del gestor de sesión en toda la aplicación.

### Ventajas
- ✅ Control centralizado de la sesión
- ✅ Evita múltiples instancias conflictivas
- ✅ Acceso global desde cualquier parte de la app
- ✅ Persistencia en localStorage

### Implementación
```javascript
class SessionManager {
  static instance = null;
  
  static getInstance() {
    if (!SessionManager.instance) {
      SessionManager.instance = new SessionManager();
    }
    return SessionManager.instance;
  }
}

// Uso
const session = SessionManager.getInstance();
session.login(user);
```

### Uso en el proyecto
- **AuthController**: Gestiona login/logout
- **App.jsx**: Verifica autenticación
- **Rutas protegidas**: Validación de acceso

---

## 2. Patrón Factory Method - UserFactory

### Diagrama de Clases

```
┌──────────────────────────────┐
│        UserFactory           │
├──────────────────────────────┤
│ + static createUser(data)    │
└──────────────┬───────────────┘
               │ crea
               ▼
┌──────────────────────────────┐
│           User               │
├──────────────────────────────┤
│ # id: number                 │
│ # name: string               │
│ # email: string              │
│ # cedula: string             │
│ # role: string               │
├──────────────────────────────┤
│ + getPermissions(): string[] │
│ + getDashboardRoute(): string│
└──────────────┬───────────────┘
               │
      ┌────────┴────────┬────────┐
      ▼                 ▼        ▼
┌──────────┐   ┌───────────────┐  ┌──────────────┐
│StaffUser │   │JefeTicketera  │  │ContadoraUser │
├──────────┤   │User           │  ├──────────────┤
│+ role:   │   ├───────────────┤  │+ role:       │
│  'staff' │   │+ role:        │  │  'contadora' │
└──────────┘   │ 'jefe_ticket' │  └──────────────┘
               └───────────────┘
```

### Propósito
Encapsular la creación de diferentes tipos de usuarios según su rol, sin exponer la lógica de instanciación.

### Ventajas
- ✅ Centraliza la lógica de creación
- ✅ Fácil de extender con nuevos roles
- ✅ Cada usuario tiene permisos específicos
- ✅ Polimorfismo en las rutas y permisos

### Implementación
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
      default:
        throw new Error(`Rol no válido: ${userData.role}`);
    }
  }
}

// Uso
const user = UserFactory.createUser({
  id: 1,
  name: 'Juan',
  email: 'juan@example.com',
  cedula: '1234567890',
  role: 'staff'
});

console.log(user.getDashboardRoute()); // "/staff/dashboard"
console.log(user.getPermissions());    // ["registrar_comprobante", ...]
```

### Permisos por Rol

#### Staff
- `registrar_comprobante`
- `subir_documento`
- `consultar_estado_comprobante`
- `consultar_estado_pago`

#### Jefe de Ticketera
- `importar_excel`
- `validar_comprobantes`
- `registrar_gastos`
- `consultar_historial`
- `validar_datos_oficiales`

#### Contadora
- `procesar_pagos`
- `registrar_pago_excepcional`
- `registrar_gastos`
- `consultar_historial`
- `validar_comprobantes`
- `validar_datos_oficiales`

---

## 3. Patrón Observer - NotificationSystem

### Diagrama de Clases

```
┌────────────────────────────┐
│         Subject            │
├────────────────────────────┤
│ # observers: Observer[]    │
├────────────────────────────┤
│ + attach(obs: Observer)    │
│ + detach(obs: Observer)    │
│ + notify(data: any)        │
└────────────┬───────────────┘
             │
             │ hereda
             ▼
┌────────────────────────────┐
│   NotificationSystem       │
├────────────────────────────┤
│ - notifications: Notif[]   │
├────────────────────────────┤
│ + success(msg, details)    │
│ + error(msg, details)      │
│ + warning(msg, details)    │
│ + info(msg, details)       │
│ + markAsRead(id)           │
│ + getUnreadCount()         │
└────────────────────────────┘
             │
             │ notifica a
             ▼
┌────────────────────────────┐
│        Observer            │
├────────────────────────────┤
│ + update(data: any)        │
└────────────────────────────┘
```

### Propósito
Permitir que múltiples componentes se suscriban a notificaciones del sistema y reaccionen a cambios.

### Ventajas
- ✅ Desacoplamiento entre emisor y receptores
- ✅ Múltiples observadores simultáneos
- ✅ Notificaciones centralizadas
- ✅ Fácil de extender con nuevos tipos

### Implementación
```javascript
class NotificationSystem extends Subject {
  addNotification(type, message, details) {
    const notification = {
      id: Date.now(),
      type,        // 'success', 'error', 'warning', 'info'
      message,
      details,
      timestamp: new Date(),
      read: false
    };
    this.notifications.push(notification);
    this.notify({ action: 'new_notification', notification });
  }
}

// Uso
const notifSystem = NotificationSystem.getInstance();

// Componente A se suscribe
notifSystem.attach({
  update(data) {
    console.log('Componente A recibió:', data);
  }
});

// Cuando ocurre un evento
notifSystem.success('Comprobante registrado');
// Todos los observadores reciben la notificación
```

### Tipos de Notificaciones

| Tipo    | Color   | Icono | Uso                          |
|---------|---------|-------|------------------------------|
| success | Verde   | ✅    | Operación exitosa            |
| error   | Rojo    | ❌    | Error o fallo                |
| warning | Amarillo| ⚠️    | Advertencia                  |
| info    | Azul    | ℹ️    | Información general          |

---

## 4. Patrón MVC (Model-View-Controller)

### Diagrama de Arquitectura

```
┌─────────────────────────────────────────────────────────┐
│                        VIEW (React)                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │  Login.jsx   │  │ImportarExcel │  │ Registrar    │  │
│  │              │  │    .jsx      │  │Comprobante   │  │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘  │
└─────────┼──────────────────┼──────────────────┼─────────┘
          │                  │                  │
          │ interactúa       │                  │
          ▼                  ▼                  ▼
┌─────────────────────────────────────────────────────────┐
│                    CONTROLLER                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │    Auth      │  │    Staff     │  │ Comprobante  │  │
│  │ Controller   │  │ Controller   │  │ Controller   │  │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘  │
└─────────┼──────────────────┼──────────────────┼─────────┘
          │                  │                  │
          │ manipula         │                  │
          ▼                  ▼                  ▼
┌─────────────────────────────────────────────────────────┐
│                       MODEL                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │  UserModel   │  │StaffMember   │  │ Comprobante  │  │
│  │              │  │  Model       │  │   Model      │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
```

### Responsabilidades

#### Model (Modelo)
- Representa la **estructura de datos**
- Contiene **lógica de validación**
- Define el **formato de los objetos**

**Archivos:**
- `UserModel.js` - Datos de usuario
- `StaffMemberModel.js` - Datos del staff
- `ComprobanteModel.js` - Datos de comprobante

#### View (Vista)
- **Interfaz de usuario** (componentes React)
- Presenta datos al usuario
- Captura entrada del usuario

**Archivos:**
- `Login.jsx` - Pantalla de login
- `ImportarExcel.jsx` - Cargar Excel
- `RegistrarComprobante.jsx` - Formulario
- `ValidarComprobantes.jsx` - Lista y validación

#### Controller (Controlador)
- **Lógica de negocio**
- Procesa eventos del usuario
- Coordina Model y View

**Archivos:**
- `AuthController.js` - Autenticación
- `StaffController.js` - Gestión de staff
- `ComprobanteController.js` - Gestión de comprobantes

---

## Flujo de Datos Completo

### Ejemplo: RF01 - Login

```
1. VISTA (Login.jsx)
   └─> Usuario ingresa credenciales
   └─> Llama: authController.login(email, password)

2. CONTROLADOR (AuthController.js)
   └─> Valida formato de datos
   └─> Busca usuario en "base de datos"
   └─> Si es válido:
       ├─> Usa UserFactory para crear usuario (Factory)
       ├─> Guarda en SessionManager (Singleton)
       └─> Notifica éxito (Observer)

3. MODELO (UserModel.js)
   └─> Define estructura del usuario
   └─> Valida datos con validate()

4. PATRÓN SINGLETON
   └─> SessionManager guarda sesión única

5. PATRÓN FACTORY
   └─> Crea StaffUser/JefeTicketeraUser/ContadoraUser

6. PATRÓN OBSERVER
   └─> NotificationSystem notifica "Login exitoso"

7. VISTA
   └─> Recibe respuesta
   └─> Redirige a dashboard según rol
```

---

## Ventajas de la Arquitectura

### Separación de responsabilidades
- ✅ Modelo: Solo datos y validaciones
- ✅ Vista: Solo interfaz
- ✅ Controlador: Solo lógica de negocio

### Mantenibilidad
- ✅ Cambios en UI no afectan lógica
- ✅ Cambios en lógica no afectan UI
- ✅ Fácil de testear cada capa

### Escalabilidad
- ✅ Fácil agregar nuevos modelos
- ✅ Fácil agregar nuevas vistas
- ✅ Fácil agregar nuevos controladores

### Reutilización
- ✅ Controladores reutilizables
- ✅ Modelos reutilizables
- ✅ Componentes reutilizables

---

## Resumen de Patrones

| Patrón         | Propósito                      | Archivo                        |
|----------------|--------------------------------|--------------------------------|
| **Singleton**  | Una sola instancia de sesión   | `SessionManager.js`            |
| **Factory**    | Crear usuarios según rol       | `UserFactory.js`               |
| **Observer**   | Notificaciones centralizadas   | `NotificationSystem.js`        |
| **MVC**        | Separar datos, vista y lógica  | `models/`, `views/`, `controllers/` |

---

**Documentación creada para el proyecto de Análisis y Diseño de Sistemas - 6to Semestre**
