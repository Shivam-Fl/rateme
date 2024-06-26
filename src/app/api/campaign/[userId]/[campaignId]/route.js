import connectDB from '../../../../../db/dbConnect';
import Campaign from '../../../../../model/campaignModel';
import {NextResponse} from "next/server"
export async function GET(req, {params}) {
  const { userId, campaignId } = params;

  await connectDB();

  try {
    const campaign = await Campaign.findOne({ user: userId, _id: campaignId });

    if (!campaign) {
      return NextResponse.json({ message: 'Campaign not found' }, {status: 404});
    }

    return NextResponse.json(campaign, {status:200});
  } catch (error) {
    NextResponse.json({ message: 'Server error' }, {status: 200});
  }
}
