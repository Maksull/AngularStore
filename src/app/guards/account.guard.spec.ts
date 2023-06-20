import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AccountGuard } from './account.guard';
import { AuthService } from '../services/auth.service';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

// describe('AccountGuard', () => {
//   let guard: AccountGuard;
//   let router: Router;
//   let authService: AuthService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [RouterTestingModule],
//       providers: [AccountGuard, AuthService]
//     });
//     guard = TestBed.inject(AccountGuard);
//     router = TestBed.inject(Router);
//     authService = TestBed.inject(AuthService);
//   });

//   it('should allow access if user is authenticated and isAdmin', () => {
//     // Arrange
//     spyOn(authService, 'isAuthenticated').and.returnValue(true);
//     spyOn(authService, 'isAdmin').and.returnValue(true);
//     const navigateByUrlSpy = spyOn(router, 'navigateByUrl');

//     // Act
//     const canActivate = guard.canActivate(mockActivatedRouteSnapshot(), mockRouterStateSnapshot());

//     // Assert
//     expect(canActivate).toBeTrue();
//     expect(navigateByUrlSpy).toHaveBeenCalledWith('/admin/main');
//   });

//   it('should allow access if user is authenticated and not isAdmin', () => {
//     // Arrange
//     spyOn(authService, 'isAuthenticated').and.returnValue(true);
//     spyOn(authService, 'isAdmin').and.returnValue(false);
//     const navigateByUrlSpy = spyOn(router, 'navigateByUrl');

//     // Act
//     const canActivate = guard.canActivate(mockActivatedRouteSnapshot(), mockRouterStateSnapshot());

//     // Assert
//     expect(canActivate).toBeTrue();
//     expect(navigateByUrlSpy).not.toHaveBeenCalled();
//   });

//   it('should redirect to login if user is not authenticated', () => {
//     // Arrange
//     spyOn(authService, 'isAuthenticated').and.returnValue(false);
//     const navigateByUrlSpy = spyOn(router, 'navigateByUrl');

//     // Act
//     const canActivate = guard.canActivate(mockActivatedRouteSnapshot(), mockRouterStateSnapshot());

//     // Assert
//     expect(canActivate).toBeFalse();
//     expect(navigateByUrlSpy).toHaveBeenCalledWith('/login');
//   });

//   // Helper function to create a mock ActivatedRouteSnapshot
//   function mockActivatedRouteSnapshot(): ActivatedRouteSnapshot {
//     return {} as ActivatedRouteSnapshot;
//   }

//   // Helper function to create a mock RouterStateSnapshot
//   function mockRouterStateSnapshot(): RouterStateSnapshot {
//     return {} as RouterStateSnapshot;
//   }
// });
