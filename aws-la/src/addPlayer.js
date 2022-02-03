const {v4} = require('uuid')
const AWS = require('aws-sdk')

const addPlayer = async(event) => {
const dynamoDb = new AWS.DynamoDB.DocumentClient()

const {nickname,} = JSON.parse(event.body)
const createdAt = new Date()
const Id = v4()

const newPlayer ={
    Id,
    nickname,
    status,
    createdAt,
    done:false
}

await dynamoDb.put({
TableName: 'Players',
Item: newPlayer
}).promise()

return{
statusCode: 200,
body: JSON.stringify(newPlayer)
}
}

module.exports = {
    addPlayer,

    
}