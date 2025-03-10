"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";
import { useProfileStore } from "@/hooks/use-profile";
import { getTemplateById } from "@/config/templates";

export function CVPreview({ templateId }: { templateId: string }) {
  const profileData = useProfileStore((state) => state.profile);

  const template = getTemplateById(templateId);

  const [zoomLevel, setZoomLevel] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 1; // Would be calculated based on content in a real app

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 25, 200));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 25, 50));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="flex h-full flex-col">
      {/* Preview toolbar */}
      <div className="z-10 flex items-center justify-between border-b bg-white p-4">
        <h2 className="text-lg font-medium text-slate-900">
          Preview for {profileData?.firstName}&apos;s {template?.name} CV{" "}
        </h2>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handleZoomOut}
            disabled={zoomLevel <= 50}
          >
            <ZoomOut className="size-4" />
          </Button>
          <span className="text-sm text-slate-600">{zoomLevel}%</span>
          <Button
            variant="outline"
            size="icon"
            onClick={handleZoomIn}
            disabled={zoomLevel >= 200}
          >
            <ZoomIn className="size-4" />
          </Button>
        </div>
      </div>

      {/* PDF preview area */}
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col p-6">
          <div className="mx-auto mb-4 flex justify-center">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={handlePrevPage}
                disabled={currentPage <= 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm text-slate-600">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={handleNextPage}
                disabled={currentPage >= totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div
            className="flex-1"
            style={{ padding: `${Math.max(0, (100 - zoomLevel) / 2)}% 0` }}
          >
            <div
              className="mx-auto transition-all duration-200 ease-in-out"
              style={{ width: `${zoomLevel}%`, maxWidth: "1000px" }}
            >
              {/* For demo purposes, we're rendering a mocked-up CV preview */}
              {/* In a real app, this would be a dynamically generated PDF or HTML-to-PDF view */}
              <div className="aspect-[1/1.414] w-full overflow-hidden rounded-md bg-white shadow-lg">
                <div className="p-8">
                  {/* Header */}
                  <div className="mb-6 border-b border-slate-200 pb-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h1 className="text-3xl font-bold text-slate-900">
                          {profileData?.firstName} {profileData?.lastName}
                        </h1>
                        <p className="mt-1 text-lg text-slate-600">
                          {profileData?.jobTitle}
                        </p>
                        <p className="mt-4 text-sm text-slate-500">
                          {profileData?.headline}
                        </p>
                      </div>
                      {profileData?.profilePictureUrl && (
                        <div className="h-24 w-24 overflow-hidden rounded-full bg-slate-200">
                          {/* Would be an actual image in a real app */}
                          <div className="h-full w-full bg-slate-300"></div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* About section */}
                  {profileData?.about && (
                    <div className="mb-6">
                      <h2 className="mb-2 text-lg font-semibold text-slate-900">
                        About
                      </h2>
                      <p className="text-sm text-slate-600">
                        {profileData?.about}
                      </p>
                    </div>
                  )}

                  {/* Experience section */}
                  {profileData?.experiences.length > 0 && (
                    <div className="mb-6">
                      <h2 className="mb-3 text-lg font-semibold text-slate-900">
                        Experience
                      </h2>
                      <div className="space-y-4">
                        {profileData?.experiences.map((exp, index) => (
                          <div
                            key={index}
                            className="border-l-2 border-slate-200 pl-4"
                          >
                            <h3 className="text-md font-medium text-slate-900">
                              {exp.positions[0]?.title}
                            </h3>
                            <p className="text-sm text-slate-600">
                              {exp.company}
                            </p>
                            <p className="text-xs text-slate-500">
                              {exp.positions[0]?.startDate} -{" "}
                              {exp.positions[0]?.endDate || "Present"}
                            </p>
                            <p className="mt-1 text-sm text-slate-600">
                              {exp.positions[0]?.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Education section */}
                  {profileData?.education.length > 0 && (
                    <div className="mb-6">
                      <h2 className="mb-3 text-lg font-semibold text-slate-900">
                        Education
                      </h2>
                      <div className="space-y-4">
                        {profileData?.education.map((edu, index) => (
                          <div
                            key={index}
                            className="border-l-2 border-slate-200 pl-4"
                          >
                            <h3 className="text-md font-medium text-slate-900">
                              {edu.degree}
                            </h3>
                            <p className="text-sm text-slate-600">
                              {edu.school}
                            </p>
                            <p className="text-xs text-slate-500">
                              {edu.startDate} - {edu.endDate || "Present"}
                            </p>
                            <p className="mt-1 text-sm text-slate-600">
                              {edu.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Skills section */}
                  {profileData?.skills.length > 0 && (
                    <div className="mb-6">
                      <h2 className="mb-3 text-lg font-semibold text-slate-900">
                        Skills
                      </h2>
                      <div className="flex flex-wrap gap-2">
                        {profileData?.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Volunteering section */}
                  {profileData?.volunteering.length > 0 && (
                    <div className="mb-6">
                      <h2 className="mb-3 text-lg font-semibold text-slate-900">
                        Volunteering
                      </h2>
                      <div className="space-y-4">
                        {profileData?.volunteering.map((vol, index) => (
                          <div
                            key={index}
                            className="border-l-2 border-slate-200 pl-4"
                          >
                            <h3 className="text-md font-medium text-slate-900">
                              {vol.role}
                            </h3>
                            <p className="text-sm text-slate-600">
                              {vol.organization}
                            </p>
                            <p className="text-xs text-slate-500">
                              {vol.startDate} - {vol.endDate || "Present"}
                            </p>
                            <p className="mt-1 text-sm text-slate-600">
                              {vol.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
