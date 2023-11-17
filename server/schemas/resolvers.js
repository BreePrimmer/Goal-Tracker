const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');



const resolvers = {
  Query: {
    users: async () => {
      return await User.find({});
    },
    user: async (parent, args, context) => {
      return await User.findOne({ _id: args.id });
    }
  },

  Mutation: {
    newUser: async (parent, { username, email, password, context }) => {
      const newUser = await User.create({ username, email, password });
      const token = signToken(newUser);

      return { newUser, token };
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

    newCategory: async (parent, { name, user }, context) => {

      console.log(`user: ${user} created category: ${name}`);

      if (user && name) {
        const existingUser = await User.findById(user);

        if(!existingUser) {
          throw new Error('User not Found')
        }

        console.log(existingUser);

        const updateUser = await User.findOneAndUpdate(
          { _id: user.id },
          { $addToSet: {categories: name} },
          { new: true, runValidators }
        )

        console.log(updateUser)


      }

    }
  }


};

module.exports = resolvers;
