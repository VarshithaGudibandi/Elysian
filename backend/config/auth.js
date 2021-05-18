module.exports = {
    ensureAuthenticated: function(req,res,next) {
        if(req.isAuthenticated()){
            return next();
        }

        str=req.url.substring(1);
        req.flash('error_msg', `Please log in to access your ${str}.`);
        res.redirect('/login');
    }
}