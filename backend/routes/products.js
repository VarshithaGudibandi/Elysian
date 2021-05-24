var prodSchema = require('../models/Product');
var express = require('express');
var router = express.Router();

router.get('/', async (req,res) => {
    var prods = await prodSchema.find({});
    res.render('products', {'prods': prods});
});
router.get('/beaded', async (req,res) => {
    var prods = await prodSchema.find({category: 'Beaded'});
    res.render('categories/beaded', {'prods': prods});
});
router.get('/bracelets', async (req,res) => {
    var prods = await prodSchema.find({category: 'Bracelets'});
    res.render('categories/bracelets', {'prods': prods});
});
router.get('/earcuffs', async (req,res) => {
    var prods = await prodSchema.find({category: 'Earcuffs'});
    res.render('categories/ear_cuffs', {'prods': prods});
});
router.get('/necklaces', async (req,res) => {
    var prods = await prodSchema.find({category: 'Necklaces'});
    res.render('categories/necklaces', {'prods': prods});
});
router.get('/pearls', async (req,res) => {
    var prods = await prodSchema.find({category: 'Pearls'});
    res.render('categories/pearls', {'prods': prods});
});
router.get('/polymerclay', async (req,res) => {
    var prods = await prodSchema.find({category: 'Polymer Clay'});
    res.render('categories/polymer_clay', {'prods': prods});
});
router.get('/tassels', async (req,res) => {
    var prods = await prodSchema.find({category: 'Tassels'});
    res.render('categories/tassels', {'prods': prods});
});
router.get('/threads', async (req,res) => {
    var prods = await prodSchema.find({category: 'Threads'});
    res.render('categories/threads', {'prods': prods});
});
router.get('/wiredearrings', async (req,res) => {
    var prods = await prodSchema.find({category: 'Wired Earrings'});
    res.render('categories/wired_earrings', {'prods': prods});
});

module.exports = router;