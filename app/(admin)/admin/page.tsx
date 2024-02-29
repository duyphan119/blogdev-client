import { formatTitle } from "@/lib/utils";
import { Metadata } from "next";

type Props = {};

export const metadata: Metadata = {
    title: formatTitle("Admin"),
};

const AdminPage = (props: Props) => {
    return <div className="">AdminPage</div>;
};

export default AdminPage;
