export type PayLoadCreateArtist = {
    artist_name: string;
    description: string;
}

export type PayloadUpdateArtist = {
    artist_Id: string;
    artist_name: string;
    description: string;
}

export type PayLoadDeleteArtist = {
    artist_Id: string;
}