import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {CarService} from "../../services/car.service";
import {CarDTO} from "../../interfaces";

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent  implements OnInit {
  carForm: FormGroup;
  carId: number;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private carService: CarService,
    private router: Router
  ) {
    this.carId = Number(this.route.snapshot.paramMap.get('id'));
    this.carForm = this.fb.group({
      make: ['', Validators.required],
      model: ['', Validators.required],
      year: ['', Validators.required],
      licensePlate: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.carId) {
      this.carService.getCarById(this.carId).subscribe((car: CarDTO) => {
        this.carForm.patchValue({
          make: car.make,
          model: car.model,
          year: car.year,
          licensePlate: car.licensePlate
        });
      });
    }
  }

  onSubmit(): void {
    const carPojo = this.carForm.value;
    if (this.carId) {
      this.carService.updateCar(this.carId, carPojo).subscribe(() => {
        this.router.navigate(['/cars']);
      });
    } else {
      this.carService.createCar(carPojo).subscribe(() => {
        this.router.navigate(['/cars']);
      });
    }
  }

  onDelete(): void {
    this.carService.deleteCar(this.carId).subscribe(() => {
      this.router.navigate(['/cars']);
    });
  }
}
