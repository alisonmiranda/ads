# Ejemplo de Excel para Importar Staff

Este archivo debe ser creado en Excel con la siguiente estructura:

## Columnas requeridas:
- **cedula**: Número de cédula del trabajador (10 dígitos)
- **nombre**: Nombre completo del trabajador
- **correo**: Email del trabajador
- **monto**: Monto asignado para gastos (número decimal)

## Ejemplo de datos:

| cedula     | nombre              | correo                  | monto |
|------------|---------------------|-------------------------|-------|
| 1234567890 | Juan Pérez López    | juan.perez@example.com  | 500   |
| 0987654321 | María González      | maria.gonzalez@ex.com   | 750   |
| 1122334455 | Carlos Rodríguez    | carlos.rod@example.com  | 600   |
| 5544332211 | Ana Martínez Silva  | ana.martinez@ex.com     | 450   |
| 6677889900 | Luis Fernando Gómez | luis.gomez@example.com  | 800   |

## Notas importantes:
1. La primera fila debe contener los encabezados
2. Los nombres de las columnas pueden estar en mayúsculas o minúsculas
3. El archivo puede ser .xlsx, .xls o .csv
4. El monto debe ser un número (sin símbolos de moneda)

## Cómo crear el archivo:

### En Excel:
1. Abre Excel
2. Crea una nueva hoja
3. Escribe los encabezados en la primera fila: cedula, nombre, correo, monto
4. Llena los datos en las filas siguientes
5. Guarda como "staff_evento.xlsx"

### En Google Sheets:
1. Abre Google Sheets
2. Crea una nueva hoja con los mismos encabezados
3. Llena los datos
4. Descarga como: Archivo > Descargar > Microsoft Excel (.xlsx)

## Validaciones que realiza el sistema:
- ✅ Verifica que existan las 4 columnas requeridas
- ✅ Valida que la cédula tenga al menos 10 caracteres
- ✅ Valida que el nombre tenga al menos 3 caracteres
- ✅ Valida que el correo contenga "@"
- ✅ Valida que el monto sea un número positivo

## Ejemplo de archivo válido:
Puedes usar los datos de la tabla anterior para crear tu archivo de prueba.

## Ejemplo de archivo inválido:
Si falta alguna columna o los datos no cumplen las validaciones, el sistema mostrará:
- "Formato de archivo no válido" (si faltan columnas)
- Lista de errores específicos por cada fila con problemas
