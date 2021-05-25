const bcrypt = require('bcryptjs');
const User = require('./models/User');
const passport = require('passport');
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
    app.get('/wishlist', ensureAuthenticated, (req,res) => {
        res.render('wishlist');
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
            res.render('product_details', {product:product});
        })
    })
    app.get('/add-to-cart/:id', (req,res,next) => {
        var productID = req.params.id;
        var cart = new Cart(req.session.cart ? req.session.cart : {});

        Product.findById(productID, (err,product) => {
            if(err){
                return res.redirect('/');
            }
            cart.add(product, product._id);
            req.session.cart = cart;
            // console.log(req.session.cart);
            req.flash('success_msg','Item added to cart successfully!')
            res.redirect('back');
        });
    });
    app.get('/reduce/:id', (req,res,next) => {
        var productID = req.params.id;
        var cart = new Cart(req.session.cart ? req.session.cart : {});
        cart.reduceByOne(productID);
        req.session.cart = cart;
        res.redirect('/cart');
    })
    app.get('/remove-from-cart/:id', (req,res,next) => {
        var productID = req.params.id;
        var cart = new Cart(req.session.cart);
        cart.removeItem(productID);
        req.session.cart = cart;
        res.redirect('/cart');
        
    });
    app.get('/clear-cart', (req,res,next) => {
        var cart = new Cart(req.session.cart);
        req.session.cart = null;
        res.redirect('/cart');
        
    });
    app.get('/cart', (req,res) => {
        if(!req.session.cart){
            return res.render('cart', {products: null});
        }
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
                'path': cart.items[property].item.imgPath
            }
            prods.push(prod);
        }

        res.render('cart', {products: prods, totalPrice: cart.totalPrice});
    });
    // app.post('/checkout', req)
    app.all('/checkout', ensureAuthenticated, (req,res,next) => {
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
            cart: prods,
            note: note,
            totalAmount: cart.totalPrice,
            totalQty: cart.totalQty,
        });
        order.save((err,result) => {
            if(err){
                req.flash('error_msg', 'Order placement unsuccessful. Please try again.')
                return res.redirect('/cart');
            }
            req.flash('success_msg', 'Order placed successfully!');
            req.session.cart = null;
            res.redirect('/');
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