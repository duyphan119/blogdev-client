import {
    Table,
    TableBody,
    TableCaption,
    TableHead,
    TableHeader,
    TableRow,
    TableCell,
} from "@/components/ui/table";
import { ReactNode } from "react";

export type Column = {
    text?: string;
    field: string;
    className?: string;
    render?: (row: any) => ReactNode;
    renderColumn?: () => ReactNode;
};

export type TableProps = {
    rows?: any[];
    columns?: Column[];
    caption?: string;
};

const CustomTable = ({ rows = [], columns = [], caption }: TableProps) => {
    const renderColumns = () => {
        return columns.map((column) => {
            return (
                <TableHead className={column.className} key={column.field}>
                    {column.renderColumn?.() || column.text || column.field}
                </TableHead>
            );
        });
    };

    const renderRows = () => {
        return rows.map((row, index) => {
            return (
                <TableRow key={row.id || index}>
                    {columns.map((column) => {
                        const text = row[column.field] || "";
                        if (column.field === "index")
                            return (
                                <TableCell
                                    key={column.field}
                                    className={column.className}
                                >
                                    {index + 1}
                                </TableCell>
                            );
                        if (column.render)
                            return (
                                <TableCell
                                    key={column.field}
                                    className={column.className}
                                >
                                    {column.render(row)}
                                </TableCell>
                            );
                        return (
                            <TableCell
                                key={column.field}
                                className={column.className}
                            >
                                {text}
                            </TableCell>
                        );
                    })}
                </TableRow>
            );
        });
    };

    return (
        <Table>
            {caption && <TableCaption>A list.</TableCaption>}
            <TableHeader>
                <TableRow>{renderColumns()}</TableRow>
            </TableHeader>
            <TableBody>{renderRows()}</TableBody>
        </Table>
    );
};

export default CustomTable;
