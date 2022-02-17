const AWS = require("aws-sdk");
const tableName = process.env.tableName;

const deletePlayer = async (event) => {
  try {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    var { Id } = event.pathParameters;
    Id = parseInt(Id);
    console.log(Id);
    // -------------------<validacion de Id>--------------------------------
    if (!Id || typeof Id !== "number" || Id === null || Id === undefined) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          message: "no pasa validacion",
        }),
      };
      //_______________________________________________________________________

      // --------------------------<Borrar player>-----------------------------
    } else {
      await dynamodb
        .delete({
          TableName: tableName,
          Key: { Id: Id },
        })
        .promise();

      return {
        status: 200,
        message: "Player deleted successfully",
      };
    }
    // _______________________________________________________________________

    // ------------------------------<Catch>----------------------------------
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
