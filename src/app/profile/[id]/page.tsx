"use client"
import React from 'react'

const UserProfilePage = ({params}:any) => {

    // console.log(params.id);
    
  return (
    <div className='flex justify-center items-center min-h-screen'>userId:<span className='text-orange-600 text-3xl'>{params.id}</span></div>
  )
}

export default UserProfilePage