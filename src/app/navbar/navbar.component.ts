import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  authService = inject(AuthService);
  userService = inject(UserService)
  router = inject(Router);

  navigateToUserAccount(): void {
    this.authService.getCurrentUser().subscribe({
      next: (user) => {
        if (user) {
          console.log('hello')
          this.userService.getUserByUid(user.uid).subscribe(user => {
            // Assuming the user object has a 'userId' property
            const userId = user.id;
            this.router.navigate(['/account', userId]);
            this.router.isActive(`/account/${userId}`, true);
          });
        }
      }
    })
  }
  
  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigateByUrl('/login');
      },
      error: (error) => {
        console.error('Logout error:', error);
      }
    });
  }
}
