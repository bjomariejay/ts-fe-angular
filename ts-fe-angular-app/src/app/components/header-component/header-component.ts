import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header-component',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header-component.html',
  styleUrls: ['./header-component.css']
})
export class HeaderComponent {
private readonly router = inject(Router);
  private readonly auth = inject(AuthService);
  logout(){

   

        const confirmLogout = confirm("Are you sure you want to logout?");
        if (confirmLogout) {
          this.auth.logout();
          this.router.navigate(['/']);
        } else {
          console.log("Logout cancelled");
        }
        
     return;
  }

}
