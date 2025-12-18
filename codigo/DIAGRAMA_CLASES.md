# Diagrama de Clases del Sistema

## Diagrama UML Completo

### Vista General del Sistema

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          SISTEMA DE GESTIÓN DE COMPROBANTES                 │
└─────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────────┐
│                              CAPA DE MODELOS                                  │
└──────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────┐
│         UserModel               │
├─────────────────────────────────┤
│ - id: Number                    │
│ - name: String                  │
│ - email: String                 │
│ - cedula: String                │
│ - password: String              │
│ - role: String                  │
│ - createdAt: Date               │
├─────────────────────────────────┤
│ + constructor(data: Object)     │
│ + validate(): Object            │
│ + toJSON(): Object              │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│      StaffMemberModel           │
├─────────────────────────────────┤
│ - id: Number                    │
│ - cedula: String                │
│ - nombre: String                │
│ - correo: String                │
│ - montoAsignado: Number         │
│ - eventoId: Number              │
│ - eventoNombre: String          │
│ - fechaCarga: Date              │
├─────────────────────────────────┤
│ + constructor(data: Object)     │
│ + validate(): Object            │
│ + toJSON(): Object              │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│      ComprobanteModel           │
├─────────────────────────────────┤
│ - id: Number                    │
│ - numeroComprobante: String     │
│ - fecha: Date                   │
│ - proveedor: String             │
│ - monto: Number                 │
│ - descripcion: String           │
│ - staffCedula: String           │
│ - staffNombre: String           │
│ - archivoUrl: String            │
│ - archivoNombre: String         │
│ - estado: String                │
│ - validadoDatosOficiales: Bool  │
│ - validadoDocumento: Boolean    │
│ - observaciones: String         │
│ - fechaRegistro: Date           │
├─────────────────────────────────┤
│ + constructor(data: Object)     │
│ + validate(): Object            │
│ + isFullyValidated(): Boolean   │
│ + getEstadoLabel(): String      │
│ + toJSON(): Object              │
└─────────────────────────────────┘


┌──────────────────────────────────────────────────────────────────────────────┐
│                          CAPA DE PATRONES DE DISEÑO                          │
└──────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│                    PATRÓN SINGLETON: SessionManager                      │
├─────────────────────────────────────────────────────────────────────────┤
│                         SessionManager                                   │
│ ════════════════════════════════════════════════════════════════        │
│ - static instance: SessionManager                                        │
│ - currentUser: User                                                      │
│ ────────────────────────────────────────────────────────────────────    │
│ - constructor()                                                          │
│ + static getInstance(): SessionManager                                   │
│ + login(user: User): Boolean                                             │
│ + logout(): void                                                         │
│ + getCurrentUser(): User                                                 │
│ + isAuthenticated(): Boolean                                             │
│ + hasRole(role: String): Boolean                                         │
└─────────────────────────────────────────────────────────────────────────┘


┌─────────────────────────────────────────────────────────────────────────┐
│                    PATRÓN FACTORY METHOD: UserFactory                    │
└─────────────────────────────────────────────────────────────────────────┘

                     ┌────────────────────────┐
                     │      UserFactory       │
                     ├────────────────────────┤
                     │ + static createUser()  │
                     └──────────┬─────────────┘
                                │
                                │ crea
                                ▼
                     ┌────────────────────────┐
                     │         User           │
                     ├────────────────────────┤
                     │ # id: Number           │
                     │ # name: String         │
                     │ # email: String        │
                     │ # cedula: String       │
                     │ # role: String         │
                     ├────────────────────────┤
                     │ + getPermissions()     │
                     │ + getDashboardRoute()  │
                     └──────────┬─────────────┘
                                │
                                │ hereda
                ┌───────────────┼───────────────┐
                ▼               ▼               ▼
     ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
     │  StaffUser   │  │JefeTicketera │  │ContadoraUser │
     │              │  │    User      │  │              │
     ├──────────────┤  ├──────────────┤  ├──────────────┤
     │+ role:       │  │+ role:       │  │+ role:       │
     │  'staff'     │  │ 'jefe_tick'  │  │ 'contadora'  │
     ├──────────────┤  ├──────────────┤  ├──────────────┤
     │+ getPerms()  │  │+ getPerms()  │  │+ getPerms()  │
     │+ getRoute()  │  │+ getRoute()  │  │+ getRoute()  │
     └──────────────┘  └──────────────┘  └──────────────┘


