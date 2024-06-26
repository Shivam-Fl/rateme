"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const Dashboard = () => {
  const [user, setUser] = useState({});
  const [campaigns, setCampaigns] = useState([]);
  const [expandedCampaign, setExpandedCampaign] = useState(null);
  const token = Cookies.get('tokenRateme');

  useEffect(() => {
    const fetchUserAndCampaigns = async () => {
      try {
        const campaignResponse = await axios.get('/api/get-campaign', {
          headers: {
            'Authorization': 'Bearer ' + token
          },
        });
        setCampaigns(campaignResponse.data.campaigns);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchUserAndCampaigns();
  }, []);

  const toggleExpand = (campaignId) => {
    setExpandedCampaign(expandedCampaign === campaignId ? null : campaignId);
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg
          key={i}
          className={`w-5 h-5 inline-block ${i <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049.927a1 1 0 0 1 1.902 0l1.23 3.792a1 1 0 0 0 .95.691h3.992a1 1 0 0 1 .59 1.81l-3.233 2.35a1 1 0 0 0-.364 1.118l1.23 3.792a1 1 0 0 1-1.537 1.118l-3.233-2.35a1 1 0 0 0-1.177 0l-3.233 2.35a1 1 0 0 1-1.537-1.118l1.23-3.792a1 1 0 0 0-.364-1.118L.629 7.22a1 1 0 0 1 .59-1.81h3.992a1 1 0 0 0 .95-.691L9.049.927z"/>
        </svg>
      );
    }
    return stars;
  };

//   if(!campaignResponse){
//     return <div>Loading...</div>
//   }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Campaigns</h2>
      <div className="flex flex-col gap-y-1">
        {campaigns.length > 0 ? (
          campaigns.map((campaign) => (
            <div onClick={() => toggleExpand(campaign._id)} key={campaign._id} className="mb-4 shadow-lg rounded-3xl p-4">
              <div className="flex items-center justify-between">
                <div className="cursor-pointer text-xl font-bold">
                  {campaign.ratedAs}
                </div>
                <p className="text-bold">+</p>
              </div>
              {expandedCampaign === campaign._id && (
                <div>
                  <h4 className="font-semibold mt-2">Ratings:</h4>
                  {campaign.ratings.length > 0 ? (
                    <ul className="list-disc pl-5">
                      {campaign.ratings.map((rating, idx) => (
                        <div key={rating._id}>
                          <p><strong>{idx +1}. </strong> {renderStars(rating.rating)}</p>
                          <p><strong>Feedback:</strong> {rating.comment}</p>
                        </div>
                      ))}
                    </ul>
                  ) : (
                    <p>No ratings yet.</p>
                  )}
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No campaigns found.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
