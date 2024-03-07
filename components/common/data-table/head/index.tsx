"use client";

import CreateButtonLink, { CreateButtonLinkProps } from "./create-button-link";
import DeleteButton, { DeleteButtonProps } from "./delete-button";
import SearchForm, { SearchFormProps } from "./search-form";

export type HeadOptions = {
  createButtonLink?: CreateButtonLinkProps;
  deleteButton?: DeleteButtonProps;
  searchForm?: SearchFormProps;
};

const Head = ({ createButtonLink, deleteButton, searchForm }: HeadOptions) => {
  return (
    <div className="flex gap-4 flex-wrap">
      <div className="flex flex-col sm:flex-row gap-4 flex-1 sm:flex-grow-0 sm:flex-shrink-0">
        <CreateButtonLink href="" {...createButtonLink} />
        <DeleteButton {...deleteButton} />
      </div>
      <SearchForm onSubmit={() => {}} {...searchForm} />
    </div>
  );
};

export default Head;
