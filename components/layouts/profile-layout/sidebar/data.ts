import { RiLogoutBoxRLine, RiNewspaperLine, RiUser2Line } from "react-icons/ri";

export const sidebarItems = [
    {
        title: "Account Information",
        displayText: "Account Information",
        href: "/profile",
        isSignOutBtn: false,
        icon: RiUser2Line,
    },
    {
        title: "My Articles",
        displayText: "My Articles",
        href: "/profile/article",
        isSignOutBtn: false,
        icon: RiNewspaperLine,
    },
    {
        title: "Log out",
        displayText: "Log out",
        isSignOutBtn: false,
        icon: RiLogoutBoxRLine,
    },
];
