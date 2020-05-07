const express = require('express');
const router = express.Router();

module.exports = (db) => {

    // POSTING A SNIPPET
  router.post("/:id", function(req, res) {

    const userID = 1;
    const storyID = req.params.id;
    const snippetText = req.body.snippetText;
    console.log(snippetText);

    db.query('INSERT INTO snippets(user_id, story_id, contents) VALUES($1, $2, $3) RETURNING *', [userID, storyID, snippetText])
    .then((data) => {
      // sending back the data to DOM
      res.json(data.rows);
    })

  });

  return router;
};
