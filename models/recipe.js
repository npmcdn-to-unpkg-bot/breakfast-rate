var mongoose 	= require("mongoose");

var recipeSchema = new mongoose.Schema({
	name: String,
	created: {type: Date, default: Date.now},
	image: String,
	description: String,
	servings: String,
	prepTime: String,
	cookTime: String,
	ingredients: [],
	instructions: [],
	source: {type: String, default:""},
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
		}
	],
});

var Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;