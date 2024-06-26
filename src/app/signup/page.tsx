"use client"
import React, { useEffect, useState } from 'react';
import axios from "axios"
import { toast } from "react-hot-toast"
import { useRouter } from 'next/navigation';
import Link from 'next/link';
function page() {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: ""
  })
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [loading, setLoading] = useState(false)

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user)
      console.log("Signup succesfull! ", response.data);
      router.push("/login")


    } catch (error: any) {
      console.log("Signup Failed!");
      toast.error(error.message)

    }
  }

  useEffect(() => {
    if (user.email.length > 0 && user.username.length > 0 && user.password.length > 0) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true)
    }
  }, [user])
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>{loading ? "Processing..." : "Signup"}</h1>
      <label htmlFor="username">username</label>
      <input type="text"
        className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
        id='username'
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder='Please enter username'
      />
      <label htmlFor="username">Email</label>
      <input type="text"
        className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
        id='email'
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder='Please enter email'
      />
      <label htmlFor="username">Password</label>
      <input type="text"
        className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
        id='password'
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder='Please enter username'
      />
      <button onClick={onSignup}
      className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
      >{btnDisabled?"Please Fill data":"Signup"}</button>
      <Link href={"/login"}>visit login page</Link>
    </div>
  )
}

export default page
