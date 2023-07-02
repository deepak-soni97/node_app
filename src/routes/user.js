const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../module/user')


router.post('/sign-up', async(req,res)=>{
    
    try{
    const{first_name,last_name,email,password} = req.body;

    if(!first_name || !last_name || !email || !password){
        return res.status(422).json({error:"Please add all the fields"})
    }

    const existingUser = await User.findOne({ email });
    if(existingUser){
        return res.status(400).json({ message: 'user already exist with this email'})
    }

    const hashedPassword = await bcrypt.hash(password ,10);
    const newUser = new User({
        first_name,
        last_name,
        email,
        password:hashedPassword
    })
    await newUser.save();

    res.status(200).json({message: 'Sing-up successfully!'})

    }catch(error){
        
        res.status(500).json({message:'Internal server error'});
    }

})


router.post('/sign-in',async (req,res)=>{

    try{
        const{email,password} = req.body;
    if(!email || !password){
        return  res.status(422).json({Error: `Email/Password required!`});
    }

      const user = await User.findOne({ email });
    if(!user){
        return res.status(404).json({ message: 'user not found'})
    }

   const isPasswordCorrect = await bcrypt.compare(password, user.password);
   if(!isPasswordCorrect){
    return res.status(403).json({ message: "Invalid credentials" });
   }
   res.status(200).json({message:'Sign-in Successfully!'})
}catch(error){
    console.log('internal Server Error ',error )
}
    
 
})


module.exports = router;