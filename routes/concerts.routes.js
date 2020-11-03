const express = require('express');
const router = express.Router();

const ConcertController = require('../controllers/concerts.controller');

router.get('/concerts', ConcertController.getAll);
router.get('/concerts/:id', ConcertController.getOne);
router.post('/concerts', ConcertController.postAll);
router.put('/concerts/:id', ConcertController.updateOne);
router.delete('/concerts/:id', ConcertController.deleteOne);

router.get('/concerts/performer/:performer', ConcertController.getPerformer);
router.get('/concerts/genre/:genre', ConcertController.getGenre);
router.get('/concerts/price/:price_min/:price_max', ConcertController.getPrice);
router.get('/concerts/day/:day', ConcertController.getDay);

module.exports = router;