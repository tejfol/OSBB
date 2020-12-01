const express = require('express')
const users = require('../models/users')
const router = express.Router()

//All authors Route
router.get('/', async (req, res) => {
   const Users = await users.find({})
   res.render('users/index', {users:Users})
})

router.get('/new', (req, res) => {
    res.render('users/new', {author: new users()})
})



module.exports = router