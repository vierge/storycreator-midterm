const express = require('express');
const router = express.Router();
const getPosts = require('../helper-functions/get-posts.js');

module.exports = (db) => {
  router.get("/", (req, res) => {
    const params = {
      db: db,
      flag: req.query.flag,
      userid: req.query.userid,
      storyid: req.query.storyid
    }
    // console.log(req.query.info);
    console.log('this is where we at!');
    getPosts(params)
    .then(data => {
      const left = data[0].rows;
      const right = data[1].rows;
      res.json({ left, right });
    });
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
