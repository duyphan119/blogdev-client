"use client";

import React from "react";
import Logo from "../header/logo";
import { Separator } from "@/components/ui/separator";
import { moreFromBLDEV, others, socialMediaList } from "./data";
import Link from "next/link";
import useMainLayoutStore from "@/zustand/use-main-layout-store";

type Props = {};

const Footer = (props: Props) => {
    const { categoryParentList } = useMainLayoutStore();
    return (
        <footer className="bg-black text-white space-y-8 py-8">
            <div className="md:px-8 px-2 space-y-8">
                <div className="">
                    <Logo
                        mode="light"
                        letterClassName="text-lg px-1.5"
                        className="gap-1"
                    />
                </div>
                <p className="md:w-1/2 sm:w-2/3 w-full mx-auto text-center">
                    BLDEV is where tomorrow is realized. It is the essential
                    source of information and ideas that make sense of a world
                    in constant transformation. The BLDEV conversation
                    illuminates how technology is changing every aspect of our
                    lives—from culture to business, science to design. The
                    breakthroughs and innovations that we uncover lead to new
                    ways of thinking, new connections, and new industries.
                </p>
            </div>
            <Separator />
            <div className="md:px-8 sm:px-0 px-8 grid grid-cols-12 gap-y-8 md:gap-8">
                <div className="col-span-12 md:col-span-6">
                    <div className="uppercase font-bold">More from BLDEV</div>
                    <ul className="grid grid-cols-2">
                        {moreFromBLDEV.map((item) => {
                            return (
                                <li
                                    key={item.title}
                                    className="col-span-2 md:col-span-1"
                                >
                                    <Link
                                        href={item.href}
                                        title={item.title}
                                        className=" text-neutral-500 text-sm"
                                    >
                                        {item.displayText}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div className="col-span-12 md:col-span-6">
                    <div className="uppercase font-bold">Categories</div>
                    <ul className="grid grid-cols-2">
                        {categoryParentList.map((item) => {
                            return (
                                <li
                                    key={item.name}
                                    className="col-span-2 md:col-span-1"
                                >
                                    <Link
                                        href={`/article?cat=${item.slug}`}
                                        title={item.name}
                                        className=" text-neutral-500 text-sm"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
            <Separator />
            <div className="md:px-8 sm:px-0 px-8">
                <ul className="grid grid-cols-4">
                    {others.map((item) => {
                        return (
                            <li
                                key={item.title}
                                className="col-span-4 sm:col-span-2 md:col-span-1 "
                            >
                                <Link
                                    href={item.href}
                                    title={item.title}
                                    className="text-neutral-500 text-sm"
                                >
                                    {item.displayText}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <Separator />
            <div className="md:px-8 sm:px-0 px-8 grid grid-cols-12 md:gap-8 gap-y-8">
                <div className="col-span-12 md:col-span-9 text-sm text-neutral-500">
                    <p>
                        © 2024 Condé Nast. All rights reserved. Use of this site
                        constitutes acceptance of our&nbsp;
                        <Link
                            className="underline underline-offset-4"
                            href="https://www.condenast.com/user-agreement/"
                            rel="noopener"
                            target="_blank"
                        >
                            User Agreement
                        </Link>
                        &nbsp; and&nbsp;
                        <Link
                            className="underline underline-offset-4"
                            href="http://www.condenast.com/privacy-policy#privacypolicy"
                            rel="noopener"
                            target="_blank"
                        >
                            Privacy Policy and Cookie Statement
                        </Link>
                        &nbsp; and&nbsp;
                        <Link
                            className="underline underline-offset-4"
                            href="http://www.condenast.com/privacy-policy#privacypolicy-california"
                            rel="noopener"
                            target="_blank"
                        >
                            Your California Privacy Rights.
                        </Link>
                        &nbsp;
                        <em>WIRED</em> may earn a portion of sales from products
                        that are purchased through our site as part of our
                        Affiliate Partnerships with retailers. The material on
                        this site may not be reproduced, distributed,
                        transmitted, cached or otherwise used, except with the
                        prior written permission of Condé Nast.
                    </p>
                </div>
                <div className="col-span-12 md:col-span-3">
                    <ul className="flex flex-wrap gap-x-14 gap-y-6">
                        {socialMediaList.map((item) => {
                            const Icon = item.icon;
                            return (
                                <li key={item.title}>
                                    <Link href={item.href} title={item.title}>
                                        <Icon className="text-xl" />
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
