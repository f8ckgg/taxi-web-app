import {Component, EventEmitter, Output} from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";
import {AuthenticationService} from "../../services/authentication.service";
import {UserDTO} from "../../interfaces";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent{
  registerForm: FormGroup;
  errorMessage: string | undefined;
  hide = true;
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { this.registerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    driver: new FormControl('', [Validators.required]) // new form control
  });}


  get formControls() {
    return this.registerForm.controls;
  }

  register() {
      const request: UserDTO = this.registerForm.value;
    this.authenticationService.register(request).subscribe({
      next: (response) => {
        localStorage.setItem('jwtToken', response.token);
        localStorage.setItem('role',response.role);
        this.router.navigate(['']);
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage = error.error;
      }
    });
  }
}
