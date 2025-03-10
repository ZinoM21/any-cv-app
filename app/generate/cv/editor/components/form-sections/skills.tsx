"use client";

import type React from "react";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useProfileStore } from "@/hooks/use-profile";

export function SkillsForm() {
  const profileData = useProfileStore((state) => state.profile);
  const setProfileData = useProfileStore((state) => state.setProfile);

  const [newSkill, setNewSkill] = useState("");

  const handleAddSkill = () => {
    if (newSkill.trim() && !profileData?.skills.includes(newSkill.trim())) {
      setProfileData({
        ...profileData,
        skills: [...profileData?.skills, newSkill.trim()],
      });
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setProfileData({
      ...profileData,
      skills: profileData?.skills.filter((s) => s !== skill),
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddSkill();
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-900">Skills</h2>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Add Skills</CardTitle>
          <CardDescription>
            Add relevant skills that showcase your expertise
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <div className="flex-1">
              <Label htmlFor="newSkill" className="sr-only">
                New Skill
              </Label>
              <Input
                id="newSkill"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="e.g., JavaScript, Project Management, UX Design"
              />
            </div>
            <Button onClick={handleAddSkill} disabled={!newSkill.trim()}>
              <Plus className="mr-2 h-4 w-4" />
              Add
            </Button>
          </div>

          {profileData?.skills.length > 0 && (
            <div>
              <Label className="mb-2 block text-sm font-medium">
                Your Skills
              </Label>
              <div className="flex flex-wrap gap-2">
                {profileData?.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="flex items-center rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-800"
                  >
                    {skill}
                    <button
                      onClick={() => handleRemoveSkill(skill)}
                      className="ml-2 rounded-full p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-700"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <p className="text-xs text-slate-500">
            Pro tip: Press Enter to quickly add a skill
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
