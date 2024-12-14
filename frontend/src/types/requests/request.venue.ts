export type PayLoadCreateVenue = {
    venue_name: string;
    capacity: number;
    address: string;
    district: string;
    province: string;
    postal_code: string;
}

export type PayloadUpdateVenue = {
    venue_Id: string;
    venue_name: string;
    capacity: string;
    address: string;
    district: string;
    province: string;
    postal_code: string;
}

export type PayLoadDeleteVenue = {
    venue_Id: string;
}