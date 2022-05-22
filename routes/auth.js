const passport = require('passport');
const modelDb = require('../db-schema/model');
const router = require('express').Router();

router.get('/login', function(req, res) {
  res.render('login', {
  	user: req.user,
  	message: req.flash('error')
  	});
});

router.post('/login', passport.authenticate('local', { 
		failureRedirect: '/login', failureFlash: true	}
	), 
	function(req, res) {
    	res.redirect('/');
  });

router.get('/signup', function(req, res) {
  res.render('signup', {mensagem: ""});
});


router.post('/signup', function(req, res, next) {
	  console.log('registering user');
	  modelDb.Usuario.register(new modelDb.Usuario(
	  	{username: req.body.username}),req.body.password, 
	  	function(err) {
	  		if (err) {
	  	    	console.log('error while user register!', err);
	  	    	//return next(err);
	  	    	//res.json(err)
	  	    	res.render("signup",{mensagem:err})
	  	    }else{
				console.log('user registered!');//se deu bom
				res.redirect('/');
			}
	});
})

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});



module.exports =router;
