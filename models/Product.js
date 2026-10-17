import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name : { type: String , requierd: true },
    description: { type: Array , requierd: true },
    price : { type: Number , requierd: true },
    image: { type: String , required: true },
    category : { type: String , required: true },
    inStock : { type: Boolean , default:  true },
}, {timestamps:true })

const Product = mongoose.models.product || mongoose.model('product' , productSchema)

export default Product