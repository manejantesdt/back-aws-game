const AWS = require("aws-sdk");
const tableName = process.env.tableName;

const getPlayers = async (event) => {
  try {
    // ---------------<constantes y llamado a los players>----------------------------------
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const result = (
      await dynamodb
        .scan({
          TableName: tableName,
        })
        .promise()
    ).Items;
    // ______________________________________________________________________________________

    // ------------------<variables y funcione oraganizacion>--------------------------------
    var playeResult = result;
    var players = playeResult.sort((a, b) => b.score - a.score);
    var count = 1;
    players.forEach((g) => {
      g.ranking = count++;
    });
    var getPlayers = players;
    // ______________________________________________________________________________________

    // ----------------------------------<busqueda name y id>--------------------------------
    if (event?.queryStringParameters) {
      const { nick_name, order, status, amount } = event.queryStringParameters;
      if (nick_name) {
        if (/^\d+$/.test(nick_name)) {
          let playerId = (
            await dynamodb
              .get({
                TableName: tableName,
                Key: {
                  Id: parseInt(nick_name),
                },
              })
              .promise()
          ).Item;
          let playerSearch = [playerId];
          let id = playerSearch[0].Id;
          players = players.filter((p) => p.Id === id);
        }

        if (!/^\d+$/.test(nick_name)) {
          players = players.filter((p) =>
            !p.nickname
              ? (p.nickname = "")
              : p.nickname
                  .toLocaleLowerCase()
                  .includes(nick_name.toLocaleLowerCase())
          );
        }
      }
      if (nick_name === "") {
        players = [];
      }
      if (!nick_name) {
        players = players;
      }

      // ______________________________________________________________________________________

      //--------------------------------<order>------------------------------------------------

      if ((order && order === "asc") || order === "desc" || order === "") {
        if (order === "asc" || order === "") {
          players = players.sort((a, b) => b.score - a.score);
        }
        if (order === "desc") {
          players = players.sort((a, b) => a.score - b.score);
        }
      }
      
      // ______________________________________________________________________________________

      //--------------------------------<status>------------------------------------------------
      if (
        (status && status === "bronce") ||
        status === "plata" ||
        status === "oro" ||
        status === "hierro"
      ) {
        if (status === "oro") {
          players = players.filter((player) => {
            return player.status === "oro";
          });
        }
        if (status === "bronce") {
          players = players.filter((player) => {
            return player.status === "bronce";
          });
        }
        if (status === "plata") {
          players = players.filter((player) => {
            return player.status === "plata";
          });
        }
        if (status === "hierro") {
          players = players.filter((player) => {
            return player.status === "hierro";
          });
        }
        // ____________________________________________________________________________________

        // ------------------------<amount>-----------------------------------------------------
        if (amount) {
          players = players.slice(0, parseInt(amount));
        }
      } else if (nick_name === "") {
        players = [];
      }
      return {
        status: 200,
        body: {
          players: players,
          getPlayers: getPlayers,
        },
      };
    }
    // ______________________________________________________________________________________

    // -----------------------------<return busqueda sin parametros>-------------------------
    return {
      status: 200,
      body: {
        players: players,
        getPlayers: getPlayers,
      },
    };
    // --------------------------<catch>------------------------------------------------------
  } catch (e) {
    console.error(e);
    response.statusCode = 500;
    response.body = JSON.stringify({
      message: "Failed to get players.",
      errorMsg: e.message,
      errorStack: e.stack,
    });
  }
};

module.exports = {
  getPlayers,
};
