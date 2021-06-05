import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DeptEmpModel } from '../model/dept-emp-model';
import { DeptModel } from '../model/dept-model';
import { EmpDeptModel } from '../model/emp-dept-model';
import { EmpModel } from '../model/emp-model';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  private emp: EmpModel[];
  private dept: DeptModel[];

  private empDept: EmpDeptModel[];
  private DeptEmp: DeptEmpModel[];

  public iDept: number = 1;
  public iEmp: number = 1;

  public breakTheLoop: boolean;

  public start: number = 0;

  public customEvent = new EventEmitter();

  constructor() {
    this.emp = [];
    this.dept = [];
    this.empDept = [];
    this.DeptEmp = [];
    this.breakTheLoop = true;
  }

  public addDept(): void {
    this.dept.push({
      id: this.iDept,
      dept: 'dept' + this.iDept
    });
    this.iDept++;
    if (this.emp.length) {
      this.empDept.push({
        dept: this.dept[this.dept.length - 1].dept,
        emp: []
      });

      const multiplier = this.emp.length - 1;

      const randomNumber = Math.floor((Math.random() * multiplier) + 1);

      this.DeptEmp.push({
        emp: this.emp[randomNumber].emp,
        dept: []
      });

      this.empDept[this.empDept.length - 1].emp.push(this.emp[randomNumber].emp);
      this.DeptEmp[randomNumber].dept.push(this.dept[this.dept.length - 1].dept);
    }
  }

  public addEmp = (): void => {
    this.emp.push({
      id: this.iEmp,
      emp: 'EMP' + this.iEmp
    });
    this.iEmp++;
    if (this.dept.length) {
      this.DeptEmp.push({
        emp: this.emp[this.emp.length - 1].emp,
        dept: []
      });

      const multiplier = this.emp.length - 1;

      const randomNumber = Math.floor((Math.random() * multiplier) + 1);


      this.empDept.push({
        dept: this.dept[randomNumber].dept,
        emp: []
      });

      this.empDept[randomNumber].emp.push(this.emp[this.emp.length - 1].emp);
      this.DeptEmp[this.DeptEmp.length - 1].dept.push(this.dept[randomNumber].dept);
    }

  }

  public getAndUpdateEmp = (): Observable<EmpModel[]> => {
    return new Observable(observer => {
      observer.next(this.emp);
    });
  }

  public getAndUpdateDept = (): Observable<DeptModel[]> => {
    return new Observable(observer => {
      observer.next(this.dept);
    });
  }

  public getAndUpdateEmpDept = (): Observable<EmpDeptModel[]> => {
    return new Observable(observer => {
      observer.next(this.empDept);
    });
  }

  public getAndUpdateDeptEmp = (): Observable<DeptEmpModel[]> => {
    return new Observable(observer => {
      observer.next(this.DeptEmp);
    });
  }

  public onStart = (): void => {

    this.start++;
    if (this.breakTheLoop) {
      return;
    }

    const multiplier = this.emp.length - 1;
    const _multiplier = this.emp.length - 1;
    const mul = multiplier >= _multiplier ? _multiplier : multiplier;

    const randomNumber = Math.floor((Math.random() * mul) + 1);

    this.DeptEmp.push({
      emp: this.emp[randomNumber].emp,
      dept: []
    });

    this.empDept.push({
      dept: this.dept[randomNumber].dept,
      emp: []
    });

    this.empDept[randomNumber].emp.push(this.emp[randomNumber].emp);
    this.DeptEmp[randomNumber].dept.push(this.dept[randomNumber].dept);
  }

  public onBreakTheLoop = (): void => {
    this.breakTheLoop = true;
    this.start = 0;
  }

}
