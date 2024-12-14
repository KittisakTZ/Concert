export type TypeUserAll = {
    user_Id: string;
    title: string;
    fname: string;
    lname: string;
    phone: string;
    email: string;
    password: string;
}

export type TypeUser = {
    user_Id: string;
    title: string;
    fname: string;
    lname: string;
    phone: string;
    email: string;
    password: string;
    created_at: string;
    updated_at: string;
}

export type userResponse = {
    success: boolean;
    message: string;
    responseObject: TypeUser;
    statusCode: number;
}