import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private userService: UserService) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const isAuth = !!(await this.userService.getCurrentUser());

    if (!isAuth) {
      this.router.navigate(['/auth'], { queryParams: { returnUrl: state.url } });
    }

    return true;
  }
}
