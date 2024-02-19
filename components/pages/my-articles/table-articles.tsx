"use client";

import articleApi from "@/api/article-api";
import { Button, buttonVariants } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Article } from "@/types/article";
import useDialogStore from "@/zustand/use-dialog-store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import {
    RiCheckLine,
    RiCloseLine,
    RiDeleteBin7Line,
    RiDeleteRow,
    RiEdit2Line,
} from "react-icons/ri";

type Props = {
    rows: Article[];
};

const TableArticles = (props: Props) => {
    const queryClient = useQueryClient();

    const { show } = useDialogStore();

    const deleteArticleMutation = useMutation({
        mutationFn: (id: number) => articleApi.userDelete(id),
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: ["my-articles"] });
        },
    });

    const handleDelete = (id: number) => {
        show({
            onConfirm: () => {
                deleteArticleMutation.mutate(id);
            },
            description:
                "This action cannot be undone. This will permanently delete your article.",
        });
    };

    return (
        <Table>
            <TableCaption>A list of your articles.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-6">#</TableHead>
                    <TableHead className="w-24">Image</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead className="text-center">Public</TableHead>
                    <TableHead className="w-48 text-center">
                        Created Time
                    </TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {props.rows.map((row, index) => {
                    return (
                        <TableRow key={row.id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell className="font-medium">
                                <div className="image relative w-full pb-[60%]">
                                    <Image
                                        src={row.image_url}
                                        fill
                                        priority
                                        className="rounded-sm object-cover"
                                        alt="thumbnail"
                                        sizes="(max-width: 1200px) 40vw, 100vw"
                                    />
                                </div>
                            </TableCell>
                            <TableCell>
                                {row.is_public ? (
                                    <Link href={`/article/${row.slug}`}>
                                        {row.title}
                                    </Link>
                                ) : (
                                    row.title
                                )}
                            </TableCell>
                            <TableCell>
                                <div className="flex justify-center">
                                    {row.is_public ? (
                                        <RiCheckLine className="text-xl text-green-600" />
                                    ) : (
                                        <RiCloseLine className="text-xl text-red-600" />
                                    )}
                                </div>
                            </TableCell>
                            <TableCell className="text-right">
                                {moment(row.created_at).format(
                                    "MMM D, YYYY H:m A"
                                )}
                            </TableCell>
                            <TableCell>
                                <div className="space-x-2 text-right">
                                    <Link
                                        href={`/profile/article/${row.id}/update`}
                                        className={buttonVariants({
                                            size: "icon",
                                        })}
                                    >
                                        <RiEdit2Line />
                                    </Link>
                                    <Button
                                        onClick={() => handleDelete(row.id)}
                                        size="icon"
                                        variant="destructive"
                                    >
                                        <RiDeleteBin7Line />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
};

export default TableArticles;
