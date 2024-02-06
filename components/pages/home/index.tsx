"use client";

import { HomePageData } from "@/types/home-page";
import SectionCategoryArticles from "./section-category-articles";
import SectionLongreads from "./section-longreads";
import SectionMostComments from "./section-most-comments";
import SectionMostRecent from "./section-most-recent";
import SectionMostViews from "./section-most-views";
import SectionSignUpNewsletter from "./section-sign-up-newsletter";
import SectionToday from "./section-today";
import SectionTrending from "./section-trending";

type Props = {
    data: HomePageData;
};

const Home = (props: Props) => {
    return (
        <div className="space-y-24">
            <div className="mx-auto md:max-w-7xl md:px-8 sm:px-0 px-8">
                <div className="grid grid-cols-12 gap-24">
                    <div className="col-span-12 grid grid-cols-12 gap-8">
                        <div className="col-span-12 md:col-span-9">
                            <SectionToday
                                articles={props.data.today_articles}
                            />
                        </div>
                        <div className="col-span-12 md:col-span-3">
                            <SectionMostRecent
                                articles={props.data.most_recent_articles}
                            />
                        </div>
                    </div>
                    <div className="col-span-12">
                        <SectionLongreads
                            articles={props.data.longreads_articles}
                        />
                    </div>
                    <div className="col-span-12">
                        <SectionCategoryArticles
                            categories={props.data.categories}
                        />
                    </div>
                    <div className="col-span-12">
                        <SectionMostViews
                            articles={props.data.most_views_articles}
                        />
                    </div>
                    <div className="col-span-12">
                        <SectionMostComments
                            articles={props.data.most_comments_articles}
                        />
                    </div>
                    <div className="col-span-12">
                        <SectionTrending
                            articles={props.data.trending_articles}
                        />
                    </div>
                </div>
            </div>
            <SectionSignUpNewsletter />
        </div>
    );
};

export default Home;
