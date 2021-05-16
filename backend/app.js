var mongoose = require('mongoose');
var prodSchema = require('./models/product');

module.exports = function(app){
    app.get('/products', async (req,res) => {
        var prods = await prodSchema.find({});
        //console.log(prods);
        res.render('products', {'prods': prods});
    });
    app.get('/', (req,res) => {
        res.render('index');
    });
    app.get('/contactus', (req,res) => {
        res.render('contactus');
    });
    app.get('/login', (req,res) => {
        res.render('login');
    });
    app.get('/signup', (req,res) => {
        res.render('signup');
    });
    app.get('/cart', (req,res) => {
        res.render('cart');
    });
    app.get('/wishlist', (req,res) => {
        res.render('wishlist');
    });
    app.get('/beaded', async (req,res) => {
        var prods = await prodSchema.find({category: 'Beaded'});
        //console.log(prods);
        res.render('categories/beaded', {'prods': prods});
    });
    app.get('/bracelets', async (req,res) => {
        var prods = await prodSchema.find({category: 'Bracelets'});
        //console.log(prods);
        res.render('categories/bracelets', {'prods': prods});
    });
    app.get('/earcuffs', async (req,res) => {
        var prods = await prodSchema.find({category: 'Earcuffs'});
        //console.log(prods);
        res.render('categories/ear_cuffs', {'prods': prods});
    });
    app.get('/necklaces', async (req,res) => {
        var prods = await prodSchema.find({category: 'Necklaces'});
        //console.log(prods);
        res.render('categories/necklaces', {'prods': prods});
    });
    app.get('/pearls', async (req,res) => {
        var prods = await prodSchema.find({category: 'Pearls'});
        //console.log(prods);
        res.render('categories/pearls', {'prods': prods});
    });
    app.get('/polymerclay', async (req,res) => {
        var prods = await prodSchema.find({category: 'Polymer Clay'});
        //console.log(prods);
        res.render('categories/polymer_clay', {'prods': prods});
    });
    app.get('/tassels', async (req,res) => {
        var prods = await prodSchema.find({category: 'Tassels'});
        //console.log(prods);
        res.render('categories/tassels', {'prods': prods});
    });
    app.get('/threads', async (req,res) => {
        var prods = await prodSchema.find({category: 'Threads'});
        //console.log(prods);
        res.render('categories/threads', {'prods': prods});
    });
    app.get('/wiredearrings', async (req,res) => {
        var prods = await prodSchema.find({category: 'Wired Earrings'});
        //console.log(prods);
        res.render('categories/wired_earrings', {'prods': prods});
    });
};