import connectDB from "../../../db/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import User from "../../../model/userModel";
import bcrypt from "bcryptjs";

export async function POST(req) {
  await connectDB();

  const { photo,
    photoID,
    name,
    email,
    phone,
    password } = await req.json();
    console.log(name)
  if (!name || !email || !password || !phone) {
    return NextResponse.json(
      { message: "Please fill all details" },
      { status: 401 }
    );
  }

  try {
    

    let user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    user = new User({
      userName : name,
      email,
      password: bcrypt.hashSync(password, 10),
      phoneNum: phone ,
      profilePhoto: photo,
      profilePhotoID: photoID
    });

    const verifyToken = user.generateVerificationToken();
    await user.save();
    // sendVerificationEmail(user.email, verifyToken);
    return NextResponse.json(
      {
        message:
          "User registered successfully.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// const sendVerificationEmail = (email, token) => {
//     // Implement your email sending logic here
//     console.log(`Send verification email to ${email} with token ${token}`);
//   };
