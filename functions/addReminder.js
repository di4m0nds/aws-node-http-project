const { v4 } = require('uuid');
const AWS = require('aws-sdk');

module.exports.addReminder = async (event) => {

  const dynamodb = new AWS.DynamoDB.DocumentClient();

  const { title, content } = JSON.parse(event.body);
  const createdDate = new Date();
  const id = v4();

  const reminder = {
    id,
    title,
    content,
    createdDate
  }

  await dynamodb.put({
    TableName: 'TodoTable',
    Item: {
      reminder
    }
  }).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(reminder)
  }

}
