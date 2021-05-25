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
        name: 'Viola', 
        price: 130, 
        stock: 0, 
        color: [
          'Violet',
          'Green',
          'Light Blue',
          'White',
          'Red'
        ],
        description: 'Crystal drop Kidney hoops.', 
        category: ['Pearls', 'Wired Earrings'], 
        imgPath: 'images/12.jpg'
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