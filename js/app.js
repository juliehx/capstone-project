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
		success: function(response) {
			var artistID = response.artists.items[0].id;
			getArtist(token, artistID, displayArtist);
			getAlbum(token, artistID);
		}
	};
	$.ajax(settings);
}

function getArtist(token, artistID, callback) {
	checkAuth(token);
	const settings = {
		url: getEndpoint + '/artists/' + artistID,
		headers: {
			'Authorization': 'Bearer ' + token
		},
		type: 'GET',
		dataType: 'json',
		success: callback
	};
	$.ajax(settings);
}

function getAlbum(token, artistID) {
	checkAuth(token);
	const settings = {
		url: getEndpoint + '/artists/' + artistID + '/albums',
		headers: {
			'Authorization': 'Bearer ' + token
		},
		type: 'GET',
		dataType: 'json',
		success: function(response) {
			console.log(response);
			displayAlbum(response);
		}
	};
	$.ajax(settings);
}

function displayArtist(results) {
	$('.artist-info').html(`<img src="${results.images[0].url}"><h1>${results.name}</h1>`);
}

function displayAlbum(results) {
	var albums = '';
	for(var i = 0; i < results.items.length; ++i) {
		albums += renderAlbum(results.items[i]);
	}
	$('.album-accordion').html(albums);
}

function renderAlbum(album) {
	var albumInfo =`<li>
					<div class="album">
					<img src="${album.images[0].url}" class="album-cover">
					<h3>${album.name}</h3>
					<p>${album.type}</p>
					<div class="show-tracks"><img src="images/chevron-down.svg"></div>
					</div>
					</li>`;
	return albumInfo;
}

function handleSearch() {
	$('.artist-search').submit(function(event) {
		event.preventDefault();
		var query = $(this).find('.search-bar').val();
		searchArtist(authToken, query);
		//getArtist(state, renderArtist);
	});
}

$('.album-accordion').on('click', '.album', function(event) {
	$(this).next('.tracklist').slideToggle();
});

$(handleSearch);