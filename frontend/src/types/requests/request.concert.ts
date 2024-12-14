export type PayLoadCreateConcert = {
    concert_name: string;
    date_time: Date;
    description: string;
    rounds: number;
    status: string;
    venue_id: string;
    artist_id: string;
}

export type PayloadUpdateConcert = {
    concert_Id: string;
    concert_name: string;
    date_time: Date;
    description: string;
    rounds: number;
    status: string;
    venue_id: string;
    artist_id: string;
}

export type PayLoadDeleteConcert = {
    concert_Id: string;
}