const express = require('express')

const router = express.Router()
const { body, validationResult } = require('express-validator')

router.get('/bfhl', async (req, res) => {

  try {
    data = {
      operation_code: 1
    }
    // const note = await schemaNotes.find({ user: req.user.id })
    res.json(data)
  } catch (error) {
    res.status(500).send("Error Occured")
    console.error(error.message)
  }
})

router.post('/bfhl',
  // [
  //   body('data', 'Enter data'),
  // ], 
  async (req, res) => {
    const { data } = req.body
    console.log(data)
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        res.status(400).send({ errors: errors.array() })
      }
      // const data = JSON.parse({data1})
      // console.log(data)
      const filterNumber = data.filter(str => !isNaN(str))
      const filterString = data.filter(str => /^[a-zA-Z]+$/.test(str))

      const highestAlphabetical = filterString.length ? data
        .filter(str => /^[a-zA-Z]+$/.test(str))  // Filter only alphabetic strings
        .reduce((a, b) => a > b ? a : b) : [];

      const result = {
        is_success: !res.ok ? true : false,
        user_id: "sanjeev_konisetty_16072004",
        email: "kk7140@srmist.edu.in",
        roll_number: "RA2111027020055",
        numbers: filterNumber.length ? filterNumber : [],
        alphabets: filterString.length ? filterString : [],
        highest_alphabet: highestAlphabetical,
      }
      if (result.alphabets.length > 0) {
        for (let i = 0; i < result.alphabets.length; i++) {
          if (result.alphabets[i].length > 1) {  
            result.message = "Alphabet should be single character" 
            return res.status(500).json({ message: "Alphabet should be single character" })
          }
        }
      }
      res.json(result)
    } catch (error) {
      res.status(500).send(error.message)
      // console.error(error.message)
    }



  })


module.exports = router