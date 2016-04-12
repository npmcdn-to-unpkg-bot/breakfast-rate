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
					//add username and id to comment
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					//save comment
					comment.save();
					recipe.comments.push(comment);
					recipe.save();
					console.log(comment);
					res.redirect("/recipes/" +recipe._id);
				}
			});
		}
	});
});

//EDIT
router.get("/:comment_id/edit", function(req, res){
	Comment.findById(req.params.comment_id, function(err, foundComment){
		if(err){
			res.redirect("back");
		} else {
			res.render("comments/edit", {recipe_id: req.params.id, comment: foundComment});
		}
	});
});

//UPDATE
router.put("/:comment_id", function(req,res){
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
		if(err){
			res.redirect("back");
		} else {
			res.redirect("/recipes/" + req.params.id);
		}
	});
});

//DESTROY
router.delete("/:comment_id", function(req,res){
	Comment.findByIdAndRemove(req.params.comment_id, function(err){
		if(err){
			res.redirect("back");
		} else {
			res.redirect("/recipes/" + req.params.id);
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