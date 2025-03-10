"use client";

import type React from "react";

import { useState } from "react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Trash } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { VolunteeringExperience } from "@/lib/types";
import { useProfileStore } from "@/hooks/use-profile";

export function VolunteeringForm() {
  const profileData = useProfileStore((state) => state.profile);
  const setProfileData = useProfileStore((state) => state.setProfile);

  const [newVolunteering, setNewVolunteering] =
    useState<VolunteeringExperience>({
      role: "",
      organization: "",
      organizationProfileUrl: "",
      cause: "",
      startDate: "",
      endDate: "",
      description: "",
    });

  const handleAddVolunteering = () => {
    if (
      newVolunteering.role &&
      newVolunteering.organization &&
      newVolunteering.cause
    ) {
      setProfileData({
        ...profileData,
        volunteering: [...profileData?.volunteering, newVolunteering],
      });
      setNewVolunteering({
        role: "",
        organization: "",
        organizationProfileUrl: "",
        cause: "",
        startDate: "",
        endDate: "",
        description: "",
      });
    }
  };

  const handleRemoveVolunteering = (index: number) => {
    setProfileData({
      ...profileData,
      volunteering: profileData?.volunteering.filter((_, i) => i !== index),
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewVolunteering({
      ...newVolunteering,
      [name]: value,
    });
  };

  const updateExistingVolunteering = (
    index: number,
    field: string,
    value: string
  ) => {
    const updatedVolunteering = [...profileData?.volunteering];
    updatedVolunteering[index] = {
      ...updatedVolunteering[index],
      [field]: value,
    };
    setProfileData({
      ...profileData,
      volunteering: updatedVolunteering,
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-900">Volunteering</h2>

      {/* Existing volunteering entries */}
      {profileData?.volunteering?.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-slate-500">
            Added Volunteering Experience
          </h3>

          {profileData?.volunteering.map((vol, index) => (
            <Card key={index}>
              <CardHeader className="p-4 pb-2">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-base">{vol.role}</CardTitle>
                    <CardDescription>{vol.organization}</CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-slate-400 hover:text-red-500"
                    onClick={() => handleRemoveVolunteering(index)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="px-4 pb-4 pt-0 text-sm text-slate-600">
                <div className="grid gap-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor={`role-${index}`}>Role</Label>
                      <Input
                        id={`role-${index}`}
                        value={vol.role}
                        onChange={(e) =>
                          updateExistingVolunteering(
                            index,
                            "role",
                            e.target.value
                          )
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`organization-${index}`}>
                        Organization
                      </Label>
                      <Input
                        id={`organization-${index}`}
                        value={vol.organization}
                        onChange={(e) =>
                          updateExistingVolunteering(
                            index,
                            "organization",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor={`organizationProfileUrl-${index}`}>
                        Organization URL (Optional)
                      </Label>
                      <Input
                        id={`organizationProfileUrl-${index}`}
                        value={vol.organizationProfileUrl || ""}
                        onChange={(e) =>
                          updateExistingVolunteering(
                            index,
                            "organizationProfileUrl",
                            e.target.value
                          )
                        }
                        placeholder="https://organization.org"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`cause-${index}`}>Cause</Label>
                      <Input
                        id={`cause-${index}`}
                        value={vol.cause}
                        onChange={(e) =>
                          updateExistingVolunteering(
                            index,
                            "cause",
                            e.target.value
                          )
                        }
                        placeholder="Education, Environment, etc."
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor={`startDate-${index}`}>Start Date</Label>
                      <Input
                        id={`startDate-${index}`}
                        type="month"
                        value={vol.startDate}
                        onChange={(e) =>
                          updateExistingVolunteering(
                            index,
                            "startDate",
                            e.target.value
                          )
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`endDate-${index}`}>End Date</Label>
                      <Input
                        id={`endDate-${index}`}
                        type="month"
                        value={vol.endDate || ""}
                        onChange={(e) =>
                          updateExistingVolunteering(
                            index,
                            "endDate",
                            e.target.value
                          )
                        }
                        placeholder="Present"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`description-${index}`}>Description</Label>
                    <Textarea
                      id={`description-${index}`}
                      value={vol.description}
                      onChange={(e) =>
                        updateExistingVolunteering(
                          index,
                          "description",
                          e.target.value
                        )
                      }
                      rows={3}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Add new volunteering form */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            Add Volunteering Experience
          </CardTitle>
          <CardDescription>
            Add your community service and volunteer work
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Input
                id="role"
                name="role"
                value={newVolunteering.role}
                onChange={handleInputChange}
                placeholder="Volunteer Coordinator"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="organization">Organization</Label>
              <Input
                id="organization"
                name="organization"
                value={newVolunteering.organization}
                onChange={handleInputChange}
                placeholder="Red Cross"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="organizationProfileUrl">
                Organization URL (Optional)
              </Label>
              <Input
                id="organizationProfileUrl"
                name="organizationProfileUrl"
                value={newVolunteering.organizationProfileUrl || ""}
                onChange={handleInputChange}
                placeholder="https://organization.org"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="Cause">Cause</Label>
              <Input
                id="Cause"
                name="Cause"
                value={newVolunteering.cause}
                onChange={handleInputChange}
                placeholder="Education, Environment, etc."
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                name="startDate"
                type="month"
                value={newVolunteering.startDate}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                name="endDate"
                type="month"
                value={newVolunteering.endDate || ""}
                onChange={handleInputChange}
                placeholder="Present"
              />
              <p className="text-xs text-slate-500">
                Leave empty if currently volunteering
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={newVolunteering.description}
              onChange={handleInputChange}
              placeholder="Describe your responsibilities and achievements..."
              rows={3}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleAddVolunteering}
            disabled={
              !newVolunteering.role ||
              !newVolunteering.organization ||
              !newVolunteering.cause
            }
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Volunteering
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
