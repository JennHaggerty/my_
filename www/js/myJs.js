$( document ).ready(function() {
	$(window).resize(resizeTablesForMobile);
	resizeTablesForMobile();

	//$('#editForm').attr('action', window.location.pathname)
});
function resizeTablesForMobile(){
	$("tbody.collapsed").each(function() {
		$(this).removeClass();
		if ($(".container").width() > 730)
		{
			$(this).addClass("collapsed collapse in");
		}
		else
		{
			$(this).addClass("collapsed collapse")
		}		
	});
}