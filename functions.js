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
const createItem = (docClient) => {
  let params = {
    TableName: "Movies",
    Item:{
      "year": 2012,
      "title": "The End",
      "info":{
        "plot": "Nothing happens at all.",
        "rating": 3
      }
    }
  }
  console.log("Adding a new item ...")
  docClient.put(params, (err, data) => {
    if (err) {
      console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2))
    } else {
      console.log("Added item:", JSON.stringify(data, null, 2))
    }
  })
}


export {
  loadAllMovies,
  createItem
}
