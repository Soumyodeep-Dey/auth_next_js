"use client";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import React , {useState} from "react";
import { link } from "fs";

export default function ProfilePage() {

  const router = useRouter();

  const [data, setData] = React.useState("nothing");

  const logout = async () => {
    // Implement your logout logic here
    try {
      const response = await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      console.error("Logout failed:", error.message);
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    try {
      const response = await axios.get("/api/users/me");
      // Handle user data as needed
      console.log("User data:", response.data);
      setData(response.data.data._id);
      toast.success("User details fetched successfully");
    } catch (error: any) {
      console.error("Failed to fetch user details:", error.message);
      toast.error(error.message);
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="card max-w-md w-full space-y-8">
        <div>
          <h1 className="text-center text-3xl font-extrabold">
            Your Profile
          </h1>
           <h2 className="text-center text-2xl font-bold">{data === "nothing" ? "Nothing" : 
            <Link href={`/profile/${data}`}> 
              {data}
            </Link>}
            </h2>
        </div>
        
        <div className="mt-8 space-y-6">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Account Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300">Username</label>
                <p className="mt-1 text-white">John Doe</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Email</label>
                <p className="mt-1 text-white">john@example.com</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <button className="btn-primary">
              Edit Profile
            </button>
            <button className="btn-secondary">
              Change Password
            </button>
          </div>
          <hr />
          
          <button
            onClick={getUserDetails}
            className= "btn-primary w-full hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md text-white bg-blue-600 px-4 py-2 text-sm font-medium shadow-sm">
            Get User Details
          </button>

          <button 
          onClick={logout}
          className="btn-danger w-full mt-4 hover:bg-red-700 transition-colors duration-200  focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded-md text-white bg-red-600 px-4 py-2 text-sm font-medium shadow-sm">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
// This page is a placeholder for the user's profile. You can expand it with user-specific data and settings.

// You can fetch user data from an API or use a global state management solution to manage user state.
// Consider adding features like updating profile information, changing password, and viewing account activity.