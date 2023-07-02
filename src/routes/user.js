const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../module/user')


router.post('/sign-up', async(req,res)=>{
    
    try{
    const{first_name,last_name,email,password} = req.body;

    if(!first_name || !last_name || !email){
        return res.status(422).json({error:"please add all the fields"})
    }

    const existingUser = await User.findOne({ email });
    if(existingUser){
        return res.status(400).json({ message: 'user already exist this email'})
    }

    const hashedPassword = await bcrypt.hash(password ,10);
    const newUser = new User({
        first_name:first_name,
        last_name :last_name,
        email:email,
        password:hashedPassword
    })
    await newUser.save();

    res.status(200).json({message: 'SingUp successful'})

    }catch(error){
        console.log("Error in sing up",error);
        res.status(500).json({message:'Internal server error'});
    }

})


router.post('/sign-in',async (req,res)=>{

    try{
        const{email,password} = req.body;
    if(!email || !password){
        return  res.status(422).json({"Error":"Please provide both Email and Password!"});
    }

      const user = await User.findOne({ email });
    if(!user){
        return res.status(404).json({ message: 'user not found'})
    }

   const isPassword = await bcrypt.compare(password, user.password);
   if(!isPassword){
    return res.status(403).json({ message: "Invalid credentials" });
   }
   res.status(401).json({message:'singIn Successful'})
}catch(error){
    console.log('internal Server Error ',error )
}
    
 
})


module.exports = router;