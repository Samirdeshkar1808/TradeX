const User  =  require( "../models/Users.js");
const Portfolio = require( "../models/Portfolio.js");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.signup = async(req, res) =>{

 try{

    const { fullName, email, password } = req.body;


   if(!fullName || !email || !password){

     return res.status(400).json({
        success:false,
        message:"All fields are required"
     });
    }

    const existingUser = await User.findOne({email});

    if(existingUser){

      return res.status(400).json({

        success:false,

        message:"Email already registered"

      });
    }

    const hashedPassword = await bcrypt.hash(password,10);
    
    const newUser = await User.create({fullName, email, password: hashedPassword });

    await Portfolio.create({
        user: newUser._id,
        availableBalance: 50000,
        investedAmount: 0
    });
    
    const token = jwt.sign(
        { id: newUser._id },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );

    return res.status(201).json({
        success: true,
        message: "User Registered Successfully",
        token,
        user: {
            id: newUser._id,
            fullName: newUser.fullName,
            email: newUser.email
        }
    });

 } 
 catch(error){
    console.error(error)

    return res.status(500).json({
        success: false,
        message: "Internal Server Error"
    });
 }

};

module.exports.login = async(req,res) =>{

    try{

        const { email , password } = req.body;

        if(!email || !password){

            return res.status(400).json({

                success: false,
                message : "All fields are required"

            });
        }

        const user = await User.findOne({ email });

        if(!user){

            return res.status(400).json({
                success : false,
                message : "Invalid E-mail or Password"
            });
        }

        const isMatch = await bcrypt.compare( password, user.password );

        if(!isMatch){
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign( 
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }

        );

        return res.status(200).json({

            success: true,

            message: "Login Successful",

            token,

            user: {

                id: user._id,

                fullName: user.fullName,

                email: user.email

            }

        });

    }
    catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
    

}
