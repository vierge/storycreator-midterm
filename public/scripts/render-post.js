// post rendering functions
// TODO: documentation;




const createPost = function (data) { // takes a json object that is an array of post information
  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  const storyHeader = { title: data.story, owner: data.story_owner };
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

const renderPosts = (postArray) => {
   for (const post of postArray) {
    $('.secondary-container').prepend(createPost(post));
  }
};

module.exports = renderPosts;
