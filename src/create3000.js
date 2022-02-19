const AWS = require("aws-sdk");
const tableName = process.env.tableName;

const create3000 = (event) => {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  console.log("event", event.body);
  var players= JSON.parse(event.body)
  console.log("soyel players amigos",players);
  players .forEach((player) => {
    var params = {
      TableName: tableName,
      Item: {
        Id: player.Id,
        nickname: player.nickname,
        status: player["status"],
        ranking: player.ranking,
        avatar: player.avatar,
        score: player.score,
      },
    };
    dynamoDb.put(params, function (err, data) {
      if (err) {
        console.error(
          "Unable to add item. Error JSON:",
          JSON.stringify(err, null, 2)
        );
      } else {
        console.log("Added item:", JSON.stringify(data, null, 2));
      }
    });
  });
};

module.exports = {
  create3000,
};
