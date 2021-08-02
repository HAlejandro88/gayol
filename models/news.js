const mongoose = require('mongoose');


const NewsSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'User'
    },
    title: {
        type: String,
        required: [true, 'Se necesita un tituto de la noticia']
    },
    description: {
        type: String,
        required: [true, 'se require de una descripcion de lanoticia']
    },
    avatar: {
        type: String
    },
    createAt: {
        type: Date,
        default: Date.now()
    }
})


module.exports = mongoose.model('News', NewsSchema)
