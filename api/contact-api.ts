import { ContactRequest } from "@/components/pages/contact/contact-form";
import { getPrivateAxios, getPublicAxios } from ".";
import { ApiResponse, PaginatedData } from "@/types";
import { Contact, ContactParams } from "@/types/contact";

type ContactResponse =  ApiResponse<Contact>;
type DeletedResponse = ApiResponse<string>;
type ContactsResponse = ApiResponse<PaginatedData<Contact>>

const contactApi = {
    create: (body: ContactRequest): Promise<ContactResponse> => getPublicAxios().post(
        "contact",
        body
    ),
    
    delete: (id: number) :Promise<DeletedResponse>=> getPrivateAxios().delete(
        `contact/${id}`
    ),

    paginate:  (params?: ContactParams) : Promise<ContactsResponse>=> getPrivateAxios().get("contact", { params }),
};

export default contactApi;
