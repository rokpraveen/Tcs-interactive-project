import { Injectable} from '@angular/core';
import employeeData from './employee.json';


interface Employee {
    Name: String;
    empid: number;
    experience: String;
    content: String;
    url: String;
    address: String;
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
        console.log(this.employes.indexOf(employe));
    
    }

    
    set(employe, id){
    for(let i in this.employes)
    {
        if(this.employes[i].empid==id)
        {
            this.employes[i]=employe;
        }
    }
}
}