const { AuthenticationError } = require('apollo-server-express');
const { User} = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {

  Query: {

    user: async (_, { username }) => {
      return User.findOne({ username }).populate("savedItems");
    },

    me: async (_, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("savedItems");
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    addUser: async (_, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect password or email address entered');
      }

      const correctPw = await user.isCorrectPassword(password);
      

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password or email address entered');
      }

      const token = signToken(user);

      return { token, user };
    },

    //edit user info if logged in
    updateUser: async (_, {username, email} , context) => {
      if (context.user) {
        return await User.findOneAndUpdate(
            {_id: context.user._id},
            {$set: {username: username, email: email} },
            { new: true})
            .then (result => {
              console.log("This is the result", result)
          })
          .catch (err => {
              console.error(err)
          })   
        }
    throw new AuthenticationError('Please login to update an item!');
    },

    // Delete user if logged in
    deleteUser: async (_, args, context) => {
      if (context.user) {
        return User.findOneAndDelete({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    //Save item if logged in
    saveItem: async (_, args, context) => {
        try {
        if (context.user) {

          console.log("These are the arguments passed \n", args)
        return await User.findOneAndUpdate(
            {_id: context.user._id},
            {$push: { savedItems: args }},
            { new: true})
            .then (result => {
              console.log("Saved Items", result)
          })
          .catch (err => {
              console.error(err)
          })   
        }
    throw new AuthenticationError('Please login to add an item!');
  }
  catch (err) {
      console.log(err)
  }},

    // Delete item if logged in
    deleteItem: async (_, args, context) => {
      try {

      if (context.user) {
        return await User.findOneAndUpdate(
            { _id: context.user._id},
            {$pull: { savedItems: { _id: args._id}}},
            { new: true})
            .then (result => {
              console.log("Trying to delete by id", result)
          })
          .catch (err => {
              console.error("Something went wrong deleting item", err, args)
          })   
        }
    throw new AuthenticationError('Please login to delete an item!');
    }
    catch (err) {
      console.log("Something went wrong deleting item", err)
  }}
},

}

module.exports = resolvers;
