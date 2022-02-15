const AWS = require("aws-sdk");
const tableName = process.env.tableName;

const getPlayerId = async (event) => {
  try {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    var { Id } = event.pathParameters;
    // -------------------<validacion de Id>--------------------------------
    if (!Id || typeof Id !== "string") {
      return {
        statusCode: 500,
        body: JSON.stringify({
          message: "El Id es incorrecto",
        }),
      };
    }
    //_________________________________________________________________________

    // -------------------<Busca a todos los jugadores>------------------------
    else {
      Id = parseInt(Id);
      const result = (
        await dynamodb
          .scan({
            TableName: tableName,
          })
          .promise()
      ).Items;
      if (!result) {
        throw Error(`There was an error fetching the data from ${tableName}`);
      }
      console.log(result);
      //___________________________________________________________________________

      // -----------------------<Funciones organizacion>---------------------------
      var player = result.sort((a, b) => b.score - a.score);
      var count = 1;
      player.forEach((g) => {
        g.ranking = count++;
      });
      player = player.filter((player) => player.Id === Id);
      //___________________________________________________________________________

      // ----------------------------<Validaciones internas>-----------------------
      if (player.length === 0) {
        return {
          status: 500,
          body: player,
          message: "Id not found",
        };
      } else {
        return {
          status: 200,
          body: player,
        };
      }
    }
    // ___________________________________________________________________________

    // ------------------------------<Catch>-------------------------------------
  } catch (e) {
    console.error(e);
    console.log(e);
    console.log(response);
    response.statusCode = 500;
    response.body = JSON.stringify({
      message: "Failed GetPlayerId.",
      errorMsg: e.message,
      errorStack: e.stack,
    });
  }
};

module.exports = {
  getPlayerId,
};
