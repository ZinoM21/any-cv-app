"use client";

import type React from "react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Position } from "@/lib/types";

interface PositionFormProps {
  position: Position;
  onChange: (position: Position) => void;
  onRemove: () => void;
}

export function PositionForm({
  position,
  onChange,
  onRemove,
}: PositionFormProps) {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    onChange({
      ...position,
      [name]: value,
    });
  };

  const handleWorkSettingChange = (value: string) => {
    onChange({
      ...position,
      workSetting: value,
    });
  };

  // Calculate duration based on start and end dates
  const calculateDuration = () => {
    if (!position.startDate) return "";

    const start = new Date(position.startDate);
    const end = position.endDate ? new Date(position.endDate) : new Date();

    const months =
      (end.getFullYear() - start.getFullYear()) * 12 +
      (end.getMonth() - start.getMonth());

    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;

    let duration = "";
    if (years > 0) {
      duration += `${years} ${years === 1 ? "year" : "years"}`;
    }
    if (remainingMonths > 0) {
      duration += `${duration ? " " : ""}${remainingMonths} ${
        remainingMonths === 1 ? "month" : "months"
      }`;
    }

    return duration;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-slate-700">Position Details</h4>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 text-slate-400 hover:text-red-500"
          onClick={onRemove}
        >
          <Trash className="mr-1 h-3.5 w-3.5" />
          Remove
        </Button>
      </div>

      <div className="space-y-2">
        <Label htmlFor="title">Job Title</Label>
        <Input
          id="title"
          name="title"
          value={position.title}
          onChange={handleInputChange}
          placeholder="Senior Developer"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="startDate">Start Date</Label>
          <Input
            id="startDate"
            name="startDate"
            type="month"
            value={position.startDate}
            onChange={(e) => {
              handleInputChange(e);
              // Update duration when dates change
              const updatedPosition = {
                ...position,
                startDate: e.target.value,
                duration: calculateDuration(),
              };
              onChange(updatedPosition);
            }}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="endDate">End Date</Label>
          <Input
            id="endDate"
            name="endDate"
            type="month"
            value={position.endDate || ""}
            onChange={(e) => {
              handleInputChange(e);
              // Update duration when dates change
              const updatedPosition = {
                ...position,
                endDate: e.target.value,
                duration: calculateDuration(),
              };
              onChange(updatedPosition);
            }}
            placeholder="Present"
          />
          <p className="text-xs text-slate-500">
            Leave empty for current position
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Duration</Label>
        <Input
          value={position.duration || calculateDuration()}
          disabled
          className="bg-slate-50 text-slate-500"
        />
        <p className="text-xs text-slate-500">
          Automatically calculated based on dates
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="location">Location (Optional)</Label>
          <Input
            id="location"
            name="location"
            value={position.location || ""}
            onChange={handleInputChange}
            placeholder="New York, NY"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="workSetting">Work Setting (Optional)</Label>
          <Select
            value={position.workSetting || ""}
            onValueChange={handleWorkSettingChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select work setting" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="not-specified">Not specified</SelectItem>
              <SelectItem value="on-site">On-site</SelectItem>
              <SelectItem value="hybrid">Hybrid</SelectItem>
              <SelectItem value="remote">Remote</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={position.description}
          onChange={handleInputChange}
          placeholder="Describe your responsibilities and achievements..."
          rows={4}
        />
      </div>
    </div>
  );
}
