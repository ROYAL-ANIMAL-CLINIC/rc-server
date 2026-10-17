import Order from "../models/Order.js";
import Product from "../models/Product.js";
import mongoose from "mongoose";

//Place order COD : api/order/cod
export const placeOrderCOD = async(req,res)=>{
    try{
        const{items,address} = req.body;
        const userId = req.userId;
        if(!address || items.length == 0){
            return res.json({success:false,message:"Invalied Data"})
        }

        //calculate Amount using items
        let amount = await items.reduce(async(acc,item)=>{
            const product =await Product.findById(item.product);
            return(await acc) + product.price * item.quantity;

        },0)

        await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType:"COD"
        });

        return res.json({success:true,message:"Order Places Successfully"})

    }catch(error){

        return res.json({success:false , message:error.message})

    }
}

// Get Orders  by user ID : /api/order/user

export const getUserOrders = async(req,res)=>{
    try{
        const userId = req.userId;
        const orders = await Order.find({
            userId,
            $or:[{paymentType:"COD"},{isPaid:true}]
        }).populate("items.product address")
        res.json({success:true,orders});
    }catch(error){
        res.json({success:false , message :error.message})
    }
}



//Get all Orders (for seller) : /api/order/seller

export const getAllOrders= async(req,res)=>{
    try{
        const orders = await Order.find({
            $or:[{paymentType:"COD"},{isPaid:true}]
        }).populate("items.product address").sort({createdAt:-1});
        res.json({success:true,orders});
    }catch(error){
        res.json({success:false , message :error.message})
    }
}

const orderStatuses = ["Order Placed", "Processing", "Shipped", "Delivered", "Cancelled"];

export const updateOrderStatus = async(req,res)=>{
    try{
        const { id } = req.params;
        const { status } = req.body;

        if(!mongoose.isValidObjectId(id)){
            return res.json({success:false,message:"Invalid order ID"});
        }

        if(!orderStatuses.includes(status)){
            return res.json({success:false,message:"Invalid order status"});
        }

        const order = await Order.findByIdAndUpdate(
            id,
            { status },
            { new:true, runValidators:true }
        );

        if(!order){
            return res.json({success:false,message:"Order not found"});
        }

        return res.json({success:true,message:"Order status updated",order});
    }catch(error){
        return res.json({success:false,message:error.message});
    }
}

export const updateOrderPayment = async(req,res)=>{
    try{
        const { id } = req.params;
        const { isPaid } = req.body;

        if(!mongoose.isValidObjectId(id)){
            return res.json({success:false,message:"Invalid order ID"});
        }

        if(typeof isPaid !== "boolean"){
            return res.json({success:false,message:"Invalid payment status"});
        }

        const order = await Order.findByIdAndUpdate(
            id,
            { isPaid },
            { new:true, runValidators:true }
        );

        if(!order){
            return res.json({success:false,message:"Order not found"});
        }

        return res.json({
            success:true,
            message:"Payment status updated",
            order
        });
    }catch(error){
        return res.json({success:false,message:error.message});
    }
}