"use client";

import {
    Table,
    TableBody,
    TableCaption,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Article } from "@/types/article";
import TableArticleItem from "./table-article-item";

type Props = {
    rows: Article[];
};

const TableArticles = (props: Props) => {
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
                        <TableArticleItem
                            key={row.id}
                            row={row}
                            index={index}
                        />
                    );
                })}
            </TableBody>
        </Table>
    );
};

export default TableArticles;