┌─────────────────────────────────────────────────────────────────────────┐
│                    PATRÓN OBSERVER: NotificationSystem                   │
└─────────────────────────────────────────────────────────────────────────┘

                     ┌────────────────────────┐
                     │       Subject          │
                     ├────────────────────────┤
                     │ # observers: Array     │
                     ├────────────────────────┤
                     │ + attach(Observer)     │
                     │ + detach(Observer)     │
                     │ + notify(data)         │
                     └──────────┬─────────────┘
                                │
                                │ hereda
                                ▼
                     ┌────────────────────────┐
                     │ NotificationSystem     │
                     ├────────────────────────┤
                     │ - notifications: Array │
                     ├────────────────────────┤
                     │ + success(msg, detail) │
                     │ + error(msg, detail)   │
                     │ + warning(msg, detail) │
                     │ + info(msg, detail)    │
                     │ + markAsRead(id)       │
                     │ + getUnreadCount()     │
                     │ + getAllNotifications()│
                     │ + clearAll()           │
                     └────────────────────────┘


┌──────────────────────────────────────────────────────────────────────────────┐
│                          CAPA DE CONTROLADORES                                │
└──────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                      AuthController                          │
├─────────────────────────────────────────────────────────────┤
│ - sessionManager: SessionManager                             │
│ - notificationSystem: NotificationSystem                     │
│ - users: Array<UserData>                                     │
├─────────────────────────────────────────────────────────────┤
│ + constructor()                                              │
│ + initializeMockUsers(): Array                               │
│ + login(identifier: String, password: String): Object        │
│ + logout(): Object                                           │
│ + getCurrentUser(): User                                     │
│ + isAuthenticated(): Boolean                                 │
│ + hasRole(role: String): Boolean                             │
└─────────────────────────────────────────────────────────────┘
                │                    │
                │ usa                │ usa
                ▼                    ▼
    ┌──────────────────┐   ┌─────────────────┐
    │ SessionManager   │   │   UserFactory   │
    └──────────────────┘   └─────────────────┘


┌─────────────────────────────────────────────────────────────┐
│                      StaffController                         │
├─────────────────────────────────────────────────────────────┤
│ - notificationSystem: NotificationSystem                     │
│ - staffMembers: Array<StaffMemberModel>                      │
├─────────────────────────────────────────────────────────────┤
│ + constructor()                                              │
│ + importarExcel(file: File, eventoNombre: String): Object   │
│ + readExcelFile(file: File): Promise<Array>                 │
│ + validateExcelStructure(data: Array): Object               │
│ + getAllStaffMembers(): Array                                │
│ + findStaffByCedula(cedula: String): StaffMemberModel       │
│ + clearStaffData(): void                                     │
└─────────────────────────────────────────────────────────────┘
                │
                │ gestiona
                ▼
    ┌──────────────────────┐
    │  StaffMemberModel    │
    └──────────────────────┘


┌─────────────────────────────────────────────────────────────┐
│                   ComprobanteController                      │
├─────────────────────────────────────────────────────────────┤
│ - notificationSystem: NotificationSystem                     │
│ - staffController: StaffController                           │
│ - comprobantes: Array<ComprobanteModel>                      │
├─────────────────────────────────────────────────────────────┤
│ + constructor(staffController: StaffController)              │
│ + registrarComprobante(data: Object): Object                 │
│ + subirDocumento(id: Number, file: File): Object            │
│ + validateFile(file: File): Object                           │
│ + uploadFileSimulation(file: File): Promise<String>          │
│ + validarContraDatosOficiales(id: Number): Object           │
│ + getAllComprobantes(): Array                                │
│ + getComprobantesByStaff(cedula: String): Array             │
│ + getComprobanteById(id: Number): Object                     │
└─────────────────────────────────────────────────────────────┘
                │                    │
                │ gestiona           │ usa
                ▼                    ▼
    ┌──────────────────┐   ┌─────────────────┐
    │ ComprobanteModel │   │StaffController  │
    └──────────────────┘   └─────────────────┘


