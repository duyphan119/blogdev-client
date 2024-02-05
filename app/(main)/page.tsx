import Home from "@/components/pages/home";
import { formatTitle } from "@/lib/utils";
import { Metadata } from "next";

type Props = {};

export const metadata: Metadata = {
    title: formatTitle("Home"),
};

const HomePage = (props: Props) => {
    return <Home />;
};

export default HomePage;
