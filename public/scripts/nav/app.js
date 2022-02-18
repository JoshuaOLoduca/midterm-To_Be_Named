
const $login = $('#login');
const $favBtn = $('#favBtn');
const $logout = $('#logout');
const $pubMaps = $('#pubMaps');
const $userMaps = $('#userMappino');
const $logo = $('#logo')

// redirect on login
$login.on('click', e => {

  $.ajax({
    method: "GET",
    url: `/login/1`,
  })
  .done(function( ) {
    window.location.href='/users/myMaps';
  })
})


// click fave button to redirect to users favourites
$favBtn.on('click', e => window.location.href='/users/favourites');
$('#colBtn').on('click', e => window.location.href='/users/collaborate');


// redirect to index
$logout.on('click', e => {

  $.ajax({
    method: "GET",
    url: `/logout`,
  })
  .done(function() {
    window.location.href='/';
  })
})

$pubMaps.on('click', e => window.location.href='/maps');

$userMaps.on('click', e => window.location.href='/users/mymaps')

$logo.on('click', e => window.location.href='/')
