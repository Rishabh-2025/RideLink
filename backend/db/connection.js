const mongoose = require('mongoose');

const connectToDb = ()=>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName :"RideLink"
    }).then(()=>{
        console.log("connected to database")
    }).catch((err)=>{
        console.log(`Some error occured whie connecting ${err} `)
    })
}

module.exports = connectToDb;