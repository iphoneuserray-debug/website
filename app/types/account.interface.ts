export interface Account {
    email: string;
    phone: string;
    address: string;
    country: string;
    state: string;
    city: string;
    postcode: string;
    about: string;
}

export type Role = "Admin" | "Manager" | "User";