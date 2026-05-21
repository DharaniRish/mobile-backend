import Enquiry from "../models/Enquiry.js";
export const createEnquiry=async(req,res)=>res.status(201).json(await Enquiry.create(req.body));
export const getEnquiries=async(_req,res)=>res.json(await Enquiry.find().sort({createdAt:-1}));
export const updateEnquiryStatus=async(req,res)=>{const x=await Enquiry.findByIdAndUpdate(req.params.id,{status:req.body.status},{new:true});return x?res.json(x):res.status(404).json({message:"Enquiry not found"})};
export const deleteEnquiry=async(req,res)=>{const x=await Enquiry.findById(req.params.id);if(!x)return res.status(404).json({message:"Enquiry not found"});await x.deleteOne();res.json({message:"Enquiry deleted"})};
