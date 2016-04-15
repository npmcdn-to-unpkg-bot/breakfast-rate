var express = require("express");
var router = express.Router();
var Recipe = require("../models/recipe");
//middleware
var middleware = require("../middleware");
	//don't need to write "../middleware/index.js" because it automatically takes js file called index

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
router.get("/new", middleware.isLoggedIn, function(req,res){
	res.render("recipes/new");
});

//CREATE
router.post("/", middleware.isLoggedIn, function(req,res){
	//get data from form and add to recipes array
	var name = req.body.name;
	var source = req.body.source;
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
		source: source,
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
router.get("/:id/edit", middleware.checkRecipeOwnership, function(req,res){
	Recipe.findById(req.params.id, function(err, foundRecipe){
		res.render("recipes/edit", {recipe:foundRecipe});
	});
});

//UPDATE
router.put("/:id", middleware.checkRecipeOwnership, function(req,res){
	var name = req.body.name;
	var source = req.body.source;
	var image = req.body.image;
	var description = req.body.description;
	var servings = req.body.servings;
	var prepTime = req.body.prepTime;
	var cookTime = req.body.cookTime;
	var ingredients = req.body.ingredients;
	var instructions = req.body.instructions;

	var editedRecipe = {
		name: name,
		source: source,
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
		}
	});
});

//DESTROY
router.delete("/:id", middleware.checkRecipeOwnership, function(req,res){
	Recipe.findByIdAndRemove(req.params.id, function(err){
		if(err){
			console.log(err);
			res.redirect("/recipes");
		} else {
			req.flash("success", "Recipe deleted.");
			res.redirect("/recipes");
		}
	});
});

module.exports = router;