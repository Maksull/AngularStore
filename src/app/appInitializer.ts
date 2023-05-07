import { Account } from "./models/account";
import { JwtResponse } from "./models/jwtResponse";
import { RefreshTokenRequest } from "./models/refreshTokenRequest";
import { AuthService } from "./services/auth.service";

export function appInitializer(authService: AuthService) {
    return () => {
        return new Promise<void>((resolve, reject) => {
            let storageToken = localStorage.getItem("token");

            if (storageToken != null && storageToken != "undefined") {
                authService.validate().subscribe({
                    next: () => {
                        authService.isAuthenticated = true;
                        authService.validateAdmin().subscribe({
                            next: () => {
                                authService.isAdmin = true;
                            },
                            error: () => {
                                authService.isAdmin = false;
                            }
                        });
                        authService.getAccountData().subscribe({
                            next: (account: Account) => {
                                authService.account = account;
                                resolve();
                            },
                            error: () => {
                                authService.isAuthenticated = false;
                                authService.isAdmin = false;
                                resolve();
                            }
                        })
                    },
                    error: () => {
                        let refreshToken = localStorage.getItem("refreshToken");
                        let refreshTokenExpired = localStorage.getItem("refreshTokenExpired");

                        if (refreshToken != null && refreshTokenExpired != null) {
                            let refreshTokenRequest: RefreshTokenRequest = new RefreshTokenRequest();
                            refreshTokenRequest.token = refreshToken;
                            refreshTokenRequest.expired = refreshTokenExpired;

                            authService.refresh(refreshTokenRequest).subscribe({
                                next: (res: JwtResponse) => {
                                    authService.isAuthenticated = true;
                                    localStorage.setItem("token", res.jwt);
                                    localStorage.setItem("refreshToken", res.refreshToken.token);
                                    localStorage.setItem("refreshTokenExpired", res.refreshToken.expired);

                                    authService.validateAdmin().subscribe({
                                        next: () => {
                                            authService.isAdmin = true;
                                        },
                                        error: () => {
                                            authService.isAdmin = false;
                                        }
                                    });

                                    authService.getAccountData().subscribe({
                                        next: (account: Account) => {
                                            authService.account = account;
                                            resolve();
                                        },
                                        error: () => {
                                            authService.isAuthenticated = false;
                                            authService.isAdmin = false;
                                            resolve();
                                        }
                                    })
                                },
                                error: () => {
                                    resolve();
                                }
                            });
                        } else {
                            resolve();
                        }
                    }
                });
            } else {
                resolve();
            }
        });
    };
}