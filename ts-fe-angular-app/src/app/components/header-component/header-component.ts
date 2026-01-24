import { Component, HostListener, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header-component',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header-component.html',
  styleUrls: ['./header-component.css'],
})
export class HeaderComponent {
  private readonly router = inject(Router);
  private readonly auth = inject(AuthService);

  isDropdownOpen = false;

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  goToManageUser(): void {
    this.isDropdownOpen = false;
    this.router.navigate(['/manage-user']); // change route if needed
  }

  logout(): void {
    const confirmLogout = confirm('Are you sure you want to logout?');

    if (confirmLogout) {
      this.auth.logout();
      this.router.navigate(['/']);
    } else {
      console.log('Logout cancelled');
    }

    this.isDropdownOpen = false;
  }

  // ✅ Close dropdown when clicking outside
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    const target = event.target as HTMLElement;

    if (!target.closest('.profile-dropdown')) {
      this.isDropdownOpen = false;
    }
  }
}
