const express = require('express')
const News = require('../models/news')
const router = express.Router()
const createStorage  = require('../middleware/storageMiddleware')

const storageMiddleware = createStorage('')

router.get('/', async(req, res) => {
    const data = await News.find({});
    res.render('news/index', {myNews: data});
})

router.get('/new', (req, res) => {
    res.render('news/new', {myNews: new News()})
})

router.post('/', storageMiddleware, async (req, res) => {
    let myfiles = []
    req.files.forEach(file => {
        console.log(file.path);
        myfiles.push(file.path)
    });

    const data = await new News({
        title: req.body.title,
        subscription: req.body.subscription,
        imgPath: myfiles ? myfiles : ''
    })
    try {
        const newNews = await data.save();
        res.redirect('news')
    } catch (error) {
        console.log(error);
        res.render('news/new', {
            myNews: data,
            errorMessage: 'Error creating sliderShow'
        })
    }
})

router.post('/update', storageMiddleware, async(req, res) => {
    let myfiles = [];
    if(req.files){req.files.forEach(file => {
        myFiles.push(file.path)
    })}
    await News.findOneAndUpdate({title: req.body.title},{
        title: req.body.title,
        subscription: req.body.subscription
    })
    res.redirect('/news')
})

router.get('/:id', async (req, res) => {
    const data = await News.findById(req.params.id)
    let proid = data.id
   res.render('news/edit', {myNews: data, proid: proid})
})

router.get('/:id/del', async(req,res) => {
    const data = await News.findById(req.params.id)
    await data.remove()
    res.redirect('/news')
})

module.exports = router