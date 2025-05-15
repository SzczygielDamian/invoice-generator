import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';
import { Company } from '../../models/company.model';
import { CompanyService } from '../../services/company.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { of } from 'rxjs';

describe('FooterComponent', () => {
 let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let companyServiceMock: jasmine.SpyObj<CompanyService>;

  beforeEach(async () => {
    companyServiceMock = jasmine.createSpyObj('CompanyService', ['getCompanyInfo']);
    companyServiceMock.getCompanyInfo.and.returnValue(of({ 
      name: 'Test Company', 
      address: '123 Test St',
      phones: [ "123 456 789", "789-456-123"] 
    }));

    await TestBed.configureTestingModule({
      imports: [FooterComponent, MatCardModule, MatIconModule],
      providers: [{ provide: CompanyService, useValue: companyServiceMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize companyInfo from CompanyService', () => {
    expect(component.companInfo()).toEqual({ 
      name: 'Test Company', 
      address: '123 Test St',
      phones: [ "123 456 789", "789-456-123"] 
    });
  });

  it('should update companyInfo when service emits new data', () => {
    const newCompany: Company = { 
      name: 'Updated Company', 
      address: '123 Test St',
      phones: [ "123 456 889", "789-456-113"]};
    companyServiceMock.getCompanyInfo.and.returnValue(of(newCompany));

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.companInfo()).toEqual(newCompany);
  });
});
