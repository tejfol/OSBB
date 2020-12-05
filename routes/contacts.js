const express = require('express')
const Contact = require('../models/news')
const router = express.Router()

router.get('/', async(req, res) => {
    const data = await Contact.find({});
    res.render('contacts/index', {contacts: data});
})

router.get('/new', (req, res) => {
    res.render('contacts/new', {sliders: new Contact()})
})

router.post('/', async (req, res) => {
    const data = await new Contact({
        titul: req.body.titul,
        name: req.body.subscription,
        phoneNumber: req.body.phoneNumber
    })
    try {
        const newContact = await data.save();
        res.redirect('contacts')
    } catch (error) {
        console.log(error);
        res.render('contacts/new', {
            sliders: data,
            errorMessage: 'Error creating sliderShow'
        })
    }
})

router.get('/:id', async (req, res) => {
    const data = await Contact.findById(req.params.id)
   res.render('contacts/show', {contact: data})
})

router.get('/:id/del', async(req,res) => {
    const data = await Contact.findById(req.params.id)
    await data.remove()
    res.redirect('/contacts')
})

module.exports = router