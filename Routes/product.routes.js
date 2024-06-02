import { Router } from "express";
import { addProduct, filterProducts, getAllProducts, getSingleProduct } from "../Controllers/Products.controllers.js";
import { checkUserID } from "../Middlewares/AllMiddlewares.js";

const prodroutes = Router();

prodroutes.post('/get-all-products', getAllProducts);
prodroutes.post('/add-product', checkUserID, addProduct);
prodroutes.post('/single-product', getSingleProduct);
prodroutes.post('/filter-products', filterProducts)

export default prodroutes;