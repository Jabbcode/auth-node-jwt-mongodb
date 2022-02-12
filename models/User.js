const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    uid: {
        type: String
    },
    username:  {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
});

UserSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject.password
        delete returnedObject.__v
        delete returnedObject._id
    }
})

module.exports = model( 'User', UserSchema);