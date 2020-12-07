const express = require('express')
const Residents = require('../models/residents')
const router = express.Router()
const createStorage  = require('../middleware/storageMiddleware')


const storageMiddleware = createStorage('')

router.get('/', async (req, res) => {
   const data = await Residents.find({});
   res.render('residents/index', {residents:data})
})

router.get('/new', async (req, res) => {
    res.render('residents/new', {residents: new Residents()})
})

router.post('/', storageMiddleware, async (req, res) => {
    const filedata = req.file
    let myFiles = [];
    req.files.forEach(file => {
        myFiles.push(file.path)
    })
    console.log(req.files);
    let pass = makePass().toString();
    const data = await new Residents({
        pib: req.body.pib,
        birthday: req.body.birthday,
        idc: req.body.idc,
        password: pass,
        birthPlace: req.body.birthPlace,
        phoneNumber: req.body.phoneNumber,
        role: req.body.role,
        imgPath: myFiles ? myFiles : ''
    })
    try {
        const newResident = await data.save()
        // res.redirect(`authors/${newAuthor.id}`)
        res.redirect('residents')
    } catch (err){
        console.log(err);
        res.render('residents/new', {
            residents: data,
            errorMessage: 'Error creating resident'
        })
    }
 })



 router.post('/update', async (req, res) => {
    await Residents.findOneAndUpdate({_id: req.body.id},{
        pib: req.body.pib,
        birthday: req.body.birthday,
        idc: req.body.idc,
        birthPlace: req.body.birthPlace,
        phoneNumber: req.body.phoneNumber,
        role: req.body.role
    })
    res.redirect('/residents')
})

router.get('/:id/edit', async (req, res) => {
    const data = await Residents.findById(req.params.id)
   res.render('residents/edit', {residents: data})
})

router.get('/:id/del', async(req,res) => {
    const data = await Residents.findById(req.params.id)
    await data.remove()
    res.redirect('/residents')
})

function makePass(length=8) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }
 

module.exports = router