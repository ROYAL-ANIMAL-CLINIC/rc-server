
//update user cart data : /api/cart/update
 
import User from "../models/User.js";

export const updateCart = async(req,res)=>{
    try{
        const { cartitems } = req.body
        const userId = req.userId
        
        if (!userId) {
            return res.json({success: false, message: "User not authenticated"})
        }
        
        await User.findByIdAndUpdate(userId, { cartitems })
        res.json({success: true, message: "Cart Updated"})
    }catch(error){
        console.log(error.message)
        res.json({success: false, message: error.message})
    }
}
