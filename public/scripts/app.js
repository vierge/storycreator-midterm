$(() => {

  $.ajax({
    method: "GET",
    url: "/api/database?info=home",
    success: (response) => {
      console.log(response.left);
      console.log(response.right);
      console.log('this is where we need to be!');
      renderPosts(response.left, '.primary-container');
      renderPosts(response.right, '.secondary-container');
      console.log("CAST MAGIC");
    }
  })
});

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
  const footer = data.date_submitted;

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
        <span>45</span>
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
  return;
}

const createAcceptedPost = function (data, target) {
  console.log(`adding to ${data.story} thread at id ${data.thread_id}`)
  const author = data.snippet_author;
  const text = data.content;
  const thread = data.thread_id;
  // UPVOTES o.o

  $(`${target} #${thread}`).append(`
  <section class='snippet accepted'>
    <header class='meta-data'>
      <a class='snippet_contributor' href=#>@${author}</a>
      <div class='snippet-upvotes'>(45)</div>
    </header>
    <p>${text}</p>
  </section>
  `);
  return;
}

const createThread = (data, target) => {
  console.log(`creating thread for ${data.story}`);

  const thread = data.thread_id;
  const name = data.story;
  const owner = data.story_owner;
  const initialText = data.content;
  const created = data.born_on;
  const completed = data.completed_on;

  console.log("TARGET", $(target));

  $(target).prepend(`
  <!-- STORY -->
  <article class='story'>
    <header>
      <a href=#><h1 class='story-title'>${name}</h1></a>
      <a class='story-owner' href=# >@${owner}</a>
    </header>

    <main>
      <article class='snippets-container' id='${thread}'>

        <section class='snippet initial'>
          <p>${initialText}</p>
        </section>

      <aside>
        <button class='view-pending'>69</button>
        <button class='contribute'><span class="material-icons">create</span></button>
        <button class='lock-story'>
          <span class="material-icons">done_all</span>
        </button>
      </aside>
    </main>

    <footer>
      <p class='tags'>tags tags tags</p>
      <div class='state'>
        <div>${created}</div>
        <div>|</div>
        <div>${completed}</div>
        <div><a href=#>+ contribute</a></div>
        <div><a href=#>view contributions</a></div>
      </div>
    </footer>
  <!-- END OF STORY -->
</article>
`
);
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
