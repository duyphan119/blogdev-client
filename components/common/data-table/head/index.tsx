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
            <CreateButtonLink href="" {...createButtonLink} />
            <DeleteButton {...deleteButton} />
            <SearchForm onSubmit={() => {}} {...searchForm} />
        </div>
    );
};

export default Head;
