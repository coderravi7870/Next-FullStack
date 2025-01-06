"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const VerifyEamilPage = () => {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(error.message);
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex justify-center items-center min-h-screen p-2 flex-col gap-2">
      <h1 className="text-4xl">Verify Email</h1>
      <h2 className="bg-red-400 p-2">{token ? `token : ${token}` : "no token"}</h2>

      {verified && (
        <div>
          <h2 className="text-2xl">Email Verified</h2>
          <Link href="/login" className="underline text-red-300">Login</Link>
        </div>
      )}
      {error && (
        <div className="p-2">
          <h2 className="text-2xl bg-red-700 p-3">Error</h2>
        </div>
      )}
    </div>
  );
};

export default VerifyEamilPage;
