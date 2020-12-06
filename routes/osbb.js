const express = require('express')
const Osbb = require('../models/osbb')
const router = express.Router()


router.get('/', async (req, res) => {
   const data = await Osbb.find({});
   res.render('osbb/index', {osbb:data})
})

router.get('/new', async (req, res) => {
    res.render('osbb/new', {osbb: new Osbb()})
})

router.post('/', async (req, res) => {
    const data = await new Osbb({
        osbbname: req.body.osbbname,
        adress: req.body.adress,
        edrpoy: req.body.edrpoy,
        bank: req.body.bank,
        mfo: req.body.mfo,
        accountnumber: req.body.accountnumber,
        iban: req.body.iban,
        apartments: req.body.apartments
    })
    try {
        const newOsbb = await data.save()
        // res.redirect(`authors/${newAuthor.id}`)
        res.redirect('osbb')
    } catch (err){
        console.log(err);
        res.render('osbb/new', {
            osbb: data,
            errorMessage: 'Error creating OSBB'
        })
    }
 })

 router.get('/:id', async (req, res) => {
     const data = await Osbb.findById(req.params.id)
    res.render('osbb/show', {osbb: data})
})

router.get('/:id/del', async(req,res) => {
    const data = await Osbb.findById(req.params.id)
    await data.remove()
    res.redirect('/osbb')
})

module.exports = router