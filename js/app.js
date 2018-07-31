console.log(window.location.hash.substring(1).split('&'));

$('.album-accordion').on('click', '.album', function(event) {
	$(this).next('.tracklist').slideToggle();
});