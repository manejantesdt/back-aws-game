const AWS = require("aws-sdk");
const tableName = process.env.tableName;

const addPlayer = async (event) => {
  try {
    const dynamoDb = new AWS.DynamoDB.DocumentClient();

    var { nickname, avatar } = JSON.parse(event.body);
    // --------------------------------->validaciones<----------------------------------
    if (
      nickname === undefined ||null ||
      avatar === undefined || null ||
      !nickname ||
      !avatar ||
      typeof nickname !== "string" ||
      typeof avatar !== "string"
    ) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          message: "No pasa validacion",
        }),
      };
      //___________________________________________________________________________________

      // ----------------------------------<creacion de player>----------------------------
    } else {
      const result = (
        await dynamoDb
          .scan({
            TableName: tableName,
          })
          .promise()
      ).Items;
      if (!result) {
        throw Error(`There was an error fetching the data from ${tableName}`);
      }
      console.log(result);
      //___________________________________________________________________________________

      // -----------------------<asignacion avatar default>--------------------------------
      if (!avatar) {
        avatar =
          "https://drive.google.com/thumbnail?id=1wy_udY0W2rebTfKDYVClfAbWewWqfzmd";
      }
      //___________________________________________________________________________________

      // ------------------------------<Funciones organizacion>----------------------------
      let players = result;
      players = players.sort((a, b) => a.ranking - b.ranking);
      let lastPlayer = players[players.length - 1];
      const newPlayer = {
        Id: lastPlayer.ranking + 1,
        nickname,
        status: "hierro",
        ranking: lastPlayer.ranking + 1,
        score: 0,
        avatar,
      };
      //___________________________________________________________________________________

      // ----------------------------<Creacion de player>----------------------------------
      await dynamoDb
        .put({
          TableName: tableName,
          Item: newPlayer,
        })
        .promise();

      return {
        statusCode: 200,
        body: JSON.stringify(newPlayer),
      };
    }
    //___________________________________________________________________________________

    // ------------------------------<Catch>---------------------------------------------
  } catch (e) {
    console.error(e);
    response.statusCode = 500;
    response.body = JSON.stringify({
      message: "Failed to add player.",
      errorMsg: "Failed to add player.",
      errorStack: e.stack,
    });
  }
};

module.exports = {
  addPlayer,
};
