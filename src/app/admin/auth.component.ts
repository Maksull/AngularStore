import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthResponseDto } from "../models/dto/authResponseDto";
import { LoginDto } from "../models/dto/loginDto";
import { AuthService } from "../services/auth.service";

@Component({
    templateUrl: "auth.component.html"
})
export class AuthComponent {
    public errorMessage?: string;

    public authForm: FormGroup;

    public constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
        this.authForm = this.generateForm();
    }

    public authenticate() {
        if (this.authForm.valid) {
            let loginDto = new LoginDto;
            loginDto = this.authForm.getRawValue();
            this.authService.authenticate(loginDto).
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

    private generateForm() {
        return this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }
}