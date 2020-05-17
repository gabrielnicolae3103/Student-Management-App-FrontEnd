import { LoginServiceService } from './../services/login-service.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";

const helper = new JwtHelperService();

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: LoginServiceService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.getCurrentUser();
        console.log(this.authenticationService.jwt);
        if (this.authenticationService.jwt) {
            const isExpired = helper.isTokenExpired(this.authenticationService.jwt);
            if (isExpired) {
                console.log('expirat');
                this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
                return false;
            }
            // logged in so return true
            console.log(this.authenticationService.jwt);
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}
