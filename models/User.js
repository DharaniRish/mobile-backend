import mongoose from "mongoose";import bcrypt from "bcryptjs";
const s=new mongoose.Schema({name:{type:String,required:true},email:{type:String,required:true,unique:true,lowercase:true},password:{type:String,required:true,minlength:6},phone:{type:String,default:""},address:{type:String,default:""},role:{type:String,enum:["admin","user"],default:"user"}},{timestamps:true});
s.pre("save",async function(n){if(!this.isModified("password"))return n();this.password=await bcrypt.hash(this.password,10);n()});s.methods.matchPassword=function(p){return bcrypt.compare(p,this.password)};
export default mongoose.model("User",s);
