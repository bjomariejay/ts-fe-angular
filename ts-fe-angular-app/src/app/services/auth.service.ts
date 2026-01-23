import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../environments/environment';
import {
  AuthSuccessResponse,
  AuthenticatedUser,
  CurrentUserResponse,
  LoginPayload,
  SignupPayload
} from '../models/auth.model';
import { clearStoredToken, getStoredToken, persistToken } from '../utils/token-storage';

interface LoginResult {
  success: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly userSignal = signal<AuthenticatedUser | null>(null);
  private readonly errorSignal = signal('');
  private readonly isLoadingSignal = signal(false);
  private readonly isBootstrappingSignal = signal(true);
  private readonly readyPromise: Promise<void>;
  private resolveReady!: () => void;
  private isReady = false;

  readonly user = this.userSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();
  readonly isLoading = this.isLoadingSignal.asReadonly();
  readonly isBootstrapping = this.isBootstrappingSignal.asReadonly();

  constructor(private readonly http: HttpClient) {
    this.readyPromise = new Promise(resolve => {
      this.resolveReady = resolve;
    });
    this.restoreSession();
  }

  private async restoreSession() {
    const token = getStoredToken();
    if (!token) {
      this.finishBootstrapping();
      return;
    }

    try {
      const response = await firstValueFrom(
        this.http.get<CurrentUserResponse>(`${environment.apiUrl}/me`)
      );
      if (response.success && response.user) {
        this.userSignal.set(response.user);
      } else {
        clearStoredToken();
      }
    } catch (error) {
      console.error(error);
      clearStoredToken();
      this.errorSignal.set('Session expired. Please sign in again.');
    } finally {
      this.finishBootstrapping();
    }
  }

  private finishBootstrapping() {
    if (this.isReady) {
      return;
    }
    this.isReady = true;
    this.isBootstrappingSignal.set(false);
    this.resolveReady();
  }

  whenReady() {
    return this.isReady ? Promise.resolve() : this.readyPromise;
  }

  async login(username: string, password: string): Promise<LoginResult> {
    this.isLoadingSignal.set(true);
    this.errorSignal.set('');

    try {
      const response = await firstValueFrom(
        this.http.post<AuthSuccessResponse>(`${environment.apiUrl}/login`, {
          username,
          password
        } satisfies LoginPayload)
      );

      if (response.success && response.user && response.token) {
        persistToken(response.token);
        this.userSignal.set(response.user);
        return { success: true };
      }

      this.errorSignal.set(response.message ?? 'Unable to login');
      clearStoredToken();
      return { success: false };
    } catch (error: unknown) {
      const message = this.extractServerMessage(error) ?? 'Login failed. Please try again.';
      this.errorSignal.set(message);
      return { success: false };
    } finally {
      this.isLoadingSignal.set(false);
    }
  }

  async signup(payload: SignupPayload) {
    return firstValueFrom(
      this.http.post<AuthSuccessResponse>(`${environment.apiUrl}/signup`, payload)
    );
  }

  logout(message?: string) {
    clearStoredToken();
    this.userSignal.set(null);
    if (message) {
      this.errorSignal.set(message);
    }
  }

  clearError() {
    this.errorSignal.set('');
  }

  handleUnauthorized() {
    this.logout('Session expired. Please sign in again.');
  }

  getTokenSnapshot() {
    return getStoredToken();
  }

  private extractServerMessage(error: unknown) {
    if (typeof error === 'object' && error && 'error' in error) {
      const apiError = error as { error?: { message?: string } };
      return apiError.error?.message;
    }
    return undefined;
  }
}
