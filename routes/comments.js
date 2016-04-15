var express = require("express");
var router = express.Router({mergeParams: true}); //allows you to access :id
var Recipe = require("../models/recipe");
var Comment = require("../models/comment");
//middleware
var middleware = require("../middleware");
//NEW
router.get("/new", middleware.isLoggedIn, function(req,res){
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
router.post("/", middleware.isLoggedIn, function(req, res){
	Recipe.findById(req.params.id, function(err, recipe){
		if(err){
			console.log(err);
			res.redirect("/recipes/"+recipe._id);
		} else {

			var text = req.body.text;
			var author ={
				id: req.user._id,
				username: req.user.username,
			};

			var newComment = {
				text: text,
				author: author,
			};
		
			Comment.create(newComment, function(err, comment){
				if(err){
					req.flash("error", "There was an error handling your request.");
					console.log(err);
				} else {
					//add username and id to comment
					// comment.author.id = req.user._id;
					// comment.author.username = req.user.username;
					//save comment
					comment.save();
					recipe.comments.push(comment);
					recipe.save();
					req.flash("success", "Successfully added a comment.");
					res.redirect("/recipes/" +recipe._id);
				}
			});
		}
	});
});

//EDIT
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
	Comment.findById(req.params.comment_id, function(err, foundComment){
		if(err){
			res.redirect("back");
		} else {
			res.render("comments/edit", {recipe_id: req.params.id, comment: foundComment});
		}
	});
});

//UPDATE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req,res){
	var text = req.body.text;

	var editedRecipe = {
		text:text,
	};

	Comment.findByIdAndUpdate (req.params.comment_id, editedRecipe, function(err, updatedComment){
		if(err){
			res.redirect("back");
		} else {
			res.redirect("/recipes/" + req.params.id);
		}
	});
});

//DESTROY
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req,res){
	Comment.findByIdAndRemove(req.params.comment_id, function(err){
		if(err){
			res.redirect("back");
		} else {
			req.flash("success", "Comment deleted.");
			res.redirect("/recipes/" + req.params.id);
		}
	});
});

module.exports = router;