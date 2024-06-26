// components/BottomBar.js
import React from 'react';

function BottomBar() {
  return (
    <div className="bg-gray-900 text-white py-4 text-center">
      <p>© {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
      <div className="flex justify-center space-x-4 mt-2">
        <a href="#privacy-policy" className="hover:underline">Privacy Policy</a>
        <a href="#terms-of-service" className="hover:underline">Terms of Service</a>
      </div>
    </div>
  );
}

export default BottomBar;