┌──────────────────────────────────────────────────────────────────────────────┐
│                      RELACIONES ENTRE COMPONENTES                            │
└──────────────────────────────────────────────────────────────────────────────┘

GlobalControllers
├── staffController (instancia de StaffController)
└── comprobanteController (instancia de ComprobanteController)
    └── dependencia: staffController
```

---

## Diagrama Detallado por Componente

### 1. Modelos (Capa de Datos)

#### UserModel
```
┌─────────────────────────────────────────────────┐
│              UserModel                           │
├─────────────────────────────────────────────────┤
│ Atributos:                                       │
│  - id: Number                                    │
│  - name: String                                  │
│  - email: String                                 │
│  - cedula: String                                │
│  - password: String                              │
│  - role: String ('staff'|'jefe_ticketera'|       │
│                  'contadora')                    │
│  - createdAt: Date                               │
├─────────────────────────────────────────────────┤
│ Métodos:                                         │
│  + constructor(data: Object)                     │
│    └─> Inicializa el modelo con datos           │
│                                                  │
│  + validate(): Object                            │
│    └─> Retorna {isValid: Boolean, errors: []}   │
│    └─> Valida email, cédula, password, role     │
│                                                  │
│  + toJSON(): Object                              │
│    └─> Convierte a objeto JSON (sin password)   │
└─────────────────────────────────────────────────┘
```

#### StaffMemberModel
```
┌─────────────────────────────────────────────────┐
│           StaffMemberModel                       │
├─────────────────────────────────────────────────┤
│ Atributos:                                       │
│  - id: Number                                    │
│  - cedula: String                                │
│  - nombre: String                                │
│  - correo: String                                │
│  - montoAsignado: Number                         │
│  - eventoId: Number                              │
│  - eventoNombre: String                          │
│  - fechaCarga: Date                              │
├─────────────────────────────────────────────────┤
│ Métodos:                                         │
│  + constructor(data: Object)                     │
│    └─> Inicializa modelo de miembro del staff   │
│                                                  │
│  + validate(): Object                            │
│    └─> Retorna {isValid: Boolean, errors: []}   │
│    └─> Valida cédula, nombre, correo, monto     │
│                                                  │
│  + toJSON(): Object                              │
│    └─> Convierte a objeto JSON                  │
└─────────────────────────────────────────────────┘
```

#### ComprobanteModel
```
┌─────────────────────────────────────────────────┐
│           ComprobanteModel                       │
├─────────────────────────────────────────────────┤
│ Atributos:                                       │
│  - id: Number                                    │
│  - numeroComprobante: String                     │
│  - fecha: Date                                   │
│  - proveedor: String                             │
│  - monto: Number                                 │
│  - descripcion: String                           │
│  - staffCedula: String                           │
│  - staffNombre: String                           │
│  - archivoUrl: String                            │
│  - archivoNombre: String                         │
│  - estado: String ('pendiente'|'aprobado'|       │
│                    'rechazado')                  │
│  - validadoDatosOficiales: Boolean               │
│  - validadoDocumento: Boolean                    │
│  - observaciones: String                         │
│  - fechaRegistro: Date                           │
├─────────────────────────────────────────────────┤
│ Métodos:                                         │
│  + constructor(data: Object)                     │
│    └─> Inicializa modelo de comprobante         │
│                                                  │
│  + validate(): Object                            │
│    └─> Retorna {isValid: Boolean, errors: []}   │
│    └─> Valida todos los campos obligatorios     │
│                                                  │
│  + isFullyValidated(): Boolean                   │
│    └─> true si ambas validaciones están OK      │
│                                                  │
│  + getEstadoLabel(): String                      │
│    └─> Retorna etiqueta del estado en español   │
│                                                  │
│  + toJSON(): Object                              │
│    └─> Convierte a objeto JSON                  │
└─────────────────────────────────────────────────┘
```

---

### 2. Patrones de Diseño

#### Patrón Singleton: SessionManager
```
┌─────────────────────────────────────────────────┐
│           SessionManager <<Singleton>>           │
├─────────────────────────────────────────────────┤
│ Atributos:                                       │
│  - static instance: SessionManager               │
│    └─> Única instancia del gestor               │
│                                                  │
│  - currentUser: User | null                      │
│    └─> Usuario actualmente autenticado          │
├─────────────────────────────────────────────────┤
│ Métodos:                                         │
│  - constructor()                                 │
│    └─> Privado: retorna instancia existente     │
│                                                  │
│  + static getInstance(): SessionManager          │
│    └─> Retorna o crea la única instancia        │
│                                                  │
│  + login(user: User): Boolean                    │
│    └─> Guarda usuario en sesión y localStorage  │
│                                                  │
│  + logout(): void                                │
│    └─> Limpia sesión y localStorage             │
│                                                  │
│  + getCurrentUser(): User | null                 │
│    └─> Retorna usuario actual (de memoria o LS) │
│                                                  │
│  + isAuthenticated(): Boolean                    │
│    └─> true si hay usuario autenticado          │
│                                                  │
│  + hasRole(role: String): Boolean                │
│    └─> Verifica si usuario tiene rol específico │
└─────────────────────────────────────────────────┘

