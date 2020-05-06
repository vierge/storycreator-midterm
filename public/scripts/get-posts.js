// setup and connect to database
// TESTING POOL vvvv

const { Pool } = require('pg');
// const dbParams = require('../../lib/db.js');
const db = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'labber',
  password: 'labber',
  database: 'jammer'
});
db.connect();

let result = '';

// TESTING POOL^^^^

console.log(process.argv);
const args = process.argv; // This is for command line testing... remove on deployment
console.log(args[2]);

const dummyArg = {              // this is the anatomy of a getPost argument
  user: 'vierge',               // current user's username
  date: '2020-05-05 12:00:00',  // date of request (i don't know that this is actually necessary)
  flags: args[2]                   // this is the flag that tells the function what to pull
}

const getPosts = async function(obj) {

  const { user, date, flags } = obj;
  let conditionLeft = '';
  let conditionRight = '';

    switch(flags){
    case '-u': // first view: pull all complete and incomplete stories
      conditionLeft = `WHERE stories.date_completed IS NULL`;       // incomplete left
      conditionRight = `WHERE stories.date_completed IS NOT NULL`;  // complete right
      break;
    case '-v': // select only completed snippets
      conditionLeft = `WHERE snippets.date_accepted IS NOT NULL`;
      conditionRight = `WHERE snippets.date_accepted IS NULL`;
      break;
    case '-s': // search for stories with a name like.....
      conditionLeft = `WHERE stories.name LIKE '%May%' AND snippets.date_accepted IS NOT NULL`;
      conditionRight = `WHERE stories.name LIKE '%May%' AND snippets.date_accepted IS NULL
                        AND snippets.date_created >= (
                          SELECT snippets.date_accepted FROM snippets
                          JOIN stories ON story_id = stories.id
                          WHERE stories.name LIKE '%May%'
                          ORDER BY snippets.date_accepted DESC NULLS LAST
                          LIMIT 1
                          )`;
      break;
    default: throw err; // no flag should return the default first view
  };

  const grab = function (condition) {
    return `SELECT users1.username AS story_owner,
    stories.name AS story,
    stories.date_created AS born_on,
    stories.date_completed AS completed_on,
    snippets.contents AS content,
    snippets.date_accepted AS snippet_accepted_date,
    users2.username AS snippet_author,
    stories.content_tags AS tags
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

  return [res.left, res.right];
}

getPosts(dummyArg);
