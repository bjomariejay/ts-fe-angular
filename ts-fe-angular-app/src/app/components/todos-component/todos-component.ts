import { Component } from '@angular/core';
import { HeaderComponent } from '../header-component/header-component';
import { FooterComponent } from '../footer-component/footer-component';

@Component({
  selector: 'app-todos-component',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './todos-component.html',
  styleUrls: ['./todos-component.css']
})
export class TodosComponent {}
