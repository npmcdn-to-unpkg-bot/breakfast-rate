var express 			= require("express"),
	app 				= express(),
	bodyParser 			= require('body-parser'),
	mongoose 			= require('mongoose'),
	methodOverride 		= require('method-override'),
	//Models
	Recipe 				= require("./models/recipe"),
	Comment				= require("./models/comment"),
	//Seed file
	seedDB				=require("./seeds");


//APP CONFIG
mongoose.connect('mongodb://localhost/breakfast-rate');
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));	//css
app.use(bodyParser.urlencoded({ extended: true }));	//tells express to use bodyParser
app.use(methodOverride("_method"));
seedDB();

//LANDING PAGE
app.get("/", function(req,res){
	res.render("landing");
});

/*====================
	RECIPES
====================*/

//INDEX
app.get("/recipes", function(req,res){
	//get all campgrounds from database
	Recipe.find({}, function(err,recipes){
		if(err){
			console.log(err);
		} else {
			res.render("recipes/index", {recipes:recipes});
		}
	});
});

//NEW
app.get("/recipes/new", function(req,res){
	res.render("recipes/new");
});

//CREATE
app.post("/recipes", function(req,res){
	//get data from form and add to recipes array
	var name = req.body.name;
	var image = req.body.image;
	var description = req.body.description;

	var newRecipe = {
		name: name,
		image: image,
		description: description
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
app.get("/recipes/:id/", function(req,res){
	Recipe.findById(req.params.id).populate("comments").exec(function(err, foundRecipe){
		if(err){
			console.log(err);
			res.redirect("/recipes");
		} else {
			console.log(foundRecipe);
			res.render("recipes/show", {recipe:foundRecipe});
		}
	});
});

//EDIT
app.get("/recipes/:id/edit", function(req,res){
	Recipe.findById(req.params.id, function(err, foundRecipe){
		if(err){
			console.log(err);
			res.redirect("/recipes");
		} else {
			res.render("recipes/edit", {recipe:foundRecipe});
		}
	});
});

//UPDATE
app.put("/recipes/:id", function(req,res){
	Recipe.findByIdAndUpdate(req.params.id, req.body.recipe, function(err,updatedRecipe){
		if(err){
			console.log(err);
			res.redirect("/recipes");
		} else {
			res.redirect("/recipes/" + req.params.id);
		}
	});
});

//DESTROY
app.delete("/recipes/:id", function(req,res){
	Recipe.findByIdAndRemove(req.params.id, function(err){
		if(err){
			console.log(err);
			res.redirect("/recipes");
		} else {
			res.redirect("/recipes");
		}
	});
});





app.listen(process.env.PORT || 3000, function(){
	console.log('The Breakfast Rate server is running...');
});