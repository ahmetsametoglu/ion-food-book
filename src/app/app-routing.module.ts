import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './pages/auth/auth.guard';
import { UnAuthGuard } from './pages/auth/un-auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    canActivate: [AuthGuard],
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
  },
  {
    path: 'auth',
    canActivate: [UnAuthGuard],
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthPageModule),
  },
  {
    path: 'user-list',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/user-list/user-list.module').then(m => m.UserListPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
