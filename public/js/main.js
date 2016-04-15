var $grid = $('.grid').masonry({
  itemSelector: '.grid-item',
  percentPosition: true,
  columnWidth: '.grid-sizer'
});
// layout Isotope after each image loads
$grid.imagesLoaded().progress( function() {
  $grid.masonry();
});  


//SHOW PAGE
var $grid2 = $('.other-recipes-grid').masonry({
  itemSelector: '.other-recipes-grid-item',
  percentPosition: true,
  columnWidth: '.other-recipes-grid-sizer'
});
// layout Isotope after each image loads
$grid2.imagesLoaded().progress( function() {
  $grid2.masonry();
});    

/*====================
	NEW / EDIT RECIPE FORM
====================*/

//allows the span with class "delete-form" to delete the parent they're in
function setDeleteForm(){
	$("span.delete-form").click(function(){
		var that = $(this).parent();
		that.fadeOut( function() {
			that.remove();
			setInstructionNumber();
		});
	});
}

//***** Instructions *****

function setInstructionNumber(){
	$("span.step").each(function(){
		$(this).text($(this).parent().index()+1);
	});
}

$("#addInstruction").on("click", function(){
	if($('textarea[name="instructions"]').val()!==""){
		$('<li>Step <span class="step"></span> <span class="delete-form"><i class="fa fa-times-circle pull-right" aria-hidden="true"></i></span><textarea name="instructions" class="form-control" rows="4"></textarea></li>').hide().appendTo("#instructionHolder>ol").fadeIn();
		setInstructionNumber();
		setDeleteForm();
	}
});


//***** Ingredients *****

$("#addIngredient").on("click", function(){
	if($('input[name="ingredients"]').val()!==""){
		$('<div class="ingredient-edit"><span class="delete-form"><i class="fa fa-times-circle pull-right" aria-hidden="true"></i></span><input type="text" name="ingredients" class="form-control"></div>').hide().appendTo("#ingredientHolder").fadeIn();
		setDeleteForm();
	}
});

setInstructionNumber();
setDeleteForm();

$('#newAndEditForm').validate({    
    rules: {
        name: {
            minlength: 3,
            maxlength: 30,
            required: true
        },
        image:{
        	maxlength:300,
        },
        description: {
        	minlength: 5,
        	maxlength: 500,
        	required:true,
        },
        servings: {
            minlength: 1,
            maxlength: 4,
            required: true
        },
        prepTime: {
            minlength: 1,
            maxlength: 4,
            required: true
        },
       cookTime: {
            minlength: 1,
            maxlength: 4,
            required: true
        },
        ingredients : {
        	maxlength: 40,
        	required: true, 
        },  
        instructions : {
        	maxlength: 300,
        	required: true, 
        }
    },
    messages: {
    	name: {
    		maxlength: "Your recipe's name is too long.",
    		required: "Please give your dish a name."
    	},
    	description: {
    		minlength: "Describe your dish in at least one sentence.",
    		maxlength: "Your description can't excede 500 characters.",
    		required: "Describe your dish in at least one sentence."
    	},
    	servings: {
    		minlength: "How many servings is this dish? Enter at least 1.",
    		maxlength: "That's too many servings!",
    		required: "How many servings is this dish? Enter at least 1.",
    	},
    	prepTime: {
    		minlength: "How long does it take to prep this dish? Enter 0 if prep isn't needed.",
    		maxlength: "That's too much prep!",
    		required: "How long does it take to prep this dish? Enter 0 if prep isn't needed.",
    	},    	
    	cookTime: {
    		minlength: "How long does it take to cook this dish? Enter 0 if cooking isn't needed.",
    		maxlength: "That's too much cooking time!",
    		required: "How long does it take to cook this dish? Enter 0 if cooking isn't needed.",
    	},    	
    	ingredients: {
    		maxlength: "This ingredient is too long.",
    		required: "Please fill this in.",
    	},    	
    	instructions: {
    		maxlength: "An can't exceed 300 characters.",
    		required: "Please fill this in.",
    	},	
    },
    highlight: function(element) {
        $(element).closest('.form-group').removeClass('has-success').addClass('has-error');
    },
    unhighlight: function(element) {
        $(element).closest('.form-group').removeClass('has-error');
    },
 });

$('#registerForm').validate({    
    rules: {
        username: {
            minlength: 1,
            maxlength: 30,
            required: true
        },
        password: {
            minlength: 6,
            maxlength: 20,
            required: true
        },
        confirmPassword: {
        	minlength: 6,
            maxlength: 20,
            required: true,
            equalTo: "#password"
        }
    },
    messages: {
    	username: {
    		maxlength: "Your username can't excede 30 characters.",
    		required: "Please enter a username."
    	},
    	password: {
    		minlength: "Your password must be at least 6 characters long.",
    		maxlength: "Your password can't excede 20 characters",
    		required: "Please enter a password.",
    	},
    	confirmPassword: {
    		minlength: "Your password must be at least 6 characters long.",
    		maxlength: "Your password can't excede 20 characters",
    		required: "Please match the password above.",
    		equalTo: "This password doesn't match with the one above."
    	}
    },
    highlight: function(element) {
        $(element).closest('.form-group').removeClass('has-success').addClass('has-error');
    },
    unhighlight: function(element) {
        $(element).closest('.form-group').removeClass('has-error');
    },
 });

$('#commentForm').validate({    
    rules: {
        text: {
            minlength: 5,
            maxlength: 300,
            required: true
        },
    },
    messages: {
    	text: {
    		maxlength: "Your comment can't exceed 300 characters.",
    		minlength: "Please make your comment longer.",
    		required: "You haven't entered a comment.",
    	}
    },
    highlight: function(element) {
        $(element).closest('.form-group').removeClass('has-success').addClass('has-error');
    },
    unhighlight: function(element) {
        $(element).closest('.form-group').removeClass('has-error');
    },
 });



