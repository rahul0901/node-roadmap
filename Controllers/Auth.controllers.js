import userModel from "../Modals/user.model";
import bcrypt from 'bcrypt';


export const Register = async (req, res) => {
    try {
        const { userName, userEmail, userPassword, userNumber } = req.body;

        if(!userName || !userEmail || !userPassword || !userNumber) return res.status(404).json({success: false, message: 'All fields required!'});

        const hashPassword = await bcrypt.hash(userPassword, 10);

        const user = new userModel({
            name: userName,
            email: userEmail,
            password: hashPassword,
            number: userNumber
        });

        const checkEmail = await userModel.findOne({email:userEmail});

        if(checkEmail) return res.status(404).json({success:false, message: 'Email id already exists!'});

        const checkNumber = await userModel.findOne({number: userNumber});

        if(checkNumber) return res.status(404).json({success:false, message: 'Number already exists!'});

        return res.status(200).json({success:true, message: "Registration Successfull!"});

    } catch (error) {
        return res.status(500).json({success:false, message: 'Registartion API Error!'})
    }
};