import { Component, OnInit, VERSION } from '@angular/core';
import { DeptEmpModel } from './model/dept-emp-model';
import { DeptModel } from './model/dept-model';
import { EmpDeptModel } from './model/emp-dept-model';
import { EmpModel } from './model/emp-model';
import { AppServiceService } from './services/app-service.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private emp: EmpModel[];
  private dept: DeptModel[];

  private empDept: EmpDeptModel[] = [];
  private DeptEmp: DeptEmpModel[] = [];

  public iDept: number = 1;
  public iEmp: number = 1;

  constructor(
    public appService: AppServiceService
  ) {
    this.emp = [];
    this.emp = [];
    this.dept = [];
  }
  ngOnInit(): void {
  }

  public addDept(): void {
    this.appService.addDept();
    this.getUpdatedData();
  }

  public addEmp(): void {
    this.appService.addEmp();
    this.getUpdatedData();
  }

  public filterAsPerDept = (data: string): string[] => {
    return this.empDept.find(e => e.dept === data)?.emp || [];
  }

  public filterAsPerEmp = (data: string): string[] => {
    return this.DeptEmp.find(e => e.emp === data)?.dept || [];
  }

  public onStart = (): void => {
    this.appService.breakTheLoop = false;
    if (!this.emp.length || !this.dept.length) {
      return;
    }
    while (true) {
      this.appService.onStart();
      this.getUpdatedData();
    }
  }

  public onStop = (): void => {
    this.appService.onBreakTheLoop();
  }

  public getEmp(): EmpModel[] {
    return this.emp;
  }

  public setEmp(emp: EmpModel[]): void {
    this.emp = emp;
  }

  public getDept(): DeptModel[] {
    return this.dept;
  }

  public setDept(dept: DeptModel[]): void {
    this.dept = dept;
  }

  public getUpdatedData = (): void => {
    this.appService.getAndUpdateDept().subscribe((res: DeptModel[]) => {
      this.dept = res;
    });
    this.appService.getAndUpdateEmp().subscribe((res: EmpModel[]) => {
      this.emp = res;
    });
    this.appService.getAndUpdateDeptEmp().subscribe((res: DeptEmpModel[]) => {
      this.DeptEmp = res;
    });
    this.appService.getAndUpdateEmpDept().subscribe((res: EmpDeptModel[]) => {
      this.empDept = res;
    });
  }

}
