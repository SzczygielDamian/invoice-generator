import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { Company } from '../../models/company.model';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-footer',
  imports: [MatCardModule, MatIconModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent implements OnInit {
    private companyService = inject(CompanyService);
    companInfo = signal<Company | null>(null);

    ngOnInit(): void {
       this.companyService.getCompanyInfo().subscribe(res => this.companInfo?.set(res));   
    }
}
