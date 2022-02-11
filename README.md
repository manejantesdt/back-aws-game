<!--
title: 'AWS Simple HTTP Endpoint example in NodeJS'
description: 'This template demonstrates how to make a simple HTTP API with Node.js running on AWS Lambda and API Gateway using the Serverless Framework.'
layout: Doc
framework: v3
platform: AWS
language: nodeJS
authorLink: 'https://github.com/serverless'
authorName: 'Serverless, inc.'
authorAvatar: 'https://avatars1.githubusercontent.com/u/13742415?s=200&v=4'
-->

# Recicle Being - Proyecto Grupal

Recicle Being es una página web creada como prueba técnica para la empresa CrediTu. 
La idea general fue crear una aplicación para el salón de la fama de un juego imaginario. 
El desafío consistió en desarrollar una aplicación web usando un framework SPA, requerida por 
los creadores de un juego hipotético que desean ofrecer a sus usuarios la posibilidad de consultar 
quiénes son los jugadores del mismo. 

## ¿Puedo ver esta aplicación en vivo? 💻

Claro que sí! Tanto el Front-end como el Back-end fueron deployadas utilizando diferentes servicios en AWS (Lambda, Dynamo, S3). 
Puedes visitar la versión online haciendo click en el siguiente  enlace:
https://dfuf67ce7t2lm.cloudfront.net/

## Comenzando 🚀

_Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de pruebas._

Sigue las indicaciones en la sección **Despliegue** para conocer como desplegar el proyecto utilizando los servicios de la nube de AWS.

1. Forkea el repositorio para tener una copia del mismo en tu cuenta
2. Clona el repositorio en tu computadora para hacer pruebas

### Pre-requisitos 📋

Para instalar esta aplicación es necesario contar con la última versión estable de Node y NPM. Asegúrate de contar con ellas para poder instalar correctamente las dependencias necesarias para correr el proyecto.

Actualmente las versiones necesarias son:

 * __Node__: 16.14.0 o mayor
 * __NPM__: 8.4.1 o mayor

Para verificar que versión tienen instalada:

> node -v
>
> npm –v

### Instalación 🔧

Para tener un entorno de desarrollo ejecutándose en tu computadora, en el directorio del proyecto, debes ejecutar los siguientes comandos:

### `npm install`

Este paso instalará los paquetes (dependencias) utilizados en el proyecto de forma rápida y cómoda.

### `npm start`

Este paso ejecuta un comando especificado en la propiedad "start" dentro de los "scripts" en el archivo package.json. En este caso, le indicamos que despliegue la aplicación en el navegador. 

Este comando abrirá [http://localhost:3001](http://localhost:3001) en tu navegador.

La página se volverá a descargar si haces cambios en el código.
También podrás ver si hay errores en la consola.

# Desarrollo

## Objetivos del Proyecto

- Construímos una aplicación utilizando React, Javascript, Redux, Express, Styled Components.
- Utilizamos otras tecnologìas : AWS y Jest 
- Utilizamos la metodología SCRUM trabajando en equipo, mediante el uso de Trello.
- Pusimos en práctica el workflow de GIT implementando CI (integración continua) y desarrollo continuo. 

## Boiler Plate

El boilerplate cuenta con dos carpetas: `back-aws-game` y `game-prueba-client`. En estas carpetas estará el código del back-end y el front-end respectivamente.

El contenido de `back-aws-game` fue creado usando: Serverless de Amazon.


## Backend

Se desarrolla sin servidor con las siguientes rutas:
  
##### Usuarios:  
- [ ] __GET /player__:
  - Obtiene un listado de jugadores registrados
  - Debe devolver solo los datos necesarios para la ruta principal
- [ ] __GET /player?name="..."__:
  - Obtener un listado de los jugadores que contengan la palabra ingresada como query parameter
- [ ] __GET /player/{id}__:
  - Obtener el detalle de un jugador en particular
- [ ] __PUT /player/{id}__:
  - Permite modificar campos de un jugador creado  
- [ ] __POST /player__:
  - Recibe los datos recolectados desde el formulario controlado de la ruta de creación de un nuevo jugador por body
  - Crea una nuevo jugador en la base de datos
- [ ] __DELETE /player{id}__:
  - Permite eliminar un jugador creado 

### Los endpoints utilizados son:

  - POST - https://mrsemsqfk6.execute-api.us-east-1.amazonaws.com/player
  - GET - https://mrsemsqfk6.execute-api.us-east-1.amazonaws.com/player
  - GET - https://mrsemsqfk6.execute-api.us-east-1.amazonaws.com/player/{Id}
  - PUT - https://mrsemsqfk6.execute-api.us-east-1.amazonaws.com/player/{Id}
  - DELETE - https://mrsemsqfk6.execute-api.us-east-1.amazonaws.com/player/{Id}

### Creamos una base de datos llamada `CredituPlayers` utilizando AWS Dynamo.
  
#### El modelo de la base de datos contiene la siguiente entidad:

- [ ] Jugadores con las siguientes propiedades:
  - Id * - número que funciona como identificador único del jugador
  - nickname * - string que contiene el alias del jugador
  - status  - string que contiene el estado del jugador [oro, plata o bronce]
  - ranking - número que representa su posición en los resultados del juego
  - avatar - string que representa el avatar asociado al jugador
  - score - puntos totales ganados por el jugador


## Ejecutando las pruebas ⚙️

_Explica como ejecutar las pruebas automatizadas para este sistema_

### Analice las pruebas end-to-end 🔩

_Explica que verifican estas pruebas y por qué_

```
Da un ejemplo
```

### Y las pruebas de estilo de codificación ⌨️

_Explica que verifican estas pruebas y por qué_

```
Da un ejemplo
```

## Despliegue 📦

_Aquí te dejamos instrucciones paso a paso sobre como hacer el deploy de este proyecto utilizando los servicios de AWS_

Lo primero que tenemos que hacer para es [crear una cuenta en la página web de amazon web services]  (https://docs.aws.amazon.com) o inicar sesión si ya tenemos una cuenta.
En los servicios de AWS buscamos IAM para [crear un nuevo usuario IAM] (https://docs.aws.amazon.com/es_es/es_es/IAM/latest/UserGuide/id_roles_create.html). 
Introducimos un nombre de usuario, (por ejemplo serverless-admin), le damos acceso mediante programación.
En la siguiente ventana, le vamos a asignar los permisos vamos a ir a la opción "asociar directamente las políticas existentes" y vamos a buscar y seleccionar únicamente
"AministratorAccess". Vamos al siguiente, dejamos vacío (añadir etiquetas es opcional), vamos a revisar y clickeamos en crear usuario.  

Nuestro usuario se crea y tenemos el Id de acceso y la clave secreta. No reveles tus claves a nadie. Es muy importante que descarges el archivo csv que las contiene y lo guardes o bien las copias en un bloc de notas. 

Después de obtener estas claves vas a instalar AWS CLI. 

Para [ instalar AWS CLI sigue los pasos en esta documentación:] (https://docs.aws.amazon.com/es_es/cli/latest/userguide/cli-chap-install.html)
Vas a elegir instalar la versión más reciente de la AWS CLI, es decir, la versión 2.

Aquí tienes más información para que puedas tener un conjunto de [credenciales de AWS válidas configuradas en tu sistema] (https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html).

Una vez que tengas AWS instalado y configurado, vas a ir a la terminal y ejecutar el siguiente comando: 

### `aws configure` 

Al presionar enter nos pedirá la clave de acceso que hemos obtenido de nuestro usuario IAM:

```sh
AWS_ACCESS_KEY_ID  (ingresa tu clave de acceso)  -> Enter

AWS_SECRET_ACCESS_KEY  (ingresa tu clave secreta)  -> Enter

AWS_DEFAULT_REGION  (ingresa la región de tu cuenta de Amazon, por ejemplo us-west-1)  -> Enter

Default output format [None]: (lo dejamos vacío)  -> Enter
```

Y así tienes tu AWS configurado en tu equipo.

Ahora estás listo para ejecutar la aplicación en tu equipo. En la consola de Visual Studio, asegúrate de estar en la carpeta donde descargaste el proyecto:

### `npm start` 

La aplicación se desplegará en http://localhost:3000/

Has verificado que la aplicación funciona! Vas a detener la aplicación con CTRL + C

Ahora vas a ir a tu cuenta de Amazon a crear tu S3. 

En tu cuenta de Amazon, busca S3 y cuando ingreses al panel, vas a "crear un nuevo backet". Ingresa el nombre de tu baquet, el que prefieras, por ejemplo S3-(tunombre). 
La región la dejas como está y clickeas en siguiente. En el paso 2 (Configuar opciones) no cambias nada y le das a siguiente. 

En el paso 3, "Establecer Permisos", actualmente te aparece bloqueado a todo el público pero tú quieres que el público sea capaz de entrar a tu backet para visualizar la página web. Entonces desmarcas la casilla "Bloquear todo acceso público". Te dará un mensaje de advertencia de que ahora todo el público tendrá acceso a este backet - es lo que queremos y le marcas la casilla donde reconoces que "esta configuración actual..." es la que necesitas. Vamos a la siguiente pestaña donde vas al botón "crear backet". y tu backet ya se ha creado: S3-(tunombre) 

Ahora entras en el backet y vas a ir a la pestaña propiedades y vas a entrar en la sección llamada "Alojamiento de sitio web estático".  Vas a marcar la casilla "usar este backt para alojar un sitio web". El el campo "documento de índice" escribimos index.html así y en "documento de error" también escribimos index.html
Vas a guardar. Ya tienes las propiedades configuradas. 

Ahora vas a ir a la pestaña "Permisos" y vas a tener que añadir un código. En "permisos" vas a "política de backet", y en "editor de políticas de bucket", pegas el siguiente código:

```sh
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowPublicReadAccess",
      "Effect": "Allow",
      "Principal": "*",
      "Action": [
        "s3:GetObject"
      ],
      "Resource": [
        "arn:aws:s3:::example-bucket/*"
      ]
    }
  ]
}
```
Lo único que tienes que hacer es copiar ese mismo código, y reemplazar donde dice "example-bucket" por el nombre exacto de tu backet. Ahora vas a guardar, te dirá que este
backet tiene acceso público (esto es lo que queremos porque es una web pública para que la gente entre a verla).

Nuestro backet ya está configurado.

Ahora ve a tu aplicación en Visual Staduio o en tu editor favorito y abre el archivo package.json
En la sección de scripts vamos a crear un nuevo script llamado "deploy", así:

```sh
"deploy": "aws s3 sync build/ s3://example-bucket --acl public-read"
```

Reemplaza donde dice "example-backet" por el nombre de tu backet. Guardas los cambios y ya tienes tu aplicación lista para ser deployada en tu backet de S3 en AWS.

En la consola de Visual Studio, ejectua el siguiente comando:



De esta manera has subido nuestra aplicación de React a un backet de AWS 😊


## Construido con 🛠️

* [Servicios de AWS]:(https://aws.amazon.com/) - Es la plataforma en la nube más adoptada y completa en el mundo
* [Dynamo](https://aws.amazon.com/es/dynamodb) - Amazon DynamoDB es una base de datos NoSQL de clave de valor sin servidor completamente administrada que está diseñada para ejecutar aplicaciones de alto rendimiento a cualquier escala.
* [Api Gateway](https://aws.amazon.com/es/api-gateway/) - un servicio completamente administrado que facilita la creación y la publicación de API a cualquier escala.
* [Lambda](https://aws.amazon.com/es/lambda) - un servicio informático sin servidor y basado en eventos que nos permite ejecutar código sin necesidad de administrar servidores.
* [Serverless](https://www.serverless.com/) - Es un framework para crear, implementar y administrar recursos en AWS (también admite la configuración de otros proveedores de la nube). Se especifican en un archivo yml la configuración de recursos (como la creación de roles de AWS para funciones específicas, base de datos DynamoDB, API Gateway, etc). etc. Nos permite desplegar aplicaciones backend como funciones independientes que serán desplegadas hacia AWS Lambda. 
* [CloudFormation](https://aws.amazon.com/es/cloudformation/)
* [Node](https://nodejs.org/es/) - Es un entorno de ejecución de JavaScript orientado a eventos asíncronos, que está diseñado para crear aplicaciones network escalables.
* [Cypress](https://www.cypress.io/) - Un framework de testing moderno, es actualmente una de las herramientas más populares de testing.


## Autores ✒️

* **Ramiro Villamizar ** - [pivotsk8](https://github.com/pivotsk8)
* **Marisa Lia Pascal ** - [Marisaliap](https://github.com/Marisaliap)
* **Nelson Albera ** - [nalbera](https://github.com/nalbera)
* **Gustavo Montero ** - [gamontero](https://github.com/gamontero)
* **Daniel Alberto Mena ** - [BtoMJ](https://github.com/BtoMJ)
* **Fabrizio Santandrea ** - [fabsantandrea](https://github.com/fabsantandrea)


## Licencia 📄

Este proyecto está bajo la Licencia de Dream Team Manejantes 

## Expresiones de Gratitud 🎁

* Comenta a otros sobre este proyecto 📢
* Invita una cerveza 🍺 o un café ☕ a alguien del equipo. 
* Da las gracias públicamente 🤓.
* etc.



---
⌨️ con ❤️ por [Manejantes](https://github.com/manejantesdt) 😊





### Deployment


# Serverless Framework Node HTTP API on AWS

This template demonstrates how to make a simple HTTP API with Node.js running on AWS Lambda and API Gateway using the Serverless Framework.

This template does not include any kind of persistence (database). For more advanced examples, check out the [serverless/examples repository](https://github.com/serverless/examples/) which includes Typescript, Mongo, DynamoDB and other examples.

## Usage

### Deployment

```
$ serverless deploy
```

After deploying, you should see output similar to:

```bash
Deploying aws-node-http-api-project to stage dev (us-east-1)

✔ Service deployed to stack aws-node-http-api-project-dev (152s)

endpoint: GET - https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/
functions:
  hello: aws-node-http-api-project-dev-hello (1.9 kB)
```

_Note_: In current form, after deployment, your API is public and can be invoked by anyone. For production deployments, you might want to configure an authorizer. For details on how to do that, refer to [http event docs](https://www.serverless.com/framework/docs/providers/aws/events/apigateway/).

### Invocation

After successful deployment, you can call the created application via HTTP:

```bash
curl https://xxxxxxx.execute-api.us-east-1.amazonaws.com/
```

Which should result in response similar to the following (removed `input` content for brevity):

```json
{
  "message": "Go Serverless v2.0! Your function executed successfully!",
  "input": {
    ...
  }
}
```

### Local development

You can invoke your function locally by using the following command:

```bash
serverless invoke local --function hello
```

Which should result in response similar to the following:

```
{
  "statusCode": 200,
  "body": "{\n  \"message\": \"Go Serverless v3.0! Your function executed successfully!\",\n  \"input\": \"\"\n}"
}
```


Alternatively, it is also possible to emulate API Gateway and Lambda locally by using `serverless-offline` plugin. In order to do that, execute the following command:

```bash
serverless plugin install -n serverless-offline
```

It will add the `serverless-offline` plugin to `devDependencies` in `package.json` file as well as will add it to `plugins` in `serverless.yml`.

After installation, you can start local emulation with:

```
serverless offline
```

To learn more about the capabilities of `serverless-offline`, please refer to its [GitHub repository](https://github.com/dherault/serverless-offline).
