const bcrypt = require('bcryptjs');
const User = require('./models/User');
const passport = require('passport');
var mongoose = require('mongoose');
var nodemailer = require('nodemailer')
var ejs = require("ejs");
const { ensureAuthenticated } = require('./config/auth');
const Product = require('./models/Product');
var Cart = require('./models/carts')
var Order = require('./models/Order')

module.exports = function(app){
    app.get('/contactus', (req,res) => {
        res.render('contactus');
    });
    app.get('/login', (req,res) => {
        res.render('login');
    });
    app.get('/signup', (req,res) => {
        res.render('signup');
    });
    app.get('/myprofile', (req,res) => {
        res.render('my_profile', {user: req.user});
    });
    app.get('/logout', async (req,res) => {
        req.logout();
        req.flash('success_msg', 'Logout successful!');
        res.redirect('login');
    });
    app.get('/wishlist', ensureAuthenticated, async (req,res) => {
        wishlist = req.user.wishlist;
        var prods = [];
        for(let name of wishlist){
            var prod = await Product.findOne({name: name});
            prods.push(prod);
        }
        // console.log(prods);
        res.render('wishlist', {'prods': prods});
    });
    app.post('/auth', (req,res,next) => {
        passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: true,
        })(req,res,next);
    });
    app.get('/details/:id', (req,res,next) => {
        var productID = req.params.id;
        Product.findById(productID, (err, product) => {
            if(err){
                return res.redirect('back');
            }
            try{
                res.render('product_details', {'product':product, 'wishlist': req.user.wishlist});
            }
            catch(err){
                res.render('product_details', {'product':product});
            }
        });
    })
    app.get('/add-to-cart/:id', (req,res,next) => {
        var productID = req.params.id;
        var cart = new Cart(req.session.cart ? req.session.cart : {});

        Product.updateOne({_id: productID}, {$inc: {stock: -1}}, (err,product) => {
            if(err){
                req.flash('error_msg','Error. Please try again.')
                return res.redirect('back');
            }
        });
        Product.findById(productID, (err,product) => {
            if(err){
                req.flash('error_msg','Error. Please try again.')
                return res.redirect('back');
            }
            cart.add(product, product._id);
            req.session.cart = cart;
            // if(typeof req.user.wishlist != 'undefined'){
            //     if(req.user.wishlist.includes(product.name)){
            //         User.updateOne({email: req.user.email}, {$pullAll: {wishlist: [product.name]}}, (err,product) => {
            //             if(err){
            //                 req.flash('error_msg','Error. Please try again.')
            //                 return res.redirect('back');
            //             }
            //         });
            //     }
            // }
            req.flash('success_msg','Item added to cart!')
            res.redirect('back');
        });
    })
    app.get('/add-to-wishlist/:name', ensureAuthenticated, (req,res,next) => {
        User.updateOne({email: req.user.email}, {$push: {wishlist: [req.params.name]}}, (err,product) => {
            if(err){
                req.flash('error_msg','Error. Please try again.')
                return res.redirect('/');
            }
            req.flash('success_msg','Item removed from wishlist!')
            res.redirect('back');
        });
    })
    app.get('/remove-from-wishlist/:name', ensureAuthenticated, (req,res,next) => {
        User.updateOne({email: req.user.email}, {$pullAll: {wishlist: [req.params.name]}}, (err,product) => {
            if(err){
                req.flash('error_msg','Error. Please try again.')
                return res.redirect('/');
            }
            req.flash('success_msg','Item removed from wishlist!')
            res.redirect('back');
        });
    })
    app.get('/reduce/:id', (req,res,next) => {
        var productID = req.params.id;
        Product.updateOne({_id: productID}, {$inc: {stock: 1}}, (err,product) => {
            if(err){
                req.flash('error_msg','Error. Please try again.')
                return res.redirect('back');
            }
        });
        var cart = new Cart(req.session.cart ? req.session.cart : {});
        cart.reduceByOne(productID);
        req.session.cart = cart;
        res.redirect('/cart');
    })
    app.get('/remove-from-cart/:id', (req,res,next) => {
        var cart = new Cart(req.session.cart);
        var productID = req.params.id;
        var incQty = cart.items[productID].qty;
        Product.updateOne({_id: productID}, {$inc: {stock: incQty}}, (err,product) => {
            if(err){
                req.flash('error_msg','Error. Please try again.')
                return res.redirect('back');
            }
        });
        var cart = new Cart(req.session.cart);
        cart.removeItem(productID);
        req.session.cart = cart;
        res.redirect('/cart');
        
    });
    app.get('/clear-cart', (req,res,next) => {
        var cart = new Cart(req.session.cart);
        for(const property in cart.items){
            var productID = cart.items[property].item._id
            var incQty = cart.items[property].qty
            Product.updateOne({_id: productID}, {$inc: {stock: incQty}}, (err,product) => {
                if(err){
                    req.flash('error_msg','Error. Please try again.')
                    return res.redirect('back');
                }
            });
        }
        req.session.cart = null;
        res.redirect('/cart');
        
    });
    app.get('/cart', async (req,res) => {
        if(!req.session.cart){
            return res.render('cart', {products: null});
        }
        var cart = new Cart(req.session.cart);
        var prods = [];
        var prod = {};
        for(const property in cart.items){
            var prod = {};
            var product = await Product.findById(property);
            prod = {
                '_id': cart.items[property].item._id,
                'name': cart.items[property].item.name,
                'price': cart.items[property].item.price,
                'qty': cart.items[property].qty,
                'total': cart.items[property].price,
                'path': cart.items[property].item.imgPath,
                'stock': product.stock
            }
            prods.push(prod);
        }

        res.render('cart', {products: prods, totalPrice: cart.totalPrice});
    });
    app.get('/checkout', ensureAuthenticated, (req,res,next) => {
        if(!req.session.cart){
            return res.redirect('/cart');
        }
        console.log(req.body.note);
        var cart = new Cart(req.session.cart);
        var prods = [];
        for(const property in cart.items){
            var prod = {};
            prod = {
                '_id': cart.items[property].item._id,
                'name': cart.items[property].item.name,
                'price': cart.items[property].item.price,
                'qty': cart.items[property].qty,
                'total': cart.items[property].price,
            }
            prods.push(prod);
        }
        var order = new Order({
            email: req.user.email,
            cart: prods,
            // note: note,
            totalAmount: cart.totalPrice,
            totalQty: cart.totalQty,
        });
        order.save((err,result) => {
            if(err){
                req.flash('error_msg', 'Order placement unsuccessful. Please try again.')
                return res.redirect('/cart');
            }
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'elysianhandmade.official@gmail.com',
                    pass: 'Elysian@1234'
                }
            });
            ejs.renderFile('./views/confirmation_mail.ejs', {order: order}, (err,data)=>{
                if(err){
                    console.log(err);
                }
                else{
                    var mailOptions = {
                        from: 'elysianhandmade.official@gmail.com',
                        to: req.user.email,
                        subject: 'Order Confirmed',
                        html: data
                    };
        
                    transporter.sendMail(mailOptions, (err, info) => {
                        if(err){
                            console.log(err);
                        }
                        else{
                            console.log('Email sent: '+ info.response);
                        }
                    });
                }
            })

            // req.flash('success_msg', 'Order placed successfully!');
            req.session.cart = null;
            res.render('thank_you');
        })
    })
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
};