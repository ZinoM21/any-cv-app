"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useProfileStore } from "@/hooks/use-profile";

export function PersonalInfoForm() {
  const profileData = useProfileStore((state) => state.profile);
  const setProfileData = useProfileStore((state) => state.setProfile);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handleProfilePictureUpload = () => {
    // In a real app, this would open a file picker and handle the upload
    const url = prompt("Enter URL for profile picture (for demo purposes):");
    if (url) {
      setProfileData({
        ...profileData,
        profilePictureUrl: url,
      });
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-900">
        Personal Information
      </h2>

      <div className="grid gap-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              name="firstName"
              value={profileData?.firstName}
              onChange={handleChange}
              placeholder="John"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              name="lastName"
              value={profileData?.lastName}
              onChange={handleChange}
              placeholder="Doe"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="username">Username / Display Name</Label>
          <Input
            id="username"
            name="username"
            value={profileData?.username}
            onChange={handleChange}
            placeholder="johndoe"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="profilePicture">Profile Picture</Label>
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 overflow-hidden rounded-full bg-slate-200">
              {profileData?.profilePictureUrl ? (
                <img
                  src={profileData?.profilePictureUrl || "/placeholder.svg"}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-2xl text-slate-400">
                  {profileData?.firstName?.[0]}
                  {profileData?.lastName?.[0]}
                </div>
              )}
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={handleProfilePictureUpload}
            >
              <Upload className="mr-2 h-4 w-4" />
              Upload Photo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
