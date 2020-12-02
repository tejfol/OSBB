const express = require('express')
const Users = require('../models/users')
const router = express.Router()

//All authors Route
router.get('/', async (req, res) => {
   const data = await Users.find({});
   res.render('users/index', {users:data})
})

router.get('/new', (req, res) => {
    res.render('users/new', {users: new Users()})
})

router.post('/', async (req, res) => {
    console.log(req.body);
    const data = await new Users({
        name: req.body.name,
        email: req.body.email,
        number: req.body.number,
        encryptedPassword: req.body.encryptedPassword,
        owner: req.body.owner,
        receplents: req.body.receplents,
        bill: req.body.bill,
        area: req.body.area,
        adress: req.body.adress,
        benefits: req.body.benefits,
        role: req.body.role,
        profilePhotoLocation: req.body.profilePhotoLocation
    })
    try {
        const newUser = await data.save()
        // res.redirect(`authors/${newAuthor.id}`)
        res.redirect('users')
    } catch (err){
        console.log(err);
        res.render('users/new', {
            users: data,
            errorMessage: 'Error creating user'
        })
    }
 })


module.exports = router