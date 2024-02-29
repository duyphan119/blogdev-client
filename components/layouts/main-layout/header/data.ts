// export const navItems = (categories: any[]) => [
//     {
//         title: "Go to Home page",
//         displayText: "Home",
//         href: "/",
//     },
//     {
//         displayText: "Article",
//         children: categories.map(({ name, slug }) => ({
//             title: name,
//             displayText: name,
//             href: `/article?cat=${slug}`,
//         })),
//     },
//     {
//         title: "Go to Contact page",
//         displayText: "Contact",
//         href: "/contact",
//     },
//     {
//         title: "Go to About us page",
//         displayText: "About",
//         href: "/about",
//     },
// ];

export const navItems = [
    {
        title: "Go to Home page",
        displayText: "Home",
        href: "/",
    },
    {
        displayText: "Article",
        title: "Go to Articles page",
        href: "/article",
    },
    {
        title: "Go to Contact page",
        displayText: "Contact",
        href: "/contact",
    },
    {
        title: "Go to About us page",
        displayText: "About",
        href: "/about",
    },
];
