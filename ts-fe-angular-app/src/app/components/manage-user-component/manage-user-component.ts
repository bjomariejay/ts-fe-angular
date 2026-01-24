import { Component } from '@angular/core';
import { HeaderComponent } from '../header-component/header-component';
import { FooterComponent } from '../footer-component/footer-component';

@Component({
  selector: 'app-manage-user-component',
   imports: [HeaderComponent, FooterComponent],
  templateUrl: './manage-user-component.html',
  styleUrl: './manage-user-component.css',
})
export class ManageUserComponent {

}
