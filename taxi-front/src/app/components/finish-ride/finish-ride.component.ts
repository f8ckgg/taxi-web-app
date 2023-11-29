import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RoadService } from 'src/app/services/road.service';
import {RoadDTO} from "../../interfaces";

@Component({
  selector: 'app-finish-ride',
  templateUrl: './finish-ride.component.html',
  styleUrls: ['./finish-ride.component.css']
})
export class FinishRideComponent implements OnInit {

  inProgressRoads$: Observable<RoadDTO[]> | undefined;

  constructor(private roadService: RoadService, private snackBar: MatSnackBar,
              private router: Router) { }

  ngOnInit(): void {
    this.inProgressRoads$ = this.roadService.getInProgressRoadsByDriverId();
  }

  finishRoad(id: number) {
    this.roadService.finishRoad(id).subscribe(
      () => {
        this.snackBar.open('Ride finished successfully', 'Close', { duration: 3000 });
        this.router.navigate(['createbill',id]);
      }
    );
  }

}

