"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import BuiltAnyCVLogo from "@/components/logo";
import { ChevronsUpDown } from "lucide-react";

import { RouteMapping, routeMappings } from "@/config/breadcrumb-routes";

export default function BreadCrumb({
  className,
  ...props
}: React.ComponentProps<"nav">) {
  const pathname = usePathname();

  const searchParams = useSearchParams();
  const searchParamsString = searchParams.toString()
    ? `?${searchParams.toString()}`
    : "";

  const segments = pathname.split("/").filter(Boolean);

  const currentSection = segments.length > 1 ? segments[1] : null;

  const currentSubsection = segments.length > 2 ? segments[2] : null;

  const currentMapping = routeMappings.find(
    (route) => route.path === currentSection
  );

  const currentSubmapping = currentMapping?.children?.find(
    (child) => child.path === currentSubsection
  );

  // Helper function to determine the proper target path
  const getTargetFormatPath = (targetFormat: RouteMapping) => {
    // If we have a current subsection and the target format has it as a valid subsection
    if (
      currentSubsection &&
      targetFormat.children?.some((child) => child.path === currentSubsection)
    ) {
      return `/generate/${targetFormat.path}/${currentSubsection}${searchParamsString}`;
    }
    // Otherwise just go to the format's main path
    return `/generate/${targetFormat.path}${searchParamsString}`;
  };

  return (
    <Breadcrumb className={className} {...props}>
      <BreadcrumbList>
        <BreadcrumbItem className="hidden sm:inline-flex">
          <BreadcrumbLink asChild>
            <BuiltAnyCVLogo />
          </BreadcrumbLink>
        </BreadcrumbItem>

        {currentMapping && (
          <>
            <BreadcrumbSeparator className="hidden sm:block [&>svg]:w-5 [&>svg]:h-5" />
            <BreadcrumbItem>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1 px-2 py-1 rounded hover:bg-accent text-base">
                  {currentMapping.label}
                  <ChevronsUpDown className="size-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuLabel>Format</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {routeMappings.map((route) => (
                    <Link key={route.path} href={getTargetFormatPath(route)}>
                      <DropdownMenuCheckboxItem
                        checked={route.path === currentSection}
                        className="cursor-pointer"
                      >
                        {route.label}
                      </DropdownMenuCheckboxItem>
                    </Link>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>
          </>
        )}

        {currentSubmapping && (
          <>
            <BreadcrumbSeparator className="[&>svg]:w-5 [&>svg]:h-5" />
            <BreadcrumbItem>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1 px-2 py-1 rounded hover:bg-accent text-base">
                  {currentSubmapping.label}
                  <ChevronsUpDown className="size-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuLabel>Action</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {currentMapping?.children?.map((subRoute) => (
                    <Link
                      key={subRoute.path}
                      href={`/generate/${currentMapping?.path}/${subRoute.path}${searchParamsString}`}
                    >
                      <DropdownMenuCheckboxItem
                        checked={subRoute.path === currentSubsection}
                        className="cursor-pointer"
                      >
                        {subRoute.label}
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
