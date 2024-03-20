import mongoose, { Schema } from "mongoose";

const product = new Schema({
    pname: String,
    pprice: Number,
    pcategory: String,
    pimage: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    userName: String
});

export default mongoose.model("Products", product);