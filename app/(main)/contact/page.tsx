import Contact from "@/components/pages/contact";
import { formatTitle } from "@/lib/utils";
import { Metadata } from "next";

type Props = {};

export const metadata: Metadata = {
    title: formatTitle("Contact us"),
};

const ContactPage = (props: Props) => {
    return <Contact />;
};

export default ContactPage;
