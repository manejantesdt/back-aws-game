const AWS = require("aws-sdk");

const getPlayers = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const result = await dynamodb
    .scan({
      TableName: "CredituPlayers",
    })
    .promise();

  let players = result.Items;

  if (event.queryStringParameters) {
    const { nick_name, order, status, amount } = event?.queryStringParameters;

      if (nick_name) {
        if (/^\d+$/.test(nick_name)) {
          let playerId = await dynamodb
            .get({
              TableName: "CredituPlayers",
              Key: {
                Id: parseInt(nick_name),
              },
            })
            .promise();
          if (playerId) {
            playerId = playerId.Item;
            players = [playerId];
          } else {
            players = players.filter((player) =>
              player.nickname
                .toLocaleLowerCase()
                .includes(nick_name.toLocaleLowerCase())
            );
            if (players.length === 0) {
              return {
                status: 404,
                body: [],
              };
            }
          }
        } else {
          players = players.filter((player) =>
            player.nickname
              .toLocaleLowerCase()
              .includes(nick_name.toLocaleLowerCase())
          );
          if (players.length === 0) {
            return {
              status: 404,
              body: [],
            };
          }
        }
      }else if(nick_name === ""){
        return {
          status: 404,
          body: [],
        };
      }
      if ((order && order === "asc") || order === "desc" || order === "") {
        if (order === "asc" || order === "") {
          players.sort((a, b) => b.ranking - a.ranking);
        }
        if (order === "desc") {
          players.sort((a, b) => a.ranking - b.ranking);
        }
      }
    
    if ((order && order === "asc") || order === "desc" || order === "") {
      if (order === "asc" || order === "") {
        players.sort((a, b) => b.ranking - a.ranking);
      }
      if (order === "desc") {
        players.sort((a, b) => a.ranking - b.ranking);
      }
    }
    if (
      (status && status === "bronce") ||
      status === "plata" ||
      status === "oro" ||
      status === "hierro"
    ) {
      if (status === "hierro") {
        players = players.filter((player) => {
          return player.status === "hierro";
        });
      }
      if (status === "plata") {
        players = players.filter((player) => {
          return player.status === "plata";
        });
      }
      if (status === "bronce") {
        players = players.filter((player) => {
          return player.status === "bronce";
        });
      }
      if (status === "oro") {
        players = players.filter((player) => {
          return player.status === "oro";
        });
      }
    }
    if (amount) {
      players = players.slice(0, parseInt(amount));
    }
  }
  return {
    status: 200,
    body: { players },
  };
};

module.exports = {
  getPlayers,
};
