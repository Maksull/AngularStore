import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);

  });

  it('should be created', () => {

    expect(service).toBeTruthy();
  });
});
