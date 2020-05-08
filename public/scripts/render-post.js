// WELCOME TO THE POST RENDERERS!
// renderPosts() takes an array of posts and a target column,
// parses each post for relevant data and passes the post and target to
// createThread(), createAcceptedPost(), or createPendingPost() !
//
// the create$() functions handle the actual rendering, so they can be used independently to make posts!

const renderPosts = (postArray, target) => {
  for (const post of postArray) {
      if (post.date_submitted === post.snippet_accepted_date) {
        createThread(post, target)
      } else {
      post.snippet_accepted_date ? createAcceptedPost(post, target) : createPendingPost(post, target);
    }
  }
  return true;
}

const createPendingPost = function (data, target) { // takes a json object that is an array of post information
  const author = data.snippet_author;
  const text = data.content;
  // remember upvotes!!!!
  const footer = new Date(data.date_submitted);
  let upvotes = data.upvotes ? data.upvotes : 0;

  $(target).prepend(`
  <article class='snippet pending'>
    <header>
      <a class='snippet_contributor' href=#>${author}</a>
    </header>
    <main>
      <section>
        <p>${text}</p>
      </section>
      <aside>
        <button class='upvote'>
          <span class="material-icons">keyboard_arrow_up</span>
        </button>
        <span>${upvotes}</span>
        <button class='accept'>
          <span class="material-icons">done</span>
        </button>
      </aside>
    </main>
    <footer>
      <span>${footer}</span>
    </footer>
  </article>
  `);
  $(`.upvote`).click(function(event) {
    upvotes++;
    console.log("click");
    $.post(`/stories/vote/${data.post_id}`).then(res => {return})
    $(this).next().empty().text(`VOTTTTTTEEE: ${upvotes}`);
    event.preventDefault();
  })
  return;
}

const createAcceptedPost = function (data, target) {
  console.log(`adding to ${data.story} thread at id ${data.thread_id}`)
  const author = data.snippet_author;
  const text = data.content;
  const thread = data.thread_id;
  const updated = new Date(data.snippet_accepted_date);
  const upvotes = data.upvotes;

  // UPVOTES o.o

  $(`${target} #${thread}`).append(`
  <section class='snippet accepted'>
    <header class='meta-data'>
      <a class='snippet_contributor' href=#>@${author}</a>
      <div class='snippet-upvotes'>(${upvotes})</div>
    </header>
    <p>${text}</p>
  </section>
  `);
  $(`${target} #${thread}-last-updated`).text(`last updated: ${updated}`);
  return;
}

const createThread = (data, target) => {
  console.log(`creating thread for ${data.story}`);

  const thread = data.thread_id;
  const name = data.story;
  const owner = data.story_owner;
  const initialText = data.content;
  const created = new Date(data.born_on);
  const completed = new Date (data.completed_on);
  let tags = '';
  data.tags.forEach(element => {
    tags = tags + `<a href=#> . ${element} . </a>`
  });
  console.log("TARGET", $(target));

  $(target).prepend(`
  <!-- STORY -->
  <article class='story'>
    <header>
      <a href=#><h1 class='story-title view-story'>${name}</h1></a>
      <a class='story-owner' href=# >@${owner}</a>
    </header>

    <main>
      <article class='snippets-container' id='${thread}'>

        <section class='snippet initial'>
          <p>${initialText}</p>
        </section>
      </article>
      <aside>
        <button class='view-pending'>69</button>
        <button class='create-new-snippet'>B<button>
        <button class='contribute create-new-snippet' id="post-to-${thread}"><span class="material-icons">create</span></button>
        <button class='lock-story'>
          <span class="material-icons">done_all</span>
        </button>
      </aside>
    </main>

    <footer>
      <p class='tags'> . ${tags} . </p>
      <div class='state'>
        <div>${created}</div>
        <div>|</div>
        <div id="${thread}-last-updated">last updated: ${completed ? completed : created}</div>
        <div><a href=#>+ contribute</a></div>
        <div><button class="view-story">view contributions</a></div>
      </div>
    </footer>
  <!-- END OF STORY -->
</article>
`
);
$(`.create-new-snippet`).on('click', function () {
  if(!currentUser.id) {return}  // #post-to-${thread} ????
  thisStoryID = thread;
  $('.modal-overlay').show();
  $('#modal-write-snippet').addClass('modal-active');

  $('.close-modal').on('click', function () {
    thisStoryID = 0;
    $('.modal-overlay').hide();
    $('#modal-write-snippet').removeClass('modal-active');
  })
})
$(`.view-story`).on('click', function(event) {
  console.log('click');
  // thisStoryID = thread; // just in case
  dbCall(`flag=story&storyid=${thread}`).then(() => {return}); // investigate this
  // thisStoryID = 0; // also just in case
});
return;
}


// FOR DEV REFERENCE: ANATOMY OF A POST

// 0: {
// born_on: "2020-05-01T00:00:00.000Z"
// completed_on: null
// content: "On the first week of Meltdown May, the fates delivered unto me: 2 breakups, 100mL of tears, [insert some number] new cases of COVID-19, six midterm projects, 5 litres of wine consumed, 2 new twitter followers, no new haircuts, and a highly memorable period of uncertainty and restlessness"
// snippet_accepted_date: "2020-05-01T00:00:00.000Z"
// snippet_author: "vierge"
// story: "A Comprehensive Account Of Meltdown May"
// story_owner: "vierge"
// tags: Array(3)
// 0: "journalism"
// 1: "quarantine"
// 2: "sadness"
// thread_id: 1
// }
