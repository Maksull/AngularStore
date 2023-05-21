import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import { StoreComponent } from "../store/store.component";

@Injectable()
export class StoreFirstGuard {
    private firstNavigation: boolean = true;

    public constructor(private router: Router) { }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.firstNavigation) {
            this.firstNavigation = false;
            if (route.component != StoreComponent) {
                this.router.navigateByUrl("/store");
                
                return false;
            }
        }

        return true;
    }
}