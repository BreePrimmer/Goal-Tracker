const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return await User.find({});
    }
  },

  Mutation: {
    newUser: async (parent, {username, email, password}) => {
      const newUser = await User.create({username, email, password});
      const token = signToken(newUser);

      return {newUser, token};
    },
     login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
  }


};

module.exports = resolvers;
