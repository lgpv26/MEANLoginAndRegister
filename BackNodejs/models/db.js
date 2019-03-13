const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI, (err) => {
    if(err) console.log('Error in MongoDB connection: ' + JSON.stringify(err, undefined, 2))
    else console.log('MongoDB connection succeeded')
})