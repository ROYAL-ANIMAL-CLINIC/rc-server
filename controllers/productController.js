import Product from "../models/Product.js";
import cloudinary from "../configs/cloudinary.js";

// Add product :http://localhost:4000/api/product/add
export const addProduct = async (req, res) => {
    try {
        console.log("Received Request to add product");
        const productData = JSON.parse(req.body.productData);
    
        const image = req.file; 
        if (!image) {
            return res.json({ success: false, message: "No image uploaded" });
        }

        // Upload image to Cloudinary
        const result = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                {
                    resource_type: "image",
                    folder: "animal-clinic/products"
                },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            ).end(image.buffer);
        });

        // Save product with Cloudinary image URL
        await Product.create({ ...productData, image: result.secure_url });

        res.json({ success: true, message: "Product Added" });

    } catch (error) {
        console.log("Error:", error.message);
        res.json({ success: false, message: error.message });
    }
};


//Get Product : http://localhost:4000/api/product/List
 export const productList = async(req,res)=>{
     try{ const products = await Product.find()
      res.json({ success: true, products}) 
    }catch(error)
    { console.log(error.message); 
        res.json({success:false,message:error.message}) } }

        

//get single Product : http://localhost:4000/api/product/id 
export const productById = async(req,res)=>{
     try{ const {id} = req.params;
      const product = await Product.findById(id) 
      res.json({success:true,product})
     }catch(error)
     { console.log(error.message);
         res.json({success:false,message:error.message}) } }


//Change stock inStock : http://localhost:4000/api/product/stock
          export const changeStock = async(req,res)=>
          { 
            try{ 
                const {id,inStock} = req.body 
                await Product.findByIdAndUpdate(id,{inStock})
                 res.json({success:true,message:"stock Updated"}) 
                }catch(error){
                     console.log(error.message);
                      res.json({success:false,message:error.message}) 
                    
                    } }

// Delete product : http://localhost:4000/api/product/delete/:id
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await Product.findByIdAndDelete(id);
        res.json({ success: true, message: "Product Deleted" });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

// Update product : http://localhost:4000/api/product/update/:id
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, category, price, description } = req.body;
        await Product.findByIdAndUpdate(id, {
            name,
            category,
            price: Number(price),
            description: typeof description === 'string' ? description.split('\n') : description
        });
        res.json({ success: true, message: "Product Updated" });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

