import { HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Component, Input } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthResponseDto } from "../models/dto/authResponseDto";
import { AuthService } from "../services/auth.service";

@Component({
    templateUrl: "auth.component.html"
})
export class AuthComponent {
    public errorMessage?: string;
    public username?: string;
    public password?: string;

    public constructor(private router: Router, private authService: AuthService) { }

    public authenticate(form: NgForm) {
        if (form.valid) {
            this.authService.authenticate(this.username ?? "", this.password ?? "").
                subscribe({
                    next: (res: AuthResponseDto) => {
                        this.authService.authToken = res.token;
                        localStorage.setItem("token", res.token);
                        this.router.navigateByUrl("/admin/main");
                    },
                    error: (err: HttpErrorResponse) => {
                        this.errorMessage = err.error;
                    }
                });
        } else {
            this.errorMessage = "Form data is invalid"
        }
    }
}