const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

var userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: 'Full name can\'t be empty'
    },
    email: {
        type: String,
        required: 'Email can\'t be empty',
        unique: true
    },
    password: {
        type: String,
        required: 'Password can\'t be empty',
        minlength: [6, 'Pasword must be atleast 6 character long']
    },
    termsOfUse: {
        type: Boolean,
        require: 'You have to agree to the terms of use',
    },
    saltSecret: String
})

userSchema.path('email').validate((val) => {
    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,13}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return emailRegex.test(val)
}, 'Email address is invalid')

userSchema.pre('save', function(next) {
    bcrypt.genSalt((err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash
            this.saltSecret = salt
            next()
        })
    })
})

userSchema.methods.verifyPassword = function(password) {
    return bcrypt.compareSync(password, this.password)
}

userSchema.methods.generateJwt = function() {
    return jwt.sign({
        _id: this._id
    }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXP
    })
}

var User = mongoose.model('User', userSchema)
module.exports = User