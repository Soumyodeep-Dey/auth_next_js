"use client";

// Update PageProps type to match Next.js conventions
export interface PageProps {
  params?: Record<string, string>;
  searchParams?: Record<string, string>;
}

export default function userProfile({ params }: { params: Record<string, string> }) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black py-12 px-4 sm:px-6 lg:px-8">
        <div className="card max-w-md w-full space-y-8">
          <div>
            <h1 className="text-center text-3xl font-extrabold">Your Profile {params.id}</h1>
            <p className="mt-4 text-center text-gray-300">Manage your account settings and preferences here.</p>
          </div>
        </div>
      </div>
    );
}
// This is a placeholder for the user profile page.
// You can add more functionality like fetching user data, updating settings, etc.