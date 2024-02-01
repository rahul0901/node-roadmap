export const allProducts = (req, res) => {
    try {
        res.status(200).json({ success: true, message: 'All Products!' })
    } catch (error) {
        res.status(500).json({ success: true, message: 'All Product Error!' })
    }
}

export const singleProduct = (req, res) => {
    try {
        res.status(200).json({ success: true, message: 'Single Product!' })
    } catch (error) {
        res.status(500).json({ success: true, message: 'Single Product Error!' })
    }
}


export const addProduct = (req, res) => {
    try {
        res.status(200).json({ success: true, message: 'Product Added!' })
    } catch (error) {
        res.status(500).json({ success: true, message: 'Error while adding Product!' })
    }
}