import { Component, OnInit } from '@angular/core';
import { ServersService } from '../../pages/servers/servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrl: './server.component.css',
})
export class ServerComponent implements OnInit {
  server: { id: number; name: string; status: string };

  constructor(private serversService: ServersService) {}

  ngOnInit() {
    this.server = this.serversService.getServer(1);
  }
}
