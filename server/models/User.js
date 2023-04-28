const { Schema, model , Types: {ObjectId}} = require('mongoose');


const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    hashedPassword: { type: String, required: true, minlength: [3, 'Password REST'] },
    username: { type: String, required: true, unique: true, minlength: [3, 'Username REST']},
    tel: {type: String , default: ''},
    liked: { type: [ObjectId], default: [], ref: "Game" },
}, { timestamps: { createdAt: 'created_at' } });


userSchema.index({ email: 1}, {
    unique: true,
    collation: {
        locale: 'en',
        strength: 2
    }
});

const User = model('User', userSchema);

module.exports = User;