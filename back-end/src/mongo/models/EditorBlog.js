const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = mongoose.Schema({
    content: {
        type:String,
    },
    name: {
        type:String,
    },
    group: {
        type: String,
    },
    folder: {
        type: String,
    }
}, { timestamps: true })


const EditorBlog = mongoose.model('EditorBlog', blogSchema);

module.exports = { EditorBlog }