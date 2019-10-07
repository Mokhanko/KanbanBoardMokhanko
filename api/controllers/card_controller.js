import { Card } from '../models'

export const createCard = (req, res) => {
  let card = new Card(req.body);
  card.save((err, _card) => {
    if(err){
      return res.status(418).json(err);
    }
    return res.status(200).json(_card)
  });
};

export const getAllCards = (req, res) => {
  Card.find({}, (err, room) => {
    if(err){
      return res.status(418).json(err);
    }
    return res.status(200).json(room);
  })
};

export const updateCard = (req, res) => {
  Card.findByIdAndUpdate(req.body._id, req.body, { new: true }, (err, card) => {
    if (err) return res.status(500).send("There was a problem updating a card.");
    res.status(200).send(card);
  })
};

export const delCard = (req, res) => {
  Card.findByIdAndRemove(req.body._id, (err, card) => {
    if (err) return res.status(500).send("There was a problem deleting a card.");
    res.status(200).send("Card: " + card._id + " was deleted.");
  });
};

export const delCardsInList = (req, res) => {
  Card.deleteMany({ list: req.body.listId }, (err, result) => {
    if (err) return res.status(500).send("There was a problem deleting a cards.");
    res.status(200).send("Cards were deleted.");
  });
};

export default { createCard, getAllCards, updateCard, delCard, delCardsInList };
