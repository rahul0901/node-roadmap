import userModal from "../Modals/user.modal.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const Register = async (req, res) => {
    try {
        const { userName, userEmail, userPassword, userNumber } = req.body.userData;

        if(!userName || !userEmail || !userPassword || !userNumber) return res.status(404).json({success: false, message: 'All fields required!'});

        const hashPassword = await bcrypt.hash(userPassword, 10);

        const user = new userModal({
            name: userName,
            email: userEmail,
            password: hashPassword,
            number: userNumber
        });

        const checkEmail = await userModal.findOne({email:userEmail});

        if(checkEmail) return res.status(404).json({success:false, message: 'Email id already exists!'});

        const checkNumber = await userModal.findOne({number: userNumber});

        if(checkNumber) return res.status(404).json({success:false, message: 'Number already exists!'});

        await user.save();

        return res.status(200).json({success:true, message: "Registration Successfull!"});

    } catch (error) {
        return res.status(500).json({success:false, message: 'Registration API Error!'})
    }
};

export const Login = async (req, res) =>{
    try {
        const { userEmail, userPassword } = req.body.loginData;

        if(!userEmail || !userPassword) return res.status(404).json({success: false, message:'All fields required!'});

        const user = await userModal.findOne({email:userEmail});

        if(!user) return res.status(404).json({success: false, message:'Email id not matched!'});

        const checkPassword = await bcrypt.compare(userPassword, user.password);

        if(!checkPassword) return res.status(404).json({success:false, message:'Password not matched!'});

        const token = await jwt.sign({id: user._id}, process.env.JWTSecret);

        return res.status(200).json({success:true, message:'Successfull Login!', token, userDetail:{username: user.name, userid: user._id}});

    } catch (error) {
        return res.status(500).json({success:false, message:'Login API Error!'});
    }

};

export const getCurrentUser = async (req, res) =>{
    try {
        const { token } = req.body;

        if(!token) return res.status(401).json({success:false, message:'Token required!'});

        const { id } = await jwt.verify(token, process.env.JWTSecret);

        if(!id) return res.status(401).json({success:false, message:'Id not found!'});

        const user = await userModal.findById(id);

        if(!user) return res.status(401).json({success:false, message:'User not Found!'});

        return res.status(200).json({success:true, message:'User present', userDetail:{username: user.name}});

    } catch (error) {
        return res.status(500).json({success:false, message:'Current User API Error!'})
    }
};