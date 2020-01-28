import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Injectable({
  providedIn: 'root',
})
export class UnAuthGuard implements CanActivate {
  constructor(private userService: UserService) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const isAuth = !!(await this.userService.getCurrentUser());

    return !isAuth;
  }
}
