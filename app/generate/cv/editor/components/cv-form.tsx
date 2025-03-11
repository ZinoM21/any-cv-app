"use client";

import { useState } from "react";

import { SummaryForm } from "./form-sections/summary";
import { ExperienceForm } from "./form-sections/experience";
import { EducationForm } from "./form-sections/education";
import { SkillsForm } from "./form-sections/skills";
import { VolunteeringForm } from "./form-sections/volunteering";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Save } from "lucide-react";
import Link from "next/link";

export function CVForm({ username }: { username: string }) {
  const [activeTab, setActiveTab] = useState("summary");

  const handleSave = () => {
    // In a real app, this would save to a database
    alert("CV data saved successfully!");
  };

  const handleDownload = () => {
    // In a real app, this would generate and download a PDF
    alert("Downloading PDF...");
  };

  return (
    <div className="flex h-full flex-col border-r">
      {/* Header */}
      <div className="z-10 flex items-center justify-between border-b p-4">
        <div className="flex items-center gap-2">
          <Link
            href={`/generate/cv/template?username=${username}`}
            className="rounded-full p-1 hover:bg-slate-100"
          >
            <ArrowLeft className="size-5" />
          </Link>
          <h1 className="text-xl font-semibold text-slate-900">Edit Your CV</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Save
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6 w-full">
              <TabsTrigger value="summary" className="grow min-w-0 px-1">
                <span className="overflow-hidden text-ellipsis">Summary</span>
              </TabsTrigger>
              <TabsTrigger value="experience" className="grow min-w-0 px-1">
                <span className="overflow-hidden text-ellipsis">
                  Experience
                </span>
              </TabsTrigger>
              <TabsTrigger value="education" className="grow min-w-0 px-1">
                <span className="overflow-hidden text-ellipsis">Education</span>
              </TabsTrigger>
              <TabsTrigger value="skills" className="grow min-w-0 px-1">
                <span className="overflow-hidden text-ellipsis">Skills</span>
              </TabsTrigger>
              <TabsTrigger value="volunteering" className="grow min-w-0 px-1">
                <span className="overflow-hidden text-ellipsis">
                  Volunteering
                </span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="summary">
              <SummaryForm changeToNextTab={(value) => setActiveTab(value || "experience")} activeTab={activeTab} />
            </TabsContent>

            <TabsContent value="experience">
              <ExperienceForm />
              <div className="mt-6 flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setActiveTab("summary")}
                >
                  Back
                </Button>
                <Button onClick={() => setActiveTab("education")}>
                  Next: Education
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="education">
              <EducationForm />
              <div className="mt-6 flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setActiveTab("experience")}
                >
                  Back
                </Button>
                <Button onClick={() => setActiveTab("skills")}>
                  Next: Skills
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="skills">
              <SkillsForm />
              <div className="mt-6 flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setActiveTab("education")}
                >
                  Back
                </Button>
                <Button onClick={() => setActiveTab("volunteering")}>
                  Next: Volunteering
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="volunteering">
              <VolunteeringForm />
              <div className="mt-6 flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setActiveTab("skills")}
                >
                  Back
                </Button>
                <Button onClick={handleSave}>Save CV</Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
