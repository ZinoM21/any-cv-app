"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useProfileStore } from "@/hooks/use-profile";

export function ProfessionalSummaryForm() {
  const profileData = useProfileStore((state) => state.profile);
  const setProfileData = useProfileStore((state) => state.setProfile);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-900">
        Professional Summary
      </h2>

      <div className="grid gap-4">
        <div className="space-y-2">
          <Label htmlFor="jobTitle">Job Title</Label>
          <Input
            id="jobTitle"
            name="jobTitle"
            value={profileData?.jobTitle}
            onChange={handleChange}
            placeholder="Software Engineer"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="headline">Professional Headline</Label>
          <Input
            id="headline"
            name="headline"
            value={profileData?.headline}
            onChange={handleChange}
            placeholder="Full-stack developer with 5+ years of experience"
          />
          <p className="text-xs text-slate-500">
            A brief statement that appears under your name
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="about">About</Label>
          <Textarea
            id="about"
            name="about"
            value={profileData?.about}
            onChange={handleChange}
            placeholder="Write a brief summary of your professional background and key qualifications..."
            rows={5}
          />
          <p className="text-xs text-slate-500">
            Provide a comprehensive overview of your professional background,
            skills, and achievements
          </p>
        </div>
      </div>
    </div>
  );
}
