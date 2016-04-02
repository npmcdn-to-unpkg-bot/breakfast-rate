var mongoose 	= require("mongoose");

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

//this will be used with a require on app.js
module.exports = Recipe;