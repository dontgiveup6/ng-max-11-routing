import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanDeactivateFn,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable({
  providedIn: 'root',
})
class CanDeactivateGuard {
  canDeactive(
    component: CanComponentDeactivate,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return component.canDeactivate();
  }
}

export const canDeactivate: CanDeactivateFn<CanComponentDeactivate> = (
  component: CanComponentDeactivate,
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  nextState?: RouterStateSnapshot
): Observable<boolean> | Promise<boolean> | boolean => {
  return inject(CanDeactivateGuard).canDeactive(
    component,
    route,
    state,
    nextState
  );
};
