const express = require('express')
const Tas = require('../models/tas')
const router = express.Router()

router.get('/', async(req, res) => {
    const data = await Tas.findById(process.env.tas);
    res.render('tariffsAndservices/index', {tas: data});
})

router.get('/edit', async(req, res) => {
    const data = await Tas.findById(process.env.tas);
    res.render('tariffsAndservices/edit', {tas: data});
})

router.post('/', async (req, res) => {

    await Tas.findByIdAndUpdate({_id:process.env.tas},{
        tas: req.body.tas
    })
    const data = await Tas.findById(process.env.tas);
    res.render('tariffsAndservices/index', {tas: data})
})

// router.get('/:id', async (req, res) => {
//     const data = await Tas.findById(req.params.id)
//    res.render('tariffsAndservices/show', {tas: data})
// })

// router.get('/:id/del', async(req,res) => {
//     const data = await Tas.findById(req.params.id)
//     await data.remove()
//     res.redirect('/tariffsAndservices')
// })

module.exports = router