import { isObject } from 'chart.js/helpers';
import Papa from 'papaparse';

export type RowData = {
  company_code: string;
  company_name: string;
  level: number;
  country: string;
  city: string;
  founded_year: number;
  annual_revenue: number;
  employees: number;
};

export type CompanyData = {
    rows: RowData[];
    companyCount: number;
    totalEmployee: number;
    totalRevenue: number;
    countryCount: number;
    level: number[];
    year: {
        yearList: string[];
        companyCount: number[];
    }
}

export default async function readCompanyCsv(): Promise<CompanyData> {
    const response = await fetch('/res/companies_1217.csv');
    const csvText = await response.text();

    const companyData: CompanyData = {
        rows: [],
        companyCount: 0,
        totalEmployee: 0,
        totalRevenue: 0,
        countryCount: 0,
        level: [0, 0, 0, 0],
        year: {
            yearList: [],
            companyCount: [],
        },
    };
    const country = new Set<string>;
    const result = Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
    });
    const companyByYear = new Map<number, number>();
    result.data.map(row => {
        if(isObject(row)){
        companyData.rows.push({
            company_code: String(row.company_code),
            company_name: String(row.company_name),
            level: Number(row.level),
            country: String(row.country),
            city: String(row.city),
            founded_year: Number(row.founded_year),
            annual_revenue: Number(row.annual_revenue),
            employees: Number(row.employees),
            });
        companyData.companyCount++;
        companyData.totalEmployee+= Number(row.employees);
        companyData.totalRevenue += Number(row.annual_revenue);
        country.add(String(row.country));
        companyData.level[Number(row.level) - 1]++;
        countCompanyByYear(Number(row.founded_year), companyByYear);
    }});
    companyData.year = formateCompanyByYearData(companyByYear);
    companyData.countryCount = country.size;
        
  return companyData;
}

function countCompanyByYear(year: number, companyByYear: Map<number, number>): Map<number, number> {
    if (! companyByYear.has(year)){
        companyByYear.set(year, 1);
    } else {
        const value = companyByYear.get(year) as number;
        companyByYear.set(year, value + 1);
    }
    return companyByYear;
}

function formateCompanyByYearData(companyByYear: Map<number, number>): {
  yearList: string[];
  companyCount: number[];
} {
    const years = Array.from(companyByYear.keys()).sort((a, b) => a - b);
    const minYear = Math.min(...years);
    const maxYear = Math.max(...years);
    
    const yearList = new Array<string>();
    const companyCount = new Array<number>();
    let cumulative = 0;
    
    for (let year = minYear; year <= maxYear; year++){
        if (companyByYear.has(year)) {
            cumulative += companyByYear.get(year)!;
    }
        yearList.push(year.toString());
        companyCount.push(cumulative);
    }
    return {yearList, companyCount};
}
