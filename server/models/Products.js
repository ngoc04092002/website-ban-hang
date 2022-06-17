const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ProductSchema = new Schema({
    desc:{type:String ,maxlength:256},
    price:{type:Number,default:0},
    sale:{type:Number,default:0},
    img:{type:String,required:true},
    imgs:{type:Array,max:5},
    colors:{type:Array,max:5,min:1},
    sizes:{type:Array,max:5,min:1},
    userProduct:{type:mongoose.Schema.Types.ObjectId,ref:'User'}
  },
  {
    timestamps:true,
  },
); 



module.exports = mongoose.model('Product', ProductSchema);