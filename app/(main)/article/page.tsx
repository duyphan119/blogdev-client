import categoryApi from "@/api/category-api";
import Articles from "@/components/pages/articles";
import { formatTitle } from "@/lib/utils";
import { Metadata } from "next";

type Props = {
    searchParams: {
        cat?: string;
    };
};

export const generateMetadata = async (props: Props): Promise<Metadata> => {
    let title = formatTitle("Articles");
    try {
        if (props.searchParams.cat) {
            const response = await categoryApi.getBySlug(
                props.searchParams.cat
            );
            if (response.message === "Success") {
                title = formatTitle(`Aritlces - ${response.data.name}`);
            }
        }
    } catch (error) {}
    return {
        title,
    };
};

const ArticlesPage = (props: Props) => {
    return <Articles categorySlug={props.searchParams.cat} limit={10} />;
};

export default ArticlesPage;
