const { mongoose, Schema } = require('mongoose');

const todoSchema = new Schema ({
    text: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    date: {
        type: Date,
    }
})

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;