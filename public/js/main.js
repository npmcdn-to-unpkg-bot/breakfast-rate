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
	$("#instructionHolder").append('<textarea name="instructions" class="form-control" rows="3"></textarea>');
});