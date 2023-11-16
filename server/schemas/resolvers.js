const { User, Category, Todo } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return await User.find({});
    },
    categories: async () => {
      return await Category.find({})
    }
  },

  Mutation: {
    newUser: async (parent, {username, email, password, context}) => {
      const newUser = await User.create({username, email, password});
      const token = signToken(newUser);

      return {newUser, token};
    },
     login: async (parent, { email, password }, c) => {
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

    newCategory: async (parent , {name, user}, context) => {
      if (context.user) {
        const newCategory = await Category.create({
          name
        });
        
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { categories: newCategory._id } }
        );

        return thought;
    }
    }
  }


};

module.exports = resolvers;
