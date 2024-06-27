"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';

const CampaignPage = ({ params }) => {
  const { userId, campaignId } = params;
  const [campaign, setCampaign] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [hoverRating, setHoverRating] = useState(0);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success', 'error', or 'warning'

  useEffect(() => {
    if (userId && campaignId) {
      fetchCampaign();
    }
  }, [userId, campaignId]);

  const fetchCampaign = async () => {
    try {
      const res = await axios.get(`/api/campaign/${userId}/${campaignId}`);
      setCampaign(res.data);
    } catch (error) {
      console.error('Error fetching campaign:', error);
      setMessage('Error fetching campaign.');
      setMessageType('error');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/api/rate-campaign`, {
        userId,
        campaignId,
        rating,
        comment
      });

      if (res.status === 201) {
        setMessage('Rating submitted successfully!');
        setMessageType('success');
      } else if (res.status === 404) {
        setMessage('Campaign not found.');
        setMessageType('warning');
      } else {
        setMessage('Unexpected response from the server.');
        setMessageType('warning');
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 500) {
          setMessage('Server error.');
        } else {
          setMessage('Error submitting rating.');
        }
        setMessageType('error');
      } else {
        setMessage('Network error.');
        setMessageType('error');
      }
      console.error('Error submitting rating:', error);
    }
  };

  const handleStarClick = (star) => {
    setRating(star);
  };

  const handleStarHover = (star) => {
    setHoverRating(star);
  };

  const handleStarHoverOut = () => {
    setHoverRating(0);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg
          key={i}
          className={`w-8 h-8 cursor-pointer ${
            (hoverRating || rating) >= i ? 'text-yellow-500' : 'text-gray-300'
          }`}
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => handleStarClick(i)}
          onMouseEnter={() => handleStarHover(i)}
          onMouseLeave={handleStarHoverOut}
        >
          <path d="M12 .587l3.668 7.431L24 9.632l-6 5.847 1.416 8.522L12 18.896l-7.416 4.105L6 15.48 0 9.632l8.332-1.614L12 .587z" />
        </svg>
      );
    }
    return stars;
  };

  if (!campaign) return <div className="text-2xl font-semibold flex justify-center content-center min-h-[90vh]"> <p> Loading...</p> </div>;

  return (
    <div className="max-w-md mx-auto mt-8 flex flex-col h-[90vh] justify-center items-center ">
      {message && (
        <>
                  <div
            className={`mb-4 text-lg text-center ${messageType === 'success' ? 'text-green-500' : messageType === 'warning' ? 'text-yellow-500' : 'text-red-500'}`}
          >
            {message}
          </div>
          <a href="/create-campaign" className="bg-blue-500 p-2 text-white rounded-xl">Create your own campaign</a>
          </>

        )}
     {!message &&( <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col justify-center items-center">
        <img
          src={campaign.creatorPhoto}
          alt="Campaign Creator"
          className="w-48 h-48 rounded-full mb-4 shadow-lg"
        />
        <h1 className="text-2xl font-bold mb-4">{campaign.description}</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="rating"
              className="block text-gray-700 font-bold mb-2"
            >
              Rating
            </label>
            <div className="flex">{renderStars()}</div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="comment"
              className="block text-gray-700 font-bold mb-2"
            >
              Feedback
            </label>
            <textarea
              id="comment"
              name="comment"
              onChange={(e) => setComment(e.target.value)}
              value={comment}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit Rating
            </button>
          </div>
        </form>
      </div>)}
    </div>
  );
};

export default CampaignPage;