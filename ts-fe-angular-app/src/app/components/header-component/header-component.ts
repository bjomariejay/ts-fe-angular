import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header-component',
    standalone: true,
  imports: [NgClass],
  templateUrl: './header-component.html',
  styleUrls: ['./header-component.css']
})
export class HeaderComponent implements OnInit {
  activeLink: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Set activeLink on initial load & route changes
    // this.setActiveLink(this.router.url);

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.setActiveLink(event.urlAfterRedirects);
      });
  }

  private setActiveLink(url: string) {
    if (url === '/') this.activeLink = 'home';
    else if (url === '/todos') this.activeLink = 'todos';
    // else this.activeLink = ''; // fallback
  }

  goTo(path: string) {
    this.router.navigate([path]);
  }
}
