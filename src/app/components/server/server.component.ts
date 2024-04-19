import { Component, OnDestroy, OnInit } from '@angular/core';
import { ServersService } from '../../pages/servers/servers.service';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrl: './server.component.css',
})
export class ServerComponent implements OnInit, OnDestroy {
  server: { id: number; name: string; status: string };

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  routeData: Subscription;

  ngOnInit() {
    this.routeData = this.route.data.subscribe((data: Data) => {
      this.server = data['server'];
      if (!this.server) {
        this.router.navigate(['/not-found']);
        this.server = {
          id: -1,
          name: '',
          status: 'Inactive',
        };
      }
    });
    // this.route.params.subscribe((params: Params) => {
    //   this.server = this.serversService.getServer(Number(params['id']));

    //   if (!this.server) {
    //     this.router.navigate(['/not-found']);
    //     this.server = {
    //       id: -1,
    //       name: '',
    //       status: 'Inactive',
    //     };
    //   }
    // });
  }

  ngOnDestroy() {
    this.routeData.unsubscribe();
  }

  onEdit() {
    this.router.navigate(['edit'], {
      relativeTo: this.route,
      queryParamsHandling: 'preserve',
      preserveFragment: true,
    });
  }
}
