var express 			= require("express"),
	bodyParser 			= require('body-parser'),
	mongoose 			= require('mongoose');

var app = express();


mongoose.connect('mongodb://localhost/breakfast-rate');

app.use(bodyParser.urlencoded({ extended: true }));	//tells express to use bodyParser

app.set("view engine", "ejs");


// var recipes = [
// 	{
// 		name: "Hot-Sauce Omelette",
// 		image: "https://farm4.staticflickr.com/3094/2851359698_7a5b0c28e5.jpg",
// 		description: "This omelette packs a whole lot of flavor with a kick of heat."
// 	},
// 	{
// 		name: "Divine Waffles",
// 		image: "https://farm1.staticflickr.com/48/144982133_9ec847fcf4.jpg",
// 		description: "Fresh waffles and vanilla ice cream make for a heavenly combination."
// 	},
// 	{
// 		name: "Perfect Bacon",
// 		image: "https://farm7.staticflickr.com/6158/6175755733_b2932d7838.jpg",
// 		description: "You can't go wrong with bacon, especially perfectly cooked bacon." 
// 	},
// ];

//MONGOOSE / MODEL CONFIG
var recipeSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String,
	created: {type: Date, default: Date.now}
});

var Recipe = mongoose.model("Recipe", recipeSchema);

// Recipe.create(
// 	{
// 		name: "Perfect Bacon",
// 		image: "https://farm7.staticflickr.com/6158/6175755733_b2932d7838.jpg",
// 		description: "You can't go wrong with bacon, especially perfectly cooked bacon.",
// 	}, function(err, recipe){
// 		if(err){
// 			console.log(err);
// 		} else {
// 			console.log("New Recipe:");
// 			console.log(recipe);
// 		}
// 	}
// );


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
			res.render("recipes", {recipes:recipes});
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
			res.redirect("recipes");
		}
	});
});



app.listen(process.env.PORT || 3000, function(){
	console.log('The Breakfast Rate server is running...');
});