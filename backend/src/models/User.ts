const monggoose = require('mongoose');

const userSchema = new monggoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    profilePicture: {
        type: String,
        default: null
    },
}, {
    timestamps: true,
});

module.exports = monggoose.model('User', userSchema);