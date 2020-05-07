$(() => {

  $.ajax({
    method: "GET",
    url: "/api/database?info=home",
    success: (response) => {
      console.log(response.left);
      console.log(response.right);
      console.log('this is where we need to be!');
      renderPosts(response.left, 'left');
      renderPosts(response.right, 'right');
      console.log("CAST MAGIC");
    }
  })
});

const createPendingPost = function (data) { // takes a json object that is an array of post information
  const author = data.snippet_author;
  const text = data.content;
  // remember upvotes!!!!
  const footer = data.date_submitted;

  return `
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
  `
  }

  const createAcceptedPost = function (data) {
    const author = data.snippet_author;
    const text = data.content;
    // UPVOTES o.o
    return `
    <section class='snippet accepted'>
      <header class='meta-data'>
        <a class='snippet_contributor' href=#>@${author}</a>
        <div class='snippet-upvotes'>(45)</div>
      </header>
      <p>${text}</p>
    </section>
    `
  }

const renderPosts = (postArray, side, method) => {
  // post.date_accepted ? createAcceptedPost(post) : createPendingPost(post)
  if (side === 'left') {
    for (const post of postArray) {
      $('.primary-container').prepend(method(post));
    }
  } else if (side === 'right') {
    for (const post of postArray) {
      $('.secondary-container').prepend(method(post));
    }
  } else {
    console.log("git blame yourself or god");
  }

};

const createStory = (data) => {




  return `
  <!-- STORY -->
  <article class='story'>
    <header>
      <a href=#><h1 class='story-title'>story_name</h1></a>
      <a class='story-owner' href=# >@owner_username</a>
    </header>

    <main>
      <article class='snippets-container'>

        <section class='snippet initial'>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nobis architecto minima nostrum corporis vitae asperiores, qui sed sunt molestiae totam et animi, rerum provident cupiditate voluptatum omnis neque reiciendis delectus.</p>
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
        <div>date_created</div>
        <div>|</div>
        <div>last_updated</div>
        <div><a href=#>+ contribute</a></div>
        <div><a href=#>view contributions</a></div>
      </div>
    </footer>
<!-- END OF STORY -->
  </article>
  `
}

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
// }


// <!-- STORY -->
// <article class='story'>
//   <header>
//     <a href=#><h1 class='story-title'>story_name</h1></a>
//     <a class='story-owner' href=# >@owner_username</a>
//   </header>

//   <main>
//     <article class='snippets-container'>

//       <section class='snippet initial'>
//         <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nobis architecto minima nostrum corporis vitae asperiores, qui sed sunt molestiae totam et animi, rerum provident cupiditate voluptatum omnis neque reiciendis delectus.</p>
//       </section>

//       <section class='snippet accepted'>
//         <header class='meta-data'>
//           <a class='snippet_contributor' href=#>@snippet_contributor</a>
//           <div class='snippet-upvotes'>(45)</div>
//         </header>
//         <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem, dolorum soluta, optio est temporibus vel labore repellendus blanditiis similique perspiciatis placeat quas vero veritatis illo saepe esse quam nesciunt. Natus?</p>
//       </section>

//       <section class='snippet accepted'>
//         <header class='meta-data'>
//           <a class='snippet_contributor' href=#>@snippet_contributor</a>
//           <div class='snippet-upvotes'>(45)</div>
//         </header>
//         <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem, dolorum soluta, optio est temporibus vel labore repellendus blanditiis similique perspiciatis placeat quas vero veritatis illo saepe esse quam nesciunt. Natus?</p>
//       </section>
//     </article>

//     <aside>
//       <button class='view-pending'>69</button>
//       <button class='contribute'><span class="material-icons">create</span></button>
//       <button class='lock-story'>
//         <span class="material-icons">done_all</span>
//       </button>
//     </aside>
//   </main>

//   <footer>
//     <p class='tags'>tags tags tags</p>
//     <div class='state'>
//       <div>date_created</div>
//       <div>|</div>
//       <div>last_updated</div>
//       <div><a href=#>+ contribute</a></div>
//       <div><a href=#>view contributions</a></div>
//     </div>
//   </footer>
// <!-- END OF STORY -->
// </article>


const escape = function (str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};
