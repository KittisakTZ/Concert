import { GET_CONCERT_ALL, CREATE_CONCERT, UPDATE_CONCERT, DELETE_CONCERT, GET_DETAILS_SQL} from "@/apis/endpoint.api";
import mainApi from "@/apis/main.api";
import { PayLoadCreateConcert, PayloadUpdateConcert, PayLoadDeleteConcert } from "@/types/requests/request.concert";
import { ConcertResponse, TypeConcertDetails } from "@/types/response/response.concert";

export const getConcert = async () => {
    const { data: response } = await mainApi.get(
        GET_CONCERT_ALL
    );
    return response;
};

export const postConcert = async (data: PayLoadCreateConcert) => {
    const { data: response } = await mainApi.post<ConcertResponse>(
        CREATE_CONCERT,
        data
    );
    return response;
}
export const patchConcert = async (data: PayloadUpdateConcert) => {
    const { data: response } = await mainApi.patch<ConcertResponse>(
        UPDATE_CONCERT,
        data
    );
    return response;
}

export const deleteConcert = async (data: PayLoadDeleteConcert) => {
    const { data: response } = await mainApi.delete<ConcertResponse>(
        DELETE_CONCERT + "/" + data.concert_Id
    );
    return response;
}

export const getConcertDetailsSql = async (concert_Id: string): Promise<TypeConcertDetails> => {
    const { data: response } = await mainApi.get<ConcertResponse>(
        `${GET_DETAILS_SQL}/${concert_Id}` // เติม concert_Id จริงเข้าไปใน URL
    );
    return response.responseObject as unknown as TypeConcertDetails;
};