import { RiLogoutBoxRLine, RiUser2Line } from "react-icons/ri";

export const sidebarItems = [
    {
        title: "Account Information",
        displayText: "Account Information",
        href: "/profile",
        isSignOutBtn: false,
        icon: RiUser2Line,
    },
    {
        title: "Log out",
        displayText: "Log out",
        isSignOutBtn: false,
        icon: RiLogoutBoxRLine,
    },
];
