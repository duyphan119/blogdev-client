import {
    Table,
    TableBody,
    TableCaption,
    TableHead,
    TableHeader,
    TableRow,
    TableCell,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
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
    onRowClick?: (row: any) => void;
};

const CustomTable = ({
    rows = [],
    columns = [],
    caption,
    onRowClick,
}: TableProps) => {
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
                <TableRow
                    key={row.id || index}
                    onClick={() => onRowClick?.(row)}
                    className={cn(onRowClick && "cursor-pointer")}
                >
                    {columns.map((column) => {
                        const text = row[column.field] || "";
                        return (
                            <TableCell
                                key={column.field}
                                className={column.className}
                            >
                                {(() => {
                                    if (column.field === "index")
                                        return index + 1;
                                    if (column.render)
                                        return column.render(row);
                                    return text;
                                })()}
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
