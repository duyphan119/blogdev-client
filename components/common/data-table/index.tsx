"use client";

import CustomTable, { Column } from "./custom-table";
import Head, { HeadOptions } from "./head";
import Pagination, { PaginationOptions } from "./pagination";

type TableOptions = {
  rows?: any[];
  columns?: Column[];
};

type Props = {
  tableOptions?: TableOptions;
  paginationOptions?: PaginationOptions;
  headOptions?: HeadOptions;
};

const DataTable = ({ tableOptions, paginationOptions, headOptions }: Props) => {
  return (
    <div className="data-table space-y-4">
      {headOptions && <Head {...headOptions} />}
      {tableOptions && (
        <div className="table w-full border border-border">
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
