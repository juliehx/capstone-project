const authEndpoint = 'https://accounts.spotify.com/authorize';
const clientID = 'c180770a2f4144078103e268866ea767';
const redirectURI = 'https://juliehx.github.io/songbird';

const hash = window.location.hash
.substring(1)
.split('&')
.reduce(function (initial, item) {
  if (item) {
    var parts = item.split('=');
    initial[parts[0]] = decodeURIComponent(parts[1]);
  }
  return initial;
}, {});
window.location.hash = '';

let _token = hash.access_token;

if(!_token)
{
	window.location.replace(`${authEndpoint}?client_id=${clientID}&redirect_uri=${redirectURI}&response_type=token`);
}