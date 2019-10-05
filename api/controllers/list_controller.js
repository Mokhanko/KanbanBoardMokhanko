import { List, Card } from '../models'

export const createList = (req, res) => {
  let list = new List(req.body);
  list.save((err, _list) => {
    if(err){
      return res.status(418).json(err);
    }
    return res.status(200).json(_list)
  });
};

export const getAllLists = (req, res) => {
  List.find({}, (err, room) => {
    if(err){
      return res.status(418).json(err);
    }
    return res.status(200).json(room);
  })
};

export const updateList = (req, res) => {
  List.findByIdAndUpdate(req.body._id, req.body, { new: true }, (err, list) => {
    if (err) return res.status(500).send("There was a problem updating the list.");
    res.status(200).send(list);
  })
};

export const delList = (req, res) => {
  List.findByIdAndRemove(req.body._id, (err, list) => {
    if (err) return res.status(500).send("There was a problem deleting the post.");
    res.status(200).send("List: " + list._id + " was deleted.");
  });
};

export default { createList, getAllLists, updateList, delList };
