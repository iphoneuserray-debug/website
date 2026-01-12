import { isObject } from 'chart.js/helpers';
import Papa from 'papaparse';
import { RowData } from './rowData';

export default class CompanyData{
    private static instance: CompanyData | undefined;

    private _rows: RowData[];
    private _totalCompany: number;
    private _totalEmployee: number;
    private _totalRevenue: number;
    private _country: Set<string>;
    private _city: Set<string>;
    private _level: Map<number, number>;
    private _companyByYear: Map<number, number>;
    private _yearRange: number[];
    private _revenueRange: number[];
    private _employeeRange: number[];

    private constructor(){
        this._totalCompany = 0;
        this._totalEmployee = 0;
        this._totalRevenue = 0;
        this._country = new Set<string>;
        this._city = new Set<string>;
        this._level = new Map<number, number>;
        this._companyByYear = new Map<number, number>();
        this._rows = new Array<RowData>;
        this._yearRange = [0, 1];
        this._revenueRange = [0, 1];
        this._employeeRange = [0, 1];
    }

    private static async createInstance(): Promise<CompanyData> {
        const instance = new CompanyData();
        await instance.readRows();
        instance.updateStats();
        return instance;
    }

    // Use singleton to avoid read csv multiple times 
    static async getInstance(): Promise<CompanyData> {
        if (!this.instance) {
            this.instance = await this.createInstance();
        }
        return this.instance;
    }
    
    // Read csv file and formate into RowData type for company spreadsheet
    private async readRows(): Promise<void> {
        const response = await fetch('/res/companies_1217.csv');
        const csvText = await response.text();

        const result = Papa.parse(csvText, {
            header: true,
            skipEmptyLines: true,
        });
        // Copy data into rows
        result.data.map(row => {
            if(isObject(row)){
            this._rows.push({
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



    private updateStats(): void {
        for (const row of this._rows) {
            this._totalCompany++;
            this._totalEmployee += row.employees;
            this._totalRevenue += row.annual_revenue;
            this._country.add(row.country);
            this._city.add(row.city);
            this.countMap(row.level, this._level); // Update Level
            this.countMap(row.founded_year, this._companyByYear); // Update Year
        }
        this.addMissingYear();
    }

    // Count values stored in Map
    private countMap(year: number, map: Map<number, number>): Map<number, number> {
        if (! map.has(year)){
            map.set(year, 1);
        } else {
            const value = map.get(year) as number;
            map.set(year, value + 1);
        }
        return map;
    }

    private addMissingYear(): void {
        if (this._companyByYear.size === 0) {
            return;
        }
        // Find minmum and maximum year
        const years = Array.from(this._companyByYear.keys()).sort((a, b) => a - b);
        const minYear = Math.min(...years);
        const maxYear = Math.max(...years);
        this._yearRange = [minYear, maxYear];

        // Fullfill every year data between min and max
        for (let year = minYear; year <= maxYear; year++){
            if (! this._companyByYear.has(year)) {
                this._companyByYear.set(year, 0);
            }
        }
    }

    /**
     * Add year not include in row data
     * Formate company count each year into accumulative array
     * @param companyByYear 
     * @returns x and y coordinates in two sets of array
     */
    getAccumulativeCompanyByYearData(): { yearList: string[], companyByYear: number[] }{
        const years = Array.from(this._companyByYear.keys()).sort((a, b) => a - b);
        
        const yearList: string[] = [];
        const companyByYear: number[] = [];
        let cumulative = 0;
        
        for (const year of years) {
            cumulative += this._companyByYear.get(year)!;
            yearList.push(year.toString());
            companyByYear.push(cumulative);
        }

        return { yearList, companyByYear }
    }

    get rows(): RowData[] { return this._rows; }
    
    get totalCompany(): number { return this._totalCompany; }

    get totalEmployee(): number { return this._totalEmployee; }

    get totalRevenue(): number { return this._totalRevenue; }

    get country(): Array<string> { return Array.from(this._country); }

    get city(): Array<string> { return Array.from(this._city); }

    get level(): Array<number> { 
        const array = Array.from(this._level.keys()).sort((a, b) => a - b);
        return array;
    }

    get levelData(): Array<number> {
        const array = Array.from(this._level.keys()).sort((a, b) => a - b);
        const data = new Array<number>();
        for (const key of array){
            if (this._level.has(key)) data.push(this._level.get(key)!);
        }
        return data;
    }

    get yearRange(): Array<number> { return this._yearRange; }
    
    // Return min and max value of revenue and employees for slider
    get revenueRengeAndEmployeeRange(): {revenue: {min: number, max: number}, employee:{min: number, max: number}} {
        return this.rows.reduce((result, row) => {
            result.revenue.min = row.annual_revenue < result.revenue.min ? row.annual_revenue : result.revenue.min;
            result.revenue.max = row.annual_revenue > result.revenue.max ? row.annual_revenue : result.revenue.max;
            result.employee.min = row.employees < result.employee.min ? row.employees : result.employee.min;
            result.employee.max = row.employees > result.employee.max ? row.employees : result.employee.max;
            return result;
        }, {revenue: {min: Infinity, max: -Infinity}, employee: {min: Infinity, max: -Infinity}});
    }
}
