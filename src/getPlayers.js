const AWS = require("aws-sdk");
const tableName = process.env.tableName;

const getPlayers = async (event) => {
  try {
    // ----------------------------------<constantes>--------------------------------------
    const dynamodb = new AWS.DynamoDB.DocumentClient();
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

    // ______________________________________________________________________________________

    // ----------------------------------<variables>-----------------------------------------
    var playeResult = result;
    var players = playeResult;
    // var players = playeResult.sort((a, b) => b.score - a.score);
    // var count = 1;
    // players.forEach((g) => {
    //   g.ranking = count++;
    // });
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
          if (!playerId) {
            throw Error(
              `There was an error fetching the data from ${tableName}`
            );
          }
          console.log(playerId);
          players = playerId;
        }

        if (!/^\d+$/.test(nick_name)) {
          players = players.filter((player) =>
            player.nickname
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
    return {
      status: 200,
      body: {
        players: players,
        getPlayers: getPlayers,
      },
    };
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
