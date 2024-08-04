const express = require('express')

const router = express.Router()
const { body, validationResult } = require('express-validator')


// const {is_success,user_id,email,alphabets,numbers,roll_number}  = result 
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

router.post('/bfhl', async (req, res) => {
  var result = {
    is_success : false,
    user_id: "sanjeev_konisetty_16072004",
    email: "kk7140@srmist.edu.in",
    roll_number: "RA2111027020055",
  }
    const { data } = req.body
    console.log(data)
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        // is_success = false
        res.status(400).json({is_success,user_id,email,roll_number,errorMessage:errors.array()})
        // send({ errors: errors.array(),result })
      }
      const filterNumber = data.filter(str => !isNaN(str))
      const filterString = data.filter(str => /^[a-zA-Z]+$/.test(str))

      const highestAlphabetical = filterString.length ? data
        .filter(str => /^[a-zA-Z]+$/.test(str))  // Filter only alphabetic strings
        .reduce((a, b) => a > b ? a : b) : [];

      // result = {
      //   is_success: !res.ok ? true : false,
        // user_id: "sanjeev_konisetty_16072004",
        // email: "kk7140@srmist.edu.in",
        // roll_number: "RA2111027020055",
      //   numbers: filterNumber.length ? filterNumber : [],
      //   alphabets: filterString.length ? filterString : [],
      //   highest_alphabet: highestAlphabetical,
      // }
      
    
        result.numbers =filterNumber.length ? filterNumber : []
        result.alphabets = filterString.length ? filterString : []
        result.highest_alphabet =  highestAlphabetical

        const {is_success,user_id,email,roll_number,alphabets} = result
      
      if (alphabets.length > 0) {
        for (let i = 0; i < alphabets.length; i++) {
          if (alphabets[i].length > 1) {  
            result.message = "Alphabet should be single character" 
            // result.is_success = false
            return res.status(500).json({is_success,user_id,email,roll_number,message:"Alphabet should be single character"})
          }
        }
      }
      result.is_success = true
      res.json(result)
    } catch (error) {
      const {is_success,user_id,email,roll_number} = result
      // result.is_success = false
      res.status(500).send({is_success,user_id,email,roll_number,errorMessage:error.message})
      console.error(error.message)
    }



  })


module.exports = router