
const $login = $('#login');
const $favBtn = $('#favBtn');
const $logout = $('#logout');
const $pubMaps = $('#pubMaps');
const $userMaps = $('#userMappino');
const $logo = $('#logo')

// on login button click
// redirect user to their maps after getting cookie
$login.on('click', e => {

  $.ajax({
    method: "GET",
    url: `/login/1`,
  })
    // When I get my login cookie
      // Redirect to myMaps page
    .done(function() {
      window.location.href = '/users/myMaps';
    });
});


// click fave button to redirect to users favourites
$favBtn.on('click', e => window.location.href = '/users/favourites');


// On logout button click
// Delete cookie and redirect to main page
$logout.on('click', e => {

  $.ajax({
    method: "GET",
    url: `/logout`,
  })
    // When cookie deleted. redirect to main page
    .done(function() {
      window.location.href = '/';
    });
});

// On public maps click
  // Redirect user to list of all maps
$pubMaps.on('click', e => window.location.href='/maps');

$userMaps.on('click', e => window.location.href='/users/mymaps')

$logo.on('click', e => window.location.href='/')
