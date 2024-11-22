import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'dashboard'
	},
	{
		path: 'dashboard',
		loadComponent: () => import('./pages/dashboard/dashboard.component').then((m) => m.DashboardComponent)
	},
	{
		path: 'store/:id',
		loadComponent: () => import('./pages/store/store.component').then((m) => m.StoreComponent)
	}
];
