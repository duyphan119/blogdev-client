import { SubscriberRequest } from "@/components/pages/home/section-sign-up-newsletter";
import { getPrivateAxios, getPublicAxios } from ".";
import { ApiResponse, PaginatedData } from "@/types";
import { Subscriber, SubscriberParams } from "@/types/subscriber";

const subscriberApi = {
    create: async (body: SubscriberRequest) => {
        const response: ApiResponse<Subscriber> = await getPublicAxios().post(
            "subscriber",
            body
        );
        return response;
    },
    delete: async (id: number): Promise<boolean> => {
        await getPrivateAxios().delete(`subscriber/${id}`);
        return true;
    },
    paginate: async (params?: SubscriberParams) => {
        const response: ApiResponse<PaginatedData<Subscriber>> =
            await getPrivateAxios().get("subscriber", { params });
        return response;
    },
};

export default subscriberApi;
