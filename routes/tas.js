const express = require('express')
const Tas = require('../models/tas')
const router = express.Router()

router.get('/', async(req, res) => {
    const data = await Tas.find({});
    res.render('tariffsAndservices/index', {tas: data});
})

router.get('/new', (req, res) => {
    res.render('tariffsAndservices/new', {tas: new Tas()})
})

router.post('/', async (req, res) => {
    console.log(req.body);
    const data = await new Tas({
        name: req.body.name,
        cost: req.body.cost
    })
    try {
        const newTas = await data.save();
        res.redirect('tariffsAndservices')
    } catch (error) {
        console.log(error);
        res.render('tariffsAndservices/new', {
            tas: data,
            errorMessage: 'Error creating new tas'
        })
    }
})

router.post('/update', async(req, res) => {
    
    await Tas.findOneAndUpdate({_id: id},{
        
    })
    res.redirect('/tariffsAndservices')
})

router.get('/:id', async (req, res) => {
    const data = await Tas.findById(req.params.id)
   res.render('tariffsAndservices/edit', {tas: data})
})

router.get('/:id/del', async(req,res) => {
    const data = await Tas.findById(req.params.id)
    await data.remove()
    res.redirect('/tariffsAndservices')
})

module.exports = router