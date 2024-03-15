import UserModals from "../Modals/User.modals.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const Register = async (req,res) =>{

    const { userName, userEmail, userPassword, userNumber } = req.body;

    if(!userName || !userEmail || !userPassword || !userNumber) return res.status(404).json({success:false, message:"All fields required!"});

    const hashedPasword = await bcrypt.hash(userPassword, 10);

    const user = new UserModals({
        name:userName,
        email: userEmail,
        password: hashedPasword,
        number: userNumber
    });

    if(!user) return res.status(404).json({success:false, message:"User not found!"});

    const checkEmail = await UserModals.findOne({email:userEmail});

    if(checkEmail) return res.status(404).json({success:false, message:"Email already used!"});

    const checkNumber = await UserModals.findOne({number: userNumber});

    if(checkNumber) return res.status(404).json({success:false,message:"Number already used!"});

    const token = await jwt.sign({id: user._id}, process.env.JWTSecret);

    await user.save();

    return res.status(200).json({success:true, message:"Register Success!", token, userData : {username:user.name, userid: user._id}});
    
};

export const Login = async (req,res) =>{

    const { userEmail, userPassword } = req.body;

    if( !userEmail || !userPassword ) return res.status(404).json({success:false, message:"All fields required!"});

    const user = await UserModals.findOne({email: userEmail});

    if(!user) return res.status(404).json({success:false, message:"Email not found!"});    

    const checkPassword = await bcrypt.compare(userPassword, user.password);

    if(!checkPassword) return res.status(404).json({success:false,message:"Password Incorrect!"});

    return res.status(200).json({success:true, message:"Login Success!", userData : {username:user.name, userid: user._id}});
    
};

//----------------------------**----------------------------//

// All Basics which one should keep in my mind fro good coding practices =>

// always use try catch method when we creating api..

// Our backend understands javascript data.. & browser understands json data

//get current user api is for storing user data.. and authentication purpose..



