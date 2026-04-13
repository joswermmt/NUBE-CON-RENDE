# API REST de Usuarios

API con Node.js y Express que persiste datos en `data/users.json`.

## Requisitos previos

- **Node.js** versión 18 o superior (`node -v` para comprobarlo).

## Instalación (primera vez)

En la carpeta del proyecto, instala las dependencias:

```bash
npm install
```

Solo necesitas ejecutarlo de nuevo si borras `node_modules` o cambias dependencias en `package.json`.

## Ejecución del servidor

### Modo normal

Arranca la API en el puerto **3000** (o el que definas en la variable de entorno `PORT`):

```bash
npm start
```

Verás un mensaje similar a: `Servidor en http://localhost:3000`. Deja esa terminal abierta mientras pruebas la API (Postman, Thunder Client, navegador para GET, etc.).

### Modo desarrollo (reinicio automático)

Si cambias archivos en `src/` y quieres que el servidor se reinicie solo:

```bash
npm run dev
```

(Requiere Node con soporte para `--watch`, típico en Node 18+.)

### Cambiar el puerto (opcional)

En **PowerShell** (Windows):

```powershell
$env:PORT=4000; npm start
```

En **cmd**:

```cmd
set PORT=4000 && npm start
```

## Detener el servidor

En la terminal donde corre el proceso: **Ctrl + C**.

## Rutas principales

| Método | Ruta           | Descripción        |
|--------|----------------|--------------------|
| GET    | `/users`       | Listar usuarios    |
| GET    | `/users/:id`   | Ver un usuario     |
| POST   | `/users`       | Crear usuario      |
| PUT    | `/users/:id`   | Actualizar usuario |
| DELETE | `/users/:id`   | Eliminar usuario   |

Base URL local por defecto: `http://localhost:3000`.

## Pruebas rápidas (PowerShell)

Con el servidor en marcha, puedes usar por ejemplo:

**GET** (listar):

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/users" -Method GET
```

**POST** (crear):

```powershell
$body = '{"nombre":"Joswer Montero ","email":"joss@email.com","edad":21,"activo":true}'
Invoke-RestMethod -Uri "http://localhost:3000/users" -Method POST -Body $body -ContentType "application/json"
```

Ajusta `id` en las siguientes según lo que devuelva el POST.

**GET** (uno):

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/users/1" -Method GET
```

**PUT** (actualizar):

```powershell
$body = '{"nombre":"Juan Actualizado","edad":26}'
Invoke-RestMethod -Uri "http://localhost:3000/users/1" -Method PUT -Body $body -ContentType "application/json"
```

**DELETE**:

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/users/1" -Method DELETE
```

Para las capturas del PDF de la práctica puedes usar estas mismas peticiones desde Postman, Thunder Client u otra herramienta y guardar pantallazos de cada método.
