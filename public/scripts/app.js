$(() => {

  $.ajax({
    method: "GET",
    url: "/api/database?info=home",
    success: (response) => {
      console.log(response.left);
      console.log(response.right);
      console.log('this is where we need to be!');
      renderPosts(response.left, '.primary-container');
      renderPosts(response.right, '.secondary-container');
      console.log("CAST MAGIC");
    }
  })
});

