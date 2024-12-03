const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const UserModel = require("../Models/User")

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(409)
                .json({ message: 'User is already exist,you cannot login', sucess: false })
        }
        const userModel = new UserModel({ name, email, password });  //{name,email,password} no need to write this , this is just written to define password for hashing
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();
        res.status(201)
            .json({
                message: 'Signup successfuly',
                success: true
            })
    } catch (error) {
        res.status(500)
            .json({
                message: 'Internal server error',
                success: false
            })
    }
}

const login = async (req, res) => {
    try {
        const {email, password } = req.body;
        const user = await UserModel.findOne({ email });
        const errorMsg = "Auth failed email or password is wrong";

        if (!user) {
            return res.status(403)
                .json({ message: errorMsg, sucess: false });
        }

        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            return res.status(403)
                .json({ message: errorMsg, sucess: false });
        }

        const jwtToken = jwt.sign(
            { email: user, email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        )

        res.status(200)
            .json({
                message: 'Login successfuly',
                success: true,
                jwtToken,
                email,
                name:user.name
            })
    } catch (error) {
        res.status(500)
            .json({
                message: 'Internal server error',
                success: false
            })
    }
}

module.exports = {
    signup,
    login
}

