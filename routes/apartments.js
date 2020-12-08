const express = require('express')
const Apartments = require('../models/apartments')
const router = express.Router()

router.get('/', async (req, res) => {
    const data = await Apartments.find({});
    res.render('apartments/index', {apartments: data});
})

router.get('/new', (req, res) => {
    res.render('apartments/new', {apartments: new Apartments()})
})

router.post('/', async (req, res) => {
    const data = await new Apartments({
        owner: req.body.owner,
        accountNumber: req.body.accountNumber,
        area: req.body.area,
        adress: req.body.adress,
        benefits: req.body.benefits,
        phoneNumber: req.body.phoneNumber,
        services: req.body.services
    })
    try {
        const newApartment = await data.save();
        res.redirect('apartments')
    } catch (error) {
        console.log(error);
        res.render('apartments/new', {
            apartments: data,
            errorMessage: 'Error creating apartment'
        })
    }
})

router.post('/update', async (req, res) =>{
    let id = req.body.id
    await Apartments.findOneAndUpdate({_id: id},{
        owner: req.body.owner,
        accountNumber: req.body.accountNumber,
        area: req.body.area,
        adress: req.body.adress,
        benefits: req.body.benefits,
        phoneNumber: req.body.phoneNumber,
        services: req.body.services
    })
    res.redirect('/apartments')
})

router.get('/:id', async (req, res) => {
    const data = await Apartments.findById(req.params.id)
   res.render('apartments/edit', {apartments: data})
})

router.get('/:id/del', async(req,res) => {
    const data = await Apartments.findById(req.params.id)
    await data.remove()
    res.redirect('/apartments')
})

module.exports = router