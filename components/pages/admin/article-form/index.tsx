"use client";

import ArticleForm from "@/components/article/article-form";
import Box from "../box";
import { Article } from "@/types/article";

type Props = {
    article?: Article;
};

const ArticleFormPage = ({ article }: Props) => {
    return (
        <section>
            <Box title="Article Form">
                <ArticleForm article={article} />
            </Box>
        </section>
    );
};

export default ArticleFormPage;
