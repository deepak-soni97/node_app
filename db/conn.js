require('dotenv').config();
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;

async function connection(){

    try{
         mongoose.connect(mongoString,{
            useNewUrlParser:true,
            useUnifiedTopology:true, 
         }).then(() =>{
            console.log("connection is successfully");
         }).catch((e)=>{
            console.log(e,"No Connection");
         })
    }catch(error){
        console.log(error);
    }
} 

module.exports = connection;