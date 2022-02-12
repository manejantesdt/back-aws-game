const AWS = require("aws-sdk");

const putPlayer = async (event) => {
  try {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    var { Id } = event.pathParameters;
    Id = parseInt(Id);
    const { avatar, score, nickname } = JSON.parse(event.body);
    
    var newScore = parseInt(score);
    var status = "";
    if (86510 <= newScore && newScore <= 116510) {
      status = "oro";
    }
    else if (56510 <= newScore && newScore < 86510) {
      status = "plata";
    }
    else if (50512 <= newScore && newScore < 56510) {
      status = "bronce";
    }
    else if ( newScore < 56510) {
      status = "hierro";
    }

    await dynamodb
      .update({
        TableName: "CredituPlayers",
        Key: { Id },
        UpdateExpression:
          "set score = :score, #status=:status ,nickname = :nickname, avatar = :avatar",
        // "set newScore = :newScore, #status=:status ,nickname = :nickname, avatar = :avatar, ranking = :ranking",
        ExpressionAttributeValues: {
          ":score": parseInt(newScore),
          ":status": status,
          ":nickname": nickname,
          ":avatar": avatar,
          // ":ranking": parseInt(ranking),
        },
        ExpressionAttributeNames: {
          "#status": "status",
        },
        ReturnValues: "ALL_NEW",
      })
      .promise();
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Player updated",
      }),
    };
  } catch (e) {
    console.error(e);
    response.statusCode = 500;
    response.body = JSON.stringify({
      message: "Failed to edit player.",
      errorMsg: e.message,
      errorStack: e.stack,
    });
  }
};

module.exports = {
  putPlayer,
};
