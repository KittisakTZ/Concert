export type PayLoadCreateUser = {
    title: string;
    fname: string;
    lname: string;
    phone: string;
    email: string;
    password: string;
}

export type PayloadUpdateUser = {
    user_Id: string;
    title: string;
    fname: string;
    lname: string;
}

export type PayLoadDeleteUser = {
    user_Id: string;
}