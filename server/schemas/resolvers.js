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

      if (user && name) {

        const existingUser = await User.findById(user);
        if (!existingUser) {
          console.error('User not Found')
          throw new Error('User not Found')
        }

        const newCategory = {
          name: name,
          goals: []
        };

        existingUser.categories.push(newCategory);
        const updatedUser = await existingUser.save();

        console.log(`user: ${user} created category: ${name}`);
        return updatedUser;
      }
      else {
        console.error('Missing Category Name or User');
        throw new Error('Missing Category Name or User');
      }

    },
    //Date Needs to be formatted in ISO 8601 timestamps. Ex. 2023-11-17T03:36:41.779Z
    newGoal: async (parent, { user, categoryId, text, date }, context) => {

      if (user && categoryId && text && date) {

        const existingUser = await User.findById(user);
        if (!existingUser) {
          console.error('User not Found')
          throw new Error('User not Found')
        }

        // console.log(existingUser.categories);

        const updatedCategory = existingUser.categories.find(
          (category) => category._id.toString() === categoryId
        );

        // console.log(updatedCategory);

        if (!updatedCategory) {
          console.error('Category not found');
          throw new Error('Category not found');
        }

        const newGoal = {
          text: text,
          date: date
        }

        updatedCategory.goals.push(newGoal)
        await existingUser.save();
        console.log(`user: ${user} created goal: \'${text}\' in category: ${categoryId} for date: ${date}`)
      }
      else {
        console.error('Missing Category id, User, or goal text')
        throw new Error('Missing Category id, User, or goal text')
      }

    },

    deleteGoal: async (parent, { user, goalId }, context) => {
      // console.log(goalId);
      if (user && goalId) {
        const existingUser = await User.findById(user);
        if (!existingUser) {
          console.error('User not Found')
          throw new Error('User not Found')
        }

        var goalDeleted = false

        existingUser.categories.forEach(category => {
          const goalIndex = category.goals.findIndex(goal => goal._id.toString() === goalId);
          if (goalIndex !== -1) {
            category.goals.splice(goalIndex, 1);
            goalDeleted = true
          }
        });

        if (!goalDeleted) {
          console.error('Goal not Found')
          throw new Error('Goal not Found')
        }
        else {
          await existingUser.save();
          console.log(`user: ${user} succesfully deleted goal`)
        }
      }
      else {
        console.error('Missing goal id or user')
        throw new Error('Missing goal id or user')
      }
    },
    // Pass completed as true to mark completed as true
    completeGoal: async (parent, { user, goalId, completed }, context) => {
      // console.log(completed)
      if (user && goalId && completed) {


        const existingUser = await User.findById(user);
        if (!existingUser) {
          console.error('User not Found')
          throw new Error('User not Found')
        }

        var goalFound = false

        existingUser.categories.forEach(category => {
          const goalIndex = category.goals.findIndex(goal => goal._id.toString() === goalId);
          if (goalIndex !== -1) {
            if (category.goals[goalIndex].completed === true) {
              console.error('Goal already completed')
              throw new Error('Goal already completed')
            }
            category.goals[goalIndex].completed = completed;
            goalFound = true;
          }
        });

        if (!goalFound) {
          console.error('Goal not Found')
          throw new Error('Goal not Found')
        } else {
          await existingUser.save();
          console.log(`user: ${user} succesfully completed goal: ${goalId}`)
        }

      } else {
        console.error('Missing goal id, user, or flag')
        throw new Error('Missing goal id, user, or flag')
      }
    },

    deleteCategory: async (parent, { user, categoryId }) => {
      // console.log(categoryId)
      if (user && categoryId) {
        const existingUser = await User.findById(user);
        if (!existingUser) {
          console.error('User not Found')
          throw new Error('User not Found')
        }

        // console.log(existingUser.categories);

        const categoryIndex = existingUser.categories.findIndex(
          category => category._id.toString() === categoryId
        );

        // console.log(categoryIndex);

        if (categoryIndex !== -1) {
          existingUser.categories.splice(categoryIndex, 1)
          await existingUser.save();
          console.log(`user: ${user} succesfully deleted category: ${categoryId}`)
        } else {
          console.error('Category not found');
          throw new Error('Category not found');
        }


      }

    },

    createTodo: async (parent, { user, text }) => {
      // console.log(user)
      if (user && text) {
        const existingUser = await User.findById(user);
        if (!existingUser) {
          console.error('User not Found')
          throw new Error('User not Found')
        }

        const newTodo = {
          text: text,
        };

        existingUser.todos.push(newTodo);
        await existingUser.save();

        console.log(`user: ${user} created new todo`)

      } else {
        console.error('Missing todo text or User');
        throw new Error('Missing todo text or User');
      }
    },

    deleteTodo: async (parent, { user, todoId }) => {
      if (user && todoId) {
        const existingUser = await User.findById(user);
        if (!existingUser) {
          console.error('User not Found')
          throw new Error('User not Found')
        }

        // console.log(existingUser)

        const todoIndex = existingUser.todos.findIndex(
          todo => todo._id.toString() === todoId
        );

        if (todoIndex !== -1) {
          existingUser.todos.splice(todoIndex, 1)
          await existingUser.save();
          console.log(`user: ${user} succesfully deleted category: ${todoId}`)
        } else {
          console.error('Todo not found');
          throw new Error('Todo not found');
        }
      } else {
        console.error('Missing todo id or User');
        throw new Error('Missing todo id Name or User');
      }

    }

  }

};

module.exports = resolvers;
