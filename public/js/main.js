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
	// $("#instructionHolder>ol").append('<li>Step <span class="step"></span><textarea name="instructions" class="form-control" rows="3"></textarea><span class="setDeleteForm">X</span></li>');
	$('<li>Step <span class="step"></span> <span class="delete-form"><i class="fa fa-times-circle pull-right" aria-hidden="true"></i></span><textarea name="instructions" class="form-control" rows="4"></textarea></li>').hide().appendTo("#instructionHolder>ol").fadeIn();
	setInstructionNumber();
	setDeleteForm();
});


//***** Ingredients *****

$("#addIngredient").on("click", function(){
	$('<div class="ingredient-edit"><span class="delete-form"><i class="fa fa-times-circle pull-right" aria-hidden="true"></i></span><input type="text" name="ingredients" class="form-control"></div>').hide().appendTo("#ingredientHolder").fadeIn();
	setDeleteForm();
});

setInstructionNumber();
setDeleteForm();

$('#newForm').validate();
$('#editForm').validate();
$('#commentForm').validate();
$('#editCommentForm').validate();