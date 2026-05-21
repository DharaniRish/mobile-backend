import mongoose from "mongoose";
const item=new mongoose.Schema({product:{type:mongoose.Schema.Types.ObjectId,ref:"Product",required:true},name:String,image:String,price:Number,quantity:{type:Number,min:1}},{_id:false});
const s=new mongoose.Schema({user:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},items:[item],shippingAddress:{type:String,required:true},mobileNumber:{type:String,required:true},totalAmount:{type:Number,required:true},status:{type:String,enum:["Pending","Confirmed","Packed","Shipped","Delivered","Cancelled"],default:"Pending"}},{timestamps:true});
export default mongoose.model("Order",s);
