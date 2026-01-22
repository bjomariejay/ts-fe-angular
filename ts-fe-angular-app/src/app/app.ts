import { Component, signal } from '@angular/core';
import { HeaderComponent } from './components/header-component/header-component';
import { FooterComponent } from './components/footer-component/footer-component';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './components/home-component/home-component';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, FooterComponent, HomeComponent],
  // templateUrl: './app.html',
  styleUrl: './app.css',
  template: `
    <app-header-component/>
    <main >
      <app-home-component/>
    </main>
    <app-footer-component/>

  `
})
export class App {
  protected readonly title = signal('angular-tailwind-app');
}
