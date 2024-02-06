 import express from 'express'
 import User from './UsersSchema'
 import { Request,Response } from 'express'; 
import bcrypt from 'bcrypt'

 const router = express.Router();

router.post("/api/Users/register", async (req, res) => {
    try {
      const {firstname,lastname,email,password} = req.body;
      const alreadyuser =await User.findOne({where:{email}})
      
      if(alreadyuser){
        res.json({message:" email already exists!!"})
      }
      else{
        const createUser = await User.create({firstname,lastname,email,password});
        res.status(201).json({ message: "User created sucessfully" });
      }
      
    } catch (err) {
      console.log(err,"Cannot register at the mooment");
    }
  });


  router.post("/api/Users/Login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const userWithEmail = await User.findOne({ where: { email} });
      if (!userWithEmail) {
        res.status(500).json({ sucess:false, message: "Email is Invalid" });
      } 
      if(userWithEmail){
        const passwordcheck =await User.findOne({where:{password}})
        // const passwordMatch =await bcrypt.compare(password,password)
        if(passwordcheck){
          // const token =jwt.sign({username:email},'sddfghhjhjbgh',{expiresIn:'1hr'})
          res.status(200).json({message:"Login Sucess",userWithEmail})
        }
        else{
          res.status(500).json({message:"Password Incorrect"})
        }
      }
    } catch (err) {
      console.log(err);
    }
  });

 export default router