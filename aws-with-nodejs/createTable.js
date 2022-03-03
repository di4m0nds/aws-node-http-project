const params = {
  TableName: 'Movies',
  KeySchema: [
    { AttributeName: 'year', KeyType: 'HASH' },
    { AttributeName: 'title', KeyType: 'RANGE' }
  ],
  AttributeDefinitions: [
    { AttributeName: 'year', AttributeType: 'N' },
    { AttributeName: 'title', AttributeType: 'S' }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10
  }
}

const createTable = async (dynamodb) => {
  await dynamodb.createTable(params, (err, data) => {
    if (err) {
      if (err.code === 'ResourceInUseException') {
        console.log(`\nIt's not possible to create a table. ${err.message}\n`)
      } else {
        console.error(
          'Unable to create table. Error JSON:\n\n',
          JSON.stringify(err, null, 2)
        )
      }
    } else {
      console.log(
        'Created table. Table description JSON:\n\n',
        JSON.stringify(data, null, 2)
      )
    }
  })
}

export { createTable }
