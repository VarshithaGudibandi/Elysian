var mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
var prodSchema = require('./models/Product');
const User = require('./models/User');
const passport = require('passport');
const { ensureAuthenticated } = require('./config/auth');

module.exports = function(app){
    app.get('/products', async (req,res) => {
        var prods = await prodSchema.find({});
        //console.log(prods);
        res.render('products', {'prods': prods});
    });
    app.get('/', (req,res) => {
        res.render('index');
    });


    app.post('/register', (req,res) => {
        //console.log(req.body);
        const { firstname, lastname, email, contact, password, password2 } = req.body;
        let errors = [];
        // console.log({ firstname, lastname, email, contact, password, password2 });

        //Check if any fields are empty
        if(!firstname || !lastname || !email || !contact || !password || !password2){
            errors.push({ msg: 'Please fill in all fields.' });
        }

        //Check if passwords match
        if(password !== password2){
            errors.push({ msg: 'Passwords do no match.' })
        }

        //Check password length
        if(password.length < 6){
            errors.push({ msg: 'Password should be atleast 6 characters.'})
        }

        if(errors.length > 0){
            // console.log(errors);
            res.render('signup', {
                errors,
                firstname,
                lastname,
                email,
                contact,
                password,
                password2,
            });
        }
        else{
            User.findOne({email: email}).then(user => {
                if(user){
                    errors.push({msg: 'E-mail already exists.'})
                    res.render('signup', {
                        errors,
                        firstname,
                        lastname,
                        email,
                        contact,
                        password,
                        password2,
                    });
                }
                else{
                    const newUser = new User({
                        firstName: firstname,
                        lastName: lastname,
                        email,
                        password,
                        contact,
                    });

                    bcrypt.genSalt(10, (err,salt) => 
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if(err) throw err;

                            newUser.password = hash;
                            newUser.save()
                            .then((user) => {
                                req.flash('success_msg', 'Sign up successful! You can now login.')
                                res.redirect('/login');
                            })
                            .catch(err => console.log(err));
                    }))
                }
            })
        }
        
    });
    app.post('/auth', (req,res,next) => {
        passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: true,
        })(req,res,next);
    });
    app.get('/logout', (req,res) => {
        req.logout();
        req.flash('success_msg', 'You have logged out.');
        re.redirect('login');
    })



    app.get('/logout', (req,res) => {
        res.render('logout');
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
    app.get('/cart', ensureAuthenticated, (req,res) => {
        res.render('cart');
    });
    app.get('/wishlist', ensureAuthenticated, (req,res) => {
        res.render('wishlist');
    });
    app.get('/beaded', async (req,res) => {
        var prods = await prodSchema.find({category: 'Beaded'});
        res.render('categories/beaded', {'prods': prods});
    });
    app.get('/bracelets', async (req,res) => {
        var prods = await prodSchema.find({category: 'Bracelets'});
        res.render('categories/bracelets', {'prods': prods});
    });
    app.get('/earcuffs', async (req,res) => {
        var prods = await prodSchema.find({category: 'Earcuffs'});
        res.render('categories/ear_cuffs', {'prods': prods});
    });
    app.get('/necklaces', async (req,res) => {
        var prods = await prodSchema.find({category: 'Necklaces'});
        res.render('categories/necklaces', {'prods': prods});
    });
    app.get('/pearls', async (req,res) => {
        var prods = await prodSchema.find({category: 'Pearls'});
        res.render('categories/pearls', {'prods': prods});
    });
    app.get('/polymerclay', async (req,res) => {
        var prods = await prodSchema.find({category: 'Polymer Clay'});
        res.render('categories/polymer_clay', {'prods': prods});
    });
    app.get('/tassels', async (req,res) => {
        var prods = await prodSchema.find({category: 'Tassels'});
        res.render('categories/tassels', {'prods': prods});
    });
    app.get('/threads', async (req,res) => {
        var prods = await prodSchema.find({category: 'Threads'});
        res.render('categories/threads', {'prods': prods});
    });
    app.get('/wiredearrings', async (req,res) => {
        var prods = await prodSchema.find({category: 'Wired Earrings'});
        res.render('categories/wired_earrings', {'prods': prods});
    });

};