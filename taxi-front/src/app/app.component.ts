import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoggedIn = false;
  role = localStorage.getItem('role');
  title = 'taxi-front';
  constructor(private router: Router, private http: HttpClient) {
  }
  updateLoggedInStatus() {
    this.isLoggedIn = !!localStorage.getItem('jwtToken');
    this.role = localStorage.getItem('role');
  }
  logout() {
    this.http.post(environment.apiUrl+'/api/auth/logout', {}).subscribe(() => {
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('role');
      this.router.navigate(['login']);
    });
  }
}
