"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";

const ForgetPassowrd = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/forgetpassword", user);

      if (response.statusText === "OK") {
        toast.success("Login successfully!");
        // router.push("/profile");
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

  useEffect(() => {
    if (user.email.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex justify-center items-center min-h-screen p-2 bg-[#1e1e2f]">
      <div className="bg-green-500 p-8 rounded-r-xl">
        <h1 className="text-2xl text-center mb-4">
          {loading ? "Processing..." : "For Forget Password"}
        </h1>

        <div className="flex flex-col gap-1 mb-2">
          <label htmlFor="email" className="font-bold">
            Email
          </label>
          <input
            className="px-2 py-1 text-black outline-blue-600"
            type="email"
            required
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="email"
          />
        </div>

        <button
          className="bg-blue-800 px-4 py-2 rounded-lg hover:bg-blue-700"
          onClick={onSubmit}
        >
          {buttonDisabled ? "No Submit" : "Submit"}
        </button>

        <Link
          href="/signup"
          className="ml-2 text-white underline hover:text-red-400"
        >
          For singup
        </Link>
      </div>
    </div>
  );
};

export default ForgetPassowrd;
