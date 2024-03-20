import productModal from "../Modals/product.modal.js";
import userModal from "../Modals/user.modal.js";

export const getAllProducts =(req, res) =>{
    res.send('All products..')
}

export const getSingleProduct = (req, res) =>{
    res.send('Single Product!')
}

export const addProduct = async (req, res) =>{

    try {

        const { prodName, prodPrice, prodCategory, prodImage, id, name } = req.body;

        if(!prodName || !prodPrice || !prodCategory || !prodImage) return res.status(401).json({success:false, message:'All fields required!'});

        const user = await userModal.findById(id);

        if(!user) return res.status(401).json({success:false, message:'User not found!'});

        const product = await new productModal({
            pname: prodName,
            pprice: prodPrice,
            pimage: prodImage,
            pcategory: prodCategory,
            userId: id,
            userName: user.name
        });

        await product.save();

        return res.status(201).json({success:true, message:'Product Added Successfully'});
        
    } catch (error) {
        return res.status(500).json({success: false, message:'Add product API Error!'});
    }
};