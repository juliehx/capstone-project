const searchEndpoint = 'https://api.spotify.com/v1/search';
const getEndpoint = 'https://api.spotify.com/v1'
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

function searchArtist(token, searchTerm) {
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
		success: function(results) {
			getArtist(results, token, renderArtist);
		}
	};
	$.ajax(settings);
}

function getArtist(results, token, callback) {
	checkAuth(token);
	const settings = {
		url: getEndpoint,
		headers: {
			'Authorization': 'Bearer ' + token
		},
		data: {
			id: results.artists.items[0].id
		},
		type: 'GET',
		dataType: 'json',
		success: callback
	};
}

function renderArtist(results) {
	console.log(results);
}

function handleSearch() {
	$('.artist-search').submit(function(event) {
		event.preventDefault();
		var query = $(this).find('.search-bar').val();
		searchArtist(authToken, query);
	});
}

$('.album-accordion').on('click', '.album', function(event) {
	$(this).next('.tracklist').slideToggle();
});

$(handleSearch);