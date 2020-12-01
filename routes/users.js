const express = require('express')
const users = require('../models/users')
const router = express.Router()

//All authors Route
router.get('/', async (req, res) => {
   const Users = await users.find({})
   res.status(200).send(Users);
})


module.exports = router