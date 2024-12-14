import { GET_USER_ALL, CREATE_USER, UPDATE_USER, DELETE_USER } from "@/apis/endpoint.api";
import mainApi from "@/apis/main.api";
import { PayLoadCreateUser, PayloadUpdateUser, PayLoadDeleteUser } from "@/types/requests/request.user";
import { userResponse } from "@/types/response/response.user";

export const getUser = async () => {
    const { data: response } = await mainApi.get(
        GET_USER_ALL
    );
    return response;
};

export const postUser = async (data: PayLoadCreateUser) => {
    const { data: response } = await mainApi.post<userResponse>(
        CREATE_USER,
        data
    );
    return response;
}
export const patchUser = async (data: PayloadUpdateUser) => {
    const { data: response } = await mainApi.patch<userResponse>(
        UPDATE_USER,
        data
    );
    return response;
}

export const deleteUser = async (data: PayLoadDeleteUser) => {
    const { data: response } = await mainApi.delete<userResponse>(
        DELETE_USER + "/" + data.user_Id
    );
    return response;
}