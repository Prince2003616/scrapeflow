"use client";
import { usePathname } from "next/navigation";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "./ui/breadcrumb";
import { MobileSidebar } from "./Side-Bar";

export const BreadcrumbHeader = () => {
  const pathName = usePathname();
  const paths = pathName === "/" ? [] : pathName.split("/").filter(Boolean);

  return (
    <div className="flex items-center justify-start gap-x-2">
      {/* Mobile Sidebar Button */}
      <MobileSidebar />

      {/* Breadcrumb Navigation */}
      <Breadcrumb>
        <BreadcrumbList>
          {/* Home Link */}
          <BreadcrumbItem>
            <BreadcrumbLink href="/" className="capitalize">Home</BreadcrumbLink>
          </BreadcrumbItem>

          {/* Dynamic Paths */}
          {paths.map((path, index) => {
            const fullPath = `/${paths.slice(0, index + 1).join("/")}`;
            return (
              <BreadcrumbItem key={fullPath}>
                <BreadcrumbLink href={fullPath} className="capitalize">
                  {path}
                </BreadcrumbLink>
              </BreadcrumbItem>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};
