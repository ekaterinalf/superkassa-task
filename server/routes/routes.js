const Router = require('express')
const Number = require('../models/number')

const router = new Router()

router.post('/', async (req, res) => {
  try {
    const {code, number} = req.body
    const newNumber = new Number({code, number})
    await newNumber.save()
    const numbersFind = await Number.find()
    res.send(JSON.stringify(numbersFind))
  } catch(error) {
    console.log(error);
    res.send({message: 'Server error'})
  }
})

module.exports = router
