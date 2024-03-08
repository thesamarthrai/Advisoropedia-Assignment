const mongoose = require("mongoose");
const schema = mongoose.Schema;
const userSchema = new schema({
    fname:{
        type:String,
        required:true,
    },
    lname:{
        type:String,
        required:true,
    },
    number:{
        type:Number,
        required:true,
    },
    email:{
        type:String,
        unique:true,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    img: {data: Buffer, type: String }
},
{ timestamps: true}
);

module.exports = mongoose.model('Registeruser',userSchema)