const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please add name']
    },
    email: {
        type: String,
        required: [true, 'please add email'],
        unique: true,
        match: [/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, 'Please valid email']
    },
    role: {
        type: String,
        enum: ['vendedor','juridico', 'admin', 'supervisor','juridicoMaster'],
        default: 'vendedor'
    },
    password: {
        type: String,
        required: [true, 'please add password'],
        minlength: 6,
        select: false
    },
    username: {
        type: String,
        unique: true,
        maxlength: 10,
        trim: true,
        required: [true, 'se necesita un username']
    },
    image: {
        type: String
    },
    empresa: {
        type: String

    },
    createAt: {
        type: Date,
        default: Date.now
    }
})


UserSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})


UserSchema.methods.getSignedJwtToken = function() {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
}


UserSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

module.exports = mongoose.model('User', UserSchema);
