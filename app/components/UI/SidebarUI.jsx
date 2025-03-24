"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useMessageReadStatusContext } from "@/app/context/MessageReadStatusContext";

import menuItemIcons from "@/app/asset/navigation/index";
import { Badge } from "antd";
const SidebarUI = () => {
  const { notif } = useMessageReadStatusContext();
  const menuItems = [
    {
      label: "My Profile",
      href: "/dashboard",
      active: "dashboard",
      icon: menuItemIcons.profile,
    },

    {
      label: "My Properties",
      href: "/dashboard/properties",
      active: "properties",
      icon: menuItemIcons.properties,
    },
    {
      label: "My Bookmarks",
      href: "/dashboard/bookmarks",
      active: "bookmarks",
      icon: menuItemIcons.bookmarks,
    },
    {
      label: "Messages sent",
      href: "/dashboard/messages-sent",
      active: "messages-sent",
      icon: menuItemIcons["messages-sent"],
    },

    {
      label: "Logout",
      href: "logout",
      icon: menuItemIcons.logout,
    },
  ];

  const pathname = usePathname();

  const segment = pathname.split("/");
  const activeSegment = segment.length > 2 ? segment[2] : segment[1];

  return (
    <aside className="w-full max-md:hidden mt-3  ">
      <nav
        className="flex flex-col border rounded p-2  sticky top-24"
        aria-label="Sidebar Navigation"
      >
        {menuItems.map((item, i) => (
          <div key={item.label} className="px-5">
            <div
              className={`py-4 ${
                activeSegment === item.active ? "active-aside bg-blue-main" : ""
              } border-b ${i + 1 === menuItems.length && "border-none"} `}
            >
              <Link
                href={item.href}
                className="flex items-center text-sm relative"
                aria-current={
                  activeSegment === item.active ? "page" : undefined
                }
              >
                {notif && item.active === "messages-sent" && (
                <div className="absolute">
                    <Badge offset={[12, -12]} dot={1} />
                </div>
                )}
                {item.icon}
                <span>{item.label}</span>
              </Link>
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default SidebarUI;
