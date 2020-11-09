const Testimonial = require('../models/testimonial.model');
const sanitize = require('mongo-sanitize');

exports.getAll = async (req, res) => {
  try {
    res.json(await Testimonial.find());
  }
  catch (err) {
    res.status(500).json(err)
  }
};


exports.getOne = async (req, res) => {

  try {
    const tes = await Testimonial.findById(req.params.id);
    if (!tes) res.status(404).json({ message: 'Not found' });
    else res.json(tes);
  }
  catch (err) {
    res.status(500).json(err);
  }

};

exports.postAll = async (req, res) => {

  try {

    const { id, performer, genre, price, day, image } = req.body;
    const cleanId = sanitize(id);
    const cleanPerformer = sanitize(performer);
    const cleanGenre = sanitize(genre);
    const cleanPrice = sanitize(price);
    const cleanDay = sanitize(day);
    const cleanImage = sanitize(image);
    const newTestimonial = new Testimonial({ id: cleanId, performer: cleanPerformer, genre: cleanGenre, price: cleanPrice, day: cleanDay, image: cleanImage });

    await newTestimonial.save();
    res.json({ message: 'OK' });

  } catch (err) {
    res.status(500).json(err);
  }

};

exports.updateOne = async (req, res) => {
  const { id, performer, genre, price, day, image } = req.body;

  try {
    const tes = await (Testimonial.findById(req.params.id));
    if (tes) {
      await Testimonial.updateOne({ _id: req.params.id }, { $set: { id: id, performer: performer, genre: genre, price: price, day: day, image: image } });
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
    const tes = await (Testimonial.findById(req.params.id));
    if (tes) {
      await Testimonial.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch (err) {
    res.status(500).json(err);
  }
}; 