"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { useUserProfiles } from "@/hooks/use-profiles";
import { useSession } from "@/hooks/use-session";
import { buildQueryString } from "@/lib/utils";
import { ChevronsUpDown } from "lucide-react";

import { getTemplateById } from "@/components/templates/cv/cv-template-gate";
import { RouteMapping, routeMappings } from "@/config/breadcrumb-routes";
import { cvTemplates, websiteTemplates } from "@/config/templates";
import { useIsMobile } from "@/hooks/use-mobile";
import { TemplateId } from "@/lib/types";

export default function BreadCrumb({
  className,
  ...props
}: React.ComponentProps<"nav">) {
  const pathname = usePathname();
  const { isSignedIn } = useSession();
  const isMobile = useIsMobile();
  const {
    data: profiles,
    isLoading: isLoadingProfiles,
    refetch
  } = useUserProfiles();
  const searchParams = useSearchParams();
  const username = searchParams.get("username");
  const templateId = searchParams.get("templateId") as TemplateId;

  // expecting /generate/[format]/[action]
  const pathSegments = pathname.split("/").filter(Boolean);

  // Format (cv, website, etc.)
  const currentFormat = pathSegments.length > 1 ? pathSegments[1] : "";
  // Action (template, editor, etc.)
  const currentAction = pathSegments.length > 2 ? pathSegments[2] : undefined;

  // Get current format mapping from route config
  const formatConfig = routeMappings.find(
    (route) => route.path === currentFormat
  );

  /**
   * Finds the most appropriate action when switching between formats
   * If the target format supports the current action, that action is used
   * Otherwise, falls back to the first available action in the target format
   */
  const resolveActionForFormat = (
    targetFormat: RouteMapping
  ): string | undefined => {
    // Check if target format supports the current action
    const hasMatchingAction = targetFormat.children?.some(
      (action) => action.path === currentAction
    );

    // If it does, use current action; otherwise use the first available action
    return hasMatchingAction ? currentAction : targetFormat.children?.[0]?.path;
  };

  /**
   * Create a navigation URL for a given format and action
   */
  const createNavigationUrl = (
    format: string,
    action?: string,
    templateId?: string
  ) => {
    const basePath = `/generate/${format}`;
    const fullPath = action ? `${basePath}/${action}` : basePath;
    return `${fullPath}?${buildQueryString(searchParams, {
      exclude: !templateId ? ["templateId"] : undefined,
      set: templateId ? { templateId } : undefined
    })}`;
  };

  // Determine which items to show based on mobile status
  const showProfileDropdown = useMemo(
    () => isSignedIn && username && !isMobile,
    [isSignedIn, username, isMobile]
  );

  const showFormatDropdown = useMemo(
    () => formatConfig && (!isMobile || !currentAction),
    [formatConfig, isMobile, currentAction]
  );

  useEffect(() => {
    refetch?.();
  }, [refetch, username]);

  return (
    <Breadcrumb className={className} {...props}>
      <BreadcrumbList>
        {/* Profiles dropdown (only for authenticated desktop users) */}
        {showProfileDropdown && (
          <>
            <BreadcrumbSeparator className="hidden md:block [&>svg]:h-5 [&>svg]:w-5" />
            <BreadcrumbItem className="hidden md:block">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1 rounded px-2 py-1 text-base hover:bg-accent">
                  {username}
                  <ChevronsUpDown className="size-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuLabel>My Profiles</DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  {isLoadingProfiles ? (
                    <div className="p-2">
                      <Skeleton className="mb-2 h-5 w-32" />
                      <Skeleton className="h-5 w-28" />
                    </div>
                  ) : profiles && profiles.length > 0 ? (
                    profiles.map((profile) => (
                      <Link
                        key={profile._id}
                        href={`${pathname}?${buildQueryString(searchParams, {
                          set: { username: profile.username! }
                        })}`}
                      >
                        <DropdownMenuCheckboxItem
                          checked={
                            searchParams.get("username") === profile.username
                          }
                          className="cursor-pointer"
                        >
                          {profile.username ||
                            `${profile.firstName} ${profile.lastName}`}
                        </DropdownMenuCheckboxItem>
                      </Link>
                    ))
                  ) : (
                    // Empty state
                    <div className="p-2 text-sm text-muted-foreground">
                      No profiles yet
                    </div>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>
          </>
        )}

        {/* Format dropdown (CV, Website) - hidden on mobile if we have a template */}
        {showFormatDropdown && (
          <>
            <BreadcrumbSeparator className="[&>svg]:h-5 [&>svg]:w-5" />
            <BreadcrumbItem>
              <DropdownMenu>
                {isMobile ? (
                  <DropdownMenuTrigger>
                    <BreadcrumbEllipsis />
                  </DropdownMenuTrigger>
                ) : (
                  <DropdownMenuTrigger className="flex items-center gap-1 rounded px-2 py-1 text-base hover:bg-accent">
                    {formatConfig?.label || "Format"}
                    <ChevronsUpDown className="size-4" />
                  </DropdownMenuTrigger>
                )}
                <DropdownMenuContent align="start">
                  <DropdownMenuLabel>Format</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {routeMappings.map((formatOption) => {
                    return (
                      <Link
                        key={formatOption.path}
                        href={createNavigationUrl(
                          formatOption.path,
                          resolveActionForFormat(formatOption),
                          formatOption.path !== "choose"
                            ? templateId
                            : undefined
                        )}
                      >
                        <DropdownMenuCheckboxItem
                          checked={formatOption.path === currentFormat}
                          className="cursor-pointer"
                        >
                          {formatOption.label}
                        </DropdownMenuCheckboxItem>
                      </Link>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>
          </>
        )}

        {/* Template/Action dropdown - always show on mobile if available */}
        {formatConfig && currentAction && (
          <>
            <BreadcrumbSeparator className="[&>svg]:h-5 [&>svg]:w-5" />
            <BreadcrumbItem>
              <DropdownMenu>
                {isMobile ? (
                  <DropdownMenuTrigger>
                    <BreadcrumbEllipsis />
                  </DropdownMenuTrigger>
                ) : (
                  <DropdownMenuTrigger className="flex items-center gap-1 rounded px-2 py-1 text-base hover:bg-accent">
                    {currentAction === "editor" && templateId
                      ? getTemplateById(templateId)?.name
                      : "Select Template"}
                    <ChevronsUpDown className="size-4" />
                  </DropdownMenuTrigger>
                )}
                <DropdownMenuContent align="start">
                  <DropdownMenuLabel>Template</DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  {/* Select Template action */}
                  <Link href={createNavigationUrl(currentFormat, "template")}>
                    <DropdownMenuCheckboxItem
                      checked={currentAction === "template"}
                      className="cursor-pointer"
                    >
                      Select Template
                    </DropdownMenuCheckboxItem>
                  </Link>

                  {/* Available templates */}
                  {(currentFormat === "cv"
                    ? cvTemplates
                    : websiteTemplates
                  ).map((template: { id: TemplateId; name: string }) => (
                    <Link
                      key={template.id}
                      href={createNavigationUrl(
                        currentFormat,
                        "editor",
                        template.id
                      )}
                    >
                      <DropdownMenuCheckboxItem
                        checked={template.id === templateId}
                        className="cursor-pointer"
                      >
                        {template.name}
                      </DropdownMenuCheckboxItem>
                    </Link>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>
          </>
        )}

        {/* Editor label - desktop only */}
        {currentAction === "editor" && templateId && !isMobile && (
          <>
            <BreadcrumbSeparator className="[&>svg]:h-5 [&>svg]:w-5" />
            <BreadcrumbItem>
              <span className="flex cursor-default items-center gap-1 rounded px-2 py-1 text-base">
                Editor
              </span>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
