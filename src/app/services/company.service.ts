import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Company } from '../models/company.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private companyUrl = 'https://szczygieldamian.github.io/company/company-data.json';

  private httpClient = inject(HttpClient);

  getCompanyInfo(): Observable<Company> {
    return this.httpClient.get<Company>(this.companyUrl).pipe(
      catchError((error) => {
        console.error(error);
        return throwError(() => new Error(error));
      }));
  }
}
