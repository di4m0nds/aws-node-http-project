import AWS from 'aws-sdk'
import 'dotenv/config'

import { createTable } from './createTable.js'
import {
  loadAllMovies
} from './functions.js'

const AWS_CONFING = {
  region: process.env.AWS_REGION,
  endpoint: process.env.AWS_ENDPOINT
}
AWS.config.update(AWS_CONFING)

const dynamodb = new AWS.DynamoDB()
createTable(dynamodb)

// Functions
const docClient = new AWS.DynamoDB.DocumentClient()
loadAllMovies(docClient)
