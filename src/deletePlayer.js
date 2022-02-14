const AWS = require("aws-sdk");
const tableName = process.env.tableName;

const deletePlayer = async (event) => {
  try {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    var { Id } = JSON.parse(event.body);
    var result = await dynamodb
      .delete({
        TableName: tableName,
        Key: { Id: parseInt(Id) },
      })
      .promise();
    if (!result) {
      throw Error(`There was an error fetching the data from ${tableName}`);
    }
    console.log(result);

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
    });
  }
};

module.exports = { deletePlayer };
