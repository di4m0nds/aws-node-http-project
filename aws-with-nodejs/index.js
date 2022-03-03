import AWS from 'aws-sdk'
import 'dotenv/config'
import { createTable } from './createTable.js'
import {
  loadAllMovies,
  createItem,
  readItem,
  updateItem,
  deleteItem
} from './functions.js'

const region = 'us-west-2'
const endpoint = process.env.AWS_ENDPOINT

// ==================== AWS Configuration ====================
const AWS_CONFING = {
  region: region,
  endpoint: endpoint
}
AWS.config.update(AWS_CONFING)

// ==================== Create table in dynamodb ====================
const dynamodb = new AWS.DynamoDB()
createTable(dynamodb)

// ==================== Functions ====================
const docClient = new AWS.DynamoDB.DocumentClient()
// loadAllMovies(docClient)

createItem(docClient, {
  year: 2012,
  title: 'The End',
  info: {
    plot: 'Nothing happens at all.',
    rating: 3
  }
})

readItem(docClient, {
  year: 2012,
  title: 'The end'
})

updateItem(docClient, {
  year: 2012,
  title: 'The end'
})

deleteItem(docClient, {
  year: 2012,
  title: 'The end'
})
