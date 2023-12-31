const db = require('./connection');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

db.once('open', async () => {
    try {
        await User.deleteMany();

        const user1 = await User.create({
            username: 'user1',
            email: 'user1@email.com',
            password: 'password',
        });

        const user2 = await User.create({
            username: 'user2',
            email: 'user2@email.com',
            password: 'password',
        });

        // Update user1 to add the "General" category and todos
        await User.findByIdAndUpdate(user1._id, {
            $set: {
                categories: [
                    {
                        name: 'General',
                        goals: [
                            { title: 'School report', text: 'Finish report', completed: false, date: new Date(), _id: new ObjectId() },
                            { title: 'Attend Class', text: 'Attend Class', completed: true, date: new Date(), _id: new ObjectId() }
                        ]
                    }
                ],
                todos: [
                    { text: 'Do Homework 1.2' }
                ]
            }
        });

        // Update user2 to add the "General" category and todos
        await User.findByIdAndUpdate(user2._id, {
            $set: {
                categories: [
                    {
                        name: 'General',
                        goals: [
                            { title: 'test title', text: 'test', completed: false, date: new Date(), _id: new ObjectId() },
                        ]
                    }
                ],
                todos: [
                    { text: 'Pick up the package outside' },
                    { text: 'Drink Water' }
                ]
            }
        });

        console.log('Database Seeded');
        process.exit();
    } catch (error) {
        console.error('Error Seeding Database', error);
        process.exit();
    }
});
