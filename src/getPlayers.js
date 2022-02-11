const AWS = require("aws-sdk");

const getPlayers = async (event) => {
  try {
    // ----------------------------------<constantes>--------------------------------------
    const { nick_name, order, status, amount } = event?.queryStringParameters;
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const result = (
      await dynamodb
        .scan({
          TableName: "CredituPlayers",
        })
        .promise()
    ).Items;
    // ______________________________________________________________________________________

    // ----------------------------------<variables>-----------------------------------------
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
      if (nick_name) {
        if (/^\d+$/.test(nick_name)) {
          let playerId = (
            await dynamodb
              .get({
                TableName: "CredituPlayers",
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
          players = players.filter((player) =>
            player.nickname
              .toLocaleLowerCase()
              .includes(nick_name.toLocaleLowerCase())
          );
        }
      } else if (nick_name === "") {
        players = [];
      }
      // ______________________________________________________________________________________

      //--------------------------------<order>------------------------------------------------

      if ((order && order === "asc") || order === "desc" || order === "") {
        if (order === "asc" || order === "") {
          players = players.sort((a, b) => a.score - b.score);
        }
        if (order === "desc") {
          players = players.sort((a, b) => b.score - a.score);
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
            return player.status === "plata";
          });
        }
        if (status === "plata") {
          players = players.filter((player) => {
            return player.status === "bronce";
          });
        }
        if (status === "hierro") {
          players = players.filter((player) => {
            return player.status === "hierro";
          });
        }
        // ______________________________________________________________________________________
        if (amount) {
          players = players.slice(0, parseInt(amount));
        }
      }
      return {
        status: 200,
        body: {
          players: players,
          getPlayers: getPlayers,
        },
      };
    }
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