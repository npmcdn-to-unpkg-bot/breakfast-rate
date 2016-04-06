var $grid = $('.grid').masonry({
  itemSelector: '.grid-item',
  percentPosition: true,
  columnWidth: '.grid-sizer'
});
// layout Isotope after each image loads
$grid.imagesLoaded().progress( function() {
  $grid.masonry();
});  


$("#addInstruction").on("click", function(){
	$("#instructionHolder>ol").append('<li>Step <span class="step"></span><textarea name="instructions" class="form-control" rows="3"></textarea><span class="deleteInstruction">X</span></li>');
	setInstructionNumber();
});




function setInstructionNumber(){
	$("span.step").each(function(){
		$(this).text($(this).parent().index()+1);
	});
}

setInstructionNumber();

// $("span.deleteInstruction").on("click", function(){
// 	$(this).parent().remove();
// });


// $("span.deleteInstruction").each(function(){
// 	console.log("hey");
// });

// $("#instructionHolder>ol>>li>span").text("HELLO");

// "$instructionHolder>li".value()