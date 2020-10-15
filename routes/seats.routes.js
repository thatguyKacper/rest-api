const express = require('express');
const db = require('../db');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

router.route('/seats').get((req, res) => {
  res.json(db.seats);
});

router.route('/seats/:id').get((req, res) => {
  for (let post of db.seats) {
    if (post.id == req.params.id) {
      res.json('post');
    };
  };
});

router.route('/seats').post((req, res) => {
  const { day, seat, client, email } = req.body;

  let check = true;

  for (let post of db.seats) {
    if (post.day == day && post.seat == seat) {
      res.json({ message: 'The slot is already taken...' })
      check = false;
    }
  }
  if (check == true) {
    const newPost = { day: day, seat: seat, client: client, email: email, id: uuidv4() };
    db.seats.push(newPost);
    res.json({ message: 'OK' });
  }
});

router.route('/seats/:id').put((req, res) => {
  const { day, seat, client, email } = req.body;
  for (let post of db.seats) {
    if (post.id == req.params.id) {
      post.day = day;
      post.seat = seat;
      post.client = client;
      post.email = email;
    };
  };
  res.json({ message: 'OK' });
});

router.route('/seats/:id').delete((req, res) => {
  for (let post of db.seats) {
    if (post.id == req.params.id) {
      db.seats.splice(db.seats.indexOf(post))
    };
  };
  res.json({ message: 'OK' });
});

module.exports = router;