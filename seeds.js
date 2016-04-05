var mongoose = require("mongoose"),
	Recipe = require("./models/recipe"),
	Comment = require("./models/comment");

var recipeData = [
	{
		name: "Gluten Free Blueberry Muffins",
		image: "https://farm6.staticflickr.com/5252/5512933256_60a28d3332.jpg",
		description: "For those who are health conscious or have a gluten intolerance.",
		ingredients: ["2 cups gluten-free all-purpose flour", "3/4 cup sugar", "2 teaspoons baking powder", "1 teaspoon xanthan gum", "1/2 teaspoon salt", "1/2 cup (1 stick) unsalted butter, melted and cooled", "1/2 cup whole milk", "2 large eggs", "2 teaspoons grated lemon zest", "1 teaspoon vanilla extract", "1 1/2 cups blueberries"],
		source: "http://www.driscolls.com/recipes/view/6938/Gluten-Free-Blueberry-Muffins",
	},
	{
		name: "Power Sandwich",
		image: "https://farm9.staticflickr.com/8260/8643734101_43c59e43ee.jpg",
		description: "Start off your day with this wonderful breakfast sandwich!",
		ingredients: ["2 slices of whole wheat bread", "lettuce", "2 eggs", "1/2 tomato", "1 tablespoon of cream cheese"]
	},
	{
		name: "Perfect Bacon",
		image: "https://farm7.staticflickr.com/6158/6175755733_b2932d7838.jpg",
		description: "You can't go wrong with bacon, especially perfectly cooked bacon.",
		ingredients: ["1/4 cup packed brown sugar", "2 tablespoons rice vinegar", "2 tablespoons maple syrup", "ground black pepper to taste", "1 pound thick-cut bacon"],
		source: "http://allrecipes.com/recipe/221007/candied-bacon/"
	}, 	
	{
		name: "Simple Scrambled Eggs",
		image: "https://farm4.staticflickr.com/3006/2869980465_91333000bd.jpg",
		description: "I think many people struggle with something as scrambled eggs, so I thought I'd share how I make them. I've had no complaints so far.",
		ingredients: ["4 eggs", "2 teaspoons butter", "1/4 cup milk", "salt and pepper, as desired"],
		source: "http://www.incredibleegg.org/recipe/basic-scrambled-eggs/"
	},
	{
		name: "Granny's Pancakes",
		image: "https://farm5.staticflickr.com/4109/5046208238_635eb77023.jpg",
		description: "This recipe has been handed down for many generations. I hope you all enjoy them as much as I do.",
		ingredients: ["1 1/2 cups all-purpose flour", "3 1/2 teaspoons baking powder", "1 teaspoon salt", "1 tablespoon white sugar", "1 1/4 cups milk", "1 egg", "3 tablespoons butter, melted"],
		source: "http://allrecipes.com/recipe/21014/good-old-fashioned-pancakes/"
	},
	{
		name: "Divine Waffles",
		image: "https://farm1.staticflickr.com/48/144982133_9ec847fcf4.jpg",
		description: "Fresh waffles and vanilla ice cream make for a heavenly combination.",
		ingredients: ["2 eggs", "2 cups all-purpose flour", "1 3/4 cups milk", "1/2 cup vegetable oil", "1 tablespoon white sugar", "4 teaspoons baking powder", "1/4 teaspoon salt", "1/2 teaspoon vanilla extract"],
		source: "http://allrecipes.com/recipe/22180/waffles-i/"
	},
	{
		name: "Veggie Omelette",
		image: "https://farm5.staticflickr.com/4127/4990960771_7ca360d1b3.jpg",
		description: "This omelette packs a whole lot of flavor.",
		ingredients: ["4 eggs", "1 small onion, chopped", "2 tablespoons butter", "1 green bell pepper, chopped", "2 tablespoons milk", "3/4 teaspoon salt", "1/8 teaspoon freshly ground black pepper", "2 ounces shredded Swiss cheese"],
		source: "http://allrecipes.com/recipe/14057/yummy-veggie-omelet/"
	},
	{
		name: "French Toast",
		image: "https://farm5.staticflickr.com/4076/4894917666_877a294c39.jpg",
		description: "Easy to make french toast.",
		ingredients: ["1 teaspoon ground cinnamon", "1/4 teaspoon ground nutmeg", "2 tablespoons sugar", "4 tablespoons butter", "4 eggs", "1/4 cup milk", "1/2 teaspoon vanilla extract", "8 slices challah, brioche, or white bread", "1/2 cup maple syrup, warmed"],
		source: "http://www.foodnetwork.com/recipes/robert-irvine/french-toast-recipe.html",
	},	
	{
		name: "Granola Bar",
		image: "https://farm3.staticflickr.com/2783/4310106773_6f8a93a62a.jpg",
		description: "Packed with nutrients so you'll be feeling healthy all day long.",
		ingredients: ["8 ounces old-fashioned rolled oats, approximately 2 cups", "1 1/2 ounces raw sunflower seeds, approximately 1/2 cup", "3 ounces sliced almonds, approximately 1 cup", "1 1/2 ounces wheat germ, approximately 1/2 cup", "6 ounces honey, approximately 1/2 cup", "1 3/4 ounces dark brown sugar, approximately 1/4 cup", "1 -ounce unsalted butter, plus extra for pan", "2 teaspoons vanilla extract", "1/2 teaspoon kosher salt", "6 1/2 ounces chopped dried fruit, any combination of apricots, cherries or blueberries"],
		source: "http://www.foodnetwork.com/recipes/alton-brown/granola-bars-recipe.html"
	},	
	{
		name: "Green Smoothie",
		image: "https://farm4.staticflickr.com/3539/3652108873_a56ca475cd.jpg",
		description: "Don't have enough time for breakfast? Don't worry, make yourself this green smoothy. It's healthy and tastes delicious.",
		ingredients: ["1 banana, thickly sliced, frozen", "2 cups chopped kale", "1 tablespoon flax seed meal (optional)", "1 tablespoon coconut oil (optional)", "1/4 cup almond milk", "1/3 cup orange juice" ],
		source: "http://allrecipes.com/recipe/162613/green-smoothie/",
	},
	{
		name: "Avacado N' Egg Salad",
		image: "https://farm4.staticflickr.com/3731/8878517767_c5713580a4.jpg",
		description: "This is the breakfast salad of the gods!",
		ingredients: ["1 ripe fresh Hass avocado, halved, seeded and peeled", "6 hardboiled eggs, peeled and halved", "1 Tbsp. white wine vinegar", "1 tsp. Dijon mustard", "1/2 tsp. salt", "1/2 cup minced onion", "2 Tbsp. chopped chives (optional)"],
		source: "https://www.avocadocentral.com/avocado-recipes/avocado-egg-salad"
	},	
	{
		name: "Lemon Tea",
		image: "https://farm9.staticflickr.com/8111/8488915121_f51d2124df.jpg",
		description: "Instead of coffee, try some lemon tea.",
		ingredients: ["1 Tbsp lemon juice", "2 Tbsp honey", "1/2 cup or more of hot water"],
		source: "http://www.simplyrecipes.com/recipes/honey_and_lemon_tea/" 
	},		
	{
		name: "Home-Made Maple Syrup",
		image: "https://farm8.staticflickr.com/7176/6963630107_d8400fe78a.jpg",
		description: "I know this isn't really a food, but I thought this would be helpful because maple syrup is used for a lot of breakfast meals.",
		ingredients: ["1 cup water", "1 cup white sugar", "1 cup brown sugar", "1 tablespoon maple flavored extract"],
		source: "http://allrecipes.com/recipe/152002/homemade-maple-syrup/",
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
			recipeData.forEach(function(seed){
				Recipe.create(seed,function(err,recipe){
					if(err){
						console.log(err);
					} else {
						console.log("Added recipe");
						Comment.remove({});
						//add comments
                    Comment.create(
                        {
                            text: "This food is great, but I wish there was more flavor",
                            author: "Bobby"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                recipe.comments.push(comment);
                                recipe.save();
                                console.log("Created new comment");
                            }
                        });

                	
					}
				});
			});
		}
	});
}

module.exports = seedDB;