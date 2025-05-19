import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MatCardModule } from '@angular/material/card';
import { FooterComponent } from './components/footer/footer.component';


@Component({
  selector: 'app-root',
  imports: [FooterComponent, MatCardModule, RouterOutlet, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'invoice-generator';

  showFooter = false;

  private router = inject(Router);


  constructor() {
    this.router.events.subscribe(() => {
      this.showFooter = this.router.url.includes('/product-list');     
    });
  }

}
