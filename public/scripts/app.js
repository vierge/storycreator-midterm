$(() => {

  let currentUser;

  $.ajax({
    method: "GET",
    url: "/api/database?flag=story&storyid=1",
    success: (response) => {
      console.log(response.left);
      console.log(response.right);
      console.log('this is where we need to be!');
      renderPosts(response.left, '.primary-container');
      renderPosts(response.right, '.secondary-container');
      console.log("CAST MAGIC");
    }
  })

  $('.login').click(function(){
    console.log('clickie');
    $.get("/api/login/ariane")
    .done(res => {
      currentUser = res;
      $('.login').text(currentUser.username);
    })
  })

});