Ventajas:
✓ Una sola instancia en toda la aplicación
✓ Punto de acceso global a la sesión
✓ Sincronización con localStorage
✓ Control centralizado de autenticación
```

#### Patrón Factory Method: UserFactory
```
┌─────────────────────────────────────────────────┐
│          UserFactory <<Factory>>                 │
├─────────────────────────────────────────────────┤
│ Métodos:                                         │
│  + static createUser(userData: Object): User     │
│    └─> Crea instancia según userData.role       │
│        ├─> 'staff' → StaffUser                   │
│        ├─> 'jefe_ticketera' → JefeTicketeraUser │
│        └─> 'contadora' → ContadoraUser          │
└─────────────────────────────────────────────────┘
                    │
                    │ crea
                    ▼
┌─────────────────────────────────────────────────┐
│              User <<Abstract>>                   │
├─────────────────────────────────────────────────┤
│ Atributos:                                       │
│  # id: Number                                    │
│  # name: String                                  │
│  # email: String                                 │
│  # cedula: String                                │
│  # role: String                                  │
├─────────────────────────────────────────────────┤
│ Métodos:                                         │
│  + getPermissions(): String[]                    │
│    └─> Retorna [] (sobreescrito en subclases)   │
│                                                  │
│  + getDashboardRoute(): String                   │
│    └─> Retorna '/' (sobreescrito en subclases)  │
└─────────────────────────────────────────────────┘
           │              │              │
           │ hereda       │ hereda       │ hereda
           ▼              ▼              ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│  StaffUser   │  │JefeTicketera │  │ContadoraUser │
│              │  │    User      │  │              │
├──────────────┤  ├──────────────┤  ├──────────────┤
│+ role:       │  │+ role:       │  │+ role:       │
│  'staff'     │  │ 'jefe_tick'  │  │ 'contadora'  │
├──────────────┤  ├──────────────┤  ├──────────────┤
│+ getPerms(): │  │+ getPerms(): │  │+ getPerms(): │
│  ['registrar │  │  ['importar_ │  │  ['procesar_ │
│   _comprob', │  │    excel',   │  │    pagos',   │
│   'subir_',  │  │   'validar_',│  │   'registrar │
│   ...]       │  │   ...]       │  │    _pago',   │
│              │  │              │  │   ...]       │
│+ getRoute(): │  │+ getRoute(): │  │+ getRoute(): │
│  '/staff/'   │  │  '/jefe-/'   │  │  '/contad/'  │
└──────────────┘  └──────────────┘  └──────────────┘

Permisos por Rol:
├─ StaffUser:
│  ├─ registrar_comprobante
│  ├─ subir_documento
│  ├─ consultar_estado_comprobante
│  └─ consultar_estado_pago
│
├─ JefeTicketeraUser:
│  ├─ importar_excel
│  ├─ validar_comprobantes
│  ├─ registrar_gastos
│  ├─ consultar_historial
│  └─ validar_datos_oficiales
│
└─ ContadoraUser:
   ├─ procesar_pagos
   ├─ registrar_pago_excepcional
   ├─ registrar_gastos
   ├─ consultar_historial
   ├─ validar_comprobantes
   └─ validar_datos_oficiales

