"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

const ForgetPassword = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    token: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notEquel, setNotEquel] = useState(true);

  const onSubmit = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/resetpassword", user);
      

      if (response.statusText === "OK") {
        toast.success("Password Reset Successfully");
        router.push("/login");
      } else {
        console.log(response?.data);
        toast.error(response?.data);
      }
    } catch (error: any) {
      console.log("Login failed:", error.response.data.error);
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{
    const token = window.location.search.split("=")[1];
    if(token.length > 0) {
        setUser({...user, token:token})
    }
  },[])

  useEffect(() => {
    if (user.newPassword.length > 0 && user.confirmPassword.length) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  useEffect(()=>{
    if(user.newPassword.length > 0 && user.confirmPassword.length > 0 &&  user.newPassword === user.confirmPassword){
        setNotEquel(false);
    }else{
        if(user.confirmPassword.length>0)
            setNotEquel(true);
        else setNotEquel(false);
    }
  },[user.confirmPassword])

  return (
    <div className="flex justify-center items-center min-h-screen p-2 bg-[#1e1e2f]">
      <div className="bg-green-500 p-8 rounded-r-xl">
        <h1 className="text-2xl text-center mb-4">
          {loading ? "Processing..." : "Reset Your Password"}
        </h1>


        <div className="flex flex-col gap-1 mb-2">
          <label htmlFor="new Password" className="font-bold">
            New Password
          </label>
          <input
            className="px-2 py-1 text-black outline-blue-600"
            type="password"
            required
            onChange={(e) => setUser({ ...user, newPassword: e.target.value })}
            placeholder="New Password"
          />
        </div>
        
        <div className="flex flex-col gap-1 mb-2">
          <label htmlFor="Conform Password" className="font-bold">
            Conform Password
          </label>
          <input
            className="px-2 py-1 text-black outline-blue-600"
            type="password"
            required
            onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
            placeholder="Conform Password"
          />
        </div>
        <h1 className="text-sm text-red-500 text-end">*{notEquel ? "Not Equal" : ""}</h1>

        <button
          className="bg-blue-800 px-4 py-2 rounded-lg hover:bg-blue-700 text-center"
          onClick={onSubmit}
        >
          {buttonDisabled ? "No Submit" : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default ForgetPassword;
