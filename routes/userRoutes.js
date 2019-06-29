const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const userModel = require('../models/user');
const User = userModel.user;
const bcrypt = require('bcrypt');
const _ = require('lodash');
const auth = require('../middleware/auth');
router.post('/register', async (req, res) => {
    const { error } = userModel.validateUser(req.body)
    if (error) return res.status(400).send(error.details[0].message);


    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already exists');

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hashSync(req.body.password, salt);
    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: password
    });

    const result = await user.save()
    const token = user.generateAuthToken();
    // const token=
    res.header('x-auth-token', token).send(_.pick(result, ['_id', 'email', 'password']));
})

router.get('/me', auth, async (req, res) => {
    const user = await User.findOne({ _id: req.user._id }).select('-password');
    if (!user) return res.status(401).send('no user found');
    res.send(user);
})
module.exports = router;