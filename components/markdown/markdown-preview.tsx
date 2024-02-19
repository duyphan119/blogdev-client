"use client";

import { icons } from "@/lib/icon";
import React from "react";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";

import "highlight.js/styles/atom-one-dark.min.css";
import { cn } from "@/lib/utils";
import { PiTerminalThin } from "react-icons/pi";
import CopyButton from "./copy-button";

export default function MarkdownPreview({
    content,
    className = "sm:p-10",
}: {
    content: string;
    className?: string;
}) {
    return (
        <Markdown
            className={cn("dark:text-gray-200 space-y-8", className)}
            rehypePlugins={[rehypeHighlight]}
            components={{
                h1: ({ node, ...props }) => {
                    return <h1 {...props} className="text-3xl font-bold" />;
                },
                h2: ({ node, ...props }) => {
                    return (
                        <h2
                            {...props}
                            className="text-2xl font-bold mt-10 mb-10"
                        />
                    );
                },
                h3: ({ node, ...props }) => {
                    return (
                        <h3
                            {...props}
                            className="text-xl font-bold mt-10 mb-10"
                        />
                    );
                },
                code: ({ node, className, children, ...props }) => {
                    const match = /language-(\w+)/.exec(className || "");
                    const id = (Math.floor(Math.random() * 100) + 1).toString();
                    if (match?.length) {
                        let Icon = PiTerminalThin;
                        const isMatch = icons.hasOwnProperty(match[1]);
                        if (isMatch) {
                            Icon = icons[match[1] as keyof typeof icons];
                        }

                        return (
                            <div className=" bg-neutral-700 text-gray-300 border-[0.5px] rounded-md border-zinc-500">
                                <div className="flex items-center justify-between px-5 py-2 border-b-[0.5px] border-zinc-500">
                                    <div className="flex items-center gap-2">
                                        <Icon />
                                        <p className="text-sm text-gray-300">
                                            {/* @ts-ignore  */}
                                            {node?.data?.meta}
                                        </p>
                                    </div>
                                    <CopyButton id={id} />
                                </div>
                                <div className="overflow-x-auto w-full">
                                    <div className="p-5" id={id}>
                                        {children}
                                    </div>
                                </div>
                            </div>
                        );
                    } else {
                        return (
                            // TODO: convert to code block
                            <code
                                className="text-lg break-words bg-zinc-700 px-1 rounded-sm"
                                {...props}
                            >
                                {children}
                            </code>
                        );
                    }
                },
                ul: ({ node, ...props }) => {
                    return <ul {...props} className="list-disc ml-5" />;
                },
                ol: ({ node, ...props }) => {
                    return <ol {...props} className="list-decimal ml-5" />;
                },
                a: ({ node, ...props }) => {
                    return (
                        <a
                            {...props}
                            className="text-blue-500 hover:underline"
                        />
                    );
                },
                blockquote: ({ node, ...props }) => {
                    return (
                        <blockquote
                            {...props}
                            className="border-l-4 border-blue-500 pl-4 py-2 my-4"
                        />
                    );
                },
            }}
        >
            {content}
        </Markdown>
    );
}
