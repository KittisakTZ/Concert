export type TypeArtistAll = {
    artist_name: string;
    artist_Id: string;
    description: string;
}

export type TypeArtist = {
    artist_Id: string;
    artist_name: string;
    created_at: string;
    updated_at: string;
}

export type ArtistResponse = {
    success: boolean;
    message: string;
    responseObject: TypeArtist;
    statusCode: number;
}