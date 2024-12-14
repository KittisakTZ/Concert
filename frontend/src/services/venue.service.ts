import { GET_VENUE_ALL, CREATE_VENUE, UPDATE_VENUE, DELETE_VENUE } from "@/apis/endpoint.api";
import mainApi from "@/apis/main.api";
import { PayLoadCreateVenue, PayloadUpdateVenue, PayLoadDeleteVenue } from "@/types/requests/request.venue";
import { VenueResponse } from "@/types/response/response.venue";

export const getVenue = async () => {
    const { data: response } = await mainApi.get(
        GET_VENUE_ALL
    );
    return response;
};

export const postVenue = async (data: PayLoadCreateVenue) => {
    const { data: response } = await mainApi.post<VenueResponse>(
        CREATE_VENUE,
        data
    );
    return response;
}
export const patchVenue = async (data: PayloadUpdateVenue) => {
    const { data: response } = await mainApi.patch<VenueResponse>(
        UPDATE_VENUE,
        data
    );
    return response;
}

export const deleteVenue = async (data: PayLoadDeleteVenue) => {
    const { data: response } = await mainApi.delete<VenueResponse>(
        DELETE_VENUE + "/" + data.venue_Id
    );
    return response;
}