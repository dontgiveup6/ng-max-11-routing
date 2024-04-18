import { Component, OnDestroy, OnInit } from '@angular/core';
import { ServersService } from '../../pages/servers/servers.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrl: './edit-server.component.css',
})
export class EditServerComponent implements OnInit, OnDestroy {
  server: { id: number; name: string; status: string };
  serverName = '';
  serverStatus = '';

  routeQueryParams: Subscription;
  routeFragments: Subscription;

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.routeQueryParams = this.route.queryParams.subscribe(() => {
      console.log(this.route.snapshot.queryParams);
    });
    this.routeFragments = this.route.fragment.subscribe(() => {
      console.log(this.route.snapshot.fragment);
    });

    this.server = this.serversService.getServer(1);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {
      name: this.serverName,
      status: this.serverStatus,
    });
  }

  ngOnDestroy() {
    this.routeQueryParams.unsubscribe();
    this.routeFragments.unsubscribe();
  }
}
