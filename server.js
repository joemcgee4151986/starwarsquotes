const express =require('express')
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express()

let db, 
    dbConnectionStr = process.env.DB_STRING, // link to our db
    dbName = 'todo'// name of the dbMongoClient.connect(dbConnectionStr, {useUnifiedTopology: true})
    .then(client => {
        console.log(`Hey, connected to ${dbName} database`) // informs us that we are connected to the database
        db = client.db(dbName)
    })
const connectionString = 'mongodb+srv://yoda:Bowser12@cluster0.8t5ld.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
MongoClient.connect(connectionString, { useUnifiedTopology: true})
 .then(client => {
   console.log('Connected to Database')
    const db = client.db('star-wars-quotes')
    const quotesCollection = db.collection('quotes')

    app.set('view engine', 'ejs')
    app.use(bodyParser.urlencoded({ extended: true}))
    app.use(bodyParser.json())
    app.use(express.static('public'))


  
   
    
    app.get('/', (req, res) => {
      db.collection('quotes').find().toArray()
      .then(quotes => {
          res.render('index.ejs', { quotes: quotes})
              })
        .catch(/* ... */)
            })
            
    app.post('/quotes', (req, res) => {
        quotesCollection.insertOne(req.body)
        .then(result => {
            res.redirect('/')
        })
        
        .catch(error => console.error(error))
    })

    app.put('/quotes', (req, res)=> {
        quotesCollection.findOneAndUpdate(
            {name: 'Yoda'},
            {
                $set: {
                    name: req.body.name,
                    quote: req.body.quote
                }
            },
            {
                upsert: true
            }
        )
        .then(result => res.json('Success'))
        .catch(error => console.error(error))
    })
    app.delete('/quotes', (req, res) => {
        quotesCollection.deleteOne(
            {name: req.body.name}
        )
        .then(result => {
            if(result.deletedCount === 0) {
                return res.json('No quote to delete')
            }
            res.json('Deleted Darth Vadar\s quote')
        })
        .catch(error => console.error(error))
    })
        
    app.listen(process.env.PORT || PORT, () =>
        console.log('Server is running!')) // confirms our server is running

//place body-parser before your crud handlers

})




