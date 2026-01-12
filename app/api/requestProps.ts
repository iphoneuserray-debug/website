import CompanyData from '@/app/api/CompanyData';
import { RowData } from './rowData';
import { ChartData } from 'chart.js';

export type RequstProps = {
    dimension: "level" | "country" | "city";
    filter: Filter;
}

export type Filter = {
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

/**
 * Handle the request form 
 * @param request request form
 * @param companyData CompanyData class instance 
 * @returns return data for bar chart
 */
export function requestBarChartData(request: RequstProps, companyData: CompanyData): 
Map<string | number, number> {
    const result = new Map<number | string, number>();
    for(const row of companyData.rows) {
        
        // Add count the company if satisfied filter
        if (filterHandler(request.filter, row)) {
            const dimesionValue = row[request.dimension];
            if (! result.has(dimesionValue)){
                result.set(dimesionValue,  1);
            } else {
                const newValue = result.get(dimesionValue)! + 1;
                result.set(dimesionValue, newValue)
            }
        }
    };
    console.log(result);
    return result;
}

function filterHandler(filter: Filter, row: RowData): boolean {
    // Check fliter
    let inCondition = true;
    for (const key in filter) {
        const value = filter[key as keyof Filter];
        const rowValue = row[key as keyof RowData];
        // Check selector
        if (Array.isArray(value) && value.length !== 0){
            if (typeof value[0] === 'number'){
                if (!(value as number[]).includes(rowValue as number)) {
                    inCondition = false;
                    break;
                }
            } else {
                if (!(value as string[]).includes(rowValue as string)) {
                    inCondition = false;
                    break;
                }
            }
        } // Check slider value
        else if ('min' in value && 'max' in value) {
            const rowValue = row[key as keyof RowData] as number;
            const min = value.min; 
            const max = value.max;
            // Handle uninitialised status
            if (max < 0 || min < 0) continue;
            // Refuse value if not in range
            else if (rowValue > max || rowValue < min) {
                inCondition = false;
                break;
            }
        }
    }
    return inCondition;
}

// Assign default values to filter to avoid undefined case
export function handleUndefinedFilter(filter: Filter | undefined): Filter {
    if (filter !== undefined) return filter;
    const initialisedFilter: Filter = {
        level: [],
        country: [],
        city: [],
        founded_year: {max: -1, min: -1},
        annual_revenue: {max: -1, min: -1},
        employees: {max: -1, min: -1},
    }
    return initialisedFilter;
}

// Parse map into chart data
export function parseChartData(map: Map<string | number, number>): ChartData<"bar", (number | [number, number] | null)[], unknown>{
    if (!map || map.size === 0) {
        return {
        labels: [],
        datasets: [{ data: [] }]
        };
    }
    // Sort labels
    const unsorted = Array.from(map.keys());
    let sorted: (string | number)[];
    const sortedData = new Array<number>();

    if (unsorted.length > 0 && typeof unsorted[0] === 'number') {
        sorted = unsorted.sort((a, b) => (a as number) - (b as number));
    } else {
        sorted = (unsorted as string[]).sort();
    }

    for (const key of sorted) {
        const value = map.get(key);
        if (value !== undefined) {
        sortedData.push(value);
        }
    }

    const labels = sorted.map(key => key.toString());
    
    const data = {
        labels: labels,
        datasets: [{data: sortedData, backgroundColor: '#55b1e2a1'}],
        
    };
    return data;
}

// Find all rows satify the filter
export function relationFiltered(filter: Filter, companyData: CompanyData): RowData[] {
    const result = [];
    for (const row of companyData.rows){
        if(filterHandler(filter, row)){
            result.push(row);
        }
    }
    return result;
}