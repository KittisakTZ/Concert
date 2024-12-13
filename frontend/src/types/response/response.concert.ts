export type TypeConcertAll = {
    concert_Id: string;
    concert_name: string;
    date_time: Date;
    description: string;
    rounds: number;
    status: string;
    venue_id: string;
    artist_id: string;
}

export type TypeConcert = {
    concert_Id: string;
    concert_name: string;
    date_time: Date;
    description: string;
    rounds: number;
    status: string;
    venue_id: string;
    artist_id: string;
    created_at: string;
    updated_at: string;
}

export type ConcertResponse = {
    success: boolean;
    message: string;
    responseObject: TypeConcert;
    statusCode: number;
}