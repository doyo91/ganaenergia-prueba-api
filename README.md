
# Frontend Prueba Técnica Gana Energía (En proceso)
La prueba consiste en crear una API en Node que nos permita gestionar usuarios y artículos (CRUD). 
Implementar en React una pantalla de acceso mediante usuario y contraseña. Una vez logueado, tendremos un menú simple con varias cosas. Crear usuarios nuevos que podrán loguearse en nuestra aplicación, consultar artículos, crearlos, dar de baja, editarlos.... 
Como extra final ver si puedes añadir jwt a todas las llamadas de la API. 
Las interacciones se realizarán a través de la API creada previamente. Plazo 48H

## Get started

### 1. Clonar Repo y instalar dependencias

Comando de clonado:

```sh
git clone git@github.com:doyo91/ganaenergia-prueba-api.git
```
Navegar a la carpeta y instalar dependencias:

```sh
cd ganaenergia-prueba-api 
npm install
```

### 2. Repositorio de la API

El Frontend se encuentra en este repo: [ganaenergia-prueba-frontend](https://github.com/doyo91/ganaenergia-prueba-frontend/blob/main/README.md) 


### 3. Start API

El comando para levantar la API (en desarrollo):

```sh
npm run dev
```

El script `dev` levanta un servidor en el puerto `http://localhost:3001`

**Necesario crear archivo `.env` en la raiz.** Las variables de entorno necesarias son:

```
PORT=
MONGO_DB_URI=
MONGO_DB_URI_TEST=
SEED_SECRET_JWT=
```

### 4. Endpoints

  <https://documenter.getpostman.com/view/13872649/TzRVdkVm>

## Notas

Todos los Endpoint funcionan, he tenido problemas con el deploy en Heroku, faltaría:

* Refactorizar código y validaciones.
* Testing
* Deploy








  