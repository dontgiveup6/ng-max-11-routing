import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './pages/home/home.component';
import { ServersComponent } from './pages/servers/servers.component';
import { UsersComponent } from './pages/users/users.component';
import { ServerComponent } from './components/server/server.component';
import { EditServerComponent } from './components/edit-server/edit-server.component';
import { UserComponent } from './components/user/user.component';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'users',
    component: UsersComponent,
  },
  {
    path: 'users/:id/:name',
    component: UserComponent,
  },
  {
    path: 'servers',
    component: ServersComponent,
  },
  {
    path: 'servers/:id/edit',
    component: EditServerComponent,
  },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ServersComponent,
    UsersComponent,
    ServerComponent,
    EditServerComponent,
    UserComponent,
  ],
  imports: [BrowserModule, FormsModule, RouterModule.forRoot(appRoutes)],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
})
export class AppModule {}
