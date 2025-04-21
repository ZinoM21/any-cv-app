"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

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

import { RouteMapping, routeMappings } from "@/config/breadcrumb-routes";

export default function BreadCrumb({
  className,
  ...props
}: React.ComponentProps<"nav">) {
  const pathname = usePathname();
  const { isSignedIn } = useSession();
  const { data: profiles, isLoading: isLoadingProfiles } = useUserProfiles();
  const searchParams = useSearchParams();
  const username = searchParams.get("username");

  // expecting /generate/[format]/[action]
  const pathSegments = pathname.split("/").filter(Boolean);

  // Format (cv, website, etc.)
  const currentFormat = pathSegments.length > 1 ? pathSegments[1] : "";
  // Action (template, editor, etc.)
  const currentAction = pathSegments.length > 2 ? pathSegments[2] : "";

  // Get current format mapping from route config
  const formatConfig = routeMappings.find(
    (route) => route.path === currentFormat
  );

  // Get current action from format's available actions
  const actionConfig = formatConfig?.children?.find(
    (child) => child.path === currentAction
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
  const createNavigationUrl = (format: string, action?: string) => {
    const basePath = `/generate/${format}`;
    const fullPath = action ? `${basePath}/${action}` : basePath;
    return `${fullPath}?${buildQueryString(searchParams)}`;
  };

  return (
    <Breadcrumb className={className} {...props}>
      <BreadcrumbList>
        {/* Profiles dropdown (only for authenticated users) */}
        {isSignedIn && username && (
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
                          set: { username: profile.username }
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

        {/* Format dropdown (CV, Website) */}
        {formatConfig && (
          <>
            <BreadcrumbSeparator className="[&>svg]:h-5 [&>svg]:w-5" />
            <BreadcrumbItem>
              <DropdownMenu>
                <DropdownMenuTrigger className="hidden items-center gap-1 rounded px-2 py-1 text-base hover:bg-accent sm:flex">
                  {formatConfig.label}
                  <ChevronsUpDown className="size-4" />
                </DropdownMenuTrigger>
                <DropdownMenuTrigger className="sm:hidden">
                  <BreadcrumbEllipsis />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuLabel>Format</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {routeMappings.map((formatOption) => {
                    return (
                      <Link
                        key={formatOption.path}
                        href={createNavigationUrl(
                          formatOption.path,
                          resolveActionForFormat(formatOption)
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

        {/* Action dropdown (Template, Editor) */}
        {actionConfig &&
          formatConfig?.children &&
          formatConfig.children.length > 0 && (
            <>
              <BreadcrumbSeparator className="[&>svg]:h-5 [&>svg]:w-5" />
              <BreadcrumbItem>
                <DropdownMenu>
                  <DropdownMenuTrigger className="hidden items-center gap-1 rounded px-2 py-1 text-base hover:bg-accent sm:flex">
                    {actionConfig.label}
                    <ChevronsUpDown className="size-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuTrigger className="sm:hidden">
                    <BreadcrumbEllipsis />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuLabel>Action</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {formatConfig.children.map((actionOption) => (
                      <Link
                        key={actionOption.path}
                        href={createNavigationUrl(
                          currentFormat,
                          actionOption.path
                        )}
                      >
                        <DropdownMenuCheckboxItem
                          checked={actionOption.path === currentAction}
                          className="cursor-pointer"
                        >
                          {actionOption.label}
                        </DropdownMenuCheckboxItem>
                      </Link>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </BreadcrumbItem>
            </>
          )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
