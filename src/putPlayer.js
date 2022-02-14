const AWS = require("aws-sdk");

const putPlayer = async (event) => {
  try {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    var { Id } = event.pathParameters;
    const { avatar, score, nickname } = JSON.parse(event.body);
    var newScore = parseInt(score);

    if (Id) {
      Id = parseInt(Id);
      var status = "";

      if (86510 <= newScore) {
        status = "oro";
      } else if (56510 <= newScore && newScore < 86510) {
        status = "plata";
      } else if (50512 <= newScore && newScore < 56510) {
        status = "bronce";
      } else if (newScore < 56510) {
        status = "hierro";
      }

      let update = await dynamodb
        .update({
          TableName: "CredituPlayers",
          Key: { Id },
          UpdateExpression:
            "set score = :score, #status=:status ,nickname = :nickname, avatar = :avatar",
          ExpressionAttributeValues: {
            ":score": parseInt(newScore),
            ":status": status,
            ":nickname": nickname,
            ":avatar": avatar,
          },
          ExpressionAttributeNames: {
            "#status": "status",
          },
          ReturnValues: "ALL_NEW",
        })
        .promise();

      if (update) {
        const search = 
          (
            await dynamodb
              .scan({
                TableName: "CredituPlayers",
              })
              .promise()
          ).Items
         
        var players = search.sort((a, b) => b.score - a.score);
        var count = 1;
        players.forEach((g) => {
          g.ranking = count++;
        });
        if (players) {
            players.forEach(async (player) => {
              await dynamodb
                .update({
                  TableName: "CredituPlayers",
                  Key: { Id: player.Id },
                  UpdateExpression:
                    "set score = :score, #status=:status ,nickname = :nickname, avatar = :avatar, ranking = :ranking",
                  ExpressionAttributeValues: {
                    ":score": player.score,
                    ":status": player.status,
                    ":nickname": player.nickname,
                    ":avatar": player.avatar,
                    ":ranking": player.ranking,
                  },
                  ExpressionAttributeNames: {
                    "#status": "status",
                  },
                  ReturnValues: "ALL_NEW",
                })
                .promise();
            });
        }
        return {
          statusCode: 200,
          body: JSON.stringify({
            message: "all players updated",
          }),
        };
      }
    }

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "task not updated",
      }),
    };
  } catch (e) {
    console.error(e);
    response.statusCode = 500;
    response.body = JSON.stringify({
      message: "Failed to delete post.",
      errorMsg: e.message,
      errorStack: e.stack,
    });
  }
};

module.exports = {
  putPlayer,
};
