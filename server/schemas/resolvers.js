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
          todos: []
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
    newToDo: async (parent, { user, categoryId, text, date }, context) => {

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

        const newToDo = {
          text: text,
          date: date
        }

        updatedCategory.todos.push(newToDo)
        await existingUser.save();
        console.log(`user: ${user} created todo: \'${text}\' in category: ${categoryId} for date: ${date}`)
      }
      else {
        console.error('Missing Category id, User, or Todo text')
        throw new Error('Missing Category id, User, or Todo text')
      }

    },

    deleteToDo: async (parent, { user, toDoId }, context) => {
      // console.log(toDoId);
      if (user && toDoId) {
        const existingUser = await User.findById(user);
        if (!existingUser) {
          console.error('User not Found')
          throw new Error('User not Found')
        }

        var todoDeleted = false

        existingUser.categories.forEach(category => {
          const todoIndex = category.todos.findIndex(todo => todo._id.toString() === toDoId);
          if (todoIndex !== -1) {
            category.todos.splice(todoIndex, 1);
            todoDeleted = true
          }
        });

        if (!todoDeleted) {
          console.error('Todo not Found')
          throw new Error('Todo not Found')
        }
        else {
          await existingUser.save();
          console.log(`user: ${user} succesfully deleted todo`)
        }
      }
      else {
        console.error('Missing todo id or user')
        throw new Error('Missing todo id or user')
      }
    },
    // Pass completed as true to mark completed as true
    completeToDo: async (parent, { user, toDoId, completed }, context) => {
      // console.log(completed)
      if (user && toDoId && completed) {


        const existingUser = await User.findById(user);
        if (!existingUser) {
          console.error('User not Found')
          throw new Error('User not Found')
        }

        var todoFound = false

        existingUser.categories.forEach(category => {
          const todoIndex = category.todos.findIndex(todo => todo._id.toString() === toDoId);
          if (todoIndex !== -1) {
            if (category.todos[todoIndex].completed === true) {
              console.error('Todo already completed')
              throw new Error('Todo already completed')
            }
            category.todos[todoIndex].completed = completed;
            todoFound = true;
          }
        });

        if (!todoFound) {
          console.error('Todo not Found')
          throw new Error('Todo not Found')
        } else {
          await existingUser.save();
          console.log(`user: ${user} succesfully completed todo: ${toDoId}`)
        }

      } else {
        console.error('Missing todo id, user, or flag')
        throw new Error('Missing todo id, user, or flag')
      }
    },

    deleteCategory: async (parent, { user, categoryId }) => {
      console.log(categoryId)

      if (user && categoryId) {
        const existingUser = await User.findById(user);
        if (!existingUser) {
          console.error('User not Found')
          throw new Error('User not Found')
        }

        const categoryIndex = existingUser.categories.findIndex(
          category => category._id.toString === categoryId
        );

        console.log(categoryIndex);

        if(categoryIndex !== -1){
          existingUser.categories.splice(categoryIndex, 1);
          await existingUser.save();

          console.log(`user: ${user} succesfully deleted category: ${categoryId}`) 
        }

      }

    }

  }

};

module.exports = resolvers;
