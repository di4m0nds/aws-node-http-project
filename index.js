import AWS from 'aws-sdk'
import 'dotenv/config'

import { createTable } from './createTable.js'

const AWS_CONFING = {
  region: process.env.AWS_REGION,
  endpoint: process.env.AWS_ENDPOINT
}
AWS.config.update(AWS_CONFING)

const dynamodb = new AWS.DynamoDB()

// Functions
createTable(dynamodb)
