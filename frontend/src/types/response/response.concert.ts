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

export type TypeConcertDetails = {
    concert_Id: string;
    concert_name: string;
    date_time: string; // หรือ Date หากคุณจะแปลงค่าตอนใช้งาน
    description: string;
    rounds: number;
    concert_status: string;
    concert_created_at: string; // หรือ Date หากคุณจะแปลงค่าตอนใช้งาน
    concert_updated_at: string; // หรือ Date หากคุณจะแปลงค่าตอนใช้งาน
    venue_name: string;
    venue_capacity: number;
    venue_address: string;
    venue_district: string;
    venue_province: string;
    venue_postal_code: string;
    artist_name: string;
    artist_description: string;
    total_seats: string; // เพราะใน response เป็น string
};

export type ConcertResponse = {
    success: boolean;
    message: string;
    responseObject: TypeConcert;
    statusCode: number;
}