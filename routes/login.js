const express = require('express');
const router = express.Router();


module.exports = (db) => {
  router.get("/:id", (req, res) => { // route is /login/user's name
    db.query(`SELECT * FROM users WHERE username = ${req.params.id}`) // queries db for a matching username
    .then(data => {
      console.log(data);
      if (data.rows[0]) { // if there was a match
        const { id, username, password } = data.rows[0]; // deconstruct the query : this will be useful later
        res.json({id, username});
      } // done i hope
    });
  })
  return router;
};
