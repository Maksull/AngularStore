import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
})
export class AdminComponent {
    public constructor(private router: Router, private authService: AuthService) { }

    public logout() {
        this.authService.logout();
        this.router.navigateByUrl("/store");
    }
}
