import { Routes } from '@angular/router';
import { LoginPageComponent } from './components/login/login-page.component';
import { HomeComponent } from './components/home-component/home-component';
import { TodosComponent } from './components/todos-component/todos-component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginPageComponent },
  { path: 'home', canMatch: [authGuard], component: HomeComponent },
  { path: 'todos', canMatch: [authGuard], component: TodosComponent },
  { path: '**', redirectTo: 'login' }
];
