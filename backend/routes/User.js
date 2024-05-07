const express=require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {User} = require('../models/User');
const router = express.Router();

router.post('/signup',async(req,res)=>{ 
    try{
        const {fullName,userName,email,password,confirmPassword} = req.body;
        if(password !== confirmPassword){
            res.status(400).json({
                message:"Passwords do not match"
            })
        }
        const user = await User.findOne({email:email});
        if(user){
            res.status(400).json({
                message:"User already exists"
            })
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        const newUser = new User({
            fullName,
            userName,
            email,
            password:hashedPassword
        })
        await newUser.save();
        res.status(201).json({
            message:"User created"
        })
    }catch(err){
        res.status(500).send({
            message:"Something went wrong"
        })
    }
})
router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({
                message: "User does not exist"
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }
        const payload = {
            user: {
                id: user.id
            }
        };
        if (!process.env.JWT_SECRET) {
            return res.status(500).json({
                message: "JWT Secret is not defined"
            });
        }
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
            if (err) throw err;
            res.status(200).json({
                token,
                data: {
                    _id: user._id,
                    fullName: user.fullName,
                    userName: user.userName,
                    email: user.email
                }
            });
        });
    } catch (err) {
        res.status(500).send({
            message: err.message
        });
    }
});

router.post("/signout",async(req,res)=>{
    try{
        res.clearCookie('token')
        res.status(200).json({
            message:"User signed out"
        })
    }catch(err){
        res.status(500).send({
            message:"Something went wrong"
        })
    }
})


router.post("/getUser/:id",async(req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        if(!user){
            res.status(400).json({
                message:"User not found"
            })
        }
        res.status(200).json({
            user
        })
    }catch(err){
        res.status(500).send({
            message:"Something went wrong"
        })
    }
})

router.delete("/deleteUser/:id",async(req,res)=>{
    try{
        const user = await User.findByIdAndDelete(req.params.id);
        if(!user){
            res.status(400).json({
                message:"User not found"
            })
        }
        res.status(200).json({
            message:"User deleted"
        })
    }catch(err){
        res.status(500).send({
            message:"Something went wrong"
        })
    }
})

module.exports= router;