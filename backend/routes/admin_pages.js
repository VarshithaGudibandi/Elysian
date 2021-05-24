var express = require('express');
var router = express.Router();

//get index page
router.get('/', (req,res) => {
    res.send('Admin Page');
})

//get add page
router.get('/add-page', (req,res) => {
    var title = "";
    var slug = "";
    var content = "";

    res.render('admin/add_page', {
        title: title,
        slug: slug,
        content: content,
    });
});

module.exports = router;