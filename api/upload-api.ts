import { ApiResponse } from "@/types";
import { getPublicAxios } from ".";

const uploadApi = {
    uploadImageSingle: async (formData: FormData) => {
        const response: ApiResponse<string> = await getPublicAxios().post(
            "upload/image/single",
            formData
        );
        return response;
    },
};

export default uploadApi;
