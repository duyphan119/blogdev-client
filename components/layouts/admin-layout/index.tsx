"use client";

import roleApi from "@/api/role-api";
import AuthenticationWrapper from "@/components/auth/authentication-wrapper";
import useUserStore from "@/zustand/use-user-store";
import { redirect } from "next/navigation";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import Header from "./header";
import Sidebar from "./sidebar";
import { cn } from "@/lib/utils";
import ScrollToTop from "@/components/common/scroll-to-top";
import { Toaster } from "@/components/ui/toaster";
import DialogContainer from "@/components/common/dialog-container";

type Props = {
  children: ReactNode;
};

type ContentProps = {
  children: ReactNode;
};

const Content = (props: ContentProps) => {
  const { profile, isFetchedProfile } = useUserStore();

  const isMdScreen = useMediaQuery({ query: "(min-width: 768px)" });

  const [sidebarOpen, setSidebarOpen] = useState(isMdScreen);

  const handleToggleSidebar = () => {
    setSidebarOpen((state) => !state);
  };

  const handleClose = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  useEffect(() => {
    setSidebarOpen(isMdScreen);
  }, [isMdScreen]);

  if (!isFetchedProfile) return null;

  if (profile?.roles.findIndex((item) => item.name === "ADMIN") === -1)
    redirect("/login");
  else {
    return (
      <>
        <div className="flex flex-col min-h-screen">
          <Header onToggleSidebar={handleToggleSidebar} open={sidebarOpen} />
          <div className={cn("relative overflow-y-auto flex flex-1")}>
            <Sidebar open={sidebarOpen} onClose={handleClose} />
            <main className={`p-4 bg-lightgrey flex-1`}>
              <div className="h-full">{props.children}</div>
            </main>
          </div>
        </div>
        <ScrollToTop />
        <Toaster />
        <DialogContainer />
      </>
    );
  }
};

const AdminLayout = (props: Props) => {
  return (
    <AuthenticationWrapper>
      <Content>{props.children}</Content>
    </AuthenticationWrapper>
  );
};

export default AdminLayout;
