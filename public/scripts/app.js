$(() => {

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

    // TESTING NEW SNIPPET, will have to make .create-new-snippet listener
    $('.create-new-story').on('click', function() {
      $('.modal-overlay').show();
      $('#modal-write-snippet').addClass('modal-active');
      })

    const $newSnippet = $('#modal-write-snippet form');

    $newSnippet.submit( function(event) {
      const snippetText = $('#snippet-text').val();
      console.log(snippetText);


      // WE NEED THE STORY ID TO BE LOADED ON RENDER ***
      const storyID = 1;
      // AJAX REQUEST TO /stories/:id here for SNIPPET
      $.post(`/stories/${storyID}`, {snippetText})
      .then((data) => {
        // ARRAY WITH OBJ - NEW SNIPPET RETURNED
        // createPendingPost(data, '.secondary-container')

        createPendingPost(data, '.secondary-container');
      })


      event.preventDefault();
    });
});

