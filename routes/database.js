const express = require('express');
const router = express.Router();
const getPosts = require('../public/scripts/get-posts.js');

module.exports = (db) => {
  router.get("/", (req, res) => {
    console.log('this is where we at!');
    getPosts({
      db: db,
      flag: "-u"
    }).then(res => {
      console.log(res[0]);
      console.log(res[1]);
    })
  });
  return router;
};

// THIS IS BACKUP TEMPLATE
// let query = `SELECT * FROM widgets`;
// console.log(query);
// db.query(query)
//   .then(data => {
//     const widgets = data.rows;
//     res.json({ widgets });
//   })
//   .catch(err => {
//     res
//       .status(500)
//       .json({ error: err.message });
//   });
