// import UserSchema from './UsersSchema'
// import { Request,Response } from 'express'; 

// const User:any =UserSchema.User;

//  export const createUser =async (req :Request,res:Response)=>{
//     const user = req.body;
//     console.log("User Creation begin")
//     try{
//         const response =await User.create(user)
//          console.log(user)
//         if(!response){
//             res.status(500).json({message:"Internal Server Error"})
//             console.log("Internal Server Error")
//         }
//         res.status(201).json({message:"User Created"})
//         console.log("User Created")
//     }
//     catch(err){
//         res.status(400).json(err)
//         console.log(err)
//     }
// }

// export default {createUser}