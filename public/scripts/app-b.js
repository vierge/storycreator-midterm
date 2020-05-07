$(() => {

  // $.ajax({
  //   method: "GET",
  //   url: "/api/snippets",
  //   success: (response) => {
  //     console.log('(api snippets saying hello from app-b');
  //   }
  // })

  // TESTING NEW SNIPPET, will have to make .create-new-snippet listener
  $('.create-new-story').on('click', function() {
    $('.modal-overlay').show();
    $('#modal-write-snippet').addClass('modal-active');
    })
    console.log('inside the jquery ready');
        // const count = $newTweet.find('.counter').val();
  const $newSnippet = $('#modal-write-snippet form');
  console.log($newSnippet);
    $newSnippet.submit( function(event) {
      const snippetText = $('#snippet-text').val();
      console.log(snippetText);

      // AJAX REQUEST TO /stories/:id here for SNIPPET
      // WE NEED THE STORY ID TO BE LOADED ON RENDER ***
      const storyID = 1;
      $.post(`/stories/${storyID}`, {snippetText})
      .then((data) => {
        // ARRAY WITH NEW OBJ
        console.log(data);
      })


    event.preventDefault();
    });

  console.log('submit handler already recognized');
});
