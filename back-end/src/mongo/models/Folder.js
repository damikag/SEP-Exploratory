const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const folderSchema = mongoose.Schema({
    
    name: {
        type:String,
    },
    group: {
        type: String
    },
    folder: {
        type: String
    }
}, { timestamps: true })


const Folder = mongoose.model('Folder', folderSchema);

module.exports = { Folder }