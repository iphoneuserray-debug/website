import { isObject } from 'chart.js/helpers';
import Papa from 'papaparse';
import { addChild, find, TreeNode } from './tree';
import CompanyData from './CompanyData';
import { RowData } from './rowData';

type RelationData = {
    company_code: string;
    parent_company: string;
};

export default class CompanyRelation {
    private static instance: CompanyRelation | undefined;
    private _rows: RelationData[];


    private constructor(){
        this._rows = [];
    }

    private static async createInstance(): Promise<CompanyRelation> {
        const instance = new CompanyRelation();
        await instance.readRows();
        return instance;
    }
 
    // Use singleton to avoid read csv multiple times 
    static async getInstance(): Promise<CompanyRelation> {
        if (!this.instance) {
            this.instance = await this.createInstance();
        }
        return this.instance;
    }

    // Read csv file and formate into RowData type for company spreadsheet
    private async readRows(): Promise<void> {
        const response = await fetch('/res/relationships_1217.csv');
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
                    parent_company: String(row.parent_company),
                });
            }
        });
    }

    private updateRows(filtered: RowData[]): RelationData[] {
        const newRows = [];
        const codeArray = filtered.map(value => value.company_code)
        for (const row of this._rows) {
            if (codeArray.includes(row.company_code)){
                newRows.push(row);
            }
        }
        return newRows;
    }

    // Need sorted relationship
    private updateStats(rows: RelationData[]): TreeNode {
        let relation = {id: "", parentId: "", children: []};
        const childrenWithoutParent: TreeNode[] = [];
        for (const row of rows) {
            // Search by parent company code
            const foundPerentNode = find(row.parent_company, relation);
            const newChild = {id: row.company_code, parentId: row.parent_company, children: []};

            if (row.parent_company === "") {
                relation = newChild;
            }

            if (! foundPerentNode) {
                childrenWithoutParent.push(newChild);
            } else { 
                // Assert Children into parent Node
                addChild(newChild, foundPerentNode);
            }

            // Find all children node
            for (const child of childrenWithoutParent){
                if (child.parentId === row.company_code) {
                    addChild(child, newChild);
                } 
            }
        }
        for (const branch of childrenWithoutParent){
            addChild(branch, relation)
        }
        console.log(relation);
        return relation;
    }

    public getRelation(filtered?: RowData[]): TreeNode {
        if (filtered === undefined){
            const relation = this.updateStats(this._rows);
            return relation;
        }
        const rows = this.updateRows(filtered);
        const relation = this.updateStats(rows);
        return relation;
    }
}