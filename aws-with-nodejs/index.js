import AWS from 'aws-sdk'
import 'dotenv/config'

import { createTable } from './createTable.js'
import {
  loadAllMovies,
  createItem,
  readItem
} from './functions.js'

// AWS Configuration
const AWS_CONFING = {
  region: process.env.AWS_REGION,
  endpoint: process.env.AWS_ENDPOINT
}
AWS.config.update(AWS_CONFING)

// Create table in dynamodb
const dynamodb = new AWS.DynamoDB()
createTable(dynamodb)

// Functions
const docClient = new AWS.DynamoDB.DocumentClient()
loadAllMovies(docClient)

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
  title: 'The End'
})
