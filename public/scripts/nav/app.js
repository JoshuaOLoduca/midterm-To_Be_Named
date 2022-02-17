
const $login = $('#login');



// redirect on login
$login.on('click', e => {

  $.ajax({
    method: "GET",
    url: `/login/1`,
  })
  .done(function( ) {
    window.location.href='http://localhost:8080/users/myMaps';
  })
})