Ventajas:
✓ Centraliza la creación de usuarios
✓ Fácil de extender con nuevos roles
✓ Polimorfismo en permisos y rutas
✓ Desacopla creación de uso
```

#### Patrón Observer: NotificationSystem
```
┌─────────────────────────────────────────────────┐
│            Subject <<Abstract>>                  │
├─────────────────────────────────────────────────┤
│ Atributos:                                       │
│  # observers: Observer[]                         │
│    └─> Lista de observadores suscritos          │
├─────────────────────────────────────────────────┤
│ Métodos:                                         │
│  + attach(observer: Observer): void              │
│    └─> Suscribe un observador                   │
│                                                  │
│  + detach(observer: Observer): void              │
│    └─> Desuscribe un observador                 │
│                                                  │
│  + notify(data: any): void                       │
│    └─> Notifica a todos los observadores        │
└─────────────────────────────────────────────────┘
                    │
                    │ hereda
                    ▼
┌─────────────────────────────────────────────────┐
│      NotificationSystem <<Singleton+Observer>>   │
├─────────────────────────────────────────────────┤
│ Atributos:                                       │
│  - static instance: NotificationSystem           │
│  - notifications: Notification[]                 │
│    └─> Cola de notificaciones                   │
├─────────────────────────────────────────────────┤
│ Métodos:                                         │
│  + static getInstance(): NotificationSystem      │
│    └─> Retorna instancia única                  │
│                                                  │
│  + addNotification(type, msg, details): Object   │
│    └─> Crea y notifica nueva notificación       │
│                                                  │
│  + success(message: String, details: Object)     │
│    └─> Notificación de éxito (verde)            │
│                                                  │
│  + error(message: String, details: Object)       │
│    └─> Notificación de error (rojo)             │
│                                                  │
│  + warning(message: String, details: Object)     │
│    └─> Notificación de advertencia (amarillo)   │
│                                                  │
│  + info(message: String, details: Object)        │
│    └─> Notificación informativa (azul)          │
│                                                  │
│  + markAsRead(notificationId: Number): void      │
│    └─> Marca notificación como leída            │
│                                                  │
│  + getUnreadCount(): Number                      │
│    └─> Cuenta notificaciones no leídas          │
│                                                  │
│  + getAllNotifications(): Notification[]         │
│    └─> Retorna todas las notificaciones         │
│                                                  │
│  + clearAll(): void                              │
│    └─> Limpia todas las notificaciones          │
└─────────────────────────────────────────────────┘
                    │
                    │ notifica a
                    ▼
┌─────────────────────────────────────────────────┐
│           Observer <<Interface>>                 │
├─────────────────────────────────────────────────┤
│  + update(data: any): void                       │
│    └─> Recibe notificación del Subject          │
└─────────────────────────────────────────────────┘

Estructura de Notification:
{
  id: Number,
  type: 'success' | 'error' | 'warning' | 'info',
  message: String,
  details: Object,
  timestamp: Date,
  read: Boolean
}

Ventajas:
✓ Desacopla emisor de receptores
✓ Múltiples componentes pueden observar
✓ Notificaciones centralizadas
✓ Fácil de extender con nuevos tipos
```

---

### 3. Controladores (Lógica de Negocio)

#### AuthController
```
┌─────────────────────────────────────────────────┐
│              AuthController                      │
├─────────────────────────────────────────────────┤
│ Atributos:                                       │
│  - sessionManager: SessionManager                │
│    └─> Gestión de sesión (Singleton)            │
│                                                  │
│  - notificationSystem: NotificationSystem        │
│    └─> Sistema de notificaciones (Observer)     │
│                                                  │
│  - users: Array<UserData>                        │
│    └─> Base de datos simulada de usuarios       │
├─────────────────────────────────────────────────┤
│ Métodos:                                         │
│  + constructor()                                 │
│    └─> Inicializa controlador y usuarios mock   │
│                                                  │
│  + initializeMockUsers(): Array<UserData>        │
│    └─> Crea usuarios de prueba                  │
│                                                  │
│  + login(identifier: String, password: String)   │
│    └─> Autentica usuario y crea sesión          │
│    └─> Retorna: {                                │
│         success: Boolean,                        │
│         message: String,                         │
│         user: User,                              │
│         redirectTo: String                       │
│        }                                         │
│                                                  │
│  + logout(): Object                              │
│    └─> Cierra sesión y limpia datos             │
│    └─> Retorna: {                                │
│         success: Boolean,                        │
│         message: String,                         │
│         redirectTo: String                       │
│        }                                         │
│                                                  │
│  + getCurrentUser(): User | null                 │
│    └─> Retorna usuario actual de la sesión      │
│                                                  │
│  + isAuthenticated(): Boolean                    │
│    └─> Verifica si hay sesión activa            │
│                                                  │
│  + hasRole(role: String): Boolean                │
│    └─> Verifica rol del usuario actual          │
└─────────────────────────────────────────────────┘

