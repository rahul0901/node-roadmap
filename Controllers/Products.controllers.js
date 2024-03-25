import productModal from "../Modals/product.modal.js";
import userModal from "../Modals/user.modal.js";

export const getAllProducts = async (req, res) =>{
    
    try {
        const product = await productModal.find({});

        if(!product) return res.status(401).json({success:false, message:'Product not Available!'});

        return res.status(200).json({success:true, message:'All Products', product})

    } catch (error) {
        return res.status(500).json({success:false, message: 'All Products API Error!'})
    }

};

export const getSingleProduct = async (req, res) =>{
    
    try {
        const { prodId } = req.body;

        if(!prodId) return res.status(401).json({success:false, message:'Product Id Required'})

        const product = await productModal.findById(prodId);

        if(!product) return res.status(401).json({success:false, message:'Product not exists!'})

        return res.status(200).json({success:true, message:'Single Product Found!', product})
        
    } catch (error) {
        return res.status(500).json({success:false, message: 'Single Product API Error!'})
    }
    
};

export const addProduct = async (req, res) =>{

    try {
        const { prodName, prodPrice, prodCategory, prodImage, id } = req.body;

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


export const filterProducts = async (req, res) =>{

    try {
        
        const { skip, page, query, sorting } = req.body;  //query, sorting

        const updatedQuery = {pcategory: query};

        console.log(updatedQuery);

        const name = sorting.replace(/^-/, "");
        
        const order = sorting[0] == "-" ? "-" : "";

        const updatedSorting = { [name]: order === "-" ? -1 : 1 };

        console.log(updatedSorting)

        const product = await productModal.find(updatedQuery).skip(skip).limit(page).sort(updatedSorting);  //.find(updatedQuery)

        if (!product) return res.status(404).json({ success: false, message: 'No products under this category..' })

        return res.status(200).json({ success: true, message: 'Product found under this category', product })

    } catch (error) {        
        return res.status(500).json({success: false, message:'Add product API Error!'});      
    }
    
}