import { NextResponse } from 'next/server';
import connectDB from '../../../db/dbConnect';
import Campaign from '../../../model/campaignModel';

export async function POST(req) {
  await connectDB();

  const { userId, campaignId, rating, comment } = await req.json();

  try {
    const campaign = await Campaign.findOne({ user: userId, _id: campaignId });

    if (!campaign) {
      return NextResponse.json({ message: 'Campaign not found' }, { status: 404 });
    }

    campaign.ratings.push({ rating, comment });

    await campaign.save();

    return NextResponse.json({ message: 'Rating submitted' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
