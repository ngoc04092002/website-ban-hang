const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    // author: ObjectId,
    username: {type:String,required:true,unique:true,maxlength:50},
    email: {type:String,maxLength:100,required:true,unique:true},
    password: {type:String,required:true,min:6},
    image:{type:String,default:"https://res.cloudinary.com/ngocdev/image/upload/v1651162465/noAvatar_b2yp4s.png"},
    gender:{type:String,default:'Male'},
    accessToken:{type:String,unique:true}
  },
  {
    timestamps:true,
  },
); 



module.exports = mongoose.model('User', UserSchema);