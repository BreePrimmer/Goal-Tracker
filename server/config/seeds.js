const db = require('./connection');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

db.once('open', async () => {
    try {
        await User.deleteMany();

        await User.create({
            username: 'user1',
            email: 'user1@email.com',
            password: 'password',
            categories: [
                {
                    name: 'General',
                    goals: [
                        { title: 'School report', text: 'Finish report', completed: false, date: new Date(), _id: new ObjectId() },
                        { title: 'Attend Class' ,text: 'Attend Class', completed: true, date: new Date(), _id: new ObjectId() }
                    ]
                }
            ]
        })

        await User.create({
            username: 'user2',
            email: 'user2@email.com',
            password: 'password',
            categories: [
                {
                    name: 'General',
                    goals: [
                        {title: 'test title', text: 'test', completed: false, date: new Date(), _id: new ObjectId() },
                    ]
                },
                {
                    name: 'Personal',
                    goals: [
                        { title: 'DOG' ,text: 'Walk the dog', completed: false, date: new Date(), _id: new ObjectId() },
                        { title: 'Dinner Reservations' ,text: 'Eat Dinner', completed: true, date: new Date(), _id: new ObjectId() },
                        { title: 'Workout', text: 'Goto the gym', completed: false, date: new Date(), _id: new ObjectId() },
                    ]
                },
                {
                    name: 'Work',
                    goals: [
                        { title: 'Work', text: 'Attend Meeting', completed: true, date: new Date(), _id: new ObjectId() },
                        { title: 'Work', text: 'Send resignation letter', completed: false, date: new Date(), _id: new ObjectId() },
                        { title: 'Work', text: 'Go home', completed: true, date: new Date(), _id: new ObjectId() },
                    ]
                }
            ]

        })

        console.log('Database Seeded')
        process.exit()
    } catch (error) {
        console.error('Error Seeding Database', error)
        process.exit()
    }
})

