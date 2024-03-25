const User = require("../modals/user");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const registeruser = async (req, res) => {
    try{
        const {name, password, email, mobile} = req.body;

        if(!name || !email || !password | !mobile){
            return res.status(400).json({
                errorMessage: "Bad request!"
            })
        }

        // if email is same then (line 13-19) will capture that email is already existing

        const isExistinguser = await User.findOne({email: email})
        
        if(isExistinguser){
            return res
            .status(200)
            .json({errorMessage: "User Already exist !"})
        }

        // used to hide password in mongodb data collection and first we install (npm i bcrypt)
        const hashedpassword =await bcrypt.hash(password, 10)

        const userData = new User({
            name,
            email,
            password: hashedpassword,
            mobile,
        })

        await userData.save();
        res.json({Message: "User registered Successfully"})

    } catch (error) {
        console.log(error);
        res.status(500).json({errorMessage: "Something went wrong :("})
    }
}

const loginuser = async (req, res) => {
    try{
        const {email, password} = req.body;
        // if someone misses something at the time of login
        if(!email || !password){
            return res.status(400).json({errorMessage: "Bad Request! Invalid Credentials"})
        }

        const userDetails = await User.findOne({email});
        // if userdetails are already available
        if(!userDetails){
            return res.status(401).json({errorMessage:"Invalid Credentials"})
        }

        //Matching password
        const passwordMatch = await bcrypt.compare(
            password, userDetails.password
        );
        
        if(!passwordMatch){
            res.status(401).json({errorMessage: "Invalid Credentials"})
        }
        // token contain 3 parameters
        const token = jwt.sign(
            { userId: userDetails._id, name: userDetails.name }, // pass details
            process.env.SECRET_KEY,                              //secretkey
            {expiresIn: "60h"}                                  //expires in 60s
            )

        console.log(token)
        res.json({message : "User logged In :)", token: token})

    } 
    catch (error){
        console.log(error);
        res.status(500).json({errorMessage: "Something went wrong :("})

    }
}

module.exports = {registeruser, loginuser}