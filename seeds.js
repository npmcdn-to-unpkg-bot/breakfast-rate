var mongoose = require("mongoose"),
	Recipe = require("./models/recipe"),
	Comment = require("./models/comment");

var recipeData = [
	{
		name: "Gluten Free Blueberry Muffins",
		image: "https://farm6.staticflickr.com/5252/5512933256_60a28d3332.jpg",
		description: "For those who are health conscious or have a gluten intolerance.",
		ingredients: ["2 cups gluten-free all-purpose flour", "3/4 cup sugar", "2 teaspoons baking powder", "1 teaspoon xanthan gum", "1/2 teaspoon salt", "1/2 cup (1 stick) unsalted butter, melted and cooled", "1/2 cup whole milk", "2 large eggs", "2 teaspoons grated lemon zest", "1 teaspoon vanilla extract", "1 1/2 cups blueberries"],
		instructions: ["Preheat oven to 375°F.", "Lightly butter or grease a 12-cup muffin pan or line with paper liners.", "Stir together flour, sugar, baking powder, xanthan gum and salt in a medium bowl until blended. Whisk together butter, milk, eggs, lemon zest and vanilla in a large bowl until combined. Stir in flour mixture until partially moistened. Fold in blueberries until evenly mixed. Batter will be thick, do not over stir. Divide batter evenly between muffin cups, filling each about three-fourths full.", "Bake 10 minutes. Rotate pan and continue to bake about 10 minutes longer or until muffins are golden brown and toothpick inserted in center comes out clean. Cool in pan 3 minutes. Serve warm or remove to wire rack to cool completely."],
		source: "http://www.driscolls.com/recipes/view/6938/Gluten-Free-Blueberry-Muffins",
	},
	{
		name: "Power Sandwich",
		image: "https://farm9.staticflickr.com/8260/8643734101_43c59e43ee.jpg",
		description: "Start off your day with this wonderful breakfast sandwich!",
		ingredients: ["2 slices of whole wheat bread", "lettuce", "2 eggs", "1/2 tomato", "1 tablespoon of cream cheese"],
		instructions: ["Toast the whole wheat bread.", "Scramble your eggs.", "Slice your tomato.", "Put your cream cheese, lettuce, tomatoes, and eggs between the bread."]
	},
	{
		name: "Perfect Bacon",
		image: "https://farm7.staticflickr.com/6158/6175755733_b2932d7838.jpg",
		description: "You can't go wrong with bacon, especially perfectly cooked bacon.",
		ingredients: ["1/4 cup packed brown sugar", "2 tablespoons rice vinegar", "2 tablespoons maple syrup", "ground black pepper to taste", "1 pound thick-cut bacon"],
		instructions: ["Preheat oven to 350 degrees F (175 degrees C).", "Mix brown sugar, rice vinegar, maple syrup, and black pepper in a small bowl.", "Place bacon slices on cooling rack set over a baking sheet.", "Bake in the preheated oven for 10 minutes, turn slices, and bake another 5 minutes.", "Remove bacon and brush both sides with brown sugar mixture. Return bacon to the oven and bake another 5 minutes. Repeat basting every 5 minutes until bacon is browned and crisp, about 35 minutes."],
		source: "http://allrecipes.com/recipe/221007/candied-bacon/"
	}, 	
	{
		name: "Simple Scrambled Eggs",
		image: "https://farm4.staticflickr.com/3006/2869980465_91333000bd.jpg",
		description: "I think many people struggle with something as scrambled eggs, so I thought I'd share how I make them. I've had no complaints so far.",
		ingredients: ["4 eggs", "2 teaspoons butter", "1/4 cup milk", "salt and pepper, as desired"],
		instructions:["Beat eggs, milk, salt and pepper in medium bowl until blended.", "Heat butter in large nonstick skillet over medium heat until hot. Pour in egg mixture. As eggs begin to set, gently pull the eggs across the pan with a spatula, forming large soft curds.", "Continue cooking – pulling, lifting and folding eggs – until thickened and no visible liquid egg remains. Do not stir constantly. Remove from heat. Serve immediately."],
		source: "http://www.incredibleegg.org/recipe/basic-scrambled-eggs/"
	},
	{
		name: "Granny's Pancakes",
		image: "https://farm5.staticflickr.com/4109/5046208238_635eb77023.jpg",
		description: "This recipe has been handed down for many generations. I hope you all enjoy them as much as I do.",
		ingredients: ["1 1/2 cups all-purpose flour", "3 1/2 teaspoons baking powder", "1 teaspoon salt", "1 tablespoon white sugar", "1 1/4 cups milk", "1 egg", "3 tablespoons butter, melted"],
		instructions: ["In a large bowl, sift together the flour, baking powder, salt and sugar. Make a well in the center and pour in the milk, egg and melted butter; mix until smooth.", "Heat a lightly oiled griddle or frying pan over medium high heat. Pour or scoop the batter onto the griddle, using approximately 1/4 cup for each pancake. Brown on both sides and serve hot."],
		source: "http://allrecipes.com/recipe/21014/good-old-fashioned-pancakes/"
	},
	{
		name: "Divine Waffles",
		image: "https://farm1.staticflickr.com/48/144982133_9ec847fcf4.jpg",
		description: "Fresh waffles and vanilla ice cream make for a heavenly combination.",
		ingredients: ["2 eggs", "2 cups all-purpose flour", "1 3/4 cups milk", "1/2 cup vegetable oil", "1 tablespoon white sugar", "4 teaspoons baking powder", "1/4 teaspoon salt", "1/2 teaspoon vanilla extract"],
		instructions: ["Preheat waffle iron. Beat eggs in large bowl with hand beater until fluffy. Beat in flour, milk, vegetable oil, sugar, baking powder, salt and vanilla, just until smooth.", "Spray preheated waffle iron with non-stick cooking spray. Pour mix onto hot waffle iron. Cook until golden brown. Serve hot."],
		source: "http://allrecipes.com/recipe/22180/waffles-i/"
	},
	{
		name: "Veggie Omelette",
		image: "https://farm5.staticflickr.com/4127/4990960771_7ca360d1b3.jpg",
		description: "This omelette packs a whole lot of flavor.",
		ingredients: ["4 eggs", "1 small onion, chopped", "2 tablespoons butter", "1 green bell pepper, chopped", "2 tablespoons milk", "3/4 teaspoon salt", "1/8 teaspoon freshly ground black pepper", "2 ounces shredded Swiss cheese"],
		instructions: ["Melt one tablespoon butter in a medium skillet over medium heat. Place onion and bell pepper inside of the skillet. Cook for 4 to 5 minutes stirring occasionally until vegetables are just tender.", "While the vegetables are cooking beat the eggs with the milk, 1/2 teaspoon salt and pepper.", "Shred the cheese into a small bowl and set it aside.", "Remove the vegetables from heat, transfer them to another bowl and sprinkle the remaining 1/4 teaspoon salt over them.", "Melt the remaining 1 tablespoon butter (in the skillet just used to cook the vegetables) over medium heat. Coat the skillet with the butter. When the butter is bubbly add the egg mixture and cook the egg for 2 minutes or until the eggs begin to set on the bottom of the pan. Gently lift the edges of the omelet with a spatula to let the uncooked part of the eggs flow toward the edges and cook. Continue cooking for 2 to 3 minutes or until the center of the omelet starts to look dry.", "Sprinkle the cheese over the omelet and spoon the vegetable mixture into the center of the omelet. Using a spatula gently fold one edge of the omelet over the vegetables. Let the omelet cook for another two minutes or until the cheese melts to your desired consistency. Slide the omelet out of the skillet and onto a plate. Cut in half and serve."],
		source: "http://allrecipes.com/recipe/14057/yummy-veggie-omelet/"
	},
	{
		name: "French Toast",
		image: "https://farm5.staticflickr.com/4076/4894917666_877a294c39.jpg",
		description: "Easy to make french toast.",
		ingredients: ["1 teaspoon ground cinnamon", "1/4 teaspoon ground nutmeg", "2 tablespoons sugar", "4 tablespoons butter", "4 eggs", "1/4 cup milk", "1/2 teaspoon vanilla extract", "8 slices challah, brioche, or white bread", "1/2 cup maple syrup, warmed"],
		instructions: ["In a small bowl, combine, cinnamon, nutmeg, and sugar and set aside briefly.", "In a 10-inch or 12-inch skillet, melt butter over medium heat. Whisk together cinnamon mixture, eggs, milk, and vanilla and pour into a shallow container such as a pie plate. Dip bread in egg mixture. Fry slices until golden brown, then flip to cook the other side. Serve with syrup."],
		source: "http://www.foodnetwork.com/recipes/robert-irvine/french-toast-recipe.html",
	},	
	{
		name: "Granola Bar",
		image: "https://farm3.staticflickr.com/2783/4310106773_6f8a93a62a.jpg",
		description: "Packed with nutrients so you'll be feeling healthy all day long.",
		ingredients: ["8 ounces old-fashioned rolled oats, approximately 2 cups", "1 1/2 ounces raw sunflower seeds, approximately 1/2 cup", "3 ounces sliced almonds, approximately 1 cup", "1 1/2 ounces wheat germ, approximately 1/2 cup", "6 ounces honey, approximately 1/2 cup", "1 3/4 ounces dark brown sugar, approximately 1/4 cup", "1 -ounce unsalted butter, plus extra for pan", "2 teaspoons vanilla extract", "1/2 teaspoon kosher salt", "6 1/2 ounces chopped dried fruit, any combination of apricots, cherries or blueberries"],
		instructions: ["Butter a 9 by 9-inch glass baking dish and set aside. Preheat the oven to 350 degrees F.", "Spread the oats, sunflower seeds, almonds, and wheat germ onto a half-sheet pan. Place in the oven and toast for 15 minutes, stirring occasionally.", "In the meantime, combine the honey, brown sugar, butter, extract and salt in a medium saucepan and place over medium heat. Cook until the brown sugar has completely dissolved.", "Once the oat mixture is done, remove it from the oven and reduce the heat to 300 degrees F. Immediately add the oat mixture to the liquid mixture, add the dried fruit, and stir to combine. Turn mixture out into the prepared baking dish and press down, evenly distributing the mixture in the dish and place in the oven to bake for 25 minutes. Remove from the oven and allow to cool completely. Cut into squares and store in an airtight container for up to a week."],
		source: "http://www.foodnetwork.com/recipes/alton-brown/granola-bars-recipe.html"
	},	
	{
		name: "Green Smoothie",
		image: "https://farm4.staticflickr.com/3539/3652108873_a56ca475cd.jpg",
		description: "Don't have enough time for breakfast? Don't worry, make yourself this green smoothy. It's healthy and tastes delicious.",
		ingredients: ["1 banana, thickly sliced, frozen", "2 cups chopped kale", "1 tablespoon flax seed meal (optional)", "1 tablespoon coconut oil (optional)", "1/4 cup almond milk", "1/3 cup orange juice" ],
		instructions:["Place the banana, kale, flax seed meal, and coconut oil into a blender, pour in the milk and orange juice. Cover, and puree until smooth; serve."],
		source: "http://allrecipes.com/recipe/162613/green-smoothie/",
	},
	{
		name: "Avacado N' Egg Salad",
		image: "https://farm4.staticflickr.com/3731/8878517767_c5713580a4.jpg",
		description: "This is the breakfast salad of the gods!",
		ingredients: ["1 ripe fresh Hass avocado, halved, seeded and peeled", "6 hardboiled eggs, peeled and halved", "1 Tbsp. white wine vinegar", "1 tsp. Dijon mustard", "1/2 tsp. salt", "1/2 cup minced onion", "2 Tbsp. chopped chives (optional)"],
		instructions: ["Remove and discard yolks of two of the eggs; chop remaining whites and eggs; set aside.", "In a bowl, combine half of the avocado, vinegar, mustard and salt; mash until smooth. Dice remaining avocado and add to mixture along with eggs and onion; mix gently.", "Serve on toast or crackers. Garnish with chives, if desired."],
		source: "https://www.avocadocentral.com/avocado-recipes/avocado-egg-salad"
	},	
	{
		name: "Lemon Tea",
		image: "https://farm9.staticflickr.com/8111/8488915121_f51d2124df.jpg",
		description: "Instead of coffee, try some lemon tea.",
		ingredients: ["1 Tbsp lemon juice", "2 Tbsp honey", "1/2 cup or more of hot water"],
		instructions: ["Put honey and lemon juice into a tea cup or mug. Add hot water and stir. Add more lemon juice, honey, or hot water to taste."],
		source: "http://www.simplyrecipes.com/recipes/honey_and_lemon_tea/" 
	},		
	{
		name: "Home-Made Maple Syrup",
		image: "https://farm8.staticflickr.com/7176/6963630107_d8400fe78a.jpg",
		description: "I know this isn't really a food, but I thought this would be helpful because maple syrup is used for a lot of breakfast meals.",
		ingredients: ["1 cup water", "1 cup white sugar", "1 cup brown sugar", "1 tablespoon maple flavored extract"],
		instructions: ["Bring the water, white sugar, and brown sugar to a boil in a saucepan over medium-high heat. Reduce heat to medium-low, and stir in the maple extract; simmer 3 minutes longer."],
		source: "http://allrecipes.com/recipe/152002/homemade-maple-syrup/",
	},	
];

function seedDB(){

	//remvoe comments
	Comment.remove({}, function(err){
		if(err){
			console.log(err);
		}
	});
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