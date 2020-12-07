const express = require('express')
const Contacts = require('../models/contacts')
const router = express.Router()

router.get('/', async(req, res) => {
    const data = await Contacts.find({});
    res.render('contacts/index', {contacts: data});
})

router.get('/new', (req, res) => {
    res.render('contacts/new', {contacts: new Contacts()})
})

router.post('/', async (req, res) => {
    const data = await new Contacts({
        titul: req.body.titul,
        name: req.body.name,
        phoneNumber: req.body.phoneNumber
    })
    try {
        const newContact = await data.save();
        res.redirect('contacts')
    } catch (error) {
        console.log(error);
        res.render('contacts/new', {
            contacts: data,
            errorMessage: 'Error creating Contact'
        })
    }
})

router.get('/:id', async (req, res) => {

    const data2 = await Contacts.findById(req.params.id)
    const data = await Contacts.findById({})
    await Contacts.findByIdAndUpdate({id: dataw.id},{
        titul: req.body.titul,
        name: req.body.name,
        phoneNumber: req.body.phoneNumber
    })
   res.render('contacts', {contacts: data})
})

router.get('/:id/del', async(req,res) => {
    const data = await Contacts.findById(req.params.id)
    await data.remove()
    res.redirect('/contacts')
})

module.exports = router