var mongoose 	= require("mongoose");

var recipeSchema = new mongoose.Schema({
	name: String,
	created: {type: Date, default: Date.now},
	image: String,
	description: String,
	servings: Number,
	prepTime: Number,
	cookTime: Number,
	ingredients: [],
	instructions: [],
	source: {type: String, default:""},
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String,
	},
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
		}
	],
});

var Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;