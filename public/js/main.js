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

function setInstructionNumber(){
	$("span.step").each(function(){
		$(this).text($(this).parent().index()+1);
	});
}

//allows the span with class "delete-instruction" to delete the instruction when clicked
function setDeleteInstruction(){
	$("span.delete-instruction").click(function(){
		var that = $(this).parent();
		that.fadeOut( function() {
			that.remove();
			setInstructionNumber();
		});
	});
}

$("#addInstruction").on("click", function(){
	// $("#instructionHolder>ol").append('<li>Step <span class="step"></span><textarea name="instructions" class="form-control" rows="3"></textarea><span class="setDeleteInstruction">X</span></li>');
	$('<li>Step <span class="step"></span><textarea name="instructions" class="form-control" rows="3"></textarea><span class="delete-instruction">X</span></li>').hide().appendTo("#instructionHolder>ol").fadeIn();
	setInstructionNumber();
	setDeleteInstruction();
});

setInstructionNumber();
setDeleteInstruction();