const { mongoose, Schema } = require('mongoose')

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        default: 'General'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    todos: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Todo'
        }
    ]
})

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;