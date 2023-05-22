import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Account } from 'src/app/models/account';
import { JwtResponse } from 'src/app/models/jwtResponse';
import { LoginRequest } from 'src/app/models/loginRequest';
import { RegisterRequest } from 'src/app/models/registerRequest';
import { AuthService } from 'src/app/services/auth.service';
import { compareTwoValidator } from 'src/app/validators/compareTwo.validator';
import { emailValidator } from 'src/app/validators/email.validator';
import { phoneNumberValidator } from 'src/app/validators/phoneNumber.validator';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    public loginForm: FormGroup;
    public registerForm: FormGroup;
    public isLogin: boolean = true;
    public isRegisted: boolean = false;
    public isSubmitted: boolean = false;
    public hide: Boolean = true;
    public errors: string[] = [];


    public constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
        this.loginForm = this.generateLoginForm();
        this.registerForm = this.generateRegisterForm();
    }

    public submit() {
        this.isSubmitted = true;
        if (this.isLogin && this.loginForm.valid) {
            var loginRequest: LoginRequest;
            loginRequest = this.loginForm.value;
            loginRequest.username = this.loginForm.get("name")!.value;
            this.authService.login(loginRequest)
                .subscribe({
                    next: (res: JwtResponse) => {
                        this.authService.isAuthenticated = true;
                        localStorage.setItem("token", res.jwt);
                        localStorage.setItem("refreshToken", res.refreshToken.token);
                        localStorage.setItem("refreshTokenExpired", res.refreshToken.expired);

                        this.authService.validateAdmin()
                            .subscribe({
                                next: () => {
                                    this.authService.isAdmin = true;
                                },
                                error: () => {
                                    this.authService.isAdmin = false;
                                }
                            });

                        this.authService.getAccountData().subscribe({
                            next: (account: Account) => {
                                this.authService.account = account;
                                this.router.navigateByUrl("/account");
                            },
                            error: () => {
                                this.authService.isAuthenticated = false;
                                this.authService.isAdmin = false;
                            }
                        })
                    },
                    error: (err: HttpErrorResponse) => {
                        for (let key in err.error.errors) {
                            this.errors.push(err.error.errors[key]);
                        }
                    }
                });
        } else if (!this.isLogin && this.registerForm.valid) {
            var registerRequest: RegisterRequest;
            registerRequest = this.registerForm.value;
            console.log(registerRequest)
            this.authService.register(registerRequest)
                .subscribe({
                    next: () => {
                        this.isRegisted = true;
                    },
                    error: (err: HttpErrorResponse) => {
                        for (let key in err.error.errors) {
                            this.errors.push(err.error.errors[key]);
                        }
                    }
                });
        }
    }

    public toggleLogin() {
        this.isLogin = true;
        let Indicator = document.getElementById("Indicator")!;
        Indicator.style.marginLeft = "2.8rem";
        this.errors = [];
    }
    public toggleRegister() {
        this.isLogin = false;
        let Indicator = document.getElementById("Indicator")!;
        Indicator.style.marginLeft = "15.5rem";
        this.errors = [];
    }

    public registed() {
        this.isRegisted = false
        this.isLogin = true;
        this.hide = true;
        this.errors = [];

        this.registerForm = this.generateRegisterForm();
    }

    private generateLoginForm() {
        return this.fb.group({
            name: ['', Validators.required],
            password: ['', Validators.required],
        });
    }

    private generateRegisterForm() {
        return this.fb.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            username: ['', Validators.required],
            email: ['', [Validators.required, emailValidator]],
            phoneNumber: ['', [Validators.required, phoneNumberValidator]],
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required],
        }, {
            validators: Validators.compose([
                compareTwoValidator('password', 'confirmPassword')
            ])
        });
    }


    //#region loginForm gets
    public get name() {
        return this.loginForm.get('name')!;
    }
    public get loginPassword() {
        return this.loginForm.get('password')!;
    }
    //#endregion

    //#region registerForm gets
    public get firstName() {
        return this.registerForm.get('firstName')!;
    }
    public get lastName() {
        return this.registerForm.get('lastName')!;
    }
    public get username() {
        return this.registerForm.get('username')!;
    }
    public get email() {
        return this.registerForm.get('email')!;
    }
    public get phoneNumber() {
        return this.registerForm.get('phoneNumber')!;
    }
    public get registerPassword() {
        return this.registerForm.get('password')!;
    }
    public get confirmPassword() {
        return this.registerForm.get('confirmPassword')!;
    }
    //#endregion
}
