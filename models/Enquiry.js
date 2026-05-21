import mongoose from "mongoose";
const s=new mongoose.Schema({name:{type:String,required:true},email:{type:String,required:true},phone:{type:String,default:""},subject:{type:String,required:true},message:{type:String,required:true},status:{type:String,enum:["New","Read","Resolved"],default:"New"}},{timestamps:true});
export default mongoose.model("Enquiry",s);
