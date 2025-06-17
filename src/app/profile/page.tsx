"use client";
export default function ProfilePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="card max-w-md w-full space-y-8">
        <div>
          <h2 className="text-center text-3xl font-extrabold">
            Your Profile
          </h2>
          <p className="mt-4 text-center text-gray-300">
            Manage your account settings and preferences here.
          </p>
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
        </div>
      </div>
    </div>
  );
}
// This page is a placeholder for the user's profile. You can expand it with user-specific data and settings.

// You can fetch user data from an API or use a global state management solution to manage user state.
// Consider adding features like updating profile information, changing password, and viewing account activity.