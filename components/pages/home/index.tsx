"use client";

import SectionCategoryArticles from "./section-category-articles";
import SectionLongreads from "./section-longreads";
import SectionMostComments from "./section-most-comments";
import SectionMostRecent from "./section-most-recent";
import SectionMostViews from "./section-most-views";
import SectionSignUpNewsletter from "./section-sign-up-newsletter";
import SectionToday from "./section-today";
import SectionTrending from "./section-trending";

type Props = {};

const Home = (props: Props) => {
    return (
        <div className="space-y-24">
            <div className="mx-auto md:max-w-7xl md:px-8 sm:px-0 px-8">
                <div className="grid grid-cols-12 gap-24">
                    <div className="col-span-12 grid grid-cols-12 gap-8">
                        <div className="col-span-12 md:col-span-9">
                            <SectionToday />
                        </div>
                        <div className="col-span-12 md:col-span-3">
                            <SectionMostRecent />
                        </div>
                    </div>
                    <div className="col-span-12">
                        <SectionLongreads />
                    </div>
                    <div className="col-span-12">
                        <SectionCategoryArticles />
                    </div>
                    <div className="col-span-12">
                        <SectionMostViews />
                    </div>
                    <div className="col-span-12">
                        <SectionMostComments />
                    </div>
                    <div className="col-span-12">
                        <SectionTrending />
                    </div>
                </div>
            </div>
            <SectionSignUpNewsletter />
        </div>
    );
};

export default Home;
