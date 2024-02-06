import { getPublicAxios } from ".";

const articleApi = {
    getBySlug: async (slug: string) => {
        const response = await getPublicAxios().get(`article/slug/${slug}`);
        return response.data;
    },
};

export default articleApi;
