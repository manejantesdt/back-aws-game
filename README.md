# Recicle Being - Proyecto Grupal

Recicle Being es una página web creada como prueba técnica para la empresa CrediTu.
La idea general fue crear una aplicación para el salón de la fama de un juego imaginario.
El desafío consistió en desarrollar una aplicación web usando un framework SPA, requerida por
los creadores de un juego hipotético que desean ofrecer a sus usuarios la posibilidad de consultar
quiénes son los jugadores del mismo.

## ¿Puedo ver esta aplicación en vivo? 💻

Claro que sí! Tanto el Front-end como el Back-end fueron deployadas utilizando diferentes servicios en AWS (Lambda, Dynamo, S3, APi Gateway, entre otros).
Puedes visitar la versión online haciendo click en el siguiente enlace:
https://dfuf67ce7t2lm.cloudfront.net/

## Comenzando 🚀

Las siguientes instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de pruebas.

1. Forkea el repositorio para tener una copia del mismo en tu cuenta
2. Clona el repositorio en tu computadora para hacer pruebas

Desplegaremos este proyecto con AWS Dynamo, AWS Lambda y API Gateway, utilizando Serverless Framework. Sigue las indicaciones sugeridas en la sección **Despliegue**

### Pre-requisitos 📋

Para instalar esta aplicación es necesario contar con la última versión estable de Node y NPM. Asegúrate de contar con ellas para poder instalar correctamente las dependencias necesarias para correr el proyecto.

Actualmente las versiones necesarias son:

- **Node**: 16.14.0 o mayor
- **NPM**: 8.4.1 o mayor

Para verificar que versión tienen instalada:

> node -v
>
> npm –v

### Instalación 🔧

Para tener un entorno de desarrollo ejecutándose en tu computadora, en el directorio del proyecto, debes ejecutar el siguiente comando:

### `npm install`

Este paso instalará los paquetes (dependencias) utilizados en el proyecto de forma rápida y cómoda.

## Despliegue 📦

Para el despliegue de este proyecto se utilizó la plantilla aws-nodejs para hacer una HTTP API con Node.js corriendo en AWS Lambda y API Gateway, utilizando Serverless Framework.

Si tienes experiencia utilizando estos servicios, sigue adelante con las indicaciones en este documento. Necesitarás instalar serverless y configurarlo con tus credenciales de AWS.

