const authEndpoint = 'https://accounts.spotify.com/api/token';
const clientID = 'c180770a2f4144078103e268866ea767';
const redirectURI = 'http://localhost:8888';

$('.album-accordion').on('click', '.album', function(event) {
	$(this).next('.tracklist').slideToggle();
});

$(requestAuth(clientID));