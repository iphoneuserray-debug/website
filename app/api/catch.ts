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

export type companyData = {
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
class CompanyData{
    private instance: CompanyData | undefined;

    private rows: RowData[];
    private totalCompany: number;
    private totalEmployee: number;
    private totalRevenue: number;
    private country: Set<string>;
    private city: Set<string>;
    private level: number[];
    private companyByYear: Map<number, number>;

    private constructor(){
        this.totalCompany = 0;
        this.totalEmployee = 0;
        this.totalRevenue = 0;
        this.country = new Set<string>;
        this.city = new Set<string>;
        this.level = [0, 0, 0, 0];
        this.companyByYear = new Map<number, number>();
        this.rows = new Array<RowData>;
        this.readRows;
    }

    getInstance(){
        if (! this.instance) this.instance = new CompanyData();
        return this.instance;
    }
    
    private async readRows(): Promise<void> {
        const response = await fetch('/res/companies_1217.csv');
        const csvText = await response.text();

        const result = Papa.parse(csvText, {
            header: true,
            skipEmptyLines: true,
        });
        result.data.map(row => {
            if(isObject(row)){
            this.rows.push({
                company_code: String(row.company_code),
                company_name: String(row.company_name),
                level: Number(row.level),
                country: String(row.country),
                city: String(row.city),
                founded_year: Number(row.founded_year),
                annual_revenue: Number(row.annual_revenue),
                employees: Number(row.employees),
                });
            }
        });
    }


    updateStats(): void {
        for (const row of this.rows) {
            this.totalCompany++;
            this.totalEmployee += row.employees;
            this.totalRevenue += row.annual_revenue;
            this.country.add(row.country);
            this.city.add(row.city);
            this.level[row.level - 1]++;
            this.countCompanyByYear(row.founded_year);
        }
        this.addMissingYear
    }

    private countCompanyByYear(year: number): void {
        if (! this.companyByYear.has(year)){
            this.companyByYear.set(year, 1);
        } else {
            const value = this.companyByYear.get(year) as number;
            this.companyByYear.set(year, value + 1);
        }
    }

    private addMissingYear(): void {
        if (this.companyByYear.size === 0) {
            return;
        }

        const years = Array.from(this.companyByYear.keys()).sort((a, b) => a - b);
        const minYear = Math.min(...years);
        const maxYear = Math.max(...years);
        for (let year = minYear; year <= maxYear; year++){
            if (! this.companyByYear.has(year)) {
                this.companyByYear.set(year, 0);
            }
        }
    }

    /**
     * Add year not include in row data
     * Formate company count each year into accumulative array
     * @param companyByYear 
     * @returns x and y coordinates in two sets of array
     */
    getAccumulativeCompanyByYearData(): { yearList: string[], companyCount: number[] }{
        const years = Array.from(this.companyByYear.keys()).sort((a, b) => a - b);
        
        const yearList: string[] = [];
        const companyCount: number[] = [];
        let cumulative = 0;
        
        for (const year of years) {
            cumulative += this.companyByYear.get(year)!;
            yearList.push(year.toString());
            companyCount.push(cumulative);
        }

        return { yearList, companyCount }
    }

    
}