Dependencias:
├─ SessionManager (Singleton)
├─ UserFactory (Factory Method)
├─ NotificationSystem (Observer)
└─ UserModel

Flujo de Login:
1. Recibe identifier y password
2. Valida campos no vacíos
3. Busca usuario en base de datos mock
4. Si válido:
   a. Crea usuario con UserFactory
   b. Guarda en SessionManager
   c. Notifica éxito con NotificationSystem
   d. Retorna ruta según rol
5. Si inválido:
   a. Notifica error
   b. Retorna mensaje de error
```

#### StaffController
```
┌─────────────────────────────────────────────────┐
│              StaffController                     │
├─────────────────────────────────────────────────┤
│ Atributos:                                       │
│  - notificationSystem: NotificationSystem        │
│    └─> Sistema de notificaciones                │
│                                                  │
│  - staffMembers: Array<StaffMemberModel>         │
│    └─> Base de datos de miembros del staff      │
├─────────────────────────────────────────────────┤
│ Métodos:                                         │
│  + constructor()                                 │
│    └─> Inicializa controlador                   │
│                                                  │
│  + importarExcel(file: File, eventoNombre: Str)  │
│    └─> Importa y procesa archivo Excel          │
│    └─> Retorna: {                                │
│         success: Boolean,                        │
│         message: String,                         │
│         data: {                                  │
│           registrosProcesados: Number,           │
│           registrosConError: Number,             │
│           errores: Array,                        │
│           registros: Array                       │
│         }                                        │
│        }                                         │
│                                                  │
│  + readExcelFile(file: File): Promise<Array>     │
│    └─> Lee archivo Excel con librería XLSX      │
│    └─> Retorna datos en formato JSON            │
│                                                  │
│  + validateExcelStructure(data: Array): Object   │
│    └─> Valida columnas requeridas:              │
│        cedula, nombre, correo, monto             │
│    └─> Retorna: {isValid: Boolean, errors: []}  │
│                                                  │
│  + getAllStaffMembers(): Array<Object>           │
│    └─> Retorna todos los miembros en JSON       │
│                                                  │
│  + findStaffByCedula(cedula: String): Model      │
│    └─> Busca miembro por cédula                 │
│    └─> Retorna: StaffMemberModel | undefined    │
│                                                  │
│  + clearStaffData(): void                        │
│    └─> Limpia todos los datos (para testing)    │
└─────────────────────────────────────────────────┘

Dependencias:
├─ StaffMemberModel
├─ NotificationSystem (Observer)
└─ XLSX (librería externa)

Validaciones Excel:
✓ Archivo no vacío
✓ Extensión: .xlsx, .xls, .csv
✓ Columnas requeridas presentes
✓ Datos válidos en cada fila

Flujo de Importación:
1. Recibe archivo y nombre de evento
2. Valida extensión del archivo
3. Lee archivo con XLSX
4. Valida estructura (columnas)
5. Procesa cada fila:
   a. Crea StaffMemberModel
   b. Valida datos
   c. Si válido: agrega a staffMembers
   d. Si inválido: agrega a errores
