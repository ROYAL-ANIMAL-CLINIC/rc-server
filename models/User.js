import mongoose from "mongoose";

const userschema = new mongoose.Schema({
    name : {type:String , requierd:true},
    email: {type:String , requierd:true ,unique:true},
    password : {type:String , requierd:true},
    cartitems : {type:Object , default:{}},
}, {minimize:false})

const User = mongoose.models.user || mongoose.model('user' , userschema)

export default User