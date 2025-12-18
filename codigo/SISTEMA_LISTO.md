# 🎉 SISTEMA LISTO PARA USAR

## ✅ El servidor ya está corriendo en: http://localhost:3000

---

## 🚀 INICIO RÁPIDO

### 1️⃣ Abre tu navegador en:
```
http://localhost:3000
```

### 2️⃣ Inicia sesión con cualquiera de estos usuarios:

**👨‍💼 Jefe de Ticketera**
```
Email: jefe@ticketera.com
Password: jefe123
```
*Puede cargar Excel del staff y validar comprobantes*

**👩‍💼 Contadora**
```
Email: contadora@empresa.com
Password: conta123
```
*Puede validar comprobantes*

**👷 Staff (Trabajador)**
```
Email: staff@evento.com
Password: staff123
```
*Puede registrar comprobantes y subir documentos*

---

## 📝 FLUJO DE PRUEBA RECOMENDADO

### PASO 1: Cargar datos del staff (RF02)
1. Login como **Jefe de Ticketera**
2. Ir a "Importar Excel"
3. Crear un Excel con estas columnas:
   ```
   Cedula | Nombre | Correo | Monto
   ```
4. Ejemplo de datos:
   ```
   1122334455 | Carlos Rodríguez | staff@evento.com | 500
   1111111111 | Ana Martínez | ana@evento.com | 300
   ```
5. Guardar como .xlsx y cargar
6. ✅ Verás: "Datos del staff cargados correctamente"

### PASO 2: Registrar un comprobante (RF03 + RF04)
1. Cerrar sesión (botón arriba a la derecha)
2. Login como **Staff**
3. Ir a "Registrar Comprobante"
4. Llenar todos los campos:
   - Número: 001-001-000123
   - Fecha: (hoy)
   - Proveedor: Restaurant El Buen Sabor
   - Monto: 45.50
   - Descripción: Almuerzo para equipo
5. (Opcional) Adjuntar una imagen o PDF
6. Click "Registrar Comprobante"
7. ✅ Verás: "Comprobante registrado correctamente"

### PASO 3: Validar el comprobante (RF05)
1. Cerrar sesión
2. Login como **Contadora** o **Jefe**
3. Ir a "Validar Comprobantes"
4. Click en el comprobante que acabas de crear
5. Click "Validar contra Datos Oficiales"
6. ✅ Si los datos coinciden con el Excel: **APROBADO**
7. ❌ Si no coinciden: "La factura no corresponde al trabajador"

---

## 🎯 VALIDACIONES QUE PUEDES PROBAR

### ❌ Credenciales incorrectas (RF01)
```
Email: falso@email.com
Password: 123
Resultado: "Credenciales incorrectas"
```

### ❌ Excel sin columnas requeridas (RF02)
```
Cargar Excel sin columna "Monto"
Resultado: "Formato de archivo no válido"
```

### ❌ Campos vacíos en comprobante (RF03)
```
Dejar campo "Proveedor" vacío
Resultado: "Complete todos los campos requeridos"
```

### ❌ Archivo muy grande (RF04)
```
Intentar subir archivo > 5MB
Resultado: "Archivo no válido"
```

### ❌ Cédula no existe (RF05)
```
Registrar comprobante con cédula que NO está en el Excel
Resultado: "La factura no corresponde al trabajador"
```

### ❌ Monto excedido (RF05)
```
Staff tiene $500 asignados
Comprobante por $600
Resultado: "La factura no corresponde al trabajador - Monto excede"
```

---

## 📊 CREAR EXCEL DE PRUEBA

1. Abrir Excel o Google Sheets
2. Crear estas columnas:
   | Cedula     | Nombre           | Correo             | Monto |
   |------------|------------------|--------------------|-------|
   | 1122334455 | Carlos Rodríguez | staff@evento.com   | 500   |
   | 1111111111 | Ana Martínez     | ana@evento.com     | 300   |
   | 2222222222 | Pedro López      | pedro@evento.com   | 400   |

3. Guardar como "staff_oficial.xlsx"
4. Usar en RF02

---

## 🎨 PATRONES DE DISEÑO EN ACCIÓN

### Singleton
- `SessionManager.getInstance()` - Una sola instancia de sesión

### Factory Method
- `UserFactory.createUser(role)` - Crea usuario según rol

### Observer
- `NotificationSystem` - Notificaciones en tiempo real

### MVC
- **Models:** Validan y almacenan datos
- **Views:** Interfaz React
- **Controllers:** Lógica de negocio

---

## 📱 NAVEGACIÓN POR ROL

**Staff ve:**
- 📝 Registrar Comprobante

**Jefe de Ticketera ve:**
- 📤 Importar Excel
- ✅ Validar Comprobantes

**Contadora ve:**
- ✅ Validar Comprobantes

---

## 🐛 Si algo no funciona

1. **El servidor no responde:**
   ```bash
   npm run dev
   ```

2. **No muestra las vistas:**
   - Cierra sesión y vuelve a entrar
   - Limpia caché del navegador (Ctrl + Shift + R)

3. **Excel no carga:**
   - Verifica que tenga las 4 columnas: Cedula, Nombre, Correo, Monto
   - Usa formato .xlsx

4. **Validación no funciona:**
   - Primero carga el Excel (RF02)
   - Luego registra comprobante con la misma cédula
   - Finalmente valida (RF05)

---

## 📚 DOCUMENTACIÓN COMPLETA

- `GUIA_PRUEBAS_COMPLETA.md` - Guía detallada de pruebas
- `FUNCIONALIDADES_COMPLETAS.md` - Lista completa de funcionalidades
- `PATRONES_DISEÑO.md` - Explicación de patrones
- `README.md` - Documentación del proyecto

---

## ✅ TODO ESTÁ FUNCIONANDO

- ✅ RF01: Login con validación
- ✅ RF02: Carga de Excel
- ✅ RF03: Registro de comprobantes
- ✅ RF04: Subida de documentos
- ✅ RF05: Validación contra datos oficiales
- ✅ Singleton Pattern
- ✅ Factory Method Pattern
- ✅ Observer Pattern
- ✅ Arquitectura MVC

---

## 🎓 ¡Disfruta probando el sistema!

**El sistema está 100% funcional y listo para demostración.** 🚀

Si necesitas ayuda, revisa la documentación o las credenciales de prueba arriba.