6. Notifica resultado
7. Retorna resumen
```

#### ComprobanteController
```
┌─────────────────────────────────────────────────┐
│            ComprobanteController                 │
├─────────────────────────────────────────────────┤
│ Atributos:                                       │
│  - notificationSystem: NotificationSystem        │
│    └─> Sistema de notificaciones                │
│                                                  │
│  - staffController: StaffController              │
│    └─> Controlador de staff (para validaciones) │
│                                                  │
│  - comprobantes: Array<ComprobanteModel>         │
│    └─> Base de datos de comprobantes            │
├─────────────────────────────────────────────────┤
│ Métodos:                                         │
│  + constructor(staffController: StaffController) │
│    └─> Inicializa con referencia a staff        │
│                                                  │
│  + registrarComprobante(data: Object): Object    │
│    └─> Registra nuevo comprobante               │
│    └─> Valida datos obligatorios                │
│    └─> Retorna: {                                │
│         success: Boolean,                        │
│         message: String,                         │
│         data: ComprobanteModel                   │
│        }                                         │
│                                                  │
│  + subirDocumento(id: Number, file: File): Obj   │
│    └─> Adjunta documento al comprobante         │
│    └─> Valida formato (PDF, JPG, PNG)           │
│    └─> Valida tamaño (máx 5MB)                  │
│    └─> Simula subida de archivo                 │
│    └─> Retorna: {                                │
│         success: Boolean,                        │
│         message: String,                         │
│         data: {comprobanteId, archivoUrl, ...}   │
│        }                                         │
│                                                  │
│  + validateFile(file: File): Object              │
│    └─> Valida formato y tamaño de archivo       │
│    └─> Retorna: {isValid: Boolean, errors: []}  │
│                                                  │
│  + uploadFileSimulation(file: File): Promise<Str>│
│    └─> Simula subida y retorna URL              │
│                                                  │
│  + validarContraDatosOficiales(id: Number): Obj  │
│    └─> Valida comprobante contra datos oficiales│
│    └─> Busca staff por cédula                   │
│    └─> Valida nombre y monto asignado           │
│    └─> Actualiza estado (aprobado/rechazado)    │
│    └─> Retorna: {                                │
│         success: Boolean,                        │
│         message: String,                         │
│         data: {comprobanteId, validacion, ...}   │
│        }                                         │
│                                                  │
│  + getAllComprobantes(): Array<Object>           │
│    └─> Retorna todos los comprobantes           │
│                                                  │
│  + getComprobantesByStaff(cedula: String): Array │
│    └─> Filtra comprobantes por cédula           │
│                                                  │
│  + getComprobanteById(id: Number): Object | null │
│    └─> Busca comprobante por ID                 │
└─────────────────────────────────────────────────┘

Dependencias:
├─ ComprobanteModel
├─ StaffController (para validaciones)
└─ NotificationSystem (Observer)

Validaciones de Archivo:
✓ Formatos: PDF, JPEG, PNG
✓ Tamaño máximo: 5MB
✗ Otros formatos rechazados

Validaciones vs Datos Oficiales:
✓ Cédula existe en staff
✓ Nombre coincide
✓ Monto no excede asignado
✗ Cualquier discrepancia = rechazado

Estados de Comprobante:
├─ 'pendiente': Registrado, sin validar
├─ 'aprobado': Validado correctamente
└─ 'rechazado': Validación fallida
```

---

### 4. Archivo de Configuración Global

#### GlobalControllers
```
┌─────────────────────────────────────────────────┐
│            GlobalControllers                     │
│             (Módulo Singleton)                   │
├─────────────────────────────────────────────────┤
│ Propósito:                                       │
│  Mantener instancias únicas de controladores    │
│  compartidas entre todos los componentes        │
├─────────────────────────────────────────────────┤
│ Exports:                                         │
│  - staffController: StaffController              │
│    └─> Instancia única de StaffController       │
│                                                  │
│  - comprobanteController: ComprobanteController  │
│    └─> Instancia única de ComprobanteController │
│    └─> Vinculada con staffController            │
└─────────────────────────────────────────────────┘

Relación:
staffController ───┐
                   │
                   ├─> comprobanteController
                   │   (recibe staffController en constructor)
                   │
                   └─> Permite validaciones cruzadas

