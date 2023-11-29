import { Component } from '@angular/core';
import {RoadDTO} from "../../interfaces";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RoadService} from "../../services/road.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {
  orderForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private roadService: RoadService,
              private router: Router) {
    this.orderForm = this.formBuilder.group({
      startLocation: ['', Validators.required],
      endLocation: ['', Validators.required]
    });
  }

  onSubmit() {
    const road :RoadDTO = this.orderForm.value;
    this.roadService.createRoad(road).subscribe(() => {
      this.router.navigate(['roaduser']);
    });
  }
}
