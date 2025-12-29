import { RowData } from "./companyCsvReader";

class CompanyData{
    private static instance: CompanyData;
    rows: RowData[];
    companyCount: number;
    totalEmployee: number;
    totalRevenue: number;
    countryCount: number;

    private constructor(){
        this.rows = [];
        this.companyCount = 0;
        this.totalEmployee = 0;
        this.totalRevenue = 0;
        this.countryCount = 0;
    }

    public static getInstance(): CompanyData {
    if (!CompanyData.instance) {
      CompanyData.instance = new CompanyData();
    }
    return CompanyData.instance;
  }

    
}