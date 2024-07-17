import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/studies-view/studies-view.component').then(
        (m) => m.StudiesViewComponent
      ),
  },
  {
    path: 'favourites',
    loadComponent: () =>
      import('./components/favourites-view/favourites-view.component').then(
        (m) => m.FavouritesViewComponent
      ),
  },
  {
    path: '**',
    pathMatch: 'full',
    loadComponent: () =>
      import('./components/page-not-found/page-not-found.component').then(
        (m) => m.PageNotFoundComponent
      ),
  },
];
