const user = require('./user_model');
const express  = require('express');
const router = express.Router();

const bcryptjs = require('bcryptjs');

router.post('/register',async (req,resp)=>{
    const {username,email,password} = req.body;

    let user_exist = await user.findOne({email:email});
    if(user_exist){
        return resp.status(400).json({
            success:false,
            msg:'user already exist'
        });
    }
    const User = new user();
    User.email = email;
    User.username = username;

    const salt = await bcryptjs.genSalt(10);
    User.password = await bcryptjs.hash(password,salt);

    await User.save();

    return resp.status(200).json({
        success:true,
        msg:'registered successfully'
    });

});

router.post('/login',async (req,resp)=>{
    const {username,email,password}  = req.body;

    let user_found = await user.findOne({email:email});
    if(!user_found){
        return resp.status(400).json({
            success:false,
            msg:'user not registered'
        });
    }

    let ismatch = await bcryptjs.compare(password,user_found.password);

    if(!ismatch){
        return resp.status(400).json({
            success:false,
            msg:'password not correct',

        });
    }

    return resp.status(200).json({
        success:true,
        msg:'login successfull'
    })

});

module.exports = router;