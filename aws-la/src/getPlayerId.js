const AWS = require("aws-sdk");

const getPlayerId = async (event) => {
  try {
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
  } catch (e) {
    console.error(e);
    response.statusCode = 500;
    response.body = JSON.stringify({
      message: "Failed GetPlayerId.",
      errorMsg: e.message,
      errorStack: e.stack,
    });
  }
};

module.exports = {
  getPlayerId,
};