Ventaja:
✓ Estado compartido entre componentes
✓ No se duplican datos en memoria
✓ Facilita validaciones cruzadas
```

---

## Matriz de Relaciones

### Tabla de Dependencias

| Clase/Módulo           | Usa/Depende De                                        |
|------------------------|------------------------------------------------------|
| **UserModel**          | - (independiente)                                    |
| **StaffMemberModel**   | - (independiente)                                    |
| **ComprobanteModel**   | - (independiente)                                    |
| **SessionManager**     | localStorage (Web API)                               |
| **UserFactory**        | User, StaffUser, JefeTicketeraUser, ContadoraUser   |
| **NotificationSystem** | Subject                                              |
| **AuthController**     | SessionManager, UserFactory, NotificationSystem      |
| **StaffController**    | StaffMemberModel, NotificationSystem, XLSX           |
| **ComprobanteController** | ComprobanteModel, StaffController, NotificationSystem |
| **GlobalControllers**  | StaffController, ComprobanteController               |

### Flujo de Datos Completo

```
┌──────────────────────────────────────────────────────────────────┐
│                    FLUJO COMPLETO DEL SISTEMA                     │
└──────────────────────────────────────────────────────────────────┘

1. AUTENTICACIÓN (RF01)
   ┌─────────────┐
   │ Login.jsx   │ ──→ AuthController.login()
   └─────────────┘       │
                         ├─→ UserFactory.createUser()
                         ├─→ SessionManager.login()
                         └─→ NotificationSystem.success()

2. IMPORTACIÓN DE DATOS (RF02)
   ┌─────────────────┐
   │ImportarExcel.jsx│ ──→ StaffController.importarExcel()
   └─────────────────┘       │
                             ├─→ readExcelFile()
                             ├─→ validateExcelStructure()
                             ├─→ new StaffMemberModel()
                             └─→ NotificationSystem.success()

3. REGISTRO DE COMPROBANTE (RF03)
   ┌────────────────────┐
   │RegistrarComprob.jsx│ ──→ ComprobanteController.registrar()
   └────────────────────┘       │
                                ├─→ new ComprobanteModel()
                                ├─→ validate()
                                └─→ NotificationSystem.success()

4. SUBIDA DE DOCUMENTO (RF04)
   ┌────────────────────┐
   │RegistrarComprob.jsx│ ──→ ComprobanteController.subirDocumento()
   └────────────────────┘       │
                                ├─→ validateFile()
                                ├─→ uploadFileSimulation()
                                └─→ NotificationSystem.success()

5. VALIDACIÓN DE COMPROBANTE (RF05)
   ┌─────────────────────┐
   │ValidarComprobs.jsx  │ ──→ ComprobanteController.validar...()
   └─────────────────────┘       │
                                 ├─→ StaffController.findStaffByCedula()
                                 ├─→ Compara datos
                                 ├─→ Actualiza estado
                                 └─→ NotificationSystem.success/error()
```

---

## Resumen de Patrones Aplicados

| Patrón         | Componente             | Propósito                           |
|----------------|------------------------|-------------------------------------|
| **Singleton**  | SessionManager         | Gestión única de sesión             |
| **Singleton**  | NotificationSystem     | Sistema único de notificaciones     |
| **Factory**    | UserFactory            | Creación de usuarios por rol        |
| **Observer**   | NotificationSystem     | Notificaciones a componentes        |
| **MVC**        | Todo el sistema        | Separación de responsabilidades     |

---

## Notas Técnicas

### Convenciones UML
- `+` = público
- `-` = privado
- `#` = protegido
- `<<Singleton>>` = Patrón aplicado
- `<<Abstract>>` = Clase abstracta
- `<<Interface>>` = Interfaz
- `─→` = Dependencia
- `──▷` = Herencia
- `◇──` = Composición
- `◆──` = Agregación

### Características del Sistema
1. **Simulación de Backend**: Usa arrays en memoria como "base de datos"
2. **Persistencia**: Solo en localStorage (SessionManager)
3. **Validaciones**: En dos niveles (Modelo + Controlador)
4. **Patrones**: Cuatro patrones de diseño implementados
5. **Arquitectura**: MVC estricto

---

**Documento generado para el proyecto de Análisis y Diseño de Sistemas**  
**Fecha:** Diciembre 2024
