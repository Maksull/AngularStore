import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { JwtDto } from "../models/dto/JwtDto";
import { LoginDto } from "../models/dto/loginDto";
import { AuthService } from "../services/auth.service";

@Component({
    templateUrl: "auth.component.html"
})
export class AuthComponent {
    public errorMessage?: string;
    public isSubmitted: boolean = false;
    public hide: Boolean = true;

    public authForm: FormGroup;

    public constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
        this.authForm = this.generateForm();
        let storageToken = localStorage.getItem("token");

        if (storageToken != null && storageToken != "undefined") {
            this.validate();
        }
    }

    public authenticate() {
        this.isSubmitted = true;
        if (this.authForm.valid) {
            let loginDto = new LoginDto;
            loginDto = this.authForm.getRawValue();
            this.authService.authenticate(loginDto).
                subscribe({
                    next: (res: JwtDto) => {
                        this.authService.authToken = res.jwt;
                        localStorage.setItem("token", res.jwt);
                        this.router.navigateByUrl("/admin/main");
                    },
                    error: (err: HttpErrorResponse) => {
                        this.errorMessage = err.error;
                    }
                });
        }
    }

    private validate() {
        this.authService.validate(localStorage.getItem("token")!).
            subscribe({
                next: (res: JwtDto) => {
                    this.authService.authToken = res.jwt;
                    localStorage.setItem("token", res.jwt);
                    this.router.navigateByUrl("/admin/main");
                },
                error: (err: HttpErrorResponse) => {
                    console.log("Authenticatio nerquired");
                }
            });
    }

    private generateForm() {
        return this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    //#region authForm gets
    public get username() {
        return this.authForm.get('username');
    }
    public get password() {
        return this.authForm.get('password');
    }
    //#endregion
}