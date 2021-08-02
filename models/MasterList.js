const mongoose = require('mongoose');


const MasterList = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'se requiere de un nombre de list'],
        unique: true
    },
    fewDescription: {
        type: String
    },
    creatAt: {
        type: Date,
        required: true,
        default: Date.now
    }
})


module.exports = mongoose.model('MasterList', MasterList);
