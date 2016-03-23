var express = require("express");
var app = express();

app.set("view engine", "ejs");


var recipes = [
	{
		name: "Hot-Sauce Omelette",
		image: "https://farm4.staticflickr.com/3094/2851359698_7a5b0c28e5.jpg",
		description: "This omelette packs a whole lot of flavor with a kick of heat."
	},
	{
		name: "Divine Waffles",
		image: "https://farm1.staticflickr.com/48/144982133_9ec847fcf4.jpg",
		description: "Fresh waffles and vanilla ice cream make for a heavenly combination."
	},
	{
		name: "Perfect Bacon",
		image: "https://farm7.staticflickr.com/6158/6175755733_b2932d7838.jpg",
		description: "You can't go wrong with bacon, especially perfectly cooked bacon." 
	},
];

//LANDING PAGE
app.get("/", function(req,res){
	res.render("landing");
});

//RECIPES
app.get("/recipes", function(req,res){
	res.render("recipes", {recipes:recipes});
});

app.listen(process.env.PORT || 3000, function(){
	console.log('The Breakfast Rate server is running...');
});