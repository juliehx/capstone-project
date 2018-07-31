$('.album-accordion').on('click', '.album', function(event) {
	$(this).next('.tracklist').slideToggle();
});