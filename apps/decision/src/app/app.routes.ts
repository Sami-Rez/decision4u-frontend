import { Route } from '@angular/router';
import { featureAuthRoutes } from '@app/feat/auth';
import { AuthGuard } from '@app/data/auth';

export const appRoutes: Route[] = [
  // DEFAULT ROUTE GOES TO THE AUTHENTICATED AREA
  { path: '', pathMatch: 'full', redirectTo: 'projects', },

  // UN-AUTHENTICATED AREA
  // child routes are a concern of the library and not the app route
  { path: 'auth', children: featureAuthRoutes },

  { path: '', loadChildren: () => import('@app/feat/main')
      .then(m => m.FeatMainModule),
    // canActivate: [authenticationGuard]
    canActivate: [AuthGuard]
  },

  // CATCH ALL ROUTE
  { path: '**', redirectTo: '/auth/login' },
  // { path: '**', component: NotFoundComponent },
];
