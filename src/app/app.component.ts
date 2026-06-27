import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from './core/services/session.service';

@Component({
  selector: 'wf-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  readonly title = 'WorldFit';
  readonly year = new Date().getFullYear();

  constructor(
    private readonly router: Router,
    public readonly session: SessionService
  ) {}

  get isLoggedIn(): boolean {
    return this.session.isLoggedIn;
  }

  logout(): void {
    this.session.logout();
    this.router.navigate(['/auth']);
  }
}
