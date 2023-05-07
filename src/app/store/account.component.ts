import { Component } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";

@Component({
    templateUrl: "account.component.html"
})
export class AccountComponent {
    public constructor(private authService: AuthService, private router: Router) { }

    public get account(){
        return this.authService.account!;
    }

    public logout() {
        this.authService.logout();
        this.router.navigateByUrl("/store");
    }
}