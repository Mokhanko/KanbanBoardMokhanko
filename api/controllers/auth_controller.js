import { User } from './../models'

export const register = (req, res) => {
  let newUser = new User(req.body);
  newUser.save((err, user) => {
    if(err){
      return res.status(400).json({ message: err });
    }
    return res.json(user);
  });
};

export const sign_in = (req, res) => {
  User.findOne({
    surname: req.body.surname
  }, (err, user) => {
    if(err){
      return res.status(500).json({error: err});
    }
    if(!user){
      return res.status(401).json({error: 'Authentication failed. User not found.'});
    } else if (user){
      if(user.password !== req.body.password) {
        return res.status(402).json({error: 'Authentication failed. Wrong password.'});
      } else{
        return res.json(user);
      }
    }
  });
};

export default { register, sign_in }


