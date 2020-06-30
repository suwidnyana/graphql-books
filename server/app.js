const express  = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')
const mongoose  = require('mongoose')
const cors  =  require('cors')


const app =  express()
app.use(cors())

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true)    
mongoose.connect('mongodb+srv://root:root@cluster0-ajmjw.azure.mongodb.net/<dbname>?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})

mongoose.connection.once('open',() => {   
  console.log('Database Connected')
})

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))

app.listen(9000, () => {
  console.log(`now listening for PORT 9000`)  
})