import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { CompanyService } from './company.service';
import { provideHttpClient } from '@angular/common/http';
import { Company } from '../models/company.model';

describe('CompanyService', () => {
  let service: CompanyService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(CompanyService);
    httpMock = TestBed.inject(HttpTestingController);
  });

   afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

   it('should fetch company info successfully', () => {
    const mockCompany: Company = {
      name: 'Test Company',
      address: '123 Test St',
      phones: [ "123 456 789", "789-456-123"]
    };

    service.getCompanyInfo().subscribe((company) => {
      expect(company).toEqual(mockCompany);
    });

    const req = httpMock.expectOne(service['companyUrl']);
    expect(req.request.method).toBe('GET');
    req.flush(mockCompany);
  });

  it('should handle error when fetching company info', () => {
    service.getCompanyInfo().subscribe({
      next: () => fail('Expected an error, but got success response'),
      error: (error) => {
        expect(error).toBeInstanceOf(Error);
      }
    });

    const req = httpMock.expectOne(service['companyUrl']);
    req.flush('Error', { status: 500, statusText: 'Internal Server Error' });
  });
});
