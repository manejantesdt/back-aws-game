const AWS = require("aws-sdk");

const putPlayer = async (event) => {
  
  try {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    var { Id } = event.pathParameters;
    Id = parseInt(Id);
    const { avatar, score, ranking, status, nickname } = JSON.parse(event.body);

    await dynamodb
      .update({
        TableName: "CredituPlayers",
        Key: { Id },
        UpdateExpression:
          "set score = :score, #status=:status ,nickname = :nickname, avatar = :avatar, ranking = :ranking",
        ExpressionAttributeValues: {
          ":score": score,
          ":status": status,
          ":nickname": nickname,
          ":avatar": avatar,
          ":ranking": parsentInt(ranking),
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
        message: "task updated",
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
