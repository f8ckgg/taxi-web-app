import {Component, Inject, OnInit} from '@angular/core';
import { Observable } from 'rxjs';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {CarDTO, RoadDTO} from "../../interfaces";
import { RoadService } from 'src/app/services/road.service';
import {CarService} from "../../services/car.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";



@Component({
  selector: 'app-accept-order',
  templateUrl: './accept-order.component.html',
  styleUrls: ['./accept-order.component.css']
})
export class AcceptOrderComponent implements OnInit {
  displayedColumns: string[] = ['id', 'startLocation', 'endLocation', 'user', 'action'];
  pendingRoads$: Observable<RoadDTO[]> | undefined;

  constructor(
    private carService: CarService,
    private roadService: RoadService,
    private snackBar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog // Inject MatDialog service
  ) { }

  ngOnInit(): void {
    this.pendingRoads$ = this.roadService.getPendingRoads();
  }

  acceptRoad(id: number): void {
    // Use the MatDialog service to open the CarSelectionDialog component
    const dialogRef = this.dialog.open(CarDialogComponent);

    // Subscribe to the afterClosed event to get the selected car ID and call the acceptRoad method with it
    dialogRef.afterClosed().subscribe((carId: number) => {
      if (carId) {
        this.roadService.acceptRoad(id, carId).subscribe(() => {
          this.snackBar.open('Road accepted', 'Close', { duration: 3000 });
          this.router.navigate(['finish']);
        });
      }
    });
  }
}

@Component({
  selector: 'app-car-dialog',
  template: `
    <h2 mat-dialog-title>Select a car</h2>
    <mat-dialog-content>
      <mat-form-field>
        <mat-label>Car</mat-label>
        <mat-select [(ngModel)]="selectedCarId">
          <mat-option *ngFor="let car of cars$ | async" [value]="car.id">{{car.model}} </mat-option>
        </mat-select>
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button [mat-dialog-close]="selectedCarId" color="primary" class="submit-button">Select</button>
      <button mat-button mat-dialog-close color="accent" class="submit-button">Cancel</button>
    </mat-dialog-actions>
  `
})
export class CarDialogComponent {
  selectedCarId: number | undefined;
  cars$: Observable<CarDTO[]> | undefined;

  constructor(private carService: CarService) {
    this.cars$ = this.carService.getAllCars();
  }
}
