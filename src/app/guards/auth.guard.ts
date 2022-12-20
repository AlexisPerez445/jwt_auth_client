import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(
    private oAuthService: AuthService,
    private oRouter: Router
     ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> |  boolean {
      let logged = false;
      this.oAuthService.checkToken();
      this.oAuthService.stateLogin
      .subscribe({
        next: (resp : boolean) => {
          logged = resp;
        }
      });

      if(logged){
        this.oRouter.navigateByUrl('/');
        return false;
      } else {
        return true;
      }
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> |  boolean {
      let logged = false;
      this.oAuthService.checkToken();
      this.oAuthService.stateLogin
      .subscribe({
        next: (resp : boolean) => {
          logged = resp;
        }
      })

      if(logged){
        this.oRouter.navigateByUrl('/');
        return false;
      } else {
        return true;
      }
  }
}
