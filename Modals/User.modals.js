import mongoose, { Schema } from "mongoose";

const user = new Schema({
    name: String,
    email: String,
    password: String,
    number: Number
});

export default mongoose.model('User', user);

// at line10 first paraemter is User=> which will be ur database name..