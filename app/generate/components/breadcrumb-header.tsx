"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronsUpDown } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { GenericHeader } from "@/components/generic-header";
import { routeMappings } from "@/config/breadcrumb-routes";

export function BreadcrumpHeader() {
  const pathname = usePathname();

  const searchParams = useSearchParams();
  const searchParamsString = searchParams.toString()
    ? `?${searchParams.toString()}`
    : "";

  const segments = pathname.split("/").filter(Boolean);

  // Get current section (should be the segment after "generate")
  const currentSection = segments.length > 1 ? segments[1] : null;

  // Get current subsection (if any)
  const currentSubsection = segments.length > 2 ? segments[2] : null;

  // Find the matching route mapping for the current section
  const currentMapping = routeMappings.find(
    (route) => route.path === currentSection
  );

  const currentSubmapping = currentMapping?.children?.find(
    (child) => child.path === currentSubsection
  );

  return (
    <GenericHeader>
      <div className="flex items-center justify-between flex-1 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex lg:flex-1">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href={`/${searchParamsString}`}
                  className="-m-1.5 p-1.5 font-semibold text-xl text-slate-900"
                >
                  built<span className="text-primary">any</span>cv
                </BreadcrumbLink>
              </BreadcrumbItem>

              {currentMapping && (
                <>
                  <BreadcrumbSeparator className="[&>svg]:w-5 [&>svg]:h-5" />
                  <BreadcrumbItem>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="flex items-center gap-1 px-2 py-1 rounded hover:bg-slate-100 text-base">
                        {currentMapping.label}
                        <ChevronsUpDown className="size-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
                        {routeMappings.map((route) => (
                          <DropdownMenuItem key={route.path} asChild>
                            <Link
                              href={`/generate/${route.path}${searchParamsString}`}
                            >
                              {route.label}
                            </Link>
                          </DropdownMenuItem>
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
                      <DropdownMenuTrigger className="flex items-center gap-1 px-2 py-1 rounded hover:bg-slate-100 text-base">
                        {currentSubmapping.label}
                        <ChevronsUpDown className="size-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
                        {currentMapping?.children?.map((subRoute) => (
                          <DropdownMenuItem key={subRoute.path} asChild>
                            <Link
                              href={`/generate/${currentMapping?.path}/${subRoute.path}${searchParamsString}`}
                            >
                              {subRoute.label}
                            </Link>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </BreadcrumbItem>
                </>
              )}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        {/* <div className="flex lg:hidden">
            <MobileHamburgerMenu navigation={mainNav} />
          </div> */}
        <div className="hidden lg:flex lg:items-center lg:gap-x-8">
          {/* <div className="flex gap-x-8">
            // Other links
            </div> */}
          <Button variant="outline" asChild>
            <Link href="/signin">Sign in</Link>
          </Button>
        </div>
      </div>
    </GenericHeader>
  );
}
