const express = require('express')
const Apartments = require('../models/apartments')
const router = express.Router()
const splitStr = require('../middleware/split');

router.get('/', async (req, res) => {
    let searchOptions = {}
  if (req.query.owner != null && req.query.owner !== '') {
    searchOptions.owner = new RegExp(req.query.owner, 'i')
  }
  try {
    const data = await Apartments.find(searchOptions)
    res.render('apartments/index', {
      apartments: data,
      searchOptions: req.query
    })
  } catch {
    res.redirect('apartments/index')
  }
})

router.get('/new', (req, res) => {
    res.render('apartments/new', {apartments: new Apartments()})
})

router.post('/', async (req, res) => {
  let str = req.body.residents
  let residents = []
  str.toString()
  let resi = splitStr(str, ',');
  console.log(resi);
  resi.forEach(file => {
      
      residents.push(file)
  });

    const data = await new Apartments({
        owner: req.body.owner,
        accountNumber: req.body.accountNumber,
        area: req.body.area,
        adress: req.body.adress,
        benefits: req.body.benefits,
        phoneNumber: req.body.phoneNumber,
        services: req.body.services,
        residents: residents
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
  let str = req.body.residents
  let residents = []
  str.toString()
  let resi = splitStr(str, ',');
  console.log(resi);
  resi.forEach(file => {
      
      residents.push(file)
  });
    let id = req.body.id
    await Apartments.findOneAndUpdate({_id: id},{
        owner: req.body.owner,
        accountNumber: req.body.accountNumber,
        area: req.body.area,
        adress: req.body.adress,
        benefits: req.body.benefits,
        phoneNumber: req.body.phoneNumber,
        services: req.body.services,
        residents: residents
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