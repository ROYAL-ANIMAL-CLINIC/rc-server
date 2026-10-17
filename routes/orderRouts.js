import express from "express";
import authUser from "../middlewares/authUser.js";
import { getAllOrders, getUserOrders, placeOrderCOD, updateOrderPayment, updateOrderStatus } from "../controllers/orderController.js";
import authSeller from "../middlewares/authSeller.js";


const orderRouter = express.Router();

orderRouter.post('/cod' ,authUser,placeOrderCOD)
orderRouter.get('/user' ,authUser,getUserOrders)
orderRouter.get('/seller' ,authSeller,getAllOrders)
orderRouter.put('/:id/status', authSeller, updateOrderStatus)
orderRouter.put('/:id/payment', authSeller, updateOrderPayment)

export default orderRouter