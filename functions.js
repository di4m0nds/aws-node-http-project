import fs from 'fs'

// Get Movies and Set in DynamoDB
const loadAllMovies = (docClient) => {
  console.log("Importing movies into DynamoDB ...")
  const allMovies = JSON.parse(
    fs.readFileSync('./moviedata/moviedata.json', 'utf8')
  )
  let count = 0
  allMovies.map( movie => {
    let params = {
      TableName: "Movies",
      Item: {
        "year": movie.year,
        "title": movie.title,
        "info": movie.info
      }
    }
    docClient.put(params, (err, data) => {
      if (err) {
        console.error("Unable to add movie", movie.title, ". Error JSON:", JSON.stringify(err, null, 2))
      } else {
        console.log("PutItem succeeded:\t", movie.title)
        count++
      }
    })
  })
  console.log("\nMovies loaded successfully:\t",  count)
}

// Create a New Item
const createItem = (docClient, { year, title, info }) => {
  let params = {
    TableName: "Movies",
    Item:{
      "year": year,
      "title": title,
      "info": info
    }
  }
  console.log("Adding a new item ...")
  docClient.put(params, (err, data) => {
    if (err) {
      console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2))
    } else {
      console.log("\nAdded item:", JSON.stringify(data, null, 2))
    }
  })
}

// Read an Item
const readItem = (docClient, { year, title }) => {
  let params = {
    TableName: "Movies",
    Key: {
      "year": year,
      "title": title
    }
  }
  docClient.get(params, (err, data) => {
    if (err) {
      console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2))
    } else {
      console.log("\nGetItem succeeded:\n\n", JSON.stringify(data, null, 2))
    }
  })
}

export {
  loadAllMovies,
  createItem,
  readItem
}
