import { Router } from "express";
import authroutes from "./auth.routes.js";
import prodroutes from "./product.routes.js";

const route = Router();

route.use('/auth', authroutes);
route.use('/products', prodroutes);

export default route;