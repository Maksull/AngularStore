import { Injectable } from "@angular/core";
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable()
export class LoginGuard {
    public constructor(private router: Router, private authService: AuthService) { }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        console.log("LOGIN GUARD")
        if (this.authService.isAuthenticated) {
            this.router.navigateByUrl("/account");

            return false;
        }

        return true;
    }
}