import UserModels from "../Models/User.Models.js";
import bcyrpt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const Register = async (req, res) => {
    try {

        // const { userName, userEmail, userPassword, userNumber } = req.body;

        // if (!userName || !userEmail || !userPassword || !userNumber) {
        //     return res.status(404).json({ success: false, message: 'All fields Required!' });
        // }

        // const hashedPassword = await bcyrpt.hash(userPassword);

        // const user = new UserModels({
        //     name: userName,
        //     email: userEmail,
        //     password: hashedPassword,
        //     number: userNumber
        // });

        // const isEmailPresent = await UserModels.findOne({ email: userEmail });

        // if (isEmailPresent) return res.status(404).json({ success: false, message: 'Email already exists!' });

        // if (isNumberPresent) return res.status(404).json({ success: false, message: 'Number already exists!' });

        // await user.save();

        res.status(200).json({ success: true, message: 'Register Sucessfull!' })

    } catch (error) {
        res.status(500).json({ success: true, message: 'Register Internal Error!' })
    }
}

export const Login = async (req, res) => {
    try {

        // const { userEmail, userPassword } = req.body;

        // if (!userEmail || !userPassword) {
        //     return res.status(404).json({ success: false, message: 'All fields Required!' });
        // }

        // const user = await UserModels.findOne({ email:userEmail });

        // if (!user) return res.status(404).json({ success: false, message: 'Email id did not matched!' });

        // const isPassword = await bcyrpt.compare(userPassword, user.password);

        // if (!isPassword) return res.status(404).json({ success: false, message: 'Password did not matched!' });

        res.status(200).json({ success: true, message: 'Login Sucessfull!' });

    } catch (error) {
        res.status(500).json({ success: true, message: 'Login Internal Error!' });
    }
}

export const getCurrentUser = (req, res) => {
    try {
        res.status(200).json({ success: true, message: 'getCurrentUser Sucessfull!' })
    } catch (error) {
        res.status(500).json({ success: true, message: 'getCurrentUser Internal Error!' })
    }
}