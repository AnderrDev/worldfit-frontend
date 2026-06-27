import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { adminGuard, authGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: 'routines',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./modules/routines/routines.module').then((m) => m.RoutinesModule)
  },
  {
    path: 'exercises',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./modules/exercises/exercises.module').then((m) => m.ExercisesModule)
  },
  {
    path: 'users',
    canActivate: [authGuard, adminGuard],
    loadChildren: () =>
      import('./modules/users/users.module').then((m) => m.UsersModule)
  },
  { path: '**', redirectTo: 'auth' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
