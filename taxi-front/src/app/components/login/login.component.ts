import {Component} from '@angular/core';

import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";
import {AuthenticationRequest} from "../../interfaces";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  hide = true;

  constructor(private formBuilder: FormBuilder, private authenticationService: AuthenticationService,
              private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  get formControls() {
    return this.loginForm.controls;
  }

  login() {
    const request: AuthenticationRequest = {
      email: this.formControls["email"].value,
      password: this.formControls["password"].value
    };
    this.authenticationService.authenticate(request).subscribe(response => {
      localStorage.setItem('jwtToken', response.token);
      localStorage.setItem('role',response.role);
      this.router.navigate(['']);
    });
  }
}
