const searchEndpoint = 'https://api.spotify.com/v1/search';
var queryData = {};
var authToken = '';

function getQueries(queryObj) {
	var queries = window.location.hash.substring(1).split('&');
	for(var q = 0; q < queries.length; ++q) {
		var pair = queries[q].split('=');
		queryObj[pair[0]] = decodeURIComponent(pair[1]);
	}
	return queryObj;
}

authToken = getQueries(queryData)['access_token'];

function checkAuth(token) {
	if(!token) {
		window.location.replace('https://juliehx.github.io/songbird');
	}
}

function searchArtist(token, searchTerm, callback) {
	checkAuth(token);
	const settings = {
		url: searchEndpoint,
		headers: {
			'Authorization': 'Bearer ' + token
		},
		data: {
			q: searchTerm,
			type: 'artist',
			limit: 1
		},
		type: 'GET',
		dataType: 'json',
		success: callback
	};
	$.ajax(settings);
}

function getArtist(results) {
	console.log(results);
}

function handleSearch() {
	$('.artist-search').submit(function(event) {
		event.preventDefault();
		var query = $(this).find('.search-bar').val();
		searchArtist(authToken, query, getArtist);
	});
}

$('.album-accordion').on('click', '.album', function(event) {
	$(this).next('.tracklist').slideToggle();
});

$(handleSearch);