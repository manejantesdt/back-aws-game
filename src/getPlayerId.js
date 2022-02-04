const AWS = require("aws-sdk");

const getPlayerId = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  var { Id } = event.pathParameters;
  Id = parseInt(Id);
  const result = await dynamodb
    .get({
      TableName: "CredituPlayers",
      Key: {
        Id,
      },
    })
    .promise();

  const player = result.Item;
  return {
    status: 200,
    body: player,
  };
};

module.exports = {
  getPlayerId,
};
