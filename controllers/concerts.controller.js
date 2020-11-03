const Concert = require('../models/concert.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Concert.find());
  }
  catch (err) {
    res.status(500).json(err)
  }
};


exports.getOne = async (req, res) => {

  try {
    const con = await Concert.findById(req.params.id);
    if (!con) res.status(404).json({ message: 'Not found' });
    else res.json(con);
  }
  catch (err) {
    res.status(500).json(err);
  }

};

exports.postAll = async (req, res) => {

  try {

    const { id, performer, genre, price, day, image } = req.body;
    const newConcert = new Concert({ id: id, performer: performer, genre: genre, price: price, day: day, image: image });
    await newConcert.save();
    res.json({ message: 'OK' });

  } catch (err) {
    res.status(500).json(err);
  }

};

exports.updateOne = async (req, res) => {
  const { id, performer, genre, price, day, image } = req.body;

  try {
    const con = await (Concert.findById(req.params.id));
    if (con) {
      await Concert.updateOne({ _id: req.params.id }, { $set: { id: id, performer: performer, genre: genre, price: price, day: day, image: image } });
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch (err) {
    res.status(500).json(err);
  }

};

exports.deleteOne = async (req, res) => {

  try {
    const con = await (Concert.findById(req.params.id));
    if (con) {
      await Concert.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch (err) {
    res.status(500).json(err);
  }
};

exports.getPerformer = async (req, res) => {
  try {
    const allConcerts = await Concert.find();

    if (!allConcerts) res.status(404).json({ message: 'Not found' });
    else {
      const performerConcerts = [];
      for (let singleConcert of allConcerts) {
        if (singleConcert.performer === req.params.performer) {
          performerConcerts.push(singleConcert);
        }
      }
      res.json(performerConcerts);
    }
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

exports.getGenre = async (req, res) => {
  try {
    const allConcerts = await Concert.find();

    if (!allConcerts) res.status(404).json({ message: 'Not found' });
    else {
      const genreConcerts = [];
      for (let singleConcert of allConcerts) {
        if (singleConcert.genre === req.params.genre) {
          genreConcerts.push(singleConcert);
        }
      }
      res.json(genreConcerts);
    }
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

exports.getDay = async (req, res) => {
  try {
    const allConcerts = await Concert.find();

    if (!allConcerts) res.status(404).json({ message: 'Not found' });
    else {
      const dayConcerts = [];
      for (let singleConcert of allConcerts) {
        if (singleConcert.day === parseInt(req.params.day)) {
          dayConcerts.push(singleConcert);
        }
      }
      res.json(dayConcerts);
    }
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

exports.getPrice = async (req, res) => {
  try {
    const allConcerts = await Concert.find();

    if (!allConcerts) res.status(404).json({ message: 'Not found' });
    else {
      const priceMin = parseInt(req.params.price_min);
      const priceMax = parseInt(req.params.price_max);

      const priceConcerts = [];
      for (let singleConcert of allConcerts) {
        if (singleConcert.price >= priceMin && singleConcert.price <= priceMax) {
          priceConcerts.push(singleConcert);
        }
      }
      res.json(priceConcerts);
    }
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};