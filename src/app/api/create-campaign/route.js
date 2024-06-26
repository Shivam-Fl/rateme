import { NextResponse } from 'next/server';
import connectDB from '../../../db/dbConnect';
import Campaign from '../../../model/campaignModel';
import jwt from 'jsonwebtoken';
import QRCode from 'qrcode';

export async function POST(req) {
  await connectDB();

  const { ratedAs, description, token } = await req.json();
  

  if (!token) {
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    const photo = decoded.photo
    
    const campaign = new Campaign({
      ratedAs,
      description,
      user: userId,
      campaignLink: '',
      creatorPhoto: photo
    });

    const campaignLink = `${process.env.BASE_URL}/campaign/${userId}/${campaign._id}`;
    campaign.campaignLink = campaignLink;

    await campaign.save();

    const qrCode = await QRCode.toDataURL(campaignLink);

    return NextResponse.json({ campaign, qrCode }, { status: 201 });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
