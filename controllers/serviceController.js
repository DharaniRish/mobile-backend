import ServiceBooking from "../models/ServiceBooking.js";
const sf=s=>s?{$or:[{customerName:{$regex:s,$options:"i"}},{modelNumber:{$regex:s,$options:"i"}},{issueType:{$regex:s,$options:"i"}}]}:{};
export const createServiceBooking=async(req,res)=>res.status(201).json(await ServiceBooking.create({...req.body,user:req.user._id}));
export const getMyServiceBookings=async(req,res)=>res.json(await ServiceBooking.find({user:req.user._id,...sf(req.query.search)}).sort({createdAt:-1}));
export const getServiceBookingById=async(req,res)=>{const x=await ServiceBooking.findById(req.params.id);if(!x)return res.status(404).json({message:"Booking not found"});if(String(x.user)!==String(req.user._id)&&req.user.role!=="admin")return res.status(403).json({message:"Forbidden"});res.json(x)};
export const cancelServiceBooking=async(req,res)=>{const x=await ServiceBooking.findById(req.params.id);if(!x)return res.status(404).json({message:"Booking not found"});if(String(x.user)!==String(req.user._id))return res.status(403).json({message:"Forbidden"});if(["Delivered","Cancelled"].includes(x.status))return res.status(400).json({message:"Booking cannot be cancelled"});x.status="Cancelled";await x.save();res.json(x)};
export const getAllServiceBookings=async(req,res)=>res.json(await ServiceBooking.find(sf(req.query.search)).populate("user","name email").sort({createdAt:-1}));
export const updateServiceStatus=async(req,res)=>{const x=await ServiceBooking.findById(req.params.id);if(!x)return res.status(404).json({message:"Booking not found"});x.status=req.body.status;await x.save();res.json(x)};
