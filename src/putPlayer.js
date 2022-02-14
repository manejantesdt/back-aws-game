const AWS = require("aws-sdk");
const tableName = process.env.tableName;

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
      } else if (0 <= newScore < 50512) {
        status = "hierro";
      } else if (0 > newScore) {
        throw Error("Score must be greater than 0");
      }

      let update = await dynamodb
        .update({
          TableName: tableName,
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
      if (!update) {
        throw Error(`There was an error fetching the data from ${tableName}`);
      }
      console.log(update);

      // if (update) {
      //   const search = (
      //     await dynamodb
      //       .scan({
      //         TableName: tableName,
      //       })
      //       .promise()
      //   ).Items;

      //   if (!search) {
      //     throw Error(`There was an error fetching the data from ${tableName}`);
      //   }
      //   console.log(search);

      //   var players = search.sort((a, b) => b.score - a.score);
      //   var count = 1;
      //   players.forEach((g) => {
      //     g.ranking = count++;
      //   });

      //   if (players) {
      //     players.forEach(async (player) => {
      //       (
      //         await dynamodb
      //           .update({
      //             TableName: tableName,
      //             Key: { Id: player.Id },
      //             UpdateExpression:
      //               "set score = :score, #status=:status ,nickname = :nickname, avatar = :avatar, ranking = :ranking",
      //             ExpressionAttributeValues: {
      //               ":score": player.score,
      //               ":status": player.status,
      //               ":nickname": player.nickname,
      //               ":avatar": player.avatar,
      //               ":ranking": player.ranking,
      //             },
      //             ExpressionAttributeNames: {
      //               "#status": "status",
      //             },
      //             ReturnValues: "ALL_NEW",
      //           })
      //           .promise()
      //       ).Item;
      //     });
      //   }
        return {
          statusCode: 200,
          body: JSON.stringify({
            message: "Successful PutPlayer.",
          }),
        };
      // }
    }

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "player not updated",
      }),
    };
  } catch (e) {
    console.error(e);
    response.statusCode = 500;
    response.body = JSON.stringify({
      message: "Failed to update player.",
      errorMsg: e.message,
      errorStack: e.stack,
    });
  }
};

module.exports = {
  putPlayer,
};
