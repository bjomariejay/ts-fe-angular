import { Component, signal } from '@angular/core';
import { HeaderComponent } from './components/header-component/header-component';
import { FooterComponent } from './components/footer-component/footer-component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  // templateUrl: './app.html',
  styleUrl: './app.css',
  template: `
     <app-header-component/>
    <main >
      <router-outlet/>
    </main>
    <app-footer-component/>

  `
})
export class App {
  protected readonly title = signal('angular-tailwind-app');
}
