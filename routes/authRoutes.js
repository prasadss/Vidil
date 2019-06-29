const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const userModel = require('../models/user');
const User = mongoose.model('User', userModel.UserSchema);
const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
    try {
        const { error } = validateUser(req.body)
        if (error) return res.status(400).send(error.details[0].message);

        let user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).send('Invlaid Email or password');

        const validpassword = await bcrypt.compare(req.body.password, user.password)
        if (!validpassword) return res.status(400).send('Invlaid Email or password');

        res.send(user.generateAuthToken());
    } catch (ex) {
        console.log(ex);

    }
})
function validateUser(user) {
    const schema = {
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }

    return Joi.validate(user, schema);
}



module.exports = router;