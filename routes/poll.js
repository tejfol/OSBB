const express = require('express')
const Poll = require('../models/poll')
const router = express.Router()
const splitStr = require('../middleware/split')

router.get('/', async(req, res) => {
    const data = await Poll.find({});
    res.render('poll/index', {poll: data});
})

router.get('/new', (req, res) => {
    res.render('poll/new', {poll: new Poll()})
})

router.post('/', async (req, res) => {
    let str = req.body.votingOptions
    let votingOption = []
    str.toString()
    let votingOp = splitStr(str, ',');
    console.log(votingOp);
    votingOp.forEach(file => {
        
        votingOption.push(file)
    });
    console.log(votingOption);

    const data = await new Poll({
        name: req.body.name,
        subject: req.body.subject,
        votingOptions: votingOption
    })
    try {
        const newPoll = await data.save();
        // votingOptions.forEach(option => {
        //     Poll.findByIdAndUpdate(
        //         newPoll._id,
        //         {$push: {votingOptions: {option:option}}},
        //         {safe: true, upsert: true, new : true},
        //         function(err, model) {
        //             console.log(err);
        //         }
        //     );
        // }) 
        res.redirect('poll')
    } catch (error) {
        console.log(error);
        res.render('poll/new', {
            poll: data,
            errorMessage: 'Error creating poll'
        })
    }
})

router.get('/:id', async (req, res) => {
    const data = await Poll.findById(req.params.id)
   res.render('poll/show', {poll: data})
})

router.get('/:id/del', async(req,res) => {
    const data = await Poll.findById(req.params.id)
    await data.remove()
    res.redirect('/poll')
})



module.exports = router