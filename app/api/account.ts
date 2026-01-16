export type Account = {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    country: string;
    state: string;
    city: string;
    postcode: string;
    about: string;
    role: "Admin" | "Manager" | "User";
}

export const demo: Account = {
    id: "1",
    name: "Snow",
    email: "snow@example.com",
    phone: "+1-555-0101",
    address: "123 Winterfell Lane",
    country: "Westeros",
    state: "North",
    city: "Winterfell",
    postcode: "12345",
    about: "Admin user for system management",
    role: "Admin",
}

export const demoManager: Account = {
    id: "2",
    name: "Lannister",
    email: "lannister@example.com",
    phone: "+1-555-0102",
    address: "456 Casterly Rock Road",
    country: "Westeros",
    state: "Westerlands",
    city: "Casterly Rock",
    postcode: "54321",
    about: "Manager user with limited permissions",
    role: "Manager",
}

export const demoUser: Account = {
    id: "3",
    name: "Stark",
    email: "stark@example.com",
    phone: "+1-555-0103",
    address: "789 Stark Street",
    country: "Westeros",
    state: "North",
    city: "Winterfell",
    postcode: "67890",
    about: "Regular user with basic access",
    role: "User",
}