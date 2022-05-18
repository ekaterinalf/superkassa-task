const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const router = require('./routes/routes')
const cors = require('cors')
const app = express()
const PORT = config.get('serverPort')

app.use(cors())
app.use(express.json())
app.use('/', router)

const start = async () => {
  try {
    mongoose.connect(config.get('dbUrl'))

    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    })
  } catch(error) {

  }
}

start()
