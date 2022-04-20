import { Component } from '@angular/core';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-header-section',
  templateUrl: './header-section.component.html'
})
export class HeaderSectionComponent {

  constructor(
    private service: EmployeeService
  ) { }

  text = this.service.getTitle();;
}
