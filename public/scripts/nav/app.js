// //////////
// Fetching elements as vars
// //////////
const $login = $('#login');
const $favBtn = $('#favBtn');
const $logout = $('#logout');
const $pubMaps = $('#pubMaps');
const $userMaps = $('#userMappino');
const $logo = $('#logo');

// Logs user in and reloads page
$login.on('click', e => {

  // Get encrypted cookie for user 1
  $.ajax({
    method: "GET",
    url: `/login/1`,
  })
    .done(function() {
    // Reloads pages
      window.location.reload();
    });
});


// click fave button to redirect to users favourites
$favBtn.on('click', e => window.location.href = '/users/favourites');

// click collaborate button to redirect to maps they can edit places on
$('#colBtn').on('click', e => window.location.href = '/users/collaborate');

// Redirects user to logout page
$logout.on('click', e => window.location.href = '/logout');

// click maps page to view all public maps
$pubMaps.on('click', e => window.location.href = '/maps');

// click my maps to view all maps user has created
$userMaps.on('click', e => window.location.href = '/users/mymaps');

// Click logo to go to home page
$logo.on('click', e => window.location.href = '/');
