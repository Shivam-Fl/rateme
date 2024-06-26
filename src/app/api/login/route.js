import connectDB from "../../../db/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import User from "../../../model/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

export async function POST(req){
  await  connectDB();
  
  const {email, password} = await req.json()
console.log(email)
  try{
    const user = await User.findOne({email})
    console.log(user)
    if(user){
        const isMatch = await bcrypt.compare(password, user.password)
        if(isMatch){
            const token = await jwt.sign({ id: user._id, photo: user.profilePhoto }, process.env.JWT_SECRET, { expiresIn: '3d' });
            return NextResponse.json({message:"User logged in sucessfully", token}, {status:200})
        }
        else{
            return NextResponse.json({message:"Invalid password"}, {status:401})
        }
    }
    else{
        return NextResponse.json({
            message:"User not found"
        }, {status: 404})
    }
  }catch(error){
    console.error('Error in POST /api/login:', error);
    return NextResponse.json({
        message: "Internal Server error"
    }, {status:500})
  }


}