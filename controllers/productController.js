import Product from "../models/Product.js";
export const getProducts=async(req,res)=>{const{search="",category="",brand=""}=req.query;res.json(await Product.find({...search&&{name:{$regex:search,$options:"i"}},...category&&{category},...brand&&{brand}}).sort({createdAt:-1}))};
export const getProductById=async(req,res)=>{const x=await Product.findById(req.params.id);return x?res.json(x):res.status(404).json({message:"Product not found"})};
export const createProduct=async(req,res)=>res.status(201).json(await Product.create(req.body));
export const updateProduct=async(req,res)=>{const x=await Product.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true});return x?res.json(x):res.status(404).json({message:"Product not found"})};
export const deleteProduct=async(req,res)=>{const x=await Product.findById(req.params.id);if(!x)return res.status(404).json({message:"Product not found"});await x.deleteOne();res.json({message:"Product deleted"})};
