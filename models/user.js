const { Schema, model } = require('mongoose');

const UserSchema = new Schema (
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            validate: {
                validator: function(email) {
                    return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(email);
                },
                message: props => `${props.value} is not a valid email address, please enter the valid email address as 'sample@gtest.ca'`
            },
                required: [true, 'Email address required']
            },
            thoughts: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'thought'
                }
            ],
            friends: [
                {
                    type: Schema.Types.ObjectId,
                ref: 'user'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

UserSchema.virtual('freindCount').get(function() {
    return this.friends.length;
});

const user = model('user', UserSchema);

module.exports = user; 