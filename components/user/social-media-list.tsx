"use client";

import { Author } from "@/types/user";
import Link from "next/link";
import {
    RiFacebookLine,
    RiGithubLine,
    RiLinkedinLine,
    RiPinterestLine,
    RiTwitterXLine,
    RiYoutubeLine,
} from "react-icons/ri";

type Props = {
    author: Author;
};

const SocialMediaList = ({ author }: Props) => {
    return (
        <ul className="flex gap-4">
            {!author.facebook_url && (
                <li className="">
                    <Link href={author.facebook_url} title="Facebook">
                        <RiFacebookLine className="text-2xl -translate-y-0.5" />
                    </Link>
                </li>
            )}
            {!author.twitter_url && (
                <li className="">
                    <Link href={author.twitter_url} title="Twitter">
                        <RiTwitterXLine className="text-2xl -translate-y-0.5" />
                    </Link>
                </li>
            )}
            {!author.pinterest_url && (
                <li className="">
                    <Link href={author.pinterest_url} title="Pinterest">
                        <RiPinterestLine className="text-2xl -translate-y-0.5" />
                    </Link>
                </li>
            )}
            {!author.youtube_url && (
                <li className="">
                    <Link href={author.youtube_url} title="Youtube">
                        <RiYoutubeLine className="text-2xl -translate-y-0.5" />
                    </Link>
                </li>
            )}
            {!author.github_url && (
                <li className="">
                    <Link href={author.github_url} title="Github">
                        <RiGithubLine className="text-2xl -translate-y-0.5" />
                    </Link>
                </li>
            )}
            {!author.linkedin_url && (
                <li className="">
                    <Link href={author.linkedin_url} title="Linkedin">
                        <RiLinkedinLine className="text-2xl -translate-y-0.5" />
                    </Link>
                </li>
            )}
        </ul>
    );
};

export default SocialMediaList;
