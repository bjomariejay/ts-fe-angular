import { CommonModule } from '@angular/common';
import { Component, DestroyRef, effect, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="page-shell">
      <form class="card" [formGroup]="form" (ngSubmit)="handleSubmit()">
        <div>
          <h1>Sign in</h1>
          <p>Use your credentials from the users table.</p>
        </div>

        <label>
          <span>Username</span>
          <input
            type="text"
            formControlName="username"
            placeholder="Enter username"
          />
        </label>

        <label>
          <span>Password</span>
          <input
            type="password"
            formControlName="password"
            placeholder="Enter password"
          />
        </label>

        @if (error()) {
          <p class="error">{{ error() }}</p>
        }

        <button type="submit" [disabled]="form.invalid || isLoading()">
          {{ isLoading() ? 'Signing in…' : 'Login' }}
        </button>

        <div class="helper">
          <p>Use a username/password from the users table.</p>
          <a routerLink="/signup">Need an account? Create a user</a>
        </div>
      </form>
    </div>
  `,
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly auth = inject(AuthService);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  readonly error = this.auth.error;
  readonly isLoading = this.auth.isLoading;
  readonly isBootstrapping = this.auth.isBootstrapping;

  constructor() {
    this.form.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      if (this.error()) {
        this.auth.clearError();
      }
    });

    effect(() => {
      if (!this.isBootstrapping() && this.auth.user()) {
        this.router.navigate(['/dashboard']);
      }
    });
  }

  async handleSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { username, password } = this.form.getRawValue();
    const result = await this.auth.login(username, password);
    if (result.success) {
      this.router.navigate(['/home']);
    }
  }
}
