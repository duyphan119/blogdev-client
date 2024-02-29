"use client";

import CustomTable, { Column } from "./custom-table";
import Pagination, { PaginationOptions } from "./pagination";

type TableOptions = {
    rows?: any[];
    columns?: Column[];
};

type Props = {
    tableOptions?: TableOptions;
    paginationOptions?: PaginationOptions;
};

const DataTable = ({ tableOptions, paginationOptions }: Props) => {
    return (
        <div className="data-table">
            <div className="head">header</div>
            {tableOptions && (
                <div className="table w-full">
                    <CustomTable {...tableOptions} />
                </div>
            )}
            <div className="footer">
                {paginationOptions && <Pagination {...paginationOptions} />}
            </div>
        </div>
    );
};

export default DataTable;
