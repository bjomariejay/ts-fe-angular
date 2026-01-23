import { Routes } from '@angular/router';

export const routes: Routes = [
   {
        path: '',
        pathMatch: 'full',
        loadComponent: () => {
            return import('./components/login/login-page.component').then((m) => m.LoginPageComponent)
        },
    },
    {
        path: 'home',
        pathMatch: 'full',
        loadComponent: () => {
            return import('./components/home-component/home-component').then((m) => m.HomeComponent)
        },
    },
    {
        path: 'todos',
        pathMatch: 'full',
        loadComponent: () => {
            return import('./components/todos-component/todos-component').then((m) => m.TodosComponent)
        },
    },
];
