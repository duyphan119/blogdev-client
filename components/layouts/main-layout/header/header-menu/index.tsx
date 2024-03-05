"use client";

import { Separator } from "@/components/ui/separator";
import useMainLayoutStore from "@/zustand/use-main-layout-store";
import useUserStore from "@/zustand/use-user-store";
import { setCookie } from "cookies-next";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {};

const HeaderMenu = (props: Props) => {
    const pathname = usePathname();

    const { categoryParentList } = useMainLayoutStore();
    const { profile, isFetchedProfile } = useUserStore();

    return (
        <div className="fixed top-16 bottom-0 left-0 right-0 z-[11] bg-primary-foreground dark:bg-primary-foreground text-primary dark:text-primary space-y-4 p-8 border-t border-t-border">
            <ul className="space-y-4">
                {categoryParentList.map((item) => {
                    return (
                        <li key={item.id}>
                            <Link
                                href={`/article?cat=${item.slug}`}
                                className="text-3xl font-bold hover:underline underline-offset-4"
                            >
                                {item.name}
                            </Link>
                        </li>
                    );
                })}
                <Separator />
                <li>
                    <Link
                        href="/"
                        className="font-light hover:underline underline-offset-4"
                    >
                        Home
                    </Link>
                </li>
                <li>
                    <Link
                        href="/search"
                        className="font-light hover:underline underline-offset-4"
                    >
                        Search
                    </Link>
                </li>
                {isFetchedProfile &&
                    (profile ? (
                        <li>
                            <Link
                                href="/profile"
                                className="font-light hover:underline underline-offset-4"
                            >
                                Account Information
                            </Link>
                        </li>
                    ) : (
                        <li>
                            <Link
                                href="/login"
                                onClick={() => {
                                    setCookie("prevPage", pathname);
                                }}
                                className="font-light hover:underline underline-offset-4"
                            >
                                Sign In
                            </Link>
                        </li>
                    ))}
                <li>
                    <Link
                        href="/contact"
                        className="font-light hover:underline underline-offset-4"
                    >
                        Contact
                    </Link>
                </li>
                <li>
                    <Link
                        href="/about"
                        className="font-light hover:underline underline-offset-4"
                    >
                        About
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default HeaderMenu;
