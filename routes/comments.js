var express = require("express");
var router = express.Router({mergeParams: true}); //allows you to access :id
var Recipe = require("../models/recipe");
var Comment = require("../models/comment");

//NEW
router.get("/new", isLoggedIn, function(req,res){
	Recipe.findById(req.params.id, function(err, recipe){
		if(err){
			console.log(err);
			res.redirect("back");
		} else {
			res.render("comments/new", {recipe: recipe});
		}
	});
});

//CREATE
router.post("/", isLoggedIn, function(req, res){
	Recipe.findById(req.params.id, function(err, recipe){
		if(err){
			console.log(err);
			res.redirect("/recipes/"+recipe._id);
		} else {
			console.log(req.body.comment);
			Comment.create(req.body.comment, function(err, comment){
				if(err){
					console.log(err);
				} else {
					recipe.comments.push(comment);
					recipe.save();
					res.redirect("/recipes/" +recipe._id);
				}
			});
		}
	});
});

//middleware
function isLoggedIn(req,res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

module.exports = router;