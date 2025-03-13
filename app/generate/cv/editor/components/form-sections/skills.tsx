"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";

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
import { EditorForm } from "./editor-form";
import { EditorTabName } from "@/config/editor-tabs";
import {
  editSkillsFormSchema,
  EditSkillsFormValues,
} from "../editor-forms-schemas";

export function SkillsForm({ tabName }: { tabName: EditorTabName }) {
  const profileData = useProfileStore((state) => state.profile);

  const initialValues: EditSkillsFormValues = {
    skills: profileData?.skills || [],
  };

  return (
    <EditorForm
      schema={editSkillsFormSchema}
      initialValues={initialValues}
      tabName={tabName}
    >
      <SkillsFormFields />
    </EditorForm>
  );
}

const SkillsFormFields = () => {
  const { watch, setValue } = useFormContext();
  const [newSkill, setNewSkill] = useState("");

  const skills: string[] = watch("skills");

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills?.includes(newSkill.trim())) {
      setValue("skills", [...skills, newSkill.trim()], {
        shouldDirty: true,
        shouldValidate: true,
      });
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setValue(
      "skills",
      skills.filter((s) => s !== skill),
      { shouldDirty: true, shouldValidate: true }
    );
  };

  return (
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
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddSkill();
                }
              }}
              placeholder="e.g., JavaScript, Project Management, UX Design"
            />
          </div>
          <Button onClick={handleAddSkill} disabled={!newSkill.trim()}>
            <Plus className="mr-2 h-4 w-4" />
            Add
          </Button>
        </div>

        {skills && skills.length > 0 && (
          <div>
            <Label className="mb-2 block text-sm font-medium">
              Your Skills
            </Label>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="flex items-center rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-800"
                >
                  {skill}
                  <button
                    onClick={() => handleRemoveSkill(skill)}
                    className="ml-2 rounded-full p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-700"
                    type="button"
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
  );
};
