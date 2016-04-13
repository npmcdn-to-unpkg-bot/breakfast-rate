var Recipe = require("../models/recipe");
var Comment = require("../models/comment");

var middlewareObject = {};

middlewareObject.checkRecipeOwnership = function(req, res, next) {
	if(req.isAuthenticated()){
		Recipe.findById(req.params.id, function(err, foundRecipe){
			if(err){
				req.flash("error", "There was an error finding that recipe.");
				res.redirect("back");
			} else {
				if(foundRecipe.author.id.equals(req.user._id)){
					next();
				} else {
					res.redirect("back");
				}
			}
		});
	} else {
		req.flash("error", "You don't have permission to do that.");
		res.redirect("/recipes");
	}
};

middlewareObject.checkCommentOwnership = function (req, res, next) {
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id, function(err, foundComment){
			if(err){
				res.redirect("back");
			} else {
				if(foundComment.author.id.equals(req.user._id)){
					next();
				} else {
					req.flash("error", "You don't have permission to do that.");
					res.redirect("back");
				}
			}
		});
	} else {
		req.flash("error", "You need to be logged in to do that.");
		res.redirect("back");
	}
};

middlewareObject.isLoggedIn = function(req,res, next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error", "You need to be logged in to do that.");
	res.redirect("/login");
};


module.exports = middlewareObject;