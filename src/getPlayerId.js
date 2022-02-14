const AWS = require("aws-sdk");
const tableName = process.env.tableName;

const getPlayerId = async (event) => {
  try {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    var { Id } = event.pathParameters;
    Id = parseInt(Id);
    const result = (
      await dynamodb
        .scan({
          TableName: tableName,
        })
        .promise()
    ).Items;
    if (!result) {
      throw Error(`There was an error fetching the data from ${tableName}`);
    }
    console.log(result);

    var player = result.sort((a, b) => b.score - a.score);
    var count = 1;
    player.forEach((g) => {
      g.ranking = count++;
    });
    player = player.filter((player) => player.Id === Id);

    if (player.length === 0) {
      return {
        status: 500,
        body: player,
        message: "Id not found",
      };
    } else {
      return {
        status: 200,
        body: player,
      };
    }
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
// const AWS = require("aws-sdk");
// const tableName = process.env.tableName;

// const getPlayerId = async (event) => {
//   var players = search.sort((a, b) => b.score - a.score);
//   var count = 1;
//   players.forEach((g) => {
//     g.ranking = count++;
//   });
//   try {
//     const dynamodb = new AWS.DynamoDB.DocumentClient();
//     var { Id } = event.pathParameters;
//     Id = parseInt(Id);
//     const result = (
//       await dynamodb
//         .get({
//           TableName: tableName,
//           Key: {
//             Id,
//           },
//         })
//         .promise()
//     ).Item;
//     if (!result) {
//       throw Error(`There was an error fetching the data from ${tableName}`);
//     }
//     console.log(result);
//     const player = result;
//     if (!player) {
//       return {
//         status: 500,
//         body: player,
//         message: "Id not found",
//       };
//     } else {
//       return {
//         status: 200,
//         body: player,
//       };
//     }
//   } catch (e) {
//     console.error(e);
//     response.statusCode = 500;
//     response.body = JSON.stringify({
//       message: "Failed GetPlayerId.",
//       errorMsg: e.message,
//       errorStack: e.stack,
//     });
//   }
// };

// module.exports = {
//   getPlayerId,
// };
