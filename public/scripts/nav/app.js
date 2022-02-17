
const $login = $('#login');
const $favBtn = $('#favBtn');

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


$favBtn.on('click', e => window.location.href='/users/favourites');
