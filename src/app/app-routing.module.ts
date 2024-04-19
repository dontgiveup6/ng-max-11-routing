import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditServerComponent } from './components/edit-server/edit-server.component';
import { ServerComponent } from './components/server/server.component';
import { UserComponent } from './components/user/user.component';
import { HomeComponent } from './pages/home/home.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ServersComponent } from './pages/servers/servers.component';
import { UsersComponent } from './pages/users/users.component';
import { canActivate, canActivateChild } from './auth-guard.service';
import { canDeactivate } from './components/edit-server/can-deactivate-guard.service';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { resolve } from './components/server/server-resolver.service';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'users',
    component: UsersComponent,
    children: [
      {
        path: ':id/:name',
        component: UserComponent,
      },
    ],
  },
  {
    path: 'servers',
    // canActivate: [canActivate],
    canActivateChild: [canActivate, canActivateChild],
    component: ServersComponent,
    children: [
      {
        path: ':id',
        component: ServerComponent,
        resolve: { server: resolve },
      },
      {
        path: ':id/edit',
        component: EditServerComponent,
        canDeactivate: [canDeactivate],
        resolve: { server: resolve },
      },
    ],
  },
  // { path: 'not-found', component: PageNotFoundComponent },
  {
    path: 'not-found',
    component: ErrorPageComponent,
    data: { message: 'Page not found!' },
  },
  { path: '**', redirectTo: '/not-found', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
