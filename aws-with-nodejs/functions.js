import fs from 'fs'

// Get Movies and Set in DynamoDB
const loadAllMovies = (docClient) => {
  console.log('Importing movies into DynamoDB ...')
  const allMovies = JSON.parse(
    fs.readFileSync('./moviedata/moviedata.json', 'utf8')
  )
  let count = 0
  allMovies.forEach(movie => {
    const params = {
      TableName: 'Movies',
      Item: {
        year: movie.year,
        title: movie.title,
        info: movie.info
      }
    }
    docClient.put(params, (err, data) => {
      if (err) {
        console.error('Unable to add movie', movie.title, '. Error JSON:', JSON.stringify(err, null, 2))
      } else {
        console.log('PutItem succeeded:\t', movie.title, ` = ${data}`)
        count++
      }
    })
  })
  console.log('\nMovies loaded successfully:\t', count)
}

// Create a New Item
const createItem = (docClient, { year, title, info }) => {
  const params = {
    TableName: 'Movies',
    Item: {
      year: year,
      title: title,
      info: info
    }
  }
  console.log('Adding a new item ...')
  docClient.put(params, (err, data) => {
    if (err) {
      console.error('Unable to add item. Error JSON:', JSON.stringify(err, null, 2))
    } else {
      console.log('\nAdded item:', JSON.stringify(data, null, 2))
    }
  })
}

// Read an Item
const readItem = (docClient, { year, title }) => {
  const params = {
    TableName: 'Movies',
    Key: {
      year: year,
      title: title
    }
  }
  docClient.get(params, (err, data) => {
    if (err) {
      console.error('Unable to read item. Error JSON:', JSON.stringify(err, null, 2))
    } else {
      console.log('\nGetItem succeeded:\n\n', JSON.stringify(data, null, 2))
    }
  })
}

// Update an Item
const updateItem = (docClient, { year, title }) => {
  const params = {
    TableName: 'Movies',
    Key: {
      year: year,
      title: title
    },
    UpdateExpression: 'SET info.rating = :r, info.plot = :p, info.actors = :a',
    ExpressionAttributeValues: {
      ':r': 5.5,
      ':p': 'Everything happens all at once.',
      ':a': ['Larry', 'Moe', 'Curly']
    },
    ReturnValues: 'UPDATED_NEW'
  }
  console.log('Updating the item...')
  docClient.update(params, (err, data) => {
    if (err) {
      console.error('Unable to update item. Error JSON:', JSON.stringify(err, null, 2))
    } else {
      console.log('UpdateItem succeeded:', JSON.stringify(data, null, 2))
    }
  })
}

// Delete an Item
const deleteItem = (docClient, { year, title }) => {
  const params = {
    TableName: 'Movies',
    Key: {
      year: year,
      title: title
    },
    ConditionExpression: 'info.rating <= :val',
    ExpressionAttributeValues: {
      ':val': 5.0
    }
  }
  console.log('Attempting a conditional delete...')
  docClient.delete(params, function (err, data) {
    if (err) {
      console.error('Unable to delete item. Error JSON:', JSON.stringify(err, null, 2))
    } else {
      console.log('DeleteItem succeeded:', JSON.stringify(data, null, 2))
    }
  })
}

export {
  loadAllMovies,
  createItem,
  readItem,
  updateItem,
  deleteItem
}
