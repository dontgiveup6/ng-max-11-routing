import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent implements OnInit, OnDestroy {
  user: { id: number; name: string };
  userSubscription: Subscription;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // this.user = {
    //   id: this.route.snapshot.params['id'],
    //   name: this.route.snapshot.params['name'],
    // };

    this.userSubscription = this.route.params.subscribe((params: Params) => {
      this.user = {
        id: params['id'],
        name: params['name'],
      };
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
