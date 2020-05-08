let currentUser;
let thisStoryID;
let thisPostID;

const dbCall = function (options) {
    console.log(options);
      $.ajax({
        method: "GET",
        url: `/api/database?${options}`,
        success: (response) => {
          $('.primary-container').empty();
          $('.secondary-container').empty();
          console.log('this is where we need to be!');
          renderPosts(response.left, '.primary-container');
          renderPosts(response.right, '.secondary-container');
          console.log("CAST MAGIC");
        }
      })
  }


$(() => {

  dbCall('flag=home');

  const $newSnippet = $('#modal-write-snippet form');

  $newSnippet.submit(function (event) {
    const snippetText = $('#snippet-text').val();
    console.log(snippetText);

    // AJAX REQUEST TO /stories/:id here for SNIPPET
    $.post(`/stories/${thisStoryID}`, { snippetText })
      .then((data) => {
        // ARRAY WITH OBJ - NEW SNIPPET RETURNED
        // createPendingPost(data, '.secondary-container')
        const post = {
          story_id: thisStoryID,
          snippet_author: currentUser.username,
          content: data[0].contents,
          date_submitted: data[0].date_created
        }
        console.log(data.snippet_author);
        console.log(data);
        createPendingPost(post, '.secondary-container');

        $newSnippet.trigger('reset');
        $('.modal-overlay').hide();
        $('#modal-write-snippet').removeClass('modal-active');
      })

    // id: 8,
    // story_id: 5,
    // user_id: 2,
    // date_created: "2020-05-08T02:51:02.356Z",
    // vote_count: 0,
    // date_accepted: null,
    // contents: "Here's a story"

    event.preventDefault();
  });

  $('.create-new-story').on('click', function () {
    if (!currentUser.id) { return }
    $('.modal-overlay').show();
    $('#modal-write-story').addClass('modal-active');
    $('.close-modal').on('click', function () {
      $('.modal-overlay').hide();
      $('#modal-write-story').removeClass('modal-active');
    })
  })

  const $newStory = $('#modal-write-story form');

$newStory.submit(function (event) {
  const userID = currentUser.id;
  const storyTitle = $('#story-title').val();
  const storyText = $('#story-text').val();

  const tagString = $('#story-tags').val();
  const storyTags = tagString.split(' ');
  // console.log(storyTitle, storyText, storyTags);

  $.post(`/stories/`, { userID, storyTitle, storyText, storyTags })
    .then((data) => {
      console.log(data);
      const post = {
        thread_id: data.storyID,
        story: storyTitle,
        story_owner: currentUser.username,
        content: storyText,
        born_on: new Date(),
        tags: storyTags
      }
      createThread(post, '.primary-container');
      $newStory.trigger('reset');
      $('.modal-overlay').hide();
      $('#modal-write-story').removeClass('modal-active');
    })

  event.preventDefault();

})

$('.logo').on('click', () => {
  dbCall('flag=home').then(() => {return});
});

$('.login').click(function () {
  console.log('clickie');
  $.get("/api/login/ariane")
    .done(res => {
      currentUser = res;
      $('.login').text(currentUser.username);
    })
});

}); // BOTTOM OF JQUERY DOCUMENT.ON
