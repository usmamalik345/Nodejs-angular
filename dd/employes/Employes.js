const mongoose = require('mongoose')

const Employee = mongoose.model('Employee', {
    name: {type: String},
    postion: {type: String},
    depart: {type: String},
})

module.exports = Employee