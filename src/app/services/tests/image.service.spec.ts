import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';

import { ImageService } from './image.service';

describe('ImageService', () => {
  let service: ImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [ImageService]
    });
    service = TestBed.inject(ImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Return image url', () =>{
    const key = 'kayak/kayak.png';
    const result = `${environment.apiUrl}/images/request?key=${key}`
    expect(service.getImageUrl(key)).toBe(result);
  })
});
