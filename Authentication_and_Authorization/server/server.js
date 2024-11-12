const mongoose = require('mongoose')
const app = require('./index')
const PORT = process.env.PORT
const DB = process.env.DB

mongoose.connect(DB,{connectTimeoutMS: 20000}).then(()=>console.log('connected to database'))

app.listen(PORT,()=>{
  console.log(`server is running on port ${PORT}`)
})
