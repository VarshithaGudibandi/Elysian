var mongoose = require('mongoose');
var Product = require('./product');
 
// make a connection 
mongoose.connect('mongodb+srv://akshar:akshar2103@cluster0.70u0k.mongodb.net/elysian?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
});
 
// get reference to database
var db = mongoose.connection;
 
db.on('error', console.error.bind(console, 'connection error:'));
 
db.once('open', function() {
    console.log("Connection Successful!");

    var list = [
      {
        name: 'Ornella', 
        price: 140, 
        stock: 0, 
        description: 'Coin-Pearl C-shapped hoops.', 
        category: ['Pearls', 'Necklaces'], 
        imgPath: 'images/3.jpg'
      },
      {
        name: 'Magnolia', 
        price: 250, 
        stock: 0, 
        description: 'Coin pendent-curved pearl neclace (separate).', 
        category: ['Pearls', 'Necklaces'], 
        imgPath: 'images/4.jpg'
      },
      {
        name: 'Ajax', 
        price: 100, 
        stock: 0, 
        description: 'Pearl Pendant.', 
        category: ['Pearls', 'Necklaces'], 
        imgPath: 'images/54.jpg'
      },
      {
        name: 'Ajax-Ares Combo', 
        price: 200, 
        stock: 0, 
        description: 'Pearl Pendant Combo.', 
        category: ['Pearls', 'Necklaces'], 
        imgPath: 'images/55.jpg'
      },
      {
        name: 'Ares', 
        price: 120, 
        stock: 0, 
        description: 'Pearl Pendant.', 
        category: ['Pearls', 'Necklaces'], 
        imgPath: 'images/56.jpg'
      },
      {
        name: 'Veronica', 
        price: 250, 
        stock: 0, 
        description: 'Coin pendant-toggle hook pearl chain.', 
        category: ['Pearls', 'Necklaces'], 
        size: 'customizable',
        imgPath: 'images/64.jpg'
      },
      {
        name: 'Alister', 
        price: 180, 
        stock: 0, 
        description: 'Coin pendant gold plated and pearl chain .', 
        category: ['Pearls', 'Necklaces'],
        size: 'customizable',
        imgPath: 'images/65.jpg'
      },
      {
        name: 'Cyrus', 
        price: 180, 
        stock: 0, 
        description: 'Coin pendant pearl chain.', 
        category: ['Pearls', 'Necklaces'],
        size: 'customizable',
        imgPath: 'images/66.jpg'
      },
      {
        name: 'Rose', 
        price: 250, 
        stock: 0, 
        description: 'Coin pendant and pearl chain (seperate).', 
        category: ['Pearls', 'Necklaces'],
        size: 'customizable',
        imgPath: 'images/67.jpg'
      },
      {
        name: 'Grace', 
        price: 150, 
        stock: 0, 
        description: 'Coin-Pearl pendant chain (combined).', 
        category: ['Pearls', 'Necklaces'],
        size: 'customizable',
        imgPath: 'images/69.jpg'
      },
    ];

    list.forEach(function(item) {
      var product = new Product({
        name: item.name, 
        price: item.price, 
        stock: item.stock, 
        description: item.description, 
        category: item.category, 
        imgPath: item.imgPath,
      });

      // save model to database
      product.save(function (err, prod) {
        if (err) return console.error(err);
        console.log(prod.name + " saved to collection.");
      });
    });
     
});