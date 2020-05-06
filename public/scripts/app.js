// $(() => {
//   console.log("what is happening over here?");
//  getPosts({
//    user: 'vierge',
//    date: 'whatever',
//    flag: '-u'
//  }).then((res, err) => {
//    console.log(res);
//  })
//  .catch(err => {
//    console.log(err.stack);
//  })
// });


$(() => {
  $.ajax({
    method: "GET",
    url: "/api/database"
  }).done((users) => {
    console.log('this is where we need to be!');
    // for(user of users) {
    //   $("<div>").text(user.name).appendTo($("body"));
    // }
  });;
});
