import articleApi from "@/api/article-api";
import ArticleForm from "@/components/pages/article-form";
import { formatTitle } from "@/lib/utils";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
    params: {
        articleId: number;
    };
};

// export const generateMetadata = async (props: Props): Promise<Metadata> => {
//     try {
//         const response = await articleApi.getById(props.params.articleId);
//         if (response.message === "Success") {
//             return {
//                 title: formatTitle(`Update Article - ${response.data.title}`),
//             };
//         }
//     } catch (error) {
//         console.log(error);
//     }
//     return {
//         title: formatTitle("Update Article"),
//     };
// };
const UpdateArticlePage = async (props: Props) => {
    // try {
    //     const response = await articleApi.getById(props.params.articleId);
    //     if (response.message === "Success") {
    //         return <ArticleForm article={response.data} />;
    //     }
    // } catch (error) {
    //     console.log(error);
    // }
    // notFound();
    return <ArticleForm articleId={props.params.articleId} />;
};

export default UpdateArticlePage;
