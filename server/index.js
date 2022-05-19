const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const router = require('./routes/routes')
const cors = require('cors')
const Number = require('./models/number')
const app = express()
const WSserver = require('express-ws')(app)
const aWss = WSserver.getWss()
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

app.ws('/', (ws, res) => {
  ws.on('message',async (msg)=>{
    const {code, number} = JSON.parse(msg)
    const newNumber = new Number({code, number})
    await newNumber.save()
    const numbersFind = await Number.find()

    aWss.clients.forEach(client=>{
      client.send(JSON.stringify(numbersFind))
    })
  })
})


start()
