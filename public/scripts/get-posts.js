// setup and connect to database
// TESTING POOL vvvv

const { Pool } = require('pg');
const dbParams = require('../../lib/db.js');
const db = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'labber',
  password: 'labber',
  database: 'jammer'
});
db.connect();

// TESTING POOL^^^^

const args = process.argv.slice[2] // This is for command line testing... remove on deployment


const dummyArg = {              // this is the anatomy of a getPost argument
  user: 'vierge',               // current user's username
  date: '2020-05-05 12:00:00',  // date of request (i don't know that this is actually necessary)
  flags: '-u'                   // this is the flag that tells the function what to pull
}

const getPosts = async function(obj) {

  const { user, date, flags } = obj;
  let condition = '';

    switch(flags){
    case '-u': // pull all info for the user's stories and snippets
      condition = `WHERE users1.username = '${user}' OR users2.username = '${user}`;
      break;
    case '-v': // select only completed snippets
      condition = `WHERE snippets.date_completed IS NOT NULL`;
      break;
    case '-s': // search for stories with a name like.....
      condition = `WHERE stories.name LIKE '%May%'`;
      break;
    default: ''; // no flag should return the default first view
  };

  const query = {
    name: 'selector',
    text: `SELECT users1.username AS story_owner,
    stories.name AS story,
    stories.date_created AS born_on,
    stories.date_completed AS completed_on,
    snippets.date_accepted AS snippet_accepted_date,
    users2.username AS snippet_author,
    stories.content_tags AS tags
    FROM snippets
    JOIN stories ON story_id = stories.id
    JOIN users AS users1 ON owner_id = users1.id
    JOIN users AS users2 ON user_id = users2.id
    ${condition}
    ORDER BY story, completed_on DESC, born_on DESC, snippet_accepted_date ASC;
    `,
    values: []
  }

  const res = await db.query(query);
  console.log(res.rows);
  return res.rows;
}

getPosts(dummyArg);
