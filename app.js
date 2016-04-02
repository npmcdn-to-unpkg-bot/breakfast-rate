var express 			= require("express"),
	bodyParser 			= require('body-parser'),
	mongoose 			= require('mongoose'),
	methodOverride 		= require('method-override');

var app = express();

//APP CONFIG
mongoose.connect('mongodb://localhost/breakfast-rate');
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));	//css
app.use(bodyParser.urlencoded({ extended: true }));	//tells express to use bodyParser
app.use(methodOverride("_method"));



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
//	{
// 		name: "Simple Scrambled Eggs",
// 		image: "https://farm4.staticflickr.com/3006/2869980465_91333000bd.jpg",
// 		description: "This recipe has been handed down for many generations. I hope you all enjoy them as much as I do." 
// 	},
//	{
// 		name: "Granny's Pancakes",
// 		image: "https://farm5.staticflickr.com/4109/5046208238_635eb77023.jpg",
// 		description: "I think many people struggle with something as scrambled eggs, so I thought I'd share how I make them. I've had no complaints so far. " 
// 	},
//	{
// 		name: "Gluten Free Blueberry Muffins",
// 		image: "https://farm6.staticflickr.com/5252/5512933256_60a28d3332.jpg",
// 		description: "For those who are health conscious or have a gluten intolerance." 
// 	},
//	{
// 		name: "Power Sandwich",
// 		image: "https://farm9.staticflickr.com/8260/8643734101_43c59e43ee.jpg",
// 		description: "Start off your day with this wonderful breakfast sandwich!" 
// 	},
//	{
// 		name: "French Toast",
// 		image: "https://farm5.staticflickr.com/4076/4894917666_877a294c39.jpg",
// 		description: "Easy to make french toast." 
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
			res.redirect("/recipes");
		}
	});
});

//SHOW
app.get("/recipes/:id/", function(req,res){
	Recipe.findById(req.params.id, function(err, foundRecipe){
		if(err){
			console.log(err);
			res.redirect("/recipes");
		} else {
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