const Router = require('express')
const Number = require('../models/number')

const router = new Router()

router.get('/', async (req,res)=>{
  const numbersFind = await Number.find()
  res.send(JSON.stringify(numbersFind))
})

module.exports = router
