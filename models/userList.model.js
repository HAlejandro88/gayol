const mongoose =  require('mongoose');

const UserList = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    creat_At: {
        type: Date,
        default: Date.now
    },
    list: [{type: mongoose.Schema.Types.ObjectId, ref: 'listaVentas'}]
})


module.exports = mongoose.model('UserList', UserList)
