import { ApiResponse } from "@/types";
import { getPrivateAxios } from ".";
import { Role } from "@/types/role";

const roleApi = {
    getAll: async () => {
        const response: ApiResponse<Role[]> = await getPrivateAxios().get(
            "role/user"
        );
        return response;
    },
};

export default roleApi;
