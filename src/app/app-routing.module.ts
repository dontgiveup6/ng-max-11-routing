import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditServerComponent } from './components/edit-server/edit-server.component';
import { ServerComponent } from './components/server/server.component';
import { UserComponent } from './components/user/user.component';
import { HomeComponent } from './pages/home/home.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ServersComponent } from './pages/servers/servers.component';
import { UsersComponent } from './pages/users/users.component';
import { IsAdminGuard } from './auth-guard.service';

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
    canActivate: [IsAdminGuard],
    component: ServersComponent,
    children: [
      {
        path: ':id',
        component: ServerComponent,
      },
      {
        path: ':id/edit',
        component: EditServerComponent,
      },
    ],
  },
  { path: 'not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/not-found', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
