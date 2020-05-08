// console.log(process.argv);
// const args = process.argv; // This is for command line testing... remove on deployment
// console.log(args[2]);

// welcome to getPosts!
// getPosts is an ASYNC function that takes as an argument an object like the one below:
//
// const dummyArg = {              // this is the anatomy of a getPost argument
//   user: 'vierge',               // current user's username
//   date: '2020-05-05 12:00:00',  // date of request in ISO format (i don't know that this is actually necessary)
//   flags: args[2]                // this is the flag that tells the function what to pull
// }
//
// getPosts queries the database based on the flag and returns a ***PROMISE***
// containing a 2 dimensional array:
// [[left column rows], [right column rows]]
//
// inside an async function, pass getPosts() as a const to postRender()
// to generate HTML and populate the main area of the DOM.

// TO DO: figure out a mobile solution. IDEAS: pass an isMobile boolean as an argument
// and make a single query instead of two?


// const dummyArg = {              // this is the anatomy of a getPost argument
//   user: 'vierge',               // current user's username
//   date: '2020-05-05 12:00:00',  // date of request in ISO format (i don't know that this is actually necessary)
//   flags: args[2]                // this is the flag that tells the function what to pull
// }



const getPosts = async function(obj) {

  const { db, userid, storyid, date, flag } = obj;
  let conditionLeft = ''; //left column
  let conditionRight = ''; //right column

    switch(flag){
    case 'home': // first view: pull all complete and incomplete stories
      conditionLeft = `WHERE stories.date_completed IS NULL AND snippets.date_accepted IS NOT NULL`;       // incomplete left
      conditionRight = `WHERE stories.date_completed IS NOT NULL AND snippets.date_accepted IS NOT NULL`;  // complete right
      break;
    case 'user': // TBC: user snippets view: pls define a user
      conditionLeft = `WHERE user_id = ${userid} OR stories.owner_id = ${userid} AND snippets.date_accepted IS NOT NULL`;
      conditionRight = `WHERE user_id = ${userid} AND snippets.date_accepted IS NULL`;
      break;
    case 'story': // search for stories with a name like.....
      conditionLeft = `WHERE snippets.story_id = ${storyid} AND snippets.date_accepted IS NOT NULL`;
      conditionRight = `WHERE snippets.story_id = ${storyid} AND snippets.date_accepted IS NULL
                        AND snippets.date_created >= (
                          SELECT snippets.date_accepted FROM snippets
                          JOIN stories ON story_id = stories.id
                          WHERE snippets.story_id = ${storyid}
                          ORDER BY snippets.date_accepted DESC NULLS LAST
                          LIMIT 1
                          )`;
      break;
    default: throw err; // no flag should return the default first view
  };

  const grab = function (condition) {
    return `SELECT snippets.id AS post_id,
    stories.owner_id AS owner_id,
    users1.username AS story_owner,
    stories.name AS story,
    stories.date_created AS born_on,
    stories.date_completed AS completed_on,
    snippets.contents AS content,
    snippets.date_created AS date_submitted,
    snippets.date_accepted AS snippet_accepted_date,
    users2.username AS snippet_author,
    snippets.vote_count AS upvotes,
    stories.content_tags AS tags,
    snippets.story_id AS thread_id

    FROM snippets
    JOIN stories ON story_id = stories.id
    JOIN users AS users1 ON owner_id = users1.id
    JOIN users AS users2 ON user_id = users2.id
    ${condition}
    ORDER BY story, completed_on DESC, born_on DESC, snippet_accepted_date ASC;
    `
  }

  const res = {
    left: await db.query(grab(conditionLeft)),
    right: await db.query(grab(conditionRight))
    };

  // console.log('LEFT:');
  // console.log(res.left.rows);
  // console.log('RIGHT:');
  // console.log(res.right.rows);

  return [res.left, res.right]

}
module.exports = getPosts;
