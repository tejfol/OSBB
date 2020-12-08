const express = require('express')
const Announcements = require('../models/announcements')
const router = express.Router()

router.get('/', async(req, res) => {
    const data = await Announcements.find({});
    res.render('announcements/index', {announcements: data});
})

router.get('/new', (req, res) => {
    res.render('announcements/new', {announcements: new Announcements()})
})

router.post('/', async (req, res) => {
    const data = await new Announcements({
        title: req.body.title,
        text: req.body.text,
        date: req.body.date
    })
    try {
        const newAnnouncement = await data.save();
        res.redirect('announcements')
    } catch (error) {
        console.log(error);
        res.render('announcements/new', {
            announcements: data,
            errorMessage: 'Error creating announcement'
        })
    }
})

router.post('/update', async(req, res) => {
    let id = req.body.id
    await Announcements.findOneAndUpdate({_id: id},{
        title: req.body.title,
        text: req.body.text,
    })
    res.redirect('/announcements')
})

router.get('/:id', async (req, res) => {
    const data = await Announcements.findById(req.params.id)
   res.render('announcements/edit', {announcements: data})
})

router.get('/:id/del', async(req,res) => {
    const data = await Announcements.findById(req.params.id)
    await data.remove()
    res.redirect('/announcements')
})

module.exports = router