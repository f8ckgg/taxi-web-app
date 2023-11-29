import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CarService } from '../../services/car.service';
import { CarDTO } from '../../interfaces';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {
  cars: CarDTO[] = [];
  pageSize = 10;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private carService: CarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllCars();
  }

  viewCarDetails(carId: number) {
    this.router.navigate(['/car', carId]);
  }

  getAllCars(): void {
    this.carService.getAllCars().subscribe(cars => {
      this.cars = cars;
      this.paginator.length = cars.length;
      this.paginator.pageIndex = 0;
      this.paginator.pageSize = this.pageSize;
      this.paginator.page.subscribe(page => {
        const startIndex = page.pageIndex * page.pageSize;
        const endIndex = startIndex + page.pageSize;
        this.cars = cars.slice(startIndex, endIndex);
      });
    });
  }

  createCar(): void {
    this.router.navigate(['/car/create']);
  }
}

