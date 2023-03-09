const mongoose = require('mongoose');
const mogoUrl = "mongodb://localhost:27017";



mongoose.set('strictQuery', true);
const connectMongo = () =>{
    
    mongoose.connect(mogoUrl , ()=>{
        console.log("connected Sucessfully")
    })
}

module.exports = connectMongo;