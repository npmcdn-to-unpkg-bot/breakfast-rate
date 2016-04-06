var $grid = $('.grid').masonry({
  itemSelector: '.grid-item',
  percentPosition: true,
  columnWidth: '.grid-sizer'
});
// layout Isotope after each image loads
$grid.imagesLoaded().progress( function() {
  $grid.masonry();
});  

/*====================
	NEW RECIPE FORM
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
	$('<li>Step <span class="step"></span><textarea name="instructions" class="form-control" rows="3"></textarea><span class="delete-form">X</span></li>').hide().appendTo("#instructionHolder>ol").fadeIn();
	setInstructionNumber();
	setDeleteForm();
});


//***** Ingredients *****

$("#addIngredient").on("click", function(){
	$('<div class="input-group"><input type="text" name="ingredients" class="form-control"><span class="input-group-addon delete-form">X</span></div>').hide().appendTo("#ingredientHolder").fadeIn();
	setDeleteForm();
});

setInstructionNumber();
setDeleteForm();
