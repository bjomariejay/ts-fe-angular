import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../environments/environment';
import { AppUser, CreateUserPayload, UpdateUserPayload } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private readonly http: HttpClient) {}

  getUsers() {
    return firstValueFrom(
      this.http.get<AppUser[]>(`${environment.apiUrl}/users`)
    );
  }

  createUser(payload: CreateUserPayload) {
    return firstValueFrom(
      this.http.post<AppUser>(`${environment.apiUrl}/users`, payload)
    );
  }

  updateUser(id: number, payload: UpdateUserPayload) {
    return firstValueFrom(
      this.http.put<AppUser>(`${environment.apiUrl}/users/${id}`, payload)
    );
  }

  deleteUser(id: number) {
    return firstValueFrom(
      this.http.delete<void>(`${environment.apiUrl}/users/${id}`)
    );
  }
}
