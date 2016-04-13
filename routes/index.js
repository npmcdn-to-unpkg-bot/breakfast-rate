var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

//LANDING PAGE
router.get("/", function(req,res){
	res.render("landing");
});


/*====================
	AUTH ROUTES
====================*/

//register form
router.get("/register", function(req,res){
	res.render("register");
});

//handle register form
router.post("/register", function(req,res){
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if(err) {
			return res.render("register", {error: err.message});
		} 
		passport.authenticate("local")(req, res, function(){
			req.flash("success", "Welcome to Breakfast-Rate " + user.username + "!");
			res.redirect("/recipes");
		});
	});
});

//login form
router.get("/login", function(req,res){
	res.render('login');
});

//handle login
router.post("/login", passport.authenticate("local", 
	{
		successRedirect: "/recipes",
		failureRedirect: "/login",
		failureFlash: "Invalid username or password",
		successFlash: "Welcome back to Breakfast-Rate!",
	}), function(req,res){
});

//logout
router.get("/logout", function(req,res){
	req.logout();
	req.flash("success", "Successfully logged you out,");
	res.redirect("/recipes");
});

module.exports = router;