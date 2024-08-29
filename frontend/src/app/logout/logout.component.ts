import { Component } from '@angular/core';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent {
  route: any;
  logout(): void {
    sessionStorage.clear();
    this.route.navigateByUrl('/login');
  }
}
