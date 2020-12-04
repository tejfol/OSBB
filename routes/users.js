const express = require('express')
const Users = require('../models/users')
const router = express.Router()
const createStorage  = require('../middleware/storageMiddleware')

const storageMiddleware = createStorage('')

//All users Route
router.get('/', async (req, res) => {
   const data = await Users.find({});
   res.render('users/index', {users:data})
})

router.get('/new', (req, res) => {
    res.render('users/new', {users: new Users()})
})

router.post('/', storageMiddleware, async (req, res) => {
    console.log(req.body);
    const filedata = req.file
    console.log(filedata);
    
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
        imgPath: filedata ? filedata.path : ''
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

 router.get('/:id', async (req, res) => {
     const data = await Users.findById(req.params.id)
    res.render('users/show', {user: data})
})

router.get('/:id/del', async(req,res) => {
    const data = await Users.findById(req.params.id)
    await data.remove()
    res.redirect('/users')
})


module.exports = router