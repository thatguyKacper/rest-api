const express = require('express');
const db = require('../db');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

router.route('/concerts').get((req, res) => {
  res.json(db.concerts);
});

router.route('/concerts/:id').get((req, res) => {
  for (let post of db.concerts) {
    if (post.id == req.params.id) {
      res.json('post');
    };
  };
});

router.route('/concerts').post((req, res) => {
  const { performer, genre, price, day, image } = req.body;
  const newPost = { performer: performer, genre: genre, price: price, day: day, image: image, id: uuidv4() };
  db.concerts.push(newPost);
  res.json({ message: 'OK' });
});

router.route('/concerts/:id').put((req, res) => {
  const { performer, genre, price, day, image } = req.body;
  for (let post of db.concerts) {
    if (post.id == req.params.id) {
      post.performer = performer;
      post.genre = genre;
      post.price = price;
      post.day = day;
      post.image = image;
    };
  };
  res.json({ message: 'OK' });
});

router.route('/concerts/:id').delete((req, res) => {
  for (let post of db.concerts) {
    if (post.id == req.params.id) {
      db.concerts.splice(db.concerts.indexOf(post))
    };
  };
  res.json({ message: 'OK' });
});

module.exports = router;