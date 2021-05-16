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
 
    // a document instance
    var product = new Product({name: 'Aster', price: 150, stock: 0, description: 'Pearl hoops.', category: ['Pearls'], size: '4cm diameter' , imgPath: 'images/15.jpg'});
 
    // save model to database
    product.save(function (err, prod) {
      if (err) return console.error(err);
      console.log(prod.name + " saved to collection.");
    });
     
});