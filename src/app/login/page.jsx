"use client";
import Head from 'next/head';
import { useState } from "react";
import { useRouter } from 'next/navigation';
import  Cookies  from "js-cookie";


export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const router = useRouter();
  
  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    const isJson = res.headers.get('content-type')?.includes('application/json');
    const data = isJson ? await res.json() : null;

    if (res.status === 200) {
      setMessage('User Logged in successfully.');
     
      Cookies.set('tokenRateme', data.token, { expires: 7 })

      setTimeout(() => {
        router.push('/');
      }, 3000);
    } else if (res.status === 404) {
      setMessage(data.message);
      setTimeout(() => {
        router.push('/signup'); // Redirect to signup page if user not found
      }, 3000);
    } else if (res.status) {
      setMessage(data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <Head>
        <title>Login</title>
      </Head>
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-sm">
        {message && <p className="mb-4 text-center text-red-500 dark:text-red-400">{message}</p>}
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 mb-3 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600"
              placeholder="Enter your password"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Log In
            </button>
            <a
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-400"
              href="#"
            >
              Forgot Password?
            </a>
          </div>
        </form>
        <a
          className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-400 mt-4"
          href="/signup"
        >
          New to Rateme??, Signup
        </a>
      </div>
    </div>
  );
}
