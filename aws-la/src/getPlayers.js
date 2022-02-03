const AWS = require("aws-sdk");

const getPlayers = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  


  const result = await dynamodb
    .scan({
      TableName: "CredituPlayers",
    })
    .promise();

  const players = result.Items;

  return {
    status: 200,
    body: { players },
  };
};

module.exports = {
  getPlayers,
};
