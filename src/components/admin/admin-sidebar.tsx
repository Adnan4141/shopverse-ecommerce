"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PlusCircle, List, Package, Database } from "lucide-react";
import { cn } from "@/lib/utils";

export const AdminSidebar = () => {
  const pathname = usePathname();

  const links = [
    {
      name: "Add Items",
      href: "/admin/add",
      icon: PlusCircle,
    },
    {
      name: "List Items",
      href: "/admin/list",
      icon: List,
    },
    {
      name: "Orders",
      href: "/admin/orders",
      icon: Package,
    },
    {
      name: "Seed Data",
      href: "/admin/seed",
      icon: Database,
    },
  ];

  return (
    <div className="w-[18%] min-h-screen border-r-2 border-gray-100 bg-white">
      <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">
        {links.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2.5 rounded-l text-sm font-medium transition-colors",
                isActive
                  ? "bg-[#ffebf5] border-[#c586a5] text-pink-700"
                  : "text-gray-700 hover:bg-gray-50"
              )}
            >
              <Icon className="w-5 h-5 shrink-0" />
              <p className="hidden md:block whitespace-nowrap">{item.name}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
