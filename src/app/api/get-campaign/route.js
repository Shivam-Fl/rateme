import connectDB from "../../../db/dbConnect";
import Campaign from "../../../model/campaignModel";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

export async function GET(req) {
  await connectDB();
  
  try {
    const token = req.headers.get('authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json({ message: "No token provided" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const campaigns = await Campaign.find({ user: decoded.id }).sort({ createdAt: -1 }).exec();
    
    if (campaigns && campaigns.length > 0) {
      return NextResponse.json({ campaigns: campaigns }, { status: 200 });
    } else {
      return NextResponse.json({ message: "No campaigns found, Start creating campaign" }, { status: 404 });
    }
  } catch (error) {
    console.error(error);
    if (error.name === 'JsonWebTokenError') {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
