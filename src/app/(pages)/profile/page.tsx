// pages/profile.js
'use client'
import { SignedIn, SignIn, UserButton, useUser } from "@clerk/clerk-react";
import { SignedOut } from "@clerk/nextjs";

export default function Profile() {

  const { user } = useUser()

  return (
    <div className="flex justify-center items-center min-h-screen">
    <SignedOut>
      <SignIn/>
    </SignedOut>
    <SignedIn>
      <div className="bg-white p-6 rounded shadow-md w-96">
        {user?.firstName}
        <div>
            <UserButton afterSignOutUrl="/" />
          </div>
      </div>
    </SignedIn>
    </div>
  );
}
