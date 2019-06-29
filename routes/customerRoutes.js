const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const customerModel = require('../models/customer');
const Customer = mongoose.model('Customer', customerModel.CustomerSchema);



router.get('/', async (req, res) => {
    const result = await Customer.find()
        .sort('name');
    res.send(result);
})
router.post('/', async (req, res) => {
    const { error } = customerModel.customerModel.validateCustomer(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    let customer = new Customer({
        name: req.body.name,
        isGold:req.body.isGold,
        phone:req.body.phone
    });

    const result = await customer.save()
    res.send(result);
})
router.put('/:id', async (req, res) => {
    const { error } = customerModel.validateCustomer(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findByIdAndUpdate(req.params.id, {
        name: req.body.name
    }, { new: true })

    if (!customer) return res.status(400).send("This genre doesnt exist");

    res.send(customer);
})
router.delete('/:id', async (req, res) => {

    const customer = await Customer.findByIdAndRemove(req.params.id);

    if (!customer) return res.status(400).send("This genre doesnt exist");

    res.send(customer);
})
router.get('/:id', async (req, res) => {

    const customer = await Customer.findById(req.params.id);

    if (!customer) return res.status(400).send("This genre doesnt exist");

    res.send(customer);
})

module.exports = router;