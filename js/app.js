const searchEndpoint = 'https://api.spotify.com/v1/search';
const getEndpoint = 'https://api.spotify.com/v1'
var queryData = {};

var state = {};

function getQueries(queryObj) {
	var queries = window.location.hash.substring(1).split('&');
	for(var q = 0; q < queries.length; ++q) {
		var pair = queries[q].split('=');
		queryObj[pair[0]] = decodeURIComponent(pair[1]);
	}
	return queryObj;
}

state.authToken = getQueries(queryData)['access_token'];

function checkAuth(token) {
	if(!token) {
		window.location.replace('https://juliehx.github.io/songbird');
	}
}

function searchArtist(state, searchTerm, callback) {
	checkAuth(state.authToken);
	const settings = {
		url: searchEndpoint,
		headers: {
			'Authorization': 'Bearer ' + state.authToken
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

function getArtist(state, callback) {
	checkAuth(state.authToken);
	const settings = {
		url: getEndpoint,
		headers: {
			'Authorization': 'Bearer ' + state.authToken
		},
		data: {
			id: state.artistID
		},
		type: 'GET',
		dataType: 'json',
		success: callback
	};
}

function updateArtist(results) {
	state.artistID = results.artists.items[0].id;
}

function renderArtist(results) {
	console.log(results);
}

function handleSearch() {
	$('.artist-search').submit(function(event) {
		event.preventDefault();
		var query = $(this).find('.search-bar').val();
		searchArtist(state, query, updateArtist);
		getArtist(state, renderArtist);
	});
}

$('.album-accordion').on('click', '.album', function(event) {
	$(this).next('.tracklist').slideToggle();
});

$(handleSearch);