_AWS ofrece una gran variedad de servicios y si es la primera vez que los utilizas, puede ser bastante confuso... te lo decimos por experiencia! 😊 Por eso hemos preparado un tutorial con indicaciones detalladas, paso-a-paso. Sigue las indicaciones en el [documento **DEPLOY_BACKEND.md**](https://github.com/manejantesdt/game-prueba-client/blob/dev/DEPLOY_BACKEND.md) de este repositorio para desplegar este proyecto con todas sus funcionalidades._

#### A continuación te dejamos algunos comandos y sugerencias para realizar pruebas:

```
$ serverless deploy
```

Después del deploy, debes ver algo similar a:

```bash
Deploying back-aws-game to stage dev (us-east-1)

✔ Service deployed to stack back-aws-game-dev (152s)

endpoint: GET - https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/
functions:
  hello: back-aws-game-dev-hello (1.9 kB)
```

_Nota_: En la forma actual, después del despliegue, tu API es pública y puede ser invocada por cualquier persona. Para despliegues de producción, es preferible que quieras configurar que alguien lo autorice. Para detalles sobre cómo hacer esto, mira esta [documentación sobre http events](https://www.serverless.com/framework/docs/providers/aws/events/apigateway/).

### Llamadas

Después de un despliegue exitoso, puedes hacer una llamada a la aplicación creada vía HTTP:

```bash
curl https://xxxxxxx.execute-api.us-east-1.amazonaws.com/
```

Lo cual resulta en una respuesta similar a la siguiente (el input ha sido abreviado):

```json
{
  "message": "Go Serverless v2.0! Your function executed successfully!",
  "input": {
    ...
  }
}
```

### Despliegue Local

Puedes llamar a la función localmente utilizando el siguiente comando:

```bash
serverless invoke local --function hello
```

Recibirás una respuesta similar a la siguiente:

```
{
  "statusCode": 200,
  "body": "{\n  \"message\": \"Go Serverless v3.0! Your function executed successfully!\",\n  \"input\": \"\"\n}"
}
```

Alternativamente, es posible emular API Gateway y Lambda localmente usando el plugin `serverless-offline`. Para hacer esto, ejecuta el siguiente comando:

```bash
serverless plugin install -n serverless-offline
```

Esto agregará el plugin `serverless-offline` a las dependencias - `devDependencies` en el archivo `package.json` . También lo agregará a `plugins` en el archivo `serverless.yml`.

Después de la instalación, puedes comenzar a emular localmente con el siguiente comando:

```
serverless offline
```

Para aprender más sobre las posibilidades de `serverless-offline`, te sugerimos ver su [repositorio de GitHub](https://github.com/dherault/serverless-offline).

# Desarrollo

## Objetivos del Proyecto

- Construímos una aplicación FullStack utilizando React, Javascript, Node, Redux, Express, Styled Components.
- Utilizamos otras tecnologìas : AWS, Serverless Framework, Cypress, Jest
- Utilizamos la metodología SCRUM trabajando en equipo, mediante el uso de Trello.
- Pusimos en práctica el workflow de GIT implementando CI (integración continua) y DC (desarrollo continuo).

## Boiler Plate

El boilerplate cuenta con dos carpetas: `back-aws-game` y `game-prueba-client`. En estas carpetas estará el código del back-end y el front-end respectivamente.

El contenido de `back-aws-game` fue creado usando: Node, Serverless Framework, servicios de Amazon y Cypress.

## Backend

Se desarrolla sin servidor con las siguientes rutas:

##### Rutas de Jugadores:

- [ ] **GET /player**:
  - Obtiene un listado de jugadores registrados
  - Debe devolver solo los datos necesarios para la ruta principal
- [ ] **GET /player?nickname="..."**:
  - Obtener un listado de los jugadores que contengan la palabra ingresada como query parameter
- [ ] **GET /player/{id}**:
  - Obtener el detalle de un jugador en particular
- [ ] **PUT /player/{id}**:
  - Permite modificar campos de un jugador creado
- [ ] **POST /player**:
  - Recibe los datos recolectados desde el formulario controlado de la ruta de creación de un nuevo jugador por body
  - Crea una nuevo jugador en la base de datos
- [ ] **DELETE /player{id}**:
  - Permite eliminar un jugador creado

### Los endpoints utilizados son:

- POST - `${URL_API}/player`
- GET - `${URL_API}/player`
- GET - `${URL_API}/player?nick_name=`
- GET - `${URL_API}/player/{Id}`
- PUT - `${URL_API}/player/{Id}`
- DELETE - `${URL_API}/player/{Id}`

### Creamos una base de datos con más de 3.000 jugadores utilizando AWS Dynamo.

#### El modelo de la base de datos contiene la siguiente entidad:

- [ ] Jugadores con las siguientes propiedades:
  - Id \* - número que funciona como identificador único del jugador
  - nickname \* - string que contiene el alias del jugador
  - status - string que contiene el estado del jugador [oro, plata o bronce]
  - ranking - número que representa su posición en los resultados del juego
  - avatar - string que representa el avatar asociado al jugador
  - score - puntos totales ganados por el jugador

## Ejecutando las pruebas ⚙️

_Explica como ejecutar las pruebas automatizadas para este sistema_

### Analice las pruebas end-to-end 🔩

_Explica que verifican estas pruebas y por qué_

```
Dar un ejemplo
```

### Y las pruebas de estilo de codificación ⌨️

_Explica que verifican estas pruebas y por qué_

```
Da un ejemplo
```

## Construido con 🛠️

- [Serverless](https://www.serverless.com/) - En esta aplicación utilizamos Serverless Framework y lo configuramos con nuestra cuenta de AWS para poder desplegar el código desde nuestro equipo local. Serverless es un framework para crear, implementar y administrar recursos en AWS (también admite la configuración de otros proveedores de la nube). En un archivo .yml se especifica la configuración de recursos (por ejemplo la creación de roles de AWS para funciones específicas, base de datos DynamoDB, API Gateway, etc.) Serverless nos permite desplegar aplicaciones backend como funciones independientes que serán desplegadas hacia AWS Lambda.
- [Servicios de AWS]:(https://aws.amazon.com/) - Es la plataforma en la nube más adoptada y completa en el mundo
- [Dynamo](https://aws.amazon.com/es/dynamodb) - Amazon DynamoDB es una base de datos NoSQL de clave de valor sin servidor completamente administrada que está diseñada para ejecutar aplicaciones de alto rendimiento a cualquier escala.
- [Lambda](https://aws.amazon.com/es/lambda) - un servicio informático sin servidor y basado en eventos que nos permite ejecutar código sin necesidad de administrar servidores.
- [Api Gateway](https://aws.amazon.com/es/api-gateway/) - un servicio completamente administrado que facilita la creación y la publicación de API a cualquier escala.
- [CloudFormation](https://aws.amazon.com/es/cloudformation/)
- [Node](https://nodejs.org/es/) - Es un entorno de ejecución de JavaScript orientado a eventos asíncronos, que está diseñado para crear aplicaciones network escalables.
- [Cypress](https://www.cypress.io/) - Un framework de testing moderno, es actualmente una de las herramientas más populares de testing.
- [GitHub Actions](https://github.com/features/actions) - GitHub Actions es una plataforma de integración continua y entrega continua (CI/CD) que nos facilita la automatización de todos los flujos de trabajo de software. Podemos crear, testear y desplegar nuestro código directamente desde GitHub. El código creado y enviado desde los equipos locales para actualizar el repositorio de GitHub puede ser testeado y desplegado automáticamente. 

## Autores ✒️

- **Ramiro Villamizar ** - [pivotsk8](https://github.com/pivotsk8)
- **Marisa Lia Pascal ** - [Marisaliap](https://github.com/Marisaliap)
- **Nelson Albera ** - [nalbera](https://github.com/nalbera)
- **Gustavo Montero ** - [gamontero](https://github.com/gamontero)
- **Daniel Alberto Mena ** - [BtoMJ](https://github.com/BtoMJ)

#### Una mención especial por su compañerismo y su aporte a este proyecto para

- **Fabrizio Santandrea ** - [fabsantandrea](https://github.com/fabsantandrea)

## Licencia 📄

Este proyecto está bajo la Licencia de Dream Team Manejantes

## Expresiones de Gratitud 🎁

- Comenta a otros sobre este proyecto 📢
- Invita una cerveza 🍺 o un café ☕ a alguien del equipo.
- Da las gracias públicamente 🤓.
- etc.

---

⌨️ con ❤️ por [Manejantes](https://github.com/manejantesdt) 😊
