import { Component, OnDestroy, OnInit } from '@angular/core';
import { ServersService } from '../../pages/servers/servers.service';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CanComponentDeactivate } from './can-deactivate-guard.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrl: './edit-server.component.css',
})
export class EditServerComponent
  implements OnInit, OnDestroy, CanComponentDeactivate
{
  server: { id: number; name: string; status: string };
  serverName = '';
  serverStatus = '';
  allowEdit = false;

  changesSaved: boolean = false;

  routeQueryParams: Subscription;
  routeData: Subscription;
  routeFragments: Subscription;

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.routeQueryParams = this.route.queryParams.subscribe(
      (params: Params) => {
        console.log(this.route.snapshot.queryParams);
        this.allowEdit = params['allowEdit'] === '1' ? true : false;
      }
    );
    this.routeFragments = this.route.fragment.subscribe(() => {
      console.log(this.route.snapshot.fragment);
    });

    this.routeData = this.route.data.subscribe((data: Data) => {
      this.server = data['server'];

      if (!this.server) {
        this.allowEdit = false;
        this.router.navigate(['/not-found']);
        this.server = {
          id: -1,
          name: '',
          status: 'Inactive',
        };
      } else {
        this.serverName = this.server.name;
        this.serverStatus = this.server.status;
      }
    });

    // this.routeParams = this.route.params.subscribe((params: Params) => {
    //   console.log(params);
    //   this.server = this.serversService.getServer(+params['id']);

    //   if (!this.server) {
    //     this.allowEdit = false;
    //     this.router.navigate(['/not-found']);
    //     this.server = {
    //       id: -1,
    //       name: '',
    //       status: 'Inactive',
    //     };
    //   } else {
    //     this.serverName = this.server.name;
    //     this.serverStatus = this.server.status;
    //   }
    // });
  }

  ngOnDestroy() {
    this.routeQueryParams.unsubscribe();
    this.routeFragments.unsubscribe();
    this.routeData.unsubscribe();
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {
      name: this.serverName,
      status: this.serverStatus,
    });
    this.changesSaved = true;
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    if (!this.allowEdit) {
      return true;
    }

    if (
      (this.serverName !== this.server.name ||
        this.serverStatus !== this.server.status) &&
      !this.changesSaved
    ) {
      return confirm('Do you want to discard the changes?');
    } else {
      return true;
    }
  }
}
