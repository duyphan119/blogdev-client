import { ContactRequest } from "@/components/pages/contact/contact-form";
import { getPrivateAxios, getPublicAxios } from ".";
import { ApiResponse, PaginatedData } from "@/types";
import { Contact, ContactParams } from "@/types/contact";

type ContactResponse =  ApiResponse<Contact> 

const contactApi = {
    create: (body: ContactRequest): Promise<ContactResponse> => getPublicAxios().post(
        "contact",
        body
    ),
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
