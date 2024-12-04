import { Component, input } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-employees-tab',
  templateUrl: './employees-tab.component.html',
  styleUrl: './employess-tab.compoent.scss',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule],
})
export class EmployeesTabComponent {
  employees = input.required<string[]>();
  employeesPaginated: string[] = [];
  cols = ['name'];
  pageSizeOptions = [5, 10, 15];

  ngOnInit() {
    this.employeesPaginated = this.employees().slice(
      0,
      this.pageSizeOptions[0]
    );
  }

  handlePageEvent(event: any) {
    const start = event.pageIndex * event.pageSize;
    const end = (event.pageIndex + 1) * event.pageSize;
    this.employeesPaginated = this.employees().slice(start, end);
  }
}
