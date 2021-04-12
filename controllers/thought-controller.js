const { user, thought } = require('../models');

const thoughtController = {
    getAllThought(req, res) {
        thought.find({})
          .then(dbThoughtData => res.json(dbThoughtData))

          .catch(err => {
              console.log(err);
              res.status(400).json(err);
          });
    },

    getThoughtById({params}, res) {
        thought.findOne({ _id: params.id })
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({ message: 'no thought found with this id' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    createThought({params, body}, res) {
        console.log(params);
        thought.create(body)
          .then(({_id}) => {
              return user.findOneAndUpdate(
                  { _id: params.userId },
                  { $push: { thoughts: _id }},
                  { new: true }
              );
          })
          .then(dbUserData => {
              if(!dbUserData) {
                  res.status(404).json({ message: 'no user was found with this id' });
                  return;
              }
              res.json(dbUserData);
          })
          .catch(err => res.status(400).json(err));
    },

    updateThought({params, body}, res) {
        thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
          .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({ message: 'no thought was found with this id' });
                return;
            }
            res.json(dbThoughtData);
          })
          .catch(err => res.status(400).json(err));
    },

    deleteThought({params}, res) {
        thought.findOneAndDelete({ _id: params.thoughtId })
          .then(deleteThought => {
              if(!deleteThought) {
                  return res.status(404).json({ message: 'no thought was found with this id' });
              }
              return user.findOneAndUpdate(
                  { _id: params.userId },
                  { $pull: { thoughts: params.thoughtId }},
                  { new: true }
              );
          })
          .then(dbUserData => {
              if(!dbUserData) {
                res.status(404).json({ message: 'no user was found with this id' });
                return;
              }
              res.json({ message: 'this thought has been deleted' });
          })
          .catch(err => res.status(400).json(err));          
    },

    addReaction({params, body}, res) {
        thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body }},
            { new: true, runValidators: true }
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

    removeReaction({params}, res) {
        thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId }}},
            { new: true }
        )
          .then(dbUserData => res.json(dbUserData))
          .catch(err => res.status(400).json(err)); 
    }
};

module.exports = thoughtController; 