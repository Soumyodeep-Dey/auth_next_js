"use client";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import React from "react";

// Define User interface based on userModel.js
interface User {
  _id?: string;
  username: string;
  email: string;
  password?: string;
  isVerified?: boolean;
  isAdmin?: boolean;
  forgotPasswordToken?: string;
  forgotPasswordTokenExpiry?: string | Date;
  verifyToken?: string;
  verifyTokenExpiry?: string | Date;
  createdAt?: string | Date;
}

export default function ProfilePage() {
  const router = useRouter();

  const [user, setUser] = React.useState<User | null>(null);
  const [showChangePassword, setShowChangePassword] = React.useState(false);
  const [newPassword, setNewPassword] = React.useState("");
  const [changePasswordMsg, setChangePasswordMsg] = React.useState("");
  const [changePasswordError, setChangePasswordError] = React.useState("");
  const [changePasswordLoading, setChangePasswordLoading] = React.useState(false);
  const [oldPassword, setOldPassword] = React.useState("");

  const logout = async () => {
    // Implement your logout logic here
    try {
      const response = await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: unknown) {
      console.error("Logout failed:", error instanceof Error ? error.message : "An unknown error occurred");
      toast.error(error instanceof Error ? error.message : "An unknown error occurred");
    }
  };

  const getUserDetails = async () => {
    try {
      const response = await axios.get("/api/users/me");
      console.log("User data:", response.data);
      setUser(response.data.user); // Save the user object
      toast.success("User details fetched successfully");
    } catch (error: unknown) {
      console.error("Failed to fetch user details:", error instanceof Error ? error.message : "An unknown error occurred");
      toast.error(error instanceof Error ? error.message : "An unknown error occurred");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="card max-w-md w-full space-y-8">
        <div>
          <h1 className="text-center text-3xl font-extrabold">Your Profile</h1>
          <h2 className="text-center text-2xl font-bold">
            {user ? (
              <Link href={`/profile/${user._id}`}>{user._id}</Link>
            ) : (
              "Nothing"
            )}
          </h2>
        </div>

        <div className="mt-8 space-y-6">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Account Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Username :
                </label>
                <p className="mt-1 text-white">
                  {user ? user.username : "N/A"}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Email :
                </label>
                <p className="mt-1 text-white">{user ? user.email : "N/A"}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            {user && user.isVerified ? (
              <span className="bg-green-600 text-white px-4 py-2 rounded-md font-bold">Verified</span>
            ) : (
              <span className="bg-red-600 text-white px-4 py-2 rounded-md font-bold">Not Verified</span>
            )}
            <button className="btn-secondary" onClick={() => setShowChangePassword((v) => !v)}>
              Change Password
            </button>
          </div>
          {showChangePassword && (
            <form
              className="space-y-4 mt-4"
              onSubmit={async (e) => {
                e.preventDefault();
                setChangePasswordMsg("");
                setChangePasswordError("");
                setChangePasswordLoading(true);
                try {
                  const res = await axios.post("/api/users/changepassword", { oldPassword, newPassword });
                  setChangePasswordMsg(res.data.message || "Password changed successfully.");
                  setOldPassword("");
                  setNewPassword("");
                } catch (err: unknown) {
                  setChangePasswordError(err instanceof Error ? err.message : "Something went wrong.");
                } finally {
                  setChangePasswordLoading(false);
                }
              }}
            >
              <label htmlFor="old-password" className="block text-sm font-medium text-gray-300">Old Password</label>
              <input
                id="old-password"
                type="password"
                value={oldPassword}
                onChange={e => setOldPassword(e.target.value)}
                required
                className="input-field mt-1"
                placeholder="Enter old password"
              />
              <label htmlFor="new-password" className="block text-sm font-medium text-gray-300">New Password</label>
              <input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                required
                className="input-field mt-1"
                placeholder="Enter new password"
              />
              <button type="submit" className="btn-primary w-full" disabled={changePasswordLoading || !oldPassword || !newPassword}>
                {changePasswordLoading ? "Changing..." : "Change Password"}
              </button>
              {changePasswordMsg && <div className="bg-green-600 text-white rounded-md p-2 text-center mt-2">{changePasswordMsg}</div>}
              {changePasswordError && <div className="bg-red-600 text-white rounded-md p-2 text-center mt-2">{changePasswordError}</div>}
            </form>
          )}
          <hr />

          <button
            onClick={getUserDetails}
            className="btn-primary w-full hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md text-white bg-blue-600 px-4 py-2 text-sm font-medium shadow-sm"
          >
            Get User Details
          </button>

          <button
            onClick={logout}
            className="btn-danger w-full mt-4 hover:bg-red-700 transition-colors duration-200  focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded-md text-white bg-red-600 px-4 py-2 text-sm font-medium shadow-sm"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
 