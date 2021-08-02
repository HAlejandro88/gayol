const mongoose = require('mongoose');

const DocumentsModel = new mongoose.Schema({
    listItem: {
        type: mongoose.Types.ObjectId,
        ref: 'listaVentas',
    },
    file: {
        type: Array
    },
    image: {
        type: String
    },
    status: {
        type: String,
        enum: [ 'Activo', 'Inactivo' ],
        default: 'Activo'
    }
})

module.exports = mongoose.model('Docs', DocumentsModel);
