export type TypeVenueAll = {
    venue_name: string;
    capacity: string;
    address: string;
    district: string;
    province: string;
    postal_code: string;
    venue_Id:string;
}

export type TypeVenue = {
    venue_Id: string;
    venue_name: string;
    capacity: string;
    address: string;
    district: string;
    province: string;
    postal_code: string;
    created_at: string;
    updated_at: string;
}

export type VenueResponse = {
    success: boolean;
    message: string;
    responseObject: TypeVenue;
    statusCode: number;
}