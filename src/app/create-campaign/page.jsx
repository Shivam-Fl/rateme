"use client"
import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation';

const CreateCampaign = () => {
  const router = useRouter();
  const [ratedAs, setRatedAs] = useState('');
  const [description, setDescription] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [campaignLink, setCampaignLink] = useState('');
  const token = Cookies.get('tokenRateme')
  
  if (!token) {
    router.push("/login")
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/create-campaign', {
        ratedAs,
        description,
        token
      }, {
        withCredentials: true // This ensures cookies are sent with the request
      });

      setQrCode(res.data.qrCode);
      setCampaignLink(res.data.campaign)
    } catch (error) {
      console.error('Error creating campaign:', error);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      const response = await fetch(qrCode);
      const blob = await response.blob();
      const file = new File([blob], 'campaigncode.png', {type : blob.type})
      try {
        await navigator.share({
          files: [file],
          title: campaignLink.ratedAs,
          description: campaignLink.description,
          url: campaignLink.campaignLink
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      alert('Web Share API is not supported in your browser.');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(campaignLink.campaignLink)
      .then(() => {
        alert('Link copied to clipboard!');
      })
      .catch(err => {
        console.error('Error copying text: ', err);
      });
  };

  return (
    <>
      {token ? (
        <div className="max-w-md mx-auto mt-8 flex justify-center content-center h-[85vh]">
          {!qrCode ? (
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 self-center">
              <div className="mb-4">
                <label htmlFor="ratedAs" className="block text-gray-700 font-bold mb-2">Title</label>
                <input
                  type="text"
                  id="ratedAs"
                  name="ratedAs"
                  onChange={(e) => setRatedAs(e.target.value)}
                  value={ratedAs}
                  placeholder='Ex. Teacher'
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description</label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Create Campaign
                </button>
              </div>
            </form>
          ) : (
            <div className="mt-8 flex flex-col justify-center items-center">
              <h2 className="md:text-2xl font-bold">QR Code for Your Campaign</h2>
              <img src={qrCode} alt="Campaign QR Code" className="mt-4" />
              <div className="md:text-2xl font-bold bg-blue-300 p-2 rounded-3xl w-[90vw] overflow-scroll ">
                {campaignLink.campaignLink}
              </div>
              <div className="mt-4 flex space-x-4">
                <button
                  onClick={handleShare}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Share
                </button>
                <button
                  onClick={handleCopy}
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Copy Link
                </button>
              </div>
            </div>
          )}
        </div>
      ) : ''}
    </>
  );
};

export default CreateCampaign;