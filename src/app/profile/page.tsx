"use client"
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

const ProfilePage = () => {
  const router = useRouter();
  const [data,setData] = useState("nothing");

  const logout =async ()=>{
    try {
      await axios.get("/api/users/logout")
      toast.success("User logged out successfully");
      router.push("/login");

    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  }

  const getUserDetails = async () =>{
    const res = await axios.get("/api/users/me");

    console.log(res.data);
    setData(res.data.data._id)
    
  }
  return (
    <div className='flex justify-center items-center min-h-screen flex-col'>
      <h1>ProfilePage</h1>
      <h2 className='p-2 bg-green-500 rounded-md my-4'>{data === "nothing" ? "nothing" : <Link href={`/profile/${data}`}>MyProfile</Link>}</h2>
      <button className='bg-blue-500 p-2 rounded-md hover:bg-blue-600'
      onClick={logout}
      >Logout</button>

      <button className='bg-gray-500 p-2 rounded-md hover:bg-blue-600 my-2'
      onClick={getUserDetails}
      >get User Details</button>
    </div>
  )
}

export default ProfilePage