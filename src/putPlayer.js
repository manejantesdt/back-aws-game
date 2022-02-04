const AWS = require("aws-sdk");

const putPlayer = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  var { Id } = event.pathParameters;
  Id = parseInt(Id);
  const { avatar,score,ranking, status, nickname } = JSON.parse(event.body);
  

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
        ":ranking": ranking,
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
};

module.exports = {
  putPlayer,

};
