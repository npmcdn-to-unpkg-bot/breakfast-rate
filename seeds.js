var mongoose = require("mongoose");
var Recipe = require("./models/recipe");

var data = [
	{
		name: "Gluten Free Blueberry Muffins",
		image: "https://farm6.staticflickr.com/5252/5512933256_60a28d3332.jpg",
		description: "For those who are health conscious or have a gluten intolerance." 
	},
	{
		name: "Power Sandwich",
		image: "https://farm9.staticflickr.com/8260/8643734101_43c59e43ee.jpg",
		description: "Start off your day with this wonderful breakfast sandwich!" 
	},
	{
		name: "Perfect Bacon",
		image: "https://farm7.staticflickr.com/6158/6175755733_b2932d7838.jpg",
		description: "You can't go wrong with bacon, especially perfectly cooked bacon." 
	}, 	
	{
		name: "Simple Scrambled Eggs",
		image: "https://farm4.staticflickr.com/3006/2869980465_91333000bd.jpg",
		description: "This recipe has been handed down for many generations. I hope you all enjoy them as much as I do." 
	},
	{
		name: "Granny's Pancakes",
		image: "https://farm5.staticflickr.com/4109/5046208238_635eb77023.jpg",
		description: "I think many people struggle with something as scrambled eggs, so I thought I'd share how I make them. I've had no complaints so far. " 
	},
	{
		name: "Divine Waffles",
		image: "https://farm1.staticflickr.com/48/144982133_9ec847fcf4.jpg",
		description: "Fresh waffles and vanilla ice cream make for a heavenly combination."
	},
	{
		name: "Hot-Sauce Omelette",
		image: "https://farm4.staticflickr.com/3094/2851359698_7a5b0c28e5.jpg",
		description: "This omelette packs a whole lot of flavor with a kick of heat."
	},
	{
		name: "French Toast",
		image: "https://farm5.staticflickr.com/4076/4894917666_877a294c39.jpg",
		description: "Easy to make french toast." 
	},	
	{
		name: "Granola Bar",
		image: "https://farm3.staticflickr.com/2783/4310106773_6f8a93a62a.jpg",
		description: "Packed with nutrients so you'll be feeling healthy all day long." 
	},	
	{
		name: "Green Smoothie",
		image: "https://farm4.staticflickr.com/3539/3652108873_a56ca475cd.jpg",
		description: "Don't have enough time for breakfast? Don't worry, make yourself this green smoothy. It's healthy and tastes delicious." 
	},
	{
		name: "Avacado N' Egg Salad",
		image: "https://farm4.staticflickr.com/3731/8878517767_c5713580a4.jpg",
		description: "This is the breakfast salad of the gods!" 
	},	
	{
		name: "Lemon Tea",
		image: "https://farm9.staticflickr.com/8111/8488915121_f51d2124df.jpg",
		description: "Instead of coffee, try some lemon tea." 
	},		
	{
		name: "Home-Made Maple Syrup",
		image: "https://farm8.staticflickr.com/7176/6963630107_d8400fe78a.jpg",
		description: "I know this isn't really a food, but I thought this would be helpful because maple syrup is used for a lot of breakfast meals." 
	},	

];

function seedDB(){
	//remove recipes
	Recipe.remove({}, function(err){
		if (err){
			console.log(err);
		} else {
			console.log("removed recipes");
			//add recipes
			data.forEach(function(seed){
				Recipe.create(seed,function(err,data){
					if(err){
						console.log(err);
					} else {
						console.log("Added recipe");
					}
				});
			});
		}
	});
}

module.exports = seedDB;