$(() => {

  // ADD THESE TO MODALS AFTER RENDER
  $newSnippet.trigger('reset');
  $('.modal-overlay').hide();
  $('#modal-write-snippet').removeClass('modal-active');

  $newStory.trigger('reset');
  $('.modal-overlay').hide();
  $('#modal-write-story').removeClass('modal-active');

  // GET RID OF THIS IN render-post

  // <button class='view-pending'>69</button>
  // <button class='create-new-snippet'>B<button>

  // BUTTON ON CLICK BLUR... EXAMPLE
  $('.create-new-story').blur();

  // GET RID OF THIS IN HTML INDEX

  // <button>ALL</button>
  // <button disabled>My Contributions</button>
  // <button disabled>Favourites</button>
  // <button disabled>Search</button>

  // HOOKUP JAMMER TO HOME:
  $('.logo').on('click', () => {
    $.ajax({
      method: "GET",
      url: "/api/database?flag=home", // IS THIS RIGHT?
      success: (response) => {
        renderPosts(response.left, '.primary-container');
        renderPosts(response.right, '.secondary-container');
      }
    })
  })

  // SEND USER ID to post story:
  // in app.js -
  // $newSnippet.submit(function (event) {
  //   const userID = currentUser.id;

  // $.post(`/stories/${thisStoryID}`, { userID, snippetText })
  // in posts.js
  // userID = req.params.userID; ???

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

    // $('.create-new-story').on('click', function() {
  //   $('.modal-overlay').show();
  //   $('#modal-write-story').addClass('modal-active');
  //   $('.close-modal').on('click', function() {
  //     $('.modal-overlay').hide();
  //     $('#modal-write-story').removeClass('modal-active');
  //   })
  // })

  // const $newStory = $('#modal-write-story form');

  // $newStory.submit( function(event) {
  //   const storyTitle = $('#story-title').val();
  //   const storyText = $('#story-text').val();

  //   const tagString = $('#story-tags').val();
  //   const storyTags = tagString.split(' ');
  //   // console.log(storyTitle, storyText, storyTags);

  //   $.post(`/stories/`, {storyTitle, storyText, storyTags})
  //   .then((data) => {
  //     console.log(data);
  //   })

  //   event.preventDefault();
  // })

