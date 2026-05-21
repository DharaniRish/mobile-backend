import mongoose from "mongoose";
const s=new mongoose.Schema({name:{type:String,required:true},category:{type:String,required:true},brand:{type:String,required:true},price:{type:Number,required:true,min:0},discountPrice:{type:Number,default:0,min:0},stock:{type:Number,required:true,min:0},description:{type:String,required:true},image:{type:String,required:true}},{timestamps:true});
export default mongoose.model("Product",s);
