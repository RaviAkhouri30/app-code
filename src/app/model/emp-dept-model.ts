export class EmpDeptModel {

    constructor() {
        this.emp = [];
    }

    public get dept(): string {
        return this.dept;
    }

    public set dept(dept: string) {
        this.dept = dept;
    }

    public get emp(): string[] {
        return this.emp;
    }

    public set emp(emp: string[]) {
        this.emp = emp;
    }
}
