import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { EmployeeService } from 'src/app/Services/employee.service';

@Component({
  selector: 'app-view-employees',
  templateUrl: './view-employees.page.html',
  styleUrls: ['./view-employees.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ViewEmployeesPage implements OnInit {
  employees: any[] = [];
  constructor(private http: HttpClient, private service: EmployeeService) { }

  ngOnInit() {
    this.service.GetEmployees().subscribe((result: any) => {
      console.log(result);
      this.employees = result;
    });
  }

  deleteEmployee(employeeId: number) {
    this.service.DeleteEmployee(employeeId).subscribe((result: any) => {
    console.log('Delete employee with ID:', employeeId);
  });
  }
}
