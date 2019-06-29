const express = require('express');
const router = express.Router();
const {Genre,validateUser} = require('../models/genre');
const Joi = require('joi');
const auth=require('../middleware/auth');
const admin=require('../middleware/admin');
const validateObjectId=require('../middleware/validateObjectId');
const mongoose=require('mongoose');
// const asyncMiddleware=require('../middleware/async');
// router.use(auth);

router.get('/',async (req, res) => {
    const result = await Genre.find()
        .sort('name');
    res.send(result);
});
router.post('/',auth, async (req, res) => {
    const { error } = validateUser(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    let genre = new Genre({
        name: req.body.name
    });

    const result = await genre.save()
    res.send(result);
})
router.put('/:id', async (req, res) => {
    const { error } = validateUser(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findByIdAndUpdate(req.params.id, {
        name: req.body.name
    }, { new: true })

    if (!genre) return res.status(400).send("This genre doesnt exist");

    res.send(genre);
})
router.delete('/:id',[auth,admin], async (req, res) => {

    const genre = await Genre.findByIdAndRemove(req.params.id);

    if (!genre) return res.status(400).send("This genre doesnt exist");

    res.send(genre);
})
router.get('/:id',validateObjectId, async (req, res) => {
    
    const genre = await Genre.findById(req.params.id);

    if (!genre) return res.status(400).send("This genre doesnt exist");

    res.send(genre);
})

module.exports = router;