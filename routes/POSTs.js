const express = require('express');
const router = express.Router();

module.exports = (db) => {

    // POSTING A SNIPPET
  router.post("/:id", function(req, res) {

  // USERID HARDCODED, FUNCTION CHECK USER HERE or cookies
    const userID = req.body.userID;
    const storyID = req.params.id;
    const snippetText = req.body.snippetText;
    console.log(snippetText);

    db.query('INSERT INTO snippets(user_id, story_id, contents) VALUES($1, $2, $3) RETURNING *;', [userID, storyID, snippetText])
    .then((data) => {
      // sending back the data to DOM
      //
      res.json(data.rows);
    })

  });


    // get title, tags (from form) query DB INSERT to stories table returning story id
    // .then query db second time with snippet text from form INSERT
    // return whatever needed to render story
    // how would I show story? only need new snippet and story ID + everything we receive on form
    router.post("/", function(req, res) {

      // FUNCTION CHECK USER HERE
      const {userID, storyTitle, storyText, storyTags} = req.body;
      db.query('INSERT INTO stories(owner_id, name, content_tags) VALUES($1, $2, $3) RETURNING id, name', [ userID, storyTitle, storyTags ])
      .then((storyData) => {
        const storyID = storyData.rows[0].id;
        db.query('INSERT INTO snippets(user_id, story_id, contents, date_created, date_accepted) VALUES($1, $2, $3, Now(), Now()) RETURNING *', [ userID, storyID, storyText])
        .then((data) => {
          const snippetID = data.rows[0].id;
          res.json({storyID, snippetID});
        })
      })
    });


  return router;
};
