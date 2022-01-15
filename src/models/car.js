const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const Car=new Schema({
    _id:mongoose.ObjectId,
    name: { type: String, required: true, unique: true, dropDups: true },
    power:{ type: Number, required: true},
    torque:{ type: Number, required: true},
    
},{collection:"maruti"});

let cars=mongoose.model("cars",Car);

module.exports=cars;