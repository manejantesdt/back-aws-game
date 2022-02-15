## Despliegue 📦

_AWS ofrece una gran variedad de servicios y si es la primera vez que los utilizas, puede ser bastante confuso... te lo decimos por experiencia! 😊 Por eso hemos preparado este tutorial con indicaciones detalladas, paso-a-paso. Sigue las indicaciones aquí debajo para desplegar este proyecto con todas sus funcionalidades._

## Comenzando 🚀

#### Creando las Credenciales de tu cuenta de AWS

Lo primero que tienes que hacer es [crear una cuenta en la página web de amazon web services] (https://docs.aws.amazon.com) o iniciar sesión si ya tienes una cuenta.

Una vez que hayas iniciado sesión, necesitas configurar un usuario para que Serverless pueda conectarse a tu cuenta.

Para hacer esto, en los servicios de AWS buscamos IAM (Identity and Access Management) para [crear un nuevo usuario IAM] (https://docs.aws.amazon.com/es_es/es_es/IAM/latest/UserGuide/id_roles_create.html).

Introducimos un nombre de usuario, (por ejemplo ServerlessAccount), y seleccionamos la casilla donde dice "Acceso programático". Este acceso nos permite usar los SDK y otras herramientas CLI
que permitirán que el servicio funcione con AWS.

En la siguiente ventana, le vamos a asignar los permisos vamos a ir a la opción "asociar directamente las políticas existentes"; vamos a buscar y seleccionar únicamente
"AdministratorAccess" (acceso de administrador). Esto se debe a que quieres que el servicio tenga acceso completo para hacer lo que sea que necesites ya sea creando backets, lambdas, S3 o cualquier otra cosa.

Vamos a continuar en etiquetas, y esto no es algo que debamos configurar para el servicio, así que le damos enter y vamos a "revisar". Clickeamos en crear usuario.

Nuestro usuario se crea y tenemos el Id de acceso y la clave secreta. No reveles tus claves a nadie. Es muy importante que descarges el archivo csv que las contiene y lo guardes o bien las copias en un bloc de notas.

#### Instalando y Configurando Serverless Framework

Después de obtener estas claves vas a ir a tu terminal de Visual Studio Code o de tu editor favorito. Dentro de esta terminal hay que hacer dos cosas: primero necesitamos instalar serverless y
después tenemos que configurarlo con nuestras credenciales.

Para instalar Serverless ejecuta en tu consola el siguiente comando:

### `npm install -g serverless`

_Nota: "-g" hace que se instale de manera global._

Cuando haya terminado la instalación podemos configurar las credenciales (necesitarás las que obtuviste al crear tu usuario IAM) para que pueda funcionar en nuestra cuenta de AWS. Para hacer esto escribimos:

### `serverless config credentials --provider aws --key TU-ID-DE-ACCESO --secret TU-CLAVE-SECRETA --profile serverlessUser`

_Nota: En --profile le damos un nombre a esta cuenta así que para esto vamos a usar "serverlessUser" (pero puede ser cualquier otro nombre)_

Presiona enter, y esto va a configurar algunas cosas de AWS en serverless. Hasta ahora has creado un usuario en AWS y has usado esas credenciales para crear un rol de serverless en tu equipo.

#### Echemos un vistazo a nuestro proyecto

El back de Recycle Being fue creado usando un comando CLI de serverless. Usamos una plantilla llamada AWS - node.js

Dentro de la carpeta llamada "back-aws-game" encontrarás el archivo serverless.yml con todo el código de serverless que necesitas.

Ejecuta en la consola:

### `cd back-aws-game`

Y luego

### `ls`

Y verás que hay varias carpetas y archivos, entre ellos las carpeta src y el archivo "serverless.yml"

Abre el archivo serveless.yml en Visual Studio Code, y verás que en la primera línea tienes un sevicio llamado "aws-la", y debajo un provider con algunos detalles, y más abajo unas funciones, por ejemplo la función llamada getPlayers que configura el handler con src/getPlayers.getPlayers, que apunta al archivo getPlayers.js dentro de la carpeta src.

getPlayers.js es una archivo javascript donde se exporta una función "getPlayers" que es un evento asíncrono.

#### Configurando tu Proyecto

Vuelve a nuestro archivo serverless.yml y vamos a hacer algunos pequeños cambios. Cuando configuramos aws y
las credenciales de serverless configuramos un perfil; eso significa que si quieres deployar el proyecto usando esas credenciales tienes que agregar un perfil para el proveedor. En la sección provider, en profile, agrega el nombre de tu perfil:

```sh
provider:
  name: aws
  runtime: nodejs14.x
  profile: EL-NOMBRE-DE-TU-PERFIL
```
#### Agregando una Base de Datos con DynamoDb

Ahora que configuraste tu cuenta de AWS con serverless puedes agregar una base de datos de Dynamo a esa cuenta. Vas a nuestro archivo serverless y lo que puedes hacer es agregar a tus recursos una base de datos que escalará automáticamente.

AWS maneja toda la infraestructura por nosotros, lo que significa que una vez que está configurada escalará de manera automática con la información que cargues en ella, y no tienes que lidiar con los servidores o manejar ninguna de las bases de datos.

En el archivo serverless.yml, debajo de "functions" (funciones), verás este código con todos los recursos de AWS que estarás generando, en este caso, una base de datos:

```sh
resources:
  Resources:
    usersTable:
      Type: AWS::DynamoDB::Table
      Properties:
        TableName: ${self:custom.tableName}
        AttributeDefinitions:
          - AttributeName: Id
            AttributeType: N
        KeySchema:
          - AttributeName: Id
            KeyType: HASH
        ProvisionedThroughput:
          ReadCapacityUnits: 1
          WriteCapacityUnits: 1
```

Necesitas definir el nombre del recurso, en este caso nosotros usamos "usersTable" pero puedes poner un nombre cualquiera como "MyDynamoDbTable". Además tiene un tipo y unas propiedades.

Necesitamos otro nombre para tu base de datos porque Amazon usa bases de datos en todo el mundo y esto tiene que ser un nombre de una base de datos completamente único para ti. Y eso significa que tiene que ser algo muy singular y no así nombres comunes.

En la línea donde dice " TableName:", nosotros utilizamos una variable de entorno: "${self:custom.tableName}". Esto está indicando que en este mismo archivo ("self", busque la variable custom y dentro de custom, el valor asignado a tableName. Para que esto funcione, más arriba en propiedades tuvimos que establecer un entorno, así:

```sh
environment:
    tableName: ${self:custom.tableName}
```
#### Ahora busca un poco más arriba en el archivo el siguiente código:

```sh
custom:
  tableName: CredituPlayers 
```
Y reeemplaza "CredituPlayers" por el nombre que le asignarás a tu nueva base de datos. De esta forma cuando hagas el despliegue, en AWS se creará una base de datos de Dynamo con ese nombre. 

En atributos se definen los atributos que estarán en cada una de las filas de la base de datos. Los atributos tienen un nombre y un tipo, en nuestro caso "AttributeName: Id" que es de tipo "N" (número).

También tenemos un KeySchema:

```sh
KeySchema:
          - AttributeName: Id
            KeyType: HASH
```

#### Creando Apis con API Gateway y Lambda

En nuestro proyecto necesitamos aws-sdk para usar funciones que nos permiten obtener datos que se almacenen o bien para agregar nueva información a la base de datos de Dynamo.

Abre la carpeta llamada "src". Es la carpeta que contiene las funciones lambda. Verás que contiene 5 archivos de javascrip, que implementan las acciones de crear, obtener, editar y eliminar jugadores de la tabla de Dynamo. Básicamente, esto es lo que se conoce con el nombre de CRUD (Create, Read, Update, Delete) - que son las cuatro operaciones fundamentales de aplicaciones persistentes en sistemas de bases de datos.

<p align='left'>
    <img height="150" src='https://github.com/manejantesdt/back-aws-game/blob/dev/Screenshot_src.png' </img>
</p>

Si abres y miras cada uno de esos archivos, verás que en las líneas de código donde dice "TableName:", en lugar de usar el nombre de la base de datos tendrás la variable tableName que definimos en el paso anterior como una variable de entorno en serverless.yml; esto hace el código más limpio y fácilmente configurable para cualquier persona que desee desplegarlo en su equipo. De esta manera, sin que tengas que cambiar nada, tienes listas tus funciones de lambda.

Si ahora echas un vistazo en el archivo serverless.yml, verás que contiene cada una de esas funciones:

```sh
functions:
  createPlayer:
    handler: src/addPlayer.addPlayer
    events:
      - httpApi:
          path: /player
          method: post
  getPlayers:
    handler: src/getPlayers.getPlayers
    events:
      - httpApi:
          path: /player
          method: get
  getPlayerId:
    handler: src/getPlayerId.getPlayerId
    events:
      - httpApi:
          path: /player/{Id}
          method: get
  updtePlayer:
    handler: src/putPlayer.putPlayer
    events:
      - httpApi:
          path: /player/{Id}
          method: put
  deletePlayer:
    handler: src/deletePlayer.deletePlayer
    events:
      - httpApi:
          path: /player/{Id}
          method: delete
```

Tienes el nombre de la función, luego handler que contiene la ruta donde están las funciones lambda, y luego events. Los eventos son los que disparan las funciones lambda y son necesarios si queremos configurar la Api. El path es la ruta al final de la URL que disparará exactamente esa Api. También está el método que tenemos que decir si es post, get, put o delete.

#### Reduciendo la cantidad de código con el plugin Serveless Webpack

En el archivo serverless, verás este código:

```sh
iamRoleStatements:
    - Effect: Allow
      Action:
        - dynamodb:*
      Resource: "*"
```

Eso significa que nuestro usuario Iam está configurado y le da a dynamodb permisos para acceder a todas nuestras lambdas (indicado con el asterisco)

Cuando deployas por defecto en Serverless, eso descargará todo el código en cada función lambda. Cuando tengas más lambdas, más código, eso estará plagado de archivos que no necesitas. Por eso utilizamos el plugin Serveless webpack para empaquetar todo nuestro código en secciones más pequeñas. Puedes verlo en el archivo serverless.yml :

<p align='left'>
    <img height="70" src='https://github.com/manejantesdt/back-aws-game/blob/dev/Screenshot_plugins.png' </img>
</p>

Para que esto funcione también tenemos que indicarle que cada una de las funciones lambda sea empaquetada individualmente. En serverless.yml, debajo de los plugins, verás que agregamos este código:

```sh
package:
    individually: true
```

Si deseas instalar este plugin, ejecuta:

### `npm install --save serveless-webpack`

Luego, necesitamos instalar sólo webpack:

### `npm install --save webpack`

Webpack es una manera eficiente de reducir la cantidad de código que subimos. Para que funcione, necesitamos configurar un archivo. Ve al archivo webpack.config.js y verás la siguiente configuración:

```sh
module.exports = {
    target: 'node',
    mode: 'none',
};
```

Eso significa que está minimizado tanto como sea posible. 

Antes de seguir, asegúrate de haber guardado los cambios que realizaste en serverless.yml

#### Desplegando el proyecto

Todo está listo para deployar el proyecto. En tu terminal, dentro de esta carpeta raíz del proyecto ejecuta el siguiente comando:

### `sls deploy`

Sls es una abreviatura de serverless y queremos deployar todo lo que hay en esta carpeta. Hay varias cosas que sucederán al ejecutar este comando por lo cual puede que tome varios minutos, dependiendo de tu equipo y de la velocidad de internet. 

Vamos a revisar todas las configuraciones que tuvieron lugar, paso por paso:

1) Cuando haya terminado podemos ver los datos de un servicio en una etapa de desarrollo desplegada para nosotros. Ahora vamos a nuestra cuenta de AWS. Volvemos a la página de inicio de la consola de AWS y buscamos lambda. Dentro del panel de lambda podemos ver que la última modificación se hizo unos minutos atrás.
Construimos por ejemplo aws-la-dev-getPlayers. Si hacemos click y bajamos podemos ver que ahí está el código que teníamos en ese archivo. Eso significa que hemos implementado con éxito nuestro archivo serverless y que podemos cambiar el código dentro de este tipo de funciones para que sean deployadas en nuestra cuenta de AWS con éxito.

2) Otra cosa que hará el comando `sls deploy` es compilar esto en la plantilla de cloud formation e implementarlo. Cuando haya terminado de actualizar, tu base de datos de Dynamo debería estar en tu cuenta. Vuelve a tu cuenta de AWS, actualiza la página y busca Dynamo. Ahora podrás ver que se ha creado una base de datos con el nombre que has elegido. Si entras allí verás que no hay ningún elemento dentro de la tabla, pero tendrás Id que es el único campo que tienes hasta ahora.

3) Se habrán construído tus funciones lambda y se configurará con los eventos y API Gateway. En tu terminal, verás que tendrás las funciones pero también tendrás los endpoints, que son creados con una serie de números random - y luego dice .execute.api, luego la región por ejemplo us-east-1, y al final tiene las rutas, por ejemplo "/player/{Id}". Si haces click derecho sobre uno de esos endpoints y lo copias, lo puedes pegar y probar en tu navegador.

4) Al construírse con webpack, se comprimieron los archivos y serán más pequeños que si no usaras el plugin. Si vas a tu cuenta de AWS, en lambda, entras a alguna de las funciones y bajas para ver el código, verás que en la parte superior hay información relativa a webpack, y más abajo, en la sección principal de código, verás el mismo código que tienes en tu archivo local en esa función, fácil de leer. El código de lambda no es público, así que nadie más que tu podrá leerlo a menos que tenga acceso a tu cuenta. Con webpack nos aseguramos de que sólo el código que necesitamos en lambda, se sube a lambda, y mejora nuestro despliegue.

#### Repasando y comprendiendo el proceso...

El proceso fue configurar funciones lambda que toman un request, por ejemplo getPlayerId, que obtiene el Id a través de los parámetros requeridos por un cliente en un endpoint. Esto es pasado a nuestra base de datos de Dynamo utilizando un método GET, que es un método personalizado escrito por nosotros -que toma un Id y el nombre de una base de datos (TableName), y lo transforma en el formato correcto para hacer un request a DynamoDB.DocumentClient. Este es un servicio de AWS SDK que nos permite interactuar con nuestras tablas en nuestra base de datos Dynamo. El request GET retorna los datos y con nuestra API entregamos esa información al cliente.

Puedes usar esto para construír tus propias Apis con todos los datos que quieras. Eso te ayudará a hacer mejores aplicaciones front-end.

Has creado un nuevo proyecto de serverless usando plantillas de serverless, has visto lo que conforma un proyecto de serverless, el archivo serverless.yml y toda la configuración que contiene. Luego lo deployaste y viste cuando estaba siendo creado en tu cuenta de AWS.

Has construído unas Apis, por ejemplo getPlayerId, utilizando API Gateway y Lambda, así puedes obtener datos de tu base de datos. Lo desplegaste usando serverless. Eso significa que ahora podemos usar nuestro front-end y obtener la información que necesitamos mediante nuestros endpoints.

#### Agregando o eliminando un jugador de tu tabla DynamoDb

Puedes crear una Api no sólo para obtener datos sino también para agregar datos a tu base de datos, utilizando el método POST, que necesita una solicitud de entrada para ingresar datos a un endpoint de API.

En la carpeta src donde se encuentran las funciones lambda, como vimos antes, hemos creado un método POST. Al actualizar el proyecto usando el comando "sls deploy" en tu consola, habrás obtendio un endpoint, con una serie de números random - .execute.api, tu región de la cuenta de AWS, por ejemplo us-east-1, y al final una ruta, por ejemplo "/create-player/{Id}". Haz click derecho sobre ese endpoint y cópialo.

Puedes probar esa ruta utilizando una aplicación como Postman. En la consola de Postman estableces un POST request y pegas tu url. Necesitas agregar un Id al final de la ruta, diferente a cualquier Id que pueda existir en tu tabla de Dynamo.

Necesitarás agregar un body. En Postman seleccionas "raw" y JSON. Es un objeto, así que usas llaves, agregas un campo "Nickname" y opcionalmente agregas un campo "Avatar" (puedes agregar la url de una imagen de tu preferencia). Al presionar "Send", obtendrás una respuesta de un nuevo jugador con los datos que le acabas de ingresar.

Si ahora vas a tu base de datos de Dynamo en AWS y refrescas la página, verás que un nuevo jugador ha sido agregado a tu tabla. Ahora también puedes probar tu ruta GET por Id para obtener los datos de ese jugador. Y además puedes probar los otros endpoints, editar y/o eliminar un jugador.

Estás list@ para agregar o eliminar datos de tu DynamoDB desde el front-end.

Así llegamos al final de este tutorial. Si llegaste a este punto, habrás desplegado nuestro proyecto back-aws-game con AWS Dynamo, AWS Lambda y API Gateway, utilizando Serverless Framework 😊

## Construido con 🛠️

- [Serverless](https://www.serverless.com/) - En esta aplicación utilizamos Serverless Framework y lo configuramos con nuestra cuenta de AWS para poder desplegar el código desde nuestro equipo local. Serverless es un framework para crear, implementar y administrar recursos en AWS (también admite la configuración de otros proveedores de la nube). En un archivo .yml se especifica la configuración de recursos (por ejemplo la creación de roles de AWS para funciones específicas, base de datos DynamoDB, API Gateway, etc.) Serverless nos permite desplegar aplicaciones backend como funciones independientes que serán desplegadas hacia AWS Lambda.
- [Servicios de AWS]:(https://aws.amazon.com/) - Es la plataforma en la nube más adoptada y completa en el mundo
- [Dynamo](https://aws.amazon.com/es/dynamodb) - Amazon DynamoDB es una base de datos NoSQL de clave de valor sin servidor completamente administrada que está diseñada para ejecutar aplicaciones de alto rendimiento a cualquier escala.
- [Lambda](https://aws.amazon.com/es/lambda) - un servicio informático sin servidor y basado en eventos que nos permite ejecutar código sin necesidad de administrar servidores.
- [Api Gateway](https://aws.amazon.com/es/api-gateway/) - un servicio completamente administrado que facilita la creación y la publicación de API a cualquier escala.
- [CloudFormation](https://aws.amazon.com/es/cloudformation/)
- [Node](https://nodejs.org/es/) - Es un entorno de ejecución de JavaScript orientado a eventos asíncronos, que está diseñado para crear aplicaciones network escalables.
- [Cypress](https://www.cypress.io/) - Un framework de testing moderno, es actualmente una de las herramientas más populares de testing.

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
