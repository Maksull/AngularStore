import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
    public loginForm!: FormGroup;
    public registerForm!: FormGroup;
    public confirmResetPasswordForm!: FormGroup;
    public resetPasswordForm!: FormGroup;

    public isLoginRegisted: boolean = false;
    public isLogin: boolean = false;
    public isRegister: boolean = false;
    public isRegisted: boolean = false;
    public isSubmitted: boolean = false;
    public hide: Boolean = true;
    public errors: string[] = [];

    public isEmailConfirmProcess: boolean = false;
    public isEmailConfirmed: boolean = false;

    public isResetPassword: boolean = false;
    public isResetPasswordSent: boolean = false;

    public isConfirmResetPassword: boolean = false;
    public isPasswordChanged: boolean = false;

    public constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private activeRoute: ActivatedRoute) {
        let resetPassword: boolean = this.router.url.includes("resetPassword");
        let userId: string = this.activeRoute.snapshot.params["userId"];
        let token: string = this.activeRoute.snapshot.params["token"];

        if (resetPassword && userId != undefined && token != undefined) {
            this.confirmResetPassword();
        }
        else if (userId != undefined && token != undefined) {
            this.confirmEmail(userId, token);
        }
        else {
            this.loginRegister();
        }
    }

    public confirmResetPassword() {
        this.confirmResetPasswordForm = this.generateConfirmResetPasswordForm();

        this.isConfirmResetPassword = true;
        this.isLoginRegisted = false;
    }

    public confirmEmail(userId: string, token: string) {
        this.isEmailConfirmProcess = true;

        this.authService.confirmEmail(userId, token)
            .subscribe({
                next: () => {
                    this.isEmailConfirmed = true;
                },
                error: (err: HttpErrorResponse) => {
                    this.addErrors(err);
                }
            });
    }

    public loginRegister() {
        this.loginForm = this.generateLoginForm();
        this.registerForm = this.generateRegisterForm();

        this.isLoginRegisted = true;
        this.isLogin = true;
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
                        this.addErrors(err);
                        if (this.errors.length === 0) {
                            this.errors.push("Invalid credentials");
                        }
                    }
                });
        } else if (this.isRegister && this.registerForm.valid) {
            var registerRequest: RegisterRequest;
            registerRequest = this.registerForm.value;
            registerRequest.phoneNumber = "+38" + registerRequest.phoneNumber;

            this.authService.register(registerRequest)
                .subscribe({
                    next: () => {
                        this.isRegisted = true;
                    },
                    error: (err: HttpErrorResponse) => {
                        this.addErrors(err);
                    }
                });
        }
        else if (this.isConfirmResetPassword && this.confirmResetPasswordForm.valid) {
            let userId: string = this.activeRoute.snapshot.params["userId"];
            let token: string = this.activeRoute.snapshot.params["token"];
            let newPassword: string = this.confirmResetPasswordForm.get("newPassword")!.value;

            this.authService.confirmResetPassword(userId, token, newPassword)
                .subscribe({
                    next: () => {
                        this.isPasswordChanged = true;
                    },
                    error: (err: HttpErrorResponse) => {
                        this.isPasswordChanged = false;
                        this.addErrors(err);
                    }
                });
        }
        else if (this.isResetPassword && this.resetPasswordForm.valid) {
            let username: string = this.resetPasswordForm.get("username")!.value;

            this.authService.resetPassword(username)
                .subscribe({
                    next: () => {
                        this.isResetPasswordSent = true;
                    },
                    error: (err: HttpErrorResponse) => {
                        this.isResetPasswordSent = false;
                        this.addErrors(err);
                    }
                });
        }
    }

    public toggleLogin() {
        this.isLogin = true;
        this.isRegister = false;
        let Indicator = document.getElementById("Indicator")!;
        Indicator.style.marginLeft = "2.8rem";
        this.errors = [];
    }
    public toggleRegister() {
        this.isLogin = false;
        this.isRegister = true;
        let Indicator = document.getElementById("Indicator")!;
        Indicator.style.marginLeft = "15.5rem";
        this.errors = [];
    }

    public resetPassword() {
        this.resetPasswordForm = this.generateResetPasswordForm();

        this.errors = [];
        this.isResetPassword = true;
        this.isLoginRegisted = false;
    }

    public fromResetPasswordToLogin() {
        this.loginRegister();

        this.errors = [];
        this.isResetPassword = false;
    }

    public registed() {
        this.isRegisted = false;
        this.isRegister = false;
        this.isLogin = true;
        this.hide = true;
        this.errors = [];

        this.registerForm = this.generateRegisterForm();
    }

    private addErrors(err: HttpErrorResponse) {
        this.errors = [];
        for (let key in err.error.errors) {
            this.errors.push(err.error.errors[key]);
        }
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

    private generateResetPasswordForm() {
        return this.fb.group({
            username: ['', Validators.required],
        });
    }

    private generateConfirmResetPasswordForm() {
        return this.fb.group({
            newPassword: ['', Validators.required],
            confirmNewPassword: ['', Validators.required],
        }, {
            validators: Validators.compose([
                compareTwoValidator('newPassword', 'confirmNewPassword')
            ])
        });
    }


    //#region ConfirmResetPasswordForm gets
    public get resetPasswordUsername() {
        return this.resetPasswordForm.get('username')!;
    }
    //#endregion

    //#region ConfirmResetPasswordForm gets
    public get newPassword() {
        return this.confirmResetPasswordForm.get('newPassword')!;
    }
    public get confirmNewPassword() {
        return this.confirmResetPasswordForm.get('confirmNewPassword')!;
    }
    //#endregion

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
