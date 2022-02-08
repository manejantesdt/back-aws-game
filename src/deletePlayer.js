const AWS = require("aws-sdk");

const deletePlayer = async (event) => {
  try {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    var { Id } = event.pathParameters;
    Id = parseInt(Id);
    console.log(Id);
    await dynamodb
      .delete({
        TableName: "CredituPlayers",
        Key: { Id: Id },
      })
      .promise();
    return {
      status: 200,
      body: {
        message: "Player deleted successfully",
      },
    };
  } catch (e) {
    console.error(e);

    response.statusCode = 500;
    response.body = JSON.stringify({
      message: "Failed to delete player.",
      errorMsg: e.message,
      errorStack: e.stack,
      console: console.error(Id),
    });
  }
};

module.exports = { deletePlayer };
