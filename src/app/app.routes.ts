import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		loadComponent: () => import('./pages/home.component').then(m => m.HomeComponent),
	},
	{
		path: 'sobre',
		loadComponent: () => import('./pages/about.component').then(m => m.AboutComponent),
	},
	{
		path: 'portfolio',
		loadComponent: () => import('./pages/portfolio.component').then(m => m.PortfolioComponent),
	},
	{
		path: '**',
		redirectTo: ''
	}
];
