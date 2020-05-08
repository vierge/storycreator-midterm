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

    // TO DO: .create-new-snippet BUTTON AND listener
    $('.create-new-snippet').on('click', function() {
      $('.modal-overlay').show();
      $('#modal-write-snippet').addClass('modal-active');

      $('.close-modal').on('click', function() {
        $('.modal-overlay').hide();
        $('#modal-write-snippet').removeClass('modal-active');
      })
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

    $('.create-new-story').on('click', function() {
      $('.modal-overlay').show();
      $('#modal-write-story').addClass('modal-active');
      $('.close-modal').on('click', function() {
        $('.modal-overlay').hide();
        $('#modal-write-story').removeClass('modal-active');
      })
    })

    const $newStory = $('#modal-write-story form');

    $newStory.submit( function(event) {
      const storyTitle = $('#story-title').val();
      const storyText = $('#story-text').val();

      const tagString = $('#story-tags').val();
      const storyTags = tagString.split(' ');
      // console.log(storyTitle, storyText, storyTags);

      $.post(`/stories/`, {storyTitle, storyText, storyTags})
      .then((data) => {
        console.log(data);
      })

      event.preventDefault();
    })
});

  $('.login').click(function(){
    console.log('clickie');
    $.get("/api/login/ariane")
    .done(res => {
      currentUser = res;
      $('.login').text(currentUser.username);
    })
  })

});
