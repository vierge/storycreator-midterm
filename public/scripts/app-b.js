$(() => {

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

  // // TESTING NEW SNIPPET, will have to make .create-new-snippet listener
  // $('.create-new-story').on('click', function() {
  //   $('.modal-overlay').show();
  //   $('#modal-write-snippet').addClass('modal-active');
  //   })

  // const $newSnippet = $('#modal-write-snippet form');

  // $newSnippet.submit( function(event) {
  //   const snippetText = $('#snippet-text').val();
  //   console.log(snippetText);
  //   // WE NEED THE STORY ID TO BE LOADED ON RENDER ***
  //   const storyID = 1;
  //   // AJAX REQUEST TO /stories/:id here for SNIPPET
  //   $.post(`/stories/${storyID}`, {snippetText})
  //   .then((data) => {
  //     // ARRAY WITH OBJ - NEW SNIPPET RETURNED
  //     // createPendingPost(data, '.secondary-container')
  //     console.log(data);
  //   })


  //   event.preventDefault();
  // });
