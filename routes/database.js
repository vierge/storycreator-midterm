const express = require('express');
const router = express.Router();
const getPosts = require('../public/scripts/get-posts.js');

module.exports = (db) => {
  router.get("/", (req, res) => {
    const queryFlag = req.query.info;
    // console.log(req.query.info);
    console.log('this is where we at!');
    getPosts({
      db: db,
      flag: queryFlag
    }).then(data => {
      const left = data[0].rows;
      const right = data[0].rows;
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
