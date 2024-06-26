// components/RegisterForm.js
"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CldUploadButton } from 'next-cloudinary';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    photo: '',
    photoID: '',
    name: '',
    email: '',
    phone: '',
    password: '',
  });
  const [message, setMessage] = useState('')
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (result) => {
    const info = result.info;
    if ("secure_url" in info && "public_id" in info) {
      const photo = info.secure_url;
      const photoID = info.public_id;
      setFormData(prevFormData => ({ ...prevFormData, photo, photoID }));
    }
  };
  const handleSubmit = async (e) => {
    console.log(formData)
    e.preventDefault();
    const res = await fetch('/api/signup',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        },
      body : JSON.stringify(formData)
    })

    const isJson = res.headers.get('content-type')?.includes('application/json');
    const data = isJson ? res.json : null
    if (res.status == 201){
      setMessage("User Registered Successfully, proceeding to login")
      router.push('/login')
    }
    else if (res.status == 409){
      setMessage("Username not unique")
    }else if (res.status == 401){
      setMessage("Fill all Credentials")
    }
    else if (res.status == 400){
      setMessage("User already exists, Go to login")
    }
    // Reset form fields
    setFormData({
      photo: '',
      photoID: '',
      name: '',
      email: '',
      phone: '',
      password: ''
    });

  };

  return (
    <div className="max-w-md mx-auto mt-8">
      
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <p className='text-red-500'>{message}</p>
        <div className="mb-4">

        { !formData.photo ? (<CldUploadButton
          onUpload={handleImageUpload}
          uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
          className="w-full mb-4 p-2 border rounded dark:border-gray-700 dark:bg-gray-700 dark:text-white"
        >
          Upload profile photo
        </CldUploadButton>) : (<div className="flex gap-x-20 justify-center items-center gap-y-2 ">
          <img src={formData.photo} className='h-32 w-32 rounded-full shadow-2xl'  />
          <div className='px-2 py-1 text-white  bg-blue-500 rounded-lg' onClick={()=>{ setFormData(prevFormData => ({ ...prevFormData, photo:'', photoID:'' }))

          }}>Edit</div>
          </div>
          
        )}

        </div>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={handleChange}
            value={formData.name}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={handleChange}
            value={formData.email}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block text-gray-700 font-bold mb-2">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            onChange={handleChange}
            value={formData.phone}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={handleChange}
            value={formData.password}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        {/* <div className="mb-6">
          <label htmlFor="occupation" className="block text-gray-700 font-bold mb-2">Occupation</label>
          <input
            type="text"
            id="occupation"
            name="occupation"
            onChange={handleChange}
            value={formData.occupation}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div> */}
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Register
          </button>
        </div>
        <a
          className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-400 mt-4"
          href="/login"
        >
          Already an user??, Login
        </a>
      </form>

    </div>
  );
};

export default RegisterForm;
