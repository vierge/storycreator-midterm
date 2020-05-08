$(() => {

  let currentUser;
  let thisStoryID;

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

<<<<<<< HEAD
  // MY STORIES

  // $.ajax({
  //   method: "GET",
  //   url: "/api/database?flag=user&userid=1",
  //   success: (response) => {
  //     renderPosts(response.left, '.primary-container');
  //     renderPosts(response.right, '.secondary-container');
  //   }
  // })

  let storyID = 0;
    // TO DO: .create-new-snippet BUTTON AND listener
    $('.create-new-snippet').on('click', function() {
      console.log('ow!');
      $('.modal-overlay').show();
      $('#modal-write-snippet').addClass('modal-active');

      // const { thread } = $(this).data();
      // storyID = thread;
      $('.close-modal').on('click', function() {
        $('.modal-overlay').hide();
        $('#modal-write-snippet').removeClass('modal-active');
      })
    })

    const $newSnippet = $('#modal-write-snippet form');

    $newSnippet.submit( function(event) {
      const snippetText = $('#snippet-text').val();
      console.log(`this data: ${$(this).data("thread")}`);
      storyID = $(this).data('thread');
      $(this).removeData();
      console.log(`this should be thread: ${storyID}`);
      console.log(snippetText);
=======
  // TO DO: .create-new-snippet BUTTON AND listener


  const $newSnippet = $('#modal-write-snippet form');
>>>>>>> mara-safety-branch

  $newSnippet.submit(function (event) {
    const snippetText = $('#snippet-text').val();
    console.log(snippetText);

<<<<<<< HEAD
      // WE NEED THE STORY ID TO BE LOADED ON RENDER ***
      // AJAX REQUEST TO /stories/:id here for SNIPPET
      $.post(`/stories/${storyID}`, {snippetText})
=======
    // AJAX REQUEST TO /stories/:id here for SNIPPET
    $.post(`/stories/${thisStoryID}`, { snippetText })
>>>>>>> mara-safety-branch
      .then((data) => {
        // ARRAY WITH OBJ - NEW SNIPPET RETURNED
        // createPendingPost(data, '.secondary-container')
        const post = {
          story_id: thread,
          snippet_author: currentUser.username,
          content: data[0].contents,
          date_submitted: data[0].date_created
        }
        console.log(data.snippet_author);
        console.log(data);
        createPendingPost(post, '.secondary-container');
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

<<<<<<< HEAD
    $('.create-new-story').on('click', function() {
      if(!currentUser.id) { return }
      $('.modal-overlay').show();
      $('#modal-write-story').addClass('modal-active');
      $('.close-modal').on('click', function() {
        $('.modal-overlay').hide();
        $('#modal-write-story').removeClass('modal-active');
      })
=======
  $('.create-new-story').on('click', function () {
    $('.modal-overlay').show();
    $('#modal-write-story').addClass('modal-active');
    $('.close-modal').on('click', function () {
      $('.modal-overlay').hide();
      $('#modal-write-story').removeClass('modal-active');
>>>>>>> mara-safety-branch
    })
  })

  const $newStory = $('#modal-write-story form');

<<<<<<< HEAD
    $newStory.submit( function(event) {
      if(!currentUser.id) {return}
      const userID = currentUser.id;
      const storyTitle = $('#story-title').val();
      const storyText = $('#story-text').val();
=======
  $newStory.submit(function (event) {
    const storyTitle = $('#story-title').val();
    const storyText = $('#story-text').val();
>>>>>>> mara-safety-branch

    const tagString = $('#story-tags').val();
    const storyTags = tagString.split(' ');
    // console.log(storyTitle, storyText, storyTags);

<<<<<<< HEAD
      $.post(`/stories/`, { userID, storyTitle, storyText, storyTags})
=======
    $.post(`/stories/`, { storyTitle, storyText, storyTags })
>>>>>>> mara-safety-branch
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
      })

<<<<<<< HEAD
      event.preventDefault();
    })

    $('.login').click(function(){
      console.log('clickie');
      $.get("/api/login/ariane")
=======
    event.preventDefault();
  })

  $('.login').click(function () {
    console.log('clickie');
    $.get("/api/login/ariane")
>>>>>>> mara-safety-branch
      .done(res => {
        currentUser = res;
        $('.login').text(currentUser.username);
      })
<<<<<<< HEAD
    })
=======
  })
>>>>>>> mara-safety-branch

});
