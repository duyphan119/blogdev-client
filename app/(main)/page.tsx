import { webApi } from "@/api/web-api";
import Home from "@/components/pages/home";
import { formatTitle } from "@/lib/utils";
import { Metadata } from "next";

type Props = {};

export const metadata: Metadata = {
    title: formatTitle("Home"),
};

const HomePage = async (props: Props) => {
    try {
        const response = await webApi.getHomePageData();

        return <Home data={response.data} />;
    } catch (error) {
        console.log(error);
        return (
            <Home
                data={{
                    today_articles: [],
                    most_recent_articles: [],
                    longreads_articles: [],
                    categories: [],
                    most_views_articles: [],
                    most_comments_articles: [],
                    trending_articles: [],
                }}
            />
        );
    }
};

export default HomePage;
