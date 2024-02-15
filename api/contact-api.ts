import { ContactRequest } from "@/components/pages/contact/contact-form";
import { getPrivateAxios, getPublicAxios } from ".";
import { ApiResponse, PaginatedData } from "@/types";
import { Contact, ContactParams } from "@/types/contact";

const contactApi = {
    create: async (body: ContactRequest) => {
        const response: ApiResponse<Contact> = await getPublicAxios().post(
            "contact",
            body
        );
        return response;
    },
    delete: async (id: number) => {
        const response: ApiResponse<boolean> = await getPrivateAxios().delete(
            `contact/${id}`
        );
        return response;
    },
    paginate: async (params?: ContactParams) => {
        const response: ApiResponse<PaginatedData<Contact>> =
            await getPrivateAxios().get("contact", { params });
        return response;
    },
};

export default contactApi;
