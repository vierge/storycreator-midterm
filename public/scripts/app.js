//query params - where: req.info (?) query params express server

$(() => {
  $.ajax({
    method: "GET",
    url: "/api/database?info=-u",
    success: (response) => {
      console.log(response);
      console.log('this is where we need to be!');
    }
  })
});


