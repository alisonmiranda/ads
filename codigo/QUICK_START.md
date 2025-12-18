# 🚀 Quick Start - Inicio Rápido

## Instalación en 3 pasos

### 1️⃣ Instalar dependencias
```powershell
npm install
```

### 2️⃣ Iniciar servidor
```powershell
npm run dev
```

### 3️⃣ Abrir navegador
```
http://localhost:3000
```

---

## 🔑 Credenciales de Acceso

### Staff (Personal del Evento)
```
Email: staff@example.com
Contraseña: 123456
```

### Jefe de Ticketera
```
Email: jefe@example.com
Contraseña: 123456
```

### Contadora
```
Email: contadora@example.com
Contraseña: 123456
```

---

## 🎯 Flujo de Prueba Rápido

### 1. Como Jefe de Ticketera

**Importar datos oficiales del staff:**
1. Login con `jefe@example.com`
2. Ir a "Importar Excel (RF02)"
3. Crear Excel con estas columnas:
   - cedula | nombre | correo | monto
4. Ejemplo:
   ```
   1234567890 | Juan Pérez | juan@example.com | 500
   ```
5. Subir archivo
6. ✅ Confirmar carga exitosa

---

### 2. Como Staff

**Registrar un comprobante:**
1. Cerrar sesión (si estabas como Jefe)
2. Login con `staff@example.com`
3. Ir a "Registrar Comprobante"
4. Llenar datos:
   - Número: 001-001-000123
   - Fecha: Hoy
   - Proveedor: Restaurante El Buen Sabor
   - Monto: 45.50
   - Descripción: Alimentación del equipo
5. Adjuntar PDF o imagen (opcional)
6. Registrar
7. ✅ Confirmar registro exitoso

---

### 3. Como Jefe/Contadora

**Validar comprobante:**
1. Login como Jefe o Contadora
2. Ir a "Validar Comprobantes (RF05)"
3. Seleccionar comprobante de la lista
4. Click en "Validar contra Datos Oficiales"
5. ✅ Ver resultado de validación

---

## 📋 Requisitos Funcionales

| RF   | Descripción                    | Usuario            |
|------|--------------------------------|--------------------|
| RF01 | Iniciar sesión                 | Todos              |
| RF02 | Importar Excel del staff       | Jefe Ticketera     |
| RF03 | Registrar comprobante          | Staff              |
| RF04 | Subir documento                | Staff              |
| RF05 | Validar comprobante            | Jefe/Contadora     |

---

## 🎨 Patrones Implementados

- ✅ **Singleton** - SessionManager (gestión de sesión única)
- ✅ **Factory Method** - UserFactory (creación de usuarios por rol)
- ✅ **Observer** - NotificationSystem (notificaciones)
- ✅ **MVC** - Arquitectura completa (Model-View-Controller)

---

## 📚 Documentación Completa

- `README.md` - Documentación general
- `PATRONES_DISEÑO.md` - Explicación de patrones
- `GUIA_PRUEBAS.md` - Casos de prueba detallados
- `FORMATO_EXCEL.md` - Estructura del Excel

---

## ❓ Problemas Comunes

### "Module not found"
```powershell
rm -rf node_modules
npm install
```

### Puerto 3000 ocupado
Editar `vite.config.js` y cambiar puerto:
```javascript
server: { port: 3001 }
```

### Cambios no se reflejan
```powershell
Ctrl + C  # Detener servidor
npm run dev  # Reiniciar
```

---

## 📞 Soporte

- **Repositorio:** [URL del repositorio]
- **Email:** [correo del equipo]
- **Desarrollador:** Gabriel Vivanco

---

## ✅ Checklist Inicial

- [ ] Node.js instalado
- [ ] Dependencias instaladas (`npm install`)
- [ ] Servidor corriendo (`npm run dev`)
- [ ] Navegador en `http://localhost:3000`
- [ ] Login funciona
- [ ] Credenciales de prueba funcionan

---

**¡Listo para usar!** 🎉
