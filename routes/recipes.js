var express = require("express");
var router = express.Router();
var Recipe = require("../models/recipe");

//INDEX
router.get("/", function(req,res){
	//get all campgrounds from database
	Recipe.find({}, function(err,recipes){
		if(err){
			console.log(err);
		} else {
			res.render("recipes/index", {recipes:recipes, currentUser: req.user});
		}
	});
});

//NEW
router.get("/new", isLoggedIn, function(req,res){
	res.render("recipes/new");
});

//CREATE
router.post("/", isLoggedIn, function(req,res){
	//get data from form and add to recipes array
	var name = req.body.name;
	var image = req.body.image;
	var description = req.body.description;
	var servings = req.body.servings;
	var prepTime = req.body.prepTime;
	var cookTime = req.body.cookTime;
	var ingredients = req.body.ingredients;
	var instructions = req.body.instructions;
	var author ={
		id: req.user._id,
		username: req.user.username,
	};
	//needed for firefox
	if(req.body.image.length<1){
		image = "/img/placeholder.svg";
	}

	var newRecipe = {
		name: name,
		image: image,
		description: description,
		servings: servings,
		prepTime: prepTime,
		cookTime: cookTime,
		ingredients: ingredients,
		instructions: instructions,
		author: author,
	};


	//create new recipe and save to database
	Recipe.create(newRecipe, function(err, createdRecipe){
		if(err){
			console.log(err);
		} else {
			//redirect back to recipes page
			res.redirect("/recipes");
		}
	});
});

//SHOW
router.get("/:id/", function(req,res){
	Recipe.findById(req.params.id).populate("comments").exec(function(err, foundRecipe){
		if(err){
			console.log(err);
			res.redirect("/recipes");
		} else {
			Recipe.find({}, function(err,otherrecipes){
				if(err){
					console.log(err);
				} else {
					res.render("recipes/show", {recipe:foundRecipe, otherrecipes:otherrecipes});
				}
			});

		}
	});
});

//EDIT
router.get("/:id/edit", checkRecipeOwnership, function(req,res){
	Recipe.findById(req.params.id, function(err, foundRecipe){
		res.render("recipes/edit", {recipe:foundRecipe});
	});
});

//UPDATE
router.put("/:id", checkRecipeOwnership, function(req,res){
	var name = req.body.recipe.name;
	var image = req.body.recipe.image;
	var description = req.body.recipe.description;
	var servings = req.body.servings;
	var prepTime = req.body.prepTime;
	var cookTime = req.body.cookTime;
	var ingredients = req.body.ingredients;
	var instructions = req.body.instructions;

	var editedRecipe = {
		name: name,
		image: image,
		description: description,
		servings: servings,
		prepTime: prepTime,
		cookTime: cookTime,
		ingredients: ingredients,
		instructions: instructions,
	};

	Recipe.findByIdAndUpdate(req.params.id, editedRecipe, function(err,updatedRecipe){
		if(err){
			console.log(err);
			res.redirect("/recipes");
		} else {
			res.redirect("/recipes/" + req.params.id);
			console.log(instructions);
		}
	});
});

//DESTROY
router.delete("/:id", checkRecipeOwnership, function(req,res){
	Recipe.findByIdAndRemove(req.params.id, function(err){
		if(err){
			console.log(err);
			res.redirect("/recipes");
		} else {
			res.redirect("/recipes");
		}
	});
});

module.exports = router;


//middleware
function isLoggedIn(req,res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

function checkRecipeOwnership(req, res, next) {
	if(req.isAuthenticated()){
		Recipe.findById(req.params.id, function(err, foundRecipe){
			if(err){
				console.log(err);
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
		res.redirect("back");
	}
}