const searchEndpoint = 'https://api.spotify.com/v1';
var queryData = {};

function getQueries(queryObj) {
	var queries = window.location.hash.substring(1).split('&');
	for(var q = 0; q < queries.length; ++q) {
		var pair = queries[q].split('=');
		queryObj[pair[0]] = decodeURIComponent(pair[1]);
	}
	return queryObj;
}

function checkAuth(queryObj) {
	if('error' in queryObj) {
		window.location.replace('https://juliehx.github.io/songbird');
	}
}

function searchArtist(queryObj, searchTerm, callback) {
	checkAuth(queryObj);
	const settings = {
		url: searchEndpoint,
		headers: {
			'Authorization': 'Bearer ' + queryObj['access_token']
		},
		data: {
			q: searchTerm,
			type: 'artist',
			limit: 1
		},
		type: 'GET',
		dataType: 'json',
		success: function(result) {console.log(result);}
	};
	$.ajax(settings);

}

$('.album-accordion').on('click', '.album', function(event) {
	$(this).next('.tracklist').slideToggle();
});

$(console.log(getQueries(queryData)));