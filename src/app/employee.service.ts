import { Injectable} from '@angular/core';
import employeeData from './employee.json';


interface Employee {
    Name: String;
    empid: String;
    experience: String;
    content: String;
    url: String;
}

@Injectable({
    providedIn: 'root'
})
export class EmployeeService{

    employes: Employee[] = employeeData;

    get(){
        return this.employes;
    }

    add(employe){
        this.employes.push(employe);
    }
    delete(employe){
        const index = this.employes.indexOf(employe);
        if(index>=0){
            this.employes.splice(index,1);
        }
    }
}