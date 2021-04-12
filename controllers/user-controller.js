const { user, thought } = require('../models');

const userController = {
    getAllUser(req, res) {
        user.find({})
          .select('-__v')
          .then(dbUserData => res.json(dbUserData))
          .catch(err => {
              console.log(err);
              res.status(400).json(err);
          });
    },

    getUserById({params}, res) {
        user.findOne({ _id: params.id })
          .populate({
              path: 'thoughts'
          })
          .populate({
            path: 'friends'
          })
          .select('-__v')
          .then(dbUserData => {
              if(!dbUserData) {
                  res.status(404).json({ message: 'no user was found with this id' });
                  return;
              }
              res.json(dbUserData);
          })
          .catch(err => {
              console.log(err);
              res.status(400).json(err);
          });
    },

    createUser({body}, res) {
        user.create(body)
          .then(dbUserData => res.json(dbUserData))
          .catch(err => res.status(400).json(err));
    },

    updateUser({params, body}, res) {
        user.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
          .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'no user was found with this id' });
                return;
            }
            res.json(dbUserData);
          })
          .catch(err => res.status(400).json(err));
    },

    deleteUser({params}, res) {
        user.findOneAndDelete({ _id: params.id })
          .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'no user was found with this id' });
                return;
            }
            user.updateMany(
              {_id: { $in: dbUserData.friends }},
              {$pull: { friends: params.id }},
              { new: true }
            )
            .then(() => {
              thought.deleteMany({ username: dbUserData.username })
              .then(() => {
                res.json({ message: 'user & related thoughts have been deleted' });
              })
              .catch(err => res.status(400).json(err));
            })
            .catch(err => res.status(400).json(err));
          })
          .catch(err => res.status(400).json(err));
    },

    addFriend({params}, res) {
        user.findOneAndUpdate(
            { _id: params.id },
            { $push: { friends: params.friendId }},
            { new: true }
        )
          .then(dbUserData => {
            if(!dbUserData) {
              res.status(404).json({ message: 'no user was found with this id' });
              return;
            }
            res.json(dbUserData);
          })
          .catch(err => res.status(400).json(err));
    },

    removeFriend({params}, res) {
        user.findOneAndUpdate(
            { _id: params.id },
            { $pull: { friends: params.friendId }},
            { new: true }
        )
          .then(dbUserData => {
            if(!dbUserData) {
              res.status(404).json({ message: 'no user was found with this id' });
              return;
            }
            res.json(dbUserData);
          })
          .catch(err => res.status(400).json(err));
    }
};


module.exports = userController;