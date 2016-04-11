var express 			= require("express"),
	app 				= express(),
	bodyParser 			= require('body-parser'),
	mongoose 			= require('mongoose'),
	methodOverride 		= require('method-override'),
	passport			= require('passport'),
	localStrategy		= require('passport-local'),
	//Models
	Recipe 				= require("./models/recipe"),
	Comment				= require("./models/comment"),
	User				= require("./models/user"),
	//Seed file
	seedDB				=require("./seeds");


//APP CONFIG
mongoose.connect('mongodb://localhost/breakfast-rate');
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));	//css
app.use(bodyParser.urlencoded({ extended: true }));	//tells express to use bodyParser
app.use(methodOverride("_method"));
seedDB();

//PASSPORT CONFIG
app.use(require("express-session")({
	secret: "Peyton Manning takes HGH!!!",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//runs for ever single route
app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	next();
});

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
			res.render("recipes/index", {recipes:recipes, currentUser: req.user});
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
	var servings = req.body.servings;
	var prepTime = req.body.prepTime;
	var cookTime = req.body.cookTime;
	var ingredients = req.body.ingredients;
	var instructions = req.body.instructions;
	//needed for firefox
	if(req.body.image.length<1){
		image = "/img/placeholder.svg";
	}

	var newRecipe = {
		name: name,
		image: image,
		description: description,
		servings: servings,
		prepTime: prepTime,
		cookTime: cookTime,
		ingredients: ingredients,
		instructions: instructions,
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
			Recipe.find({}, function(err,otherrecipes){
				if(err){
					console.log(err);
				} else {
					res.render("recipes/show", {recipe:foundRecipe, otherrecipes:otherrecipes});
				}
			});

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
	var name = req.body.recipe.name;
	var image = req.body.recipe.image;
	var description = req.body.recipe.description;
	var servings = req.body.servings;
	var prepTime = req.body.prepTime;
	var cookTime = req.body.cookTime;
	var ingredients = req.body.ingredients;
	var instructions = req.body.instructions;

	var editedRecipe = {
		name: name,
		image: image,
		description: description,
		servings: servings,
		prepTime: prepTime,
		cookTime: cookTime,
		ingredients: ingredients,
		instructions: instructions,
	};

	Recipe.findByIdAndUpdate(req.params.id, editedRecipe, function(err,updatedRecipe){
		if(err){
			console.log(err);
			res.redirect("/recipes");
		} else {
			res.redirect("/recipes/" + req.params.id);
			console.log(instructions);
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

/*====================
	COMMENTS
====================*/

//NEW
app.get("/recipes/:id/comments/new", isLoggedIn, function(req,res){
	Recipe.findById(req.params.id, function(err, recipe){
		if(err){
			console.log(err);
			res.redirect("back");
		} else {
			res.render("comments/new", {recipe: recipe});
		}
	});
});

//CREATE
app.post("/recipes/:id/comments", isLoggedIn, function(req, res){
	Recipe.findById(req.params.id, function(err, recipe){
		if(err){
			console.log(err);
			res.redirect("/recipes/"+recipe._id);
		} else {
			console.log(req.body.comment);
			Comment.create(req.body.comment, function(err, comment){
				if(err){
					console.log(err);
				} else {
					recipe.comments.push(comment);
					recipe.save();
					res.redirect("/recipes/" +recipe._id);
				}
			});
		}
	});
});

/*====================
	AUTH ROUTES
====================*/

//register form
app.get("/register", function(req,res){
	res.render("register");
});

//handle register form
app.post("/register", function(req,res){
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if(err) {
			console.log(err);
			return res.render("register");
		} 
		passport.authenticate("local")(req, res, function(){
			res.redirect("/recipes");
		});
	});
});

//login form
app.get("/login", function(req,res){
	res.render('login');
});

//handle login
app.post("/login", passport.authenticate("local", 
	{
		successRedirect: "/recipes",
		failureRedirect: "/login"
	}), function(req,res){
});

//logout
app.get("/logout", function(req,res){
	req.logout();
	res.redirect("/recipes");
});

function isLoggedIn(req,res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

app.listen(process.env.PORT || 3000, function(){
	console.log('The Breakfast Rate server is running...');
});