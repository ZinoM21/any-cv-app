"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Trash, Upload } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Education } from "@/lib/types";
import { useProfileStore } from "@/hooks/use-profile";

export function EducationForm() {
  const profileData = useProfileStore((state) => state.profile);
  const setProfileData = useProfileStore((state) => state.setProfile);

  const [newEducation, setNewEducation] = useState<Education>({
    school: "",
    schoolProfileUrl: "",
    schoolPictureUrl: "",
    degree: "",
    fieldOfStudy: "",
    startDate: "",
    endDate: "",
    grade: "",
    activities: null,
    description: null,
  });

  const handleAddEducation = () => {
    if (newEducation.school && newEducation.degree) {
      setProfileData({
        ...profileData,
        education: [...profileData?.education, newEducation],
      });
      setNewEducation({
        school: "",
        schoolProfileUrl: "",
        schoolPictureUrl: "",
        degree: "",
        fieldOfStudy: "",
        startDate: "",
        endDate: "",
        grade: "",
        activities: null,
        description: null,
      });
    }
  };

  const handleRemoveEducation = (index: number) => {
    setProfileData({
      ...profileData,
      education: profileData?.education.filter((_, i) => i !== index),
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewEducation({
      ...newEducation,
      [name]: value,
    });
  };

  const handleSchoolPictureUpload = () => {
    // In a real app, this would open a file picker and handle the upload
    const url = prompt("Enter URL for school picture (for demo purposes):");
    if (url) {
      setNewEducation({
        ...newEducation,
        schoolPictureUrl: url,
      });
    }
  };

  const updateExistingEducation = (
    index: number,
    field: string,
    value: string
  ) => {
    const updatedEducation = [...profileData?.education];
    updatedEducation[index] = {
      ...updatedEducation[index],
      [field]: value,
    };
    setProfileData({
      ...profileData,
      education: updatedEducation,
    });
  };

  const handleExistingSchoolPictureUpload = (index: number) => {
    // In a real app, this would open a file picker and handle the upload
    const url = prompt("Enter URL for school picture (for demo purposes):");
    if (url) {
      updateExistingEducation(index, "schoolPictureUrl", url);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-900">Education</h2>

      {/* Existing education entries */}
      {profileData?.education.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-slate-500">
            Added Education
          </h3>

          {profileData?.education.map((edu, index) => (
            <Card key={index}>
              <CardHeader className="p-4 pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {edu.schoolPictureUrl ? (
                      <div className="h-10 w-10 overflow-hidden rounded-md bg-slate-100">
                        <img
                          src={edu.schoolPictureUrl || "/placeholder.svg"}
                          alt={edu.school}
                          className="h-full w-full object-contain"
                        />
                      </div>
                    ) : null}
                    <div>
                      <CardTitle className="text-base">{edu.degree}</CardTitle>
                      <CardDescription>{edu.school}</CardDescription>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-slate-400 hover:text-red-500"
                    onClick={() => handleRemoveEducation(index)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="px-4 pb-4 pt-0 text-sm text-slate-600">
                <div className="grid gap-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor={`school-${index}`}>School</Label>
                      <Input
                        id={`school-${index}`}
                        value={edu.school}
                        onChange={(e) =>
                          updateExistingEducation(
                            index,
                            "school",
                            e.target.value
                          )
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`schoolProfileUrl-${index}`}>
                        School Profile URL (Optional)
                      </Label>
                      <Input
                        id={`schoolProfileUrl-${index}`}
                        value={edu.schoolProfileUrl || ""}
                        onChange={(e) =>
                          updateExistingEducation(
                            index,
                            "schoolProfileUrl",
                            e.target.value
                          )
                        }
                        placeholder="https://university.edu"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>School Picture (Optional)</Label>
                    <div className="flex items-center gap-4">
                      {edu.schoolPictureUrl ? (
                        <div className="h-16 w-16 overflow-hidden rounded-md bg-slate-100">
                          <img
                            src={edu.schoolPictureUrl || "/placeholder.svg"}
                            alt={edu.school}
                            className="h-full w-full object-contain"
                          />
                        </div>
                      ) : (
                        <div className="flex h-16 w-16 items-center justify-center rounded-md border-2 border-dashed border-slate-200 bg-slate-50 text-slate-400">
                          Logo
                        </div>
                      )}

                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => handleExistingSchoolPictureUpload(index)}
                      >
                        Change Picture
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor={`degree-${index}`}>Degree</Label>
                      <Input
                        id={`degree-${index}`}
                        value={edu.degree}
                        onChange={(e) =>
                          updateExistingEducation(
                            index,
                            "degree",
                            e.target.value
                          )
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`fieldOfStudy-${index}`}>
                        Field of Study (Optional)
                      </Label>
                      <Input
                        id={`fieldOfStudy-${index}`}
                        value={edu.fieldOfStudy || ""}
                        onChange={(e) =>
                          updateExistingEducation(
                            index,
                            "fieldOfStudy",
                            e.target.value
                          )
                        }
                        placeholder="Computer Science"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor={`startDate-${index}`}>Start Date</Label>
                      <Input
                        id={`startDate-${index}`}
                        type="month"
                        value={edu.startDate}
                        onChange={(e) =>
                          updateExistingEducation(
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
                        value={edu.endDate || ""}
                        onChange={(e) =>
                          updateExistingEducation(
                            index,
                            "endDate",
                            e.target.value
                          )
                        }
                        placeholder="Present"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`grade-${index}`}>Grade (Optional)</Label>
                      <Input
                        id={`grade-${index}`}
                        value={edu.grade || ""}
                        onChange={(e) =>
                          updateExistingEducation(
                            index,
                            "grade",
                            e.target.value
                          )
                        }
                        placeholder="3.8 GPA"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`activities-${index}`}>
                      Activities (Optional)
                    </Label>
                    <Textarea
                      id={`activities-${index}`}
                      value={edu.activities || ""}
                      onChange={(e) =>
                        updateExistingEducation(
                          index,
                          "activities",
                          e.target.value
                        )
                      }
                      placeholder="Clubs, sports, honors societies, etc."
                      rows={2}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`description-${index}`}>
                      Description (Optional)
                    </Label>
                    <Textarea
                      id={`description-${index}`}
                      value={edu.description || ""}
                      onChange={(e) =>
                        updateExistingEducation(
                          index,
                          "description",
                          e.target.value
                        )
                      }
                      placeholder="Additional details about your education"
                      rows={3}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Add new education form */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Add Education</CardTitle>
          <CardDescription>Add your educational background</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="school">School</Label>
              <Input
                id="school"
                name="school"
                value={newEducation.school}
                onChange={handleInputChange}
                placeholder="Harvard University"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="schoolProfileUrl">
                School Profile URL (Optional)
              </Label>
              <Input
                id="schoolProfileUrl"
                name="schoolProfileUrl"
                value={newEducation.schoolProfileUrl || ""}
                onChange={handleInputChange}
                placeholder="https://university.edu"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>School Picture (Optional)</Label>
            <div className="flex items-center gap-4">
              {newEducation.schoolPictureUrl ? (
                <div className="h-16 w-16 overflow-hidden rounded-md bg-slate-100">
                  <img
                    src={newEducation.schoolPictureUrl || "/placeholder.svg"}
                    alt={newEducation.school}
                    className="h-full w-full object-contain"
                  />
                </div>
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-md border-2 border-dashed border-slate-200 bg-slate-50 text-slate-400">
                  Logo
                </div>
              )}

              <Button
                type="button"
                variant="outline"
                onClick={handleSchoolPictureUpload}
              >
                <Upload className="mr-2 h-4 w-4" />
                Upload Picture
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="degree">Degree</Label>
              <Input
                id="degree"
                name="degree"
                value={newEducation.degree}
                onChange={handleInputChange}
                placeholder="Bachelor of Science"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fieldOfStudy">Field of Study (Optional)</Label>
              <Input
                id="fieldOfStudy"
                name="fieldOfStudy"
                value={newEducation.fieldOfStudy || ""}
                onChange={handleInputChange}
                placeholder="Computer Science"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                name="startDate"
                type="month"
                value={newEducation.startDate}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                name="endDate"
                type="month"
                value={newEducation.endDate || ""}
                onChange={handleInputChange}
                placeholder="Present"
              />
              <p className="text-xs text-slate-500">
                Leave empty if still studying
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="grade">Grade (Optional)</Label>
              <Input
                id="grade"
                name="grade"
                value={newEducation.grade || ""}
                onChange={handleInputChange}
                placeholder="3.8 GPA"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="activities">Activities (Optional)</Label>
            <Textarea
              id="activities"
              name="activities"
              value={newEducation.activities || ""}
              onChange={handleInputChange}
              placeholder="Clubs, sports, honors societies, etc."
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              name="description"
              value={newEducation.description || ""}
              onChange={handleInputChange}
              placeholder="Additional details about your education"
              rows={3}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleAddEducation}
            disabled={!newEducation.school || !newEducation.degree}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Education
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
