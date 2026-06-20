import React, { useState } from 'react'
import { useAuthStore } from '../store/UseAuthStore'
import { Camera, Mail, User } from 'lucide-react';

const ProfilePage = () => {

  const { isUpdatingProfile, updateProfile, authUser } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="pt-16 min-h-screen overflow-y-auto px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-2xl">
        <div className="w-full rounded-xl bg-base-300 p-4 space-y-3 sm:space-y-4 sm:p-6">

          <div className="text-center">
            <h1 className="text-xl font-semibold sm:text-2xl">Profile</h1>
            <p className="mt-1 text-sm sm:mt-2 sm:text-base">Your profile information</p>
          </div>

          {/* avatar upload section */}
          <div className="flex flex-col items-center gap-2 sm:gap-3">
            <div className="relative">
              <img
                src={selectedImg || authUser?.profilePic || "/avatar.png"}
                alt="Profile"
                className="size-20 rounded-full object-cover border-4 sm:size-24 lg:size-28"
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                `}
              >
                <Camera className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="max-w-[16rem] text-center text-xs leading-snug text-zinc-400 sm:max-w-none sm:text-sm">
              {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
            </p>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <div className="space-y-1">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </div>
              <p className="px-4 py-2 bg-base-200 rounded-lg border text-sm sm:text-base" style={{ overflowWrap: "break-word" }}>
                {authUser?.fullName}
              </p>
            </div>

            <div className="space-y-1">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <p className="px-4 py-2 bg-base-200 rounded-lg border text-sm sm:text-base" style={{ overflowWrap: "break-word" }}>
                {authUser?.email}
              </p>
            </div>
          </div>

          <div className="bg-base-300 rounded-xl p-4 sm:p-5">
            <h2 className="mb-2 text-base font-medium sm:mb-3 sm:text-lg">Account Information</h2>
            <div className="space-y-1 text-sm sm:space-y-2">
              <div className="flex flex-col gap-1 py-2 border-b border-zinc-700 sm:flex-row sm:items-center sm:justify-between">
                <span>Member Since</span>
                <span>{authUser?.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex flex-col gap-1 py-2 sm:flex-row sm:items-center sm:justify-between">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ProfilePage