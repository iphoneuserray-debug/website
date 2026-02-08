export interface Filter {
    level: number[];
    country: string[];
    city: string[];
    founded_year: {
        min: number;
        max: number;
    };
    annual_revenue: {
        min: number;
        max: number;
    };
    employees: {
        min: number;
        max: number;
    };
};

export interface RequstProps {
    dimension: "level" | "country" | "city";
    filter: Filter | undefined;
}