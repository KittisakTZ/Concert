import { GET_ARTIST_ALL, CREATE_ARTIST, UPDATE_ARTIST, DELETE_ARTIST } from "@/apis/endpoint.api";
import mainApi from "@/apis/main.api";
import { PayLoadCreateArtist, PayloadUpdateArtist, PayLoadDeleteArtist } from "@/types/requests/request.artists";
import { ArtistResponse } from "@/types/response/response.artists";

export const getArtist = async () => {
    const { data: response } = await mainApi.get(
        GET_ARTIST_ALL
    );
    return response;
};

export const postArtist = async (data: PayLoadCreateArtist) => {
    const { data: response } = await mainApi.post<ArtistResponse>(
        CREATE_ARTIST,
        data
    );
    return response;
}
export const patchArtist = async (data: PayloadUpdateArtist) => {
    const { data: response } = await mainApi.patch<ArtistResponse>(
        UPDATE_ARTIST,
        data
    );
    return response;
}

export const deleteCategory = async (data: PayLoadDeleteArtist) => {
    const { data: response } = await mainApi.delete<ArtistResponse>(
        DELETE_ARTIST + "/" + data.artist_Id
    );
    return response;
}