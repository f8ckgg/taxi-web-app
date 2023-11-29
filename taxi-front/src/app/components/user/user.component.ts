import { Component, OnInit } from '@angular/core';

import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {UserDTO} from "../../interfaces";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent  {
  currentUser!: UserDTO;
  userForm!: FormGroup;

  constructor(private userService: UserService, private fb: FormBuilder) {
    this.userService.getMe().subscribe(user => {
    this.currentUser = user;
    this.userForm = this.fb.group({
      name: [user.name, Validators.required],
    });
  });}

  updateUser(): void {
    const updatedName = this.userForm.get('name')?.value;
    this.userService.updateUser(updatedName).subscribe(updatedUser => {
      this.currentUser = updatedUser;
    });
  }

  deleteUser(): void {
    this.userService.deleteUser().subscribe(() => {
// handle successful deletion
    });
  }
}
