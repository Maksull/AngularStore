import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Component({
    templateUrl: "admin.component.html"
})
export class AdminComponent {
    public constructor(private router: Router, private authService: AuthService) { }

    public logout() {
        this.authService.logout();
    }
}