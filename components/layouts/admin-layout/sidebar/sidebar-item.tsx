"use client";

import authApi from "@/api/auth-api";
import { cn } from "@/lib/utils";
import { deleteCookie } from "cookies-next";
import { usePathname, useRouter } from "next/navigation";
import { Fragment, useState } from "react";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { Item } from ".";
import { useMediaQuery } from "react-responsive";

type Props = {
  item: Item;
  sidebarOpen: boolean;
};

const SidebarItem = ({ item, sidebarOpen }: Props) => {
  const isMdScreen = useMediaQuery({
    query: "(min-width: 768px)",
  });

  const pathname = usePathname();

  const router = useRouter();

  const Icon = item.icon;

  const [menuVisible, setMenuVisible] = useState(false);

  const handleItemClick = () => {
    if (item.children && item.children.length > 0)
      setMenuVisible((state) => !state);
    if (item.href) {
      router.push(item.href);
    }
  };

  const handleSubItemClick = async (subItem: Item) => {
    if (subItem.href) {
      router.push(subItem.href);
    } else {
      if (subItem.title === "Log Out") {
        try {
          const isLogged = await authApi.logout();
          if (isLogged) {
            deleteCookie("accessToken");
            router.push("/");
          }
        } catch (error) {}
      }
    }
  };

  const hasChildren = !!(item.children && item.children.length > 0);
  const isActive = !hasChildren && pathname === item.href;

  return (
    <>
      <div
        onClick={handleItemClick}
        className={cn(
          "flex items-center p-2 gap-2 text-primary dark:text-primary cursor-pointer border ",
          sidebarOpen && isMdScreen ? "" : "justify-center",
          hasChildren &&
            (!sidebarOpen || (sidebarOpen && !isMdScreen)) &&
            "hidden",
          isActive
            ? "border-muted-foreground bg-muted-foreground text-primary-foreground"
            : "border-transparent hover:border-muted-foreground hover:bg-muted-foreground hover:text-primary-foreground"
        )}
        title={item.title}
      >
        {!hasChildren && <Icon className="text-2xl" />}
        {sidebarOpen && isMdScreen && (
          <div className="flex-1">{item.label}</div>
        )}
        {hasChildren &&
          sidebarOpen &&
          (menuVisible ? (
            <RiArrowDropUpLine className="text-2xl ml-2" />
          ) : (
            <RiArrowDropDownLine className="text-2xl ml-2" />
          ))}
      </div>
      {hasChildren &&
      (menuVisible || !sidebarOpen || (sidebarOpen && !isMdScreen)) ? (
        <ul className="flex flex-col md:gap-0.5 gap-2 text-primary dark:text-primary bg-muted">
          {(item.children as Item[]).map((child, indexChild) => {
            const Icon = child.icon || Fragment;
            const isActive = pathname === child.href;
            return (
              <li key={indexChild}>
                <button
                  className={cn(
                    "flex items-center gap-2 p-2 hover:rounded-sm w-full border text-primary dark:text-primary rounded-md",
                    sidebarOpen && isMdScreen ? "ml-2" : "justify-center",
                    isActive
                      ? "border-muted-foreground bg-muted-foreground text-primary-foreground"
                      : "border-transparent hover:border-muted-foreground hover:bg-muted-foreground hover:text-primary-foreground"
                  )}
                  title={child.title}
                  onClick={() => handleSubItemClick(child)}
                >
                  <Icon className="text-2xl" />
                  {sidebarOpen && isMdScreen ? child.label : ""}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </>
  );
};

export default SidebarItem;
