// setup and connect to database

// reminder to comment this code, mara ><


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

const args = process.argv.slice[2]

const dummyArg = {
  user: 'vierge',
  date: '2020-05-05 12:00:00',
  flags: '-u'
}

const getPosts = async function(obj) {

  const { user, date, flags } = obj;
  let condition = '';

    switch(flags){
    case '-u':
      condition = `WHERE users1.username = '${user}' OR users2.username = '${user}`;
      break;
    case '-v':
      condition = `WHERE snippets.date_completed IS NOT NULL`;
      break;
    case '-t':
      condition = `WHERE stories.name LIKE '%May%'`;
      break;
    default: '';
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